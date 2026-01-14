---
layout: base
emoji: ♦️
title: installing jekyll for the first time and issues
description: Faced this issue when installing ruby for the first time.
date: 2021-12-21 22:15:00
tags: ["tech", "programming"]
---

I was trying to install jekyll in my local machine and faced this error

```shell
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/mkmf.rb:467:in `try_do': The compiler failed to generate an executable file. (RuntimeError)
You have to install development tools first.
```

this was fixed by running

```shell
sudo xcode-select -switch /
```

I checked the manpages It seems like this changes the xcode scope to global. and makes available all the tools and env variables.