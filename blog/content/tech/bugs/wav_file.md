---
emoji: 🥴
title: wav file shenanigans
description: I go around fixing problems with wav files. 
date: 2024-03-19
layout: base
tags: ["tech", "programming"]
---

Reading input from users is difficult.
I faced this issue with 

Python's default `wave` library throws this error on specific wave file.

```shell
wave.Error: unknown format: 65534
```
This sucks because now, untrusted wav files can just crash the code.
In this case, it is better to utilize Soundfile, which is more robust and is able to 
I also uploaded this as a [pip installable package](https://pypi.org/project/transform-wav/).

