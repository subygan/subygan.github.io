---
emoji: 🧮
title: the genius who never learns
description: and why it matters
image: danaides.jpg
imageFull: true
imageCaption: the Danaïdes, condemned to fill a vessel that always leaks — John William Waterhouse, 1903
date: 2026-07-20
layout: base
tags: [ml, agents, continual-learning, rl]
---

an agent that learns and optimizes will outperform a frozen 1.8 trillion parameter model.

i'm not saying a 7B model is smarter than a frontier model. on a zero-context task the big models win. what i'm saying is that the moment you fix a task, a customer issue, a codebase, a distribution of tickets, and you let one system accumulate the corrections while the other one wakes up with amnesia every morning, the one that accumulates wins. and most valuable work is a fixed task with a customer and a distribution of tickets.

the frozen model has read the whole internet once. the learning agent gets to read _your_ problem a thousand times and keep the parts that scored.


## the model is static but learning is not

the interesting thing about 2026 is that the people building the biggest models and the people most skeptical of them have converged on the same complaint. the model is static.

Dwarkesh has been the clearest on this. his whole "why AGI isn't around the corner" argument is that, these models cannot learn on the job.

> The reason humans are so useful is not mainly their raw intelligence. It's their ability to build up context, interrogate their own failures, and pick up small improvements and efficiencies as they practice a task. [^dwarkesh]

and the sharp end of it:

> The lack of continual learning is a huge huge problem. [...] You're stuck with the abilities you get out of the box.

it's the Memento thing. every conversation the model is brilliant for a few hours and then someone wipes the tape. Dwarkesh puts it exactly this way about working with one, "this whole subtle understanding of my preferences and style is lost by the end of the session." you cannot build up a colleague this way. you can only rent a very smart stranger, over and over, and re-explain your codebase to the stranger each time.


worth noting he doesn't think this is unsolvable, just unsolved. 


Satya Nadella came at it from the other side of the table. his important point was that the model _is_ learning, from you, constantly, and the learning is the asset. but it is just not owned by you. model builders are owning. it.

> Models learn from "exhaust," the prompts people write, the tools agents use, and especially the corrections people make when the model is wrong. Every correction is distilled into institutional know-how. It's the kind of knowledge a competitor could never buy, and the kind that leaks almost imperceptibly: trace by trace, correction by correction, eval by eval. [^nadella]

he calls this the "reverse information paradox," you pay for the intelligence twice, once with money and again with the proprietary knowledge you have to reveal to make it useful. the corrections you feed the model are training signal, and right now that signal accrues to whoever owns the infrastructure, not to you. "In the cloud era, enterprises accumulated data. In the AI era, they accumulate learning.". from the engineering side, the corrections are the reward signal. he draws the ownership line where i draw the capability line, but they're the same.

Karpathy has a similar angle. the model has working memory (the context window) and it has long term memory (the weights), and there is _nothing in between_. no mechanism takes what happened in the context today and folds it into the weights tomorrow. humans have that mechanism. we call part of it sleep. [^karpathy]


Sutton also has been saying the unfashionable version of this for forty years and got to say i-told-you-so on Dwarkesh's own podcast. real intelligence learns from experience. from interacting with a world, getting a signal back, and updating. imitation of internet text is not that. it's a very good compression of what other people already figured out, which is a different thing than figuring things out yourself. the "era of experience" he and Silver wrote about is that the next gains come from interaction, not from more static human data. [^sutton]


and Ilya Sutskever, who left OpenAI and bet a whole company on the idea that scaling alone doesn't get you there. he keeps saying the quiet part in the plainest possible way.

> Scaling the current thing will keep leading to improvements. In particular, it won't stall. But something important will continue to be missing. [^ilya]

the thing that is missing, is a model that keeps learning after training stops. superintelligence as a fast continual learner, not a finished oracle.


