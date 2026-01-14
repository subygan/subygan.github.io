---
emoji: 🥘
title: zsh
description: I use zsh with oh-my-zsh heavily.
date: 2024-08-19
layout: base
tags: ["tech", "programming"]
---


## setting up new zsh with oh my zsh

firs installing zsh involves

```shell
brew install zsh
```

While I don't really trust and run randomly downloaded shell files. This one is quite painless.

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## typical packages:

- `git` 
- `zsh-autosuggestions` 
- `poetry` 
- `zsh-syntax-highlighting` 
- `command-time` 
- `poetry`

```shell
plugins=(git zsh-autosuggestions poetry zsh-syntax-highlighting command-time poetry)
```


## problems

New lines ending with a highlighted percentage
This happens when the terminal will have to handle a partial output.
In my case it was a remote connection in tty and I was facing this error.
can be removed by `unsetopt PROMPT_SP`

https://superuser.com/questions/645599/why-is-a-percent-sign-appearing-before-each-prompt-on-zsh-in-windows