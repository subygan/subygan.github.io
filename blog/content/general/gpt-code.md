---
emoji: 🤖
title: Software Engineering agents work. But only if you do
description: When and where Agents work. Most importantly, How to work with them
date: 2025-09-13
layout: base
---

Every week there is a new agent that the twitter micro-cosmos gets fired up about. This week it was agent 3.
Which is apparently miles ahead of the competition and is able to plan and execute for up to 200 minutes.

I've ran claude code for >50 minutes with completely unusable code. Used Cascade (on windsurf) to build a service, while mostly focusing my attention on watching a movie, absolutely not looking at the code at all, which I also threw away after 5 hours. and sometimes used them marginally successful.

Without even running for 200 minutes, any of the agents from openai, claude, google, cursor etc. will definitely take people 70% of the way. but without a human looking at the code, these agents absolutely **cannot** solve the last 30% (at least for now).


The absolute worst way to use an agent is to give it a broad description and let it run for a few hours on a codebase. You're going to get a ton of outdated dependencies, code that doesn't run and most often doesn't even build. On top of this, agents skip authorization, implement stubs, invent APIs and tons of other creative privileges. All of which are wild layers of horrendous depending on your situation.

Agents are really good, when the scenario is specific. and you have in your head, what code you want written, what interfaces to use.
without that level of detail it's hard to evaluate the edits the agent is making. And, if you're working on a pre-existing codebase, you better understand what the code does.

a good process that I've seen work for me is.

- break the code into logical steps (with any reasonable codebase, The agent can't plan it correctly).  
- request the changes in steps, while also giving context of your bigger picture.
- Keep staging/committing successful edits.


The prompts end up being slightly longer than the code I would've written, but I like how Mitchell Hashimotto put it

> [my time is still zero sum having to type that out.](https://x.com/mitchellh/status/1963280782115615167)

I kinda agree, I could've typed that code out but it is still nice to get out of my chair when the clanker does what its supposed to.