i think they're right about the diagnosis. i think the "so it won't work" conclusion some of them draw is wrong, or at least early. there are labs and companies attacking different layers of the stack from memory layers, continuous finetuning pipelines etc. you need improvement at each layer to reach a truly continuous learning machinery.


## why static hurts more than it looks

i wrote a while back about how coding agents get you 70% of the way and cannot do the last 30% without a human. [^gptcode] i still think that's true. but i undersold _why_.

part of the last 30% is that the model never learns from the correction. you catch it inventing an API, you fix it, you catch it again next session inventing the same API. the human in the loop isn't just doing the hard 30%, the human is being used as the model's long term memory. you are the consolidation mechanism. you are essentially the sleep the model doesn't get. no amount of `CLAUDE.md` files and a million symlinks to the same file are going to solve this problem.


in almost all the successful agent rewrites in the last 6 months, the thing that made them work was that there was a perfect oracle. [^agents] a test suite that says correct or wrong with no argument. "there is no way for the agents to slop. there is only one correct solution everything else can be discarded." that's the whole trick. the agent doesn't need to learn on the job because the job comes with a grader that never lets it drift.


but unfortunately most work does not come with that grader. and that is exactly where a system that learns from its own history starts to matter, because the history _is_ the missing grader. the tickets you closed, the PRs that got merged, the outputs the customer accepted, that's a reward signal sitting in your logs that nobody is training on.


## so, the bet

back in 2023 i wrote that custom data used to finetune models is the biggest moat for LLM products, and i mostly wrote it as a data point. [^intro] i want to restate it as a prediction, because continual learning is what turns that moat from a one-time finetune into a compounding one. most of software engineering is now doing error correction on the model output, so that it does not get too off the rails.

the frozen 1.8T model is the smartest stranger you'll ever meet. the learning agent is a mediocre colleague who has worked at your company for a year and remembers every mistake. i know which one i'd staff on the actual work.

i've been building the pieces of this at work and the gap between "in the logs" and "in the weights" is the whole game right now. if you're running this loop in production, the nightly-adapter thing, the self-edit thing, any of it, and you've watched what it does to your evals a month later, i genuinely want to hear it. 

reach out to me any time at s@daseinlabs.ai

[^dwarkesh]: Dwarkesh Patel, ["why i don't think AGI is right around the corner"](https://www.dwarkesh.com/p/timelines-june-2025) (Jun 2025). the continual learning section is the one you want, quotes above are verbatim from it.
[^nadella]: Satya Nadella, ["The Reverse Information Paradox"](https://x.com/satyanadella/article/2076323181154230284) (X Article, Jul 12 2026). quotes verbatim, read from the article directly. the "hill climbing machine" / continuous-learning-loop framing at the end of his piece is basically my thesis in enterprise-speak.
[^karpathy]: Andrej Karpathy on the missing consolidation step (working memory vs weights, the "cognitive core").
[^sutton]: David Silver & Richard Sutton, ["The Era of Experience"](https://storage.googleapis.com/deepmind-media/Era-of-Experience%20/The%20Era%20of%20Experience%20Paper.pdf) (2024), and Sutton's Dwarkesh Patel interview. the paraphrase above is his position, not a direct quote. the bitter lesson still applies to us.
[^ilya]: Ilya Sutskever, [tweet, Nov 28 2025](https://x.com/ilyasut/status/2081732293161582930) (clarifying his Dwarkesh podcast appearance).  the NVIDIA 10x-compute deal is [SSI's Jul 27 2026 announcement](https://ssi.inc).
[^gptcode]: [software engineering agents work. but only if you do](/general/gpt-code) — the 70/30 post.
[^agents]: [(mostly) successful cases of software rewrites with agents in 2026](/essays/agents) — the byte-accurate-oracle argument.
[^intro]: [intro to llms](/tech/ML/intro_to_llm) — the prompt/RAG/finetune moat ladder, and Karpathy's open question i left hanging: what does self-improvement look like for LLMs.
