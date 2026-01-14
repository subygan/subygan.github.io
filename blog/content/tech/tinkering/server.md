---
layout: base
emoji: 
title: server setup
description: I setup machines for one off coding tasks or ML training often and some stuff just needs to be setup that Ubuntu etc don't come with what I need
date: 2025-03-07
tags: ["tech", "programming"]
---




### oh my zsh

- oh-my-zsh has hands down been a godsend for me.

for that though we first need to install `zsh`

```shell
apt install zsh

# change shell
chsh -s $(which zsh)
```

then install oh-my-zsh using

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```


### uv

UV is hands down the best thing to happen for the python ecosystem.
I'm much less anxious when I work with python projects now.

```shell
curl -LsSf https://astral.sh/uv/install.sh | sh
```


### docker

I've written briefly about docker [here](/tech/practice/docker/)

### nginx

pretty much in any situation I like having port forwarding in my site

```shell
sudo apt update
sudo apt install nginx
```
