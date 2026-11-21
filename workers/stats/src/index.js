// Tiny stats proxy for subygan.github.io/dashboard.
// Fetches public profiles server-side (no CORS there), keeps the result in KV
// for TTL_SECONDS, and serves the last good copy if an upstream breaks.
//
//   GET /all         -> { duolingo, monkeytype }
//   GET /duolingo
//   GET /monkeytype

const UA = "subygan-stats/1.0";

const sources = {
  async duolingo(env) {
    const url = `https://www.duolingo.com/2017-06-30/users?username=${encodeURIComponent(env.DUOLINGO_USERNAME)}`;
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (!res.ok) throw new Error(`duolingo ${res.status}`);
    const u = (await res.json()).users?.[0];
    if (!u) throw new Error("duolingo: user not found");
    return {
      username: u.username,
      streak: u.streak,
      totalXp: u.totalXp,
      courses: (u.courses || []).map((c) => ({ title: c.title, xp: c.xp })),
      url: `https://www.duolingo.com/profile/${u.username}`,
    };
  },

  async monkeytype(env) {
    // Public profile endpoint is IP rate-limited, and Workers share egress IPs,
    // so it 429s from Cloudflare. With an ApeKey (secret) we use authed endpoints.
    if (env.MONKEYTYPE_APE_KEY) return monkeytypeAuthed(env);
    const url = `https://api.monkeytype.com/users/${encodeURIComponent(env.MONKEYTYPE_USERNAME)}/profile`;
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (!res.ok) throw new Error(`monkeytype ${res.status}`);
    const d = (await res.json()).data;
    const best = bestPerMode(d.personalBests?.time); // best WPM per 15/30/60/120s
    return {
      username: d.name,
      completedTests: d.typingStats?.completedTests,
      timeTypingSeconds: Math.round(d.typingStats?.timeTyping || 0),
      streak: d.streak,
      maxStreak: d.maxStreak,
      personalBests: best,
      url: `https://monkeytype.com/profile/${d.name}`,
    };
  },
};

function bestPerMode(byMode) {
  const best = {};
  for (const [mode, runs] of Object.entries(byMode || {})) {
    if (!runs?.length) continue;
    const top = runs.reduce((a, b) => (b.wpm > a.wpm ? b : a));
    best[mode] = { wpm: top.wpm, acc: top.acc };
  }
  return best;
}

async function monkeytypeAuthed(env) {
  const mt = async (path) => {
    const res = await fetch(`https://api.monkeytype.com${path}`, {
      headers: { "User-Agent": UA, Authorization: `ApeKey ${env.MONKEYTYPE_APE_KEY}` },
    });
    if (!res.ok) throw new Error(`monkeytype ${path} ${res.status}`);
    return (await res.json()).data;
  };
  const [stats, pbs, streak] = await Promise.all([
    mt("/users/stats"),
    mt("/users/personalBests?mode=time"),
    mt("/users/streak").catch(() => null), // optional
  ]);
  return {
    username: env.MONKEYTYPE_USERNAME,
    completedTests: stats?.completedTests,
    timeTypingSeconds: Math.round(stats?.timeTyping || 0),
    streak: streak?.length ?? null,
    maxStreak: streak?.maxLength ?? null,
    personalBests: bestPerMode(pbs),
    url: `https://monkeytype.com/profile/${env.MONKEYTYPE_USERNAME}`,
  };
}

// KV-backed cache: fresh -> return; stale -> refetch; refetch fails -> serve stale.
async function get(name, env, ctx) {
  const ttl = Number(env.TTL_SECONDS) * 1000;
  const cached = await env.STATS.get(name, "json");
  if (cached && Date.now() - cached.fetchedAt < ttl) return cached;
  try {
    const entry = { data: await sources[name](env), fetchedAt: Date.now() };
    ctx.waitUntil(env.STATS.put(name, JSON.stringify(entry)));
    return entry;
  } catch (err) {
    if (cached) return { ...cached, stale: true, error: String(err.message || err) };
    return { data: null, fetchedAt: null, error: String(err.message || err) };
  }
}

function corsHeaders(req, env) {
  const origin = req.headers.get("Origin");
  const allowed = env.ALLOWED_ORIGINS.split(",").map((s) => s.trim());
  const h = { Vary: "Origin" };
  if (origin && allowed.includes(origin)) h["Access-Control-Allow-Origin"] = origin;
  return h;
}

export default {
  async fetch(req, env, ctx) {
    const cors = corsHeaders(req, env);
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: { ...cors, "Access-Control-Allow-Methods": "GET" } });
    if (req.method !== "GET") return new Response("method not allowed", { status: 405, headers: cors });

    const path = new URL(req.url).pathname.replace(/^\/+|\/+$/g, "");
    let body;
    if (path === "all") {
      const names = Object.keys(sources);
      const entries = await Promise.all(names.map((n) => get(n, env, ctx)));
      body = Object.fromEntries(names.map((n, i) => [n, entries[i]]));
    } else if (path in sources) {
      body = await get(path, env, ctx);
    } else {
      return new Response("try /all, /duolingo or /monkeytype\n", { status: 404, headers: cors });
    }

    return Response.json(body, {
      headers: { ...cors, "Cache-Control": `public, max-age=${env.TTL_SECONDS}` },
    });
  },
};
