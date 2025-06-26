---
emoji: ⛓️
title: Rust Benchmarking
description: Benchmarking ecosystem in rust reallyyy sucks. Some notes from me
date: 2025-06-25
layout: base
---

## Libraries

### [Criterion.rs](https://github.com/bheisler/criterion.rs)

- Has really good defaults and seems to work out of the box.
- The ecosystem around criterion is really good. purely because criterion has been around for so long


### [Rust iai](https://github.com/bheisler/iai)

Even though it is supported by a lot of ecosystem tools. It hasn't been in development for the past 4 years. and [bheisler](https://github.com/bheisler) is the creator of criterion, so even more reason to use criterion.


### [Rust iai-callgrind](https://github.com/iai-callgrind/iai-callgrind?tab=readme-ov-file)

Callgrind does not support arm mac yet, despite being worked on for >2 years now.

[this issue](https://github.com/LouisBrunner/valgrind-macos/issues/56#issuecomment-1651811069) was quite interesting read about the efforts to providing arm support for valigrind



### [Divan](https://github.com/nvzqz/divan)

Divan is an incredible project that has pretty good defaults as well. It is up and coming so not a lot of ecosystem tools and plugins to use


## Services

There is need for services that are outside of these libraries themselves. To store the state of previous runs to make sure there are no performance regressions.

### Codspeed

### bencher