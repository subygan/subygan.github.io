---
emoji: 🏃🏻‍♂️
title: doing performance work?
description: keep this in mind
date: 2026-02-15
layout: base
tags: ["learning","software", "performance"]
---


# make a release build!!!!



so many times, when doing performance profiling, I've used the debug build and profiled it, because usually there is the DWARF debugging information. making it easy/fast to build a binary. but the problem with it that, there are ton of developer friendly optimizations that happens, heap layout will be unoptimized, link time optimization is not there

but recently I was working with an encryption library and noticed that the performance was incredibly slow, to the point where it felt intuitively wrong. an operation that should take ~8 seconds in an SSD was taking 1 minute because of the encryption library. it seems like encryption libraries usually use a lot more compile time optimizations than usual. hence the 20x difference in performance. 

