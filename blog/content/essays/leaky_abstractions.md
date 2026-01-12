---
emoji: 🪣
title: Leaky Abstractions, or How we Understand the world
description: metaphors, examples and analogies are how we understand the world. but do they (pardon the pun) hold water, under scrutiny? How much do you depend on them?
date: 2024-10-02
layout: base
tags: ["essay", "tech", "systems"]
---

Languages are a lossy communication framework. You meant one thing, but your friend understood something else. The same words don't mean the same thing even a few hundred miles apart, etc. It is wildly unfair to try and represent billions of neurons firing together, in sound waves only a few amplitudes higher or lower.

But language is how we fundamentally understand, operate, and orchestrate as a society. In search of clearer and clearer understanding, each subpopulation creates their own lingo to have a clearer view of the world. Which is why "Host" could mean different things to a Biologist, Computer Scientist or an MC.

We have achieved a level of operational complexity that, it is quite difficult to have a clear understanding of the world in its entirety. We all operate at our own layer of understanding, where with a lot of difficult we can get past the myopia and understand a few layers above or below us.

Each of these layers come with their own abstraction. These abstractions are representative of how that layer is operating but are not an exact representation. Because to understand the exact representation, I would have to go deeper and deeper into the layers which would take non trivial number of hours/days/years.

These abstractions are what we call "Leaky " meaning, they do lose some exactness but at the cost of somewhat representing it. It is an axiom of mine that all abstraction ends up being leaky, because when you represent the system as a whole, it stops being an abstraction and becomes a complete implementation of the system itself.

When developing software one is made intensely aware of it. Software engineering is typically creating smarter abstractions, built on top of other abstractions. 

Python 
↓ 
C++/C 
↓
Assembly language
↓ 
Machine code
↓
Operating System 
↓
Firmware/BIOS
↓ 
Hardware (CPU, memory, storage, etc.)

Despite each of these representations being not exactly representative of what lies underneath. They provide sufficient understanding to let us operate them.

Problem arises, when a problem is so specific that the leakiness starts hurting you.
This is the point when you realize you time spent twiddling with python itself might not justify, instead of directly implementing it. "going out of the box" so to say.

When utilizing an abstraction, framework, library or something else it is important to be aware of this tradeoff, because every abstraction has an edge case that is thorny enough to tear through at least on layer above or below it.

There is no abstraction that does not let you break it down. Every abstraction can be decomposed into their individual components even to the atomic level.

When in doubt, break it down. punch through the ceiling and understand whose shoulders you're standing on. Go and see how something is implemented in that library, break that hardware down to understand the mechanics, ask people to elaborate more about what they meant by that example what are the important parts, what are the non important parts. 

How big of a leak do you have in your abstractions? is a good question to hold in your mind
