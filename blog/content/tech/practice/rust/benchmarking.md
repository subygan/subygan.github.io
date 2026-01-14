---
emoji: ⛓️
title: rust benchmarking
description: Benchmarking ecosystem in rust reallyyy sucks. Some notes from me
date: 2025-06-25
layout: base
tags: ["tech", "programming"]
---

## libraries


### [criterion.rs](https://github.com/bheisler/criterion.rs)

- Has really good defaults and seems to work out of the box.
- The ecosystem around criterion is really good. purely because criterion has been around for so long


### [rust iai](https://github.com/bheisler/iai)

Even though it is supported by a lot of ecosystem tools. It hasn't been in development for the past 4 years. and [bheisler](https://github.com/bheisler) is the creator of criterion, so even more reason to use criterion.


### [rust iai-callgrind](https://github.com/iai-callgrind/iai-callgrind?tab=readme-ov-file)

Callgrind does not support arm mac yet, despite being worked on for >2 years now.

[this issue](https://github.com/LouisBrunner/valgrind-macos/issues/56#issuecomment-1651811069) was quite interesting read about the efforts to providing arm support for valigrind



### [divan](https://github.com/nvzqz/divan)

Divan is an incredible project that has pretty good defaults as well. It is up and coming so not a lot of ecosystem tools and plugins to use


## services

There is need for services that are outside of these libraries themselves. To store the state of previous runs to make sure there are no performance regressions.

### codspeed

Codspeed primarily supports divan, but it also has very strong support for criterion.

### bencher