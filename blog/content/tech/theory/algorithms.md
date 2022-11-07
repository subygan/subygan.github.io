---
title: Algorithms
emoji: 🤖
layout: base
description: Algorithms in the wild 
date: 2022-11-06
---

### BLoom filters

Used to Determine whether a value is present in a list.
done by having a K sized binary array. And then turning true for the hash location of the current element.
Next time we want to search something we hash it search it in the bloom filter first. If it is false. then the value is definitely not present. But, hash collision is common and could result in scenarios where bloom filter says a value is present and it ends up being not present.

