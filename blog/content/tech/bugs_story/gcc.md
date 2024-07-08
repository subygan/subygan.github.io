---
emoji: 🙃
title: gccissues
description: Making gcc work properly
date: 2024-07-8
layout: base
---

A simple way to include all available libraries in cpp in most OSs is to just add `#include <bits/stdc++.h>`. 
This is generall good practice as it includes all the libraries and increases the compilation time.

I received an error saying this file was not found.
I basically had to create `bits\stdc++.h` file at `\usr\local\include` and then it works