---
emoji: 🤹🏻‍♂️
title: Performance Hints, notes
description: Jeff Dean, Sanjay Ghemawat
date: 2026-08-04
layout: base
tags: ["tech", "performance", "book"]
---


There's a [fantastic performance article](https://abseil.io/fast/hints.html) by the legendary Jeff Dean, Sanjay Ghemawat that covers the vast span of Performance optimizations that captures a good mental model for performance awareness.

Highly recommend reading the whole article. below noted were the broad themes that I was able to relate with and capture from my work in experience in the past.

The below table, even though it is dated is quite useful.


L1 cache reference                             0.5 ns
L2 cache reference                             3 ns
Branch mispredict                              5 ns
Mutex lock/unlock (uncontended)               15 ns
Main memory reference                         50 ns
Compress 1K bytes with Snappy              1,000 ns
Read 4KB from SSD                         20,000 ns
Round trip within same datacenter         50,000 ns
Read 1MB sequentially from memory         64,000 ns
Read 1MB over 100 Gbps network           100,000 ns
Read 1MB from SSD                      1,000,000 ns
Disk seek                              5,000,000 ns
Read 1MB sequentially from disk       10,000,000 ns
Send packet CA->Netherlands->CA      150,000,000 ns


## Measurement

I usually fallback to using brendan greg's flamecharts but, I think it is an awesome idea to start using,

- [microbenchmark](https://abseil.io/fast/75), oftentimes you're basically trying to cut through the profiler noise. I've done crazy hoop jumps to reduce noise in the flamecharts. but microbenchmark is the right way to test individual sections of the code. although, I wonder how it relates with the cache warm etc. eg. your code was complete fine because some code before was warming the L1 cache. but when run in isolation in a microbenchmark, newer bottlenecks are showing up that you weren't seeing before.
- [Allocation profile](https://gperftools.github.io/gperftools/heapprofile.html) is something that also makes sense to track, which I've never even considered. because Heap growth and maintenance is the place where you end up having a lot of bottlenecks.


## API considerations

- accomodate Bulk API from day 1. eventually you're going to need it, if not the number of API calls, allocations recalculations blow up. from creating the API boundary to be Bulk compatible and working backwards to the individual case, you can deliver better experience in general. 
- Pre-allocated/pre-computed arguments, during runtime if values can be computed ahead of time and passed around it is efficient to do so.


## Avoid unnecessary allocations + work

- Avoid copying when possible. use references. (rust `.copy()` that is a crutch that gets abused a lot)
- The compiler will find it difficult to reason after a few layers of abstraction, at which point, it might simpler to decompose the loop into simpler routines. but verify the binary before taking on these level of optimizations.
- Logging is where performance goes to die. Make sure logging is adequate and not noisy or too much in hot code paths.
-  Parallelize whenever possible and simplify things at a level where it is possible to parallelize at a later time. Synchronization, mutexes and thread contention are all things that you will have to consider.


