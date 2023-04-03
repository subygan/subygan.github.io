---
title: Hugo notes
emoji: 🦡
layout: base
description: Working with hugo 
date: 2022-12-26
---

### making a nested map

`$m := dict (slice "n" "m" "new") "true"` creates a nested map with `m.n.p.new` returning "true"

### merging 2 maps

`$m = merge $m $m2` this merges two maps, keeping the last key active.