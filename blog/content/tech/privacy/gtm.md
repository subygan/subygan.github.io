---
emoji: ⏎
title: cicumventing ad block
description: New ways of ad block being circumvented
date: 2023-04-22
layout: base
tags: ["tech", "privacy"]
---

using a DNS aliasing to circumvent ad blocking tools got me wondering about the feasibility, because theoretically it should be possible.

Turns out, there are multiple projects working on this, like save-analytics, and data-unlocker

And Google Tag Manager has this as a native feature since Jun-13,2022 It's called Server-Side-tagging.

This setup, basically spins up a proxy container/server, that can be used to shovel-in user data.

Google conveniently mentions this circumvention, in chapter-7 of their setup guide.

"It's a good idea to move your tracking into first-party context with your website(s). Work with your IT and DevOps people to update DNS zones accordingly."

Adblock extensions are having plans to use, the hash of the payload and other similar signals to filter out these. 

But it was still surprising to me that, there are projects and people passionate about the other end of spectrum, shoveling more data into google. 


