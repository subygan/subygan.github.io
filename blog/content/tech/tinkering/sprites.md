---
emoji: 👾
title: sprites.dev  
description: Getting sprites.dev to work
date: 2024-07-11
layout: base
tags: ["tech", "programming"]
---

I like to have a standard work environment that I can have multiple zellij is important, installing it with,

`cargo install zellij`

i really appreciate that this ships with cargo.


ended up in an out of space error which I fixed by mounting the temporary directory. this was because the tmp directory had too little space allocated.

```
mkdir ~/tmp-large

sudo mount --bind /home/sprite/tmp-large /tmp
```

Then connect to it with 

```
zellij a -c session-name
```

~~
then install docker with 

```
 curl -fsSL https://get.docker.com -o get-docker.sh
 sudo sh get-docker.sh
```

since this is a firecracker VM sprites does not ship with systemd, which means, I  need to run the docker daemon in a separate tab (zellij is coming in handy already) for docker commands to work.
~~


After a bunch of trial and errors I learnt that docker is not really the ideal workflow. as docker-in-docker situation is quite difficult to manage


create a new ssh key (for private repos)


```
ssh-keygen
```


add the key to github for later use.


Then create a checkpoint with


```
sprite checkpoint create -s <name>
```


I wanted to work with the files from my local, seems like i'll have to proxy a mount.


the docker inside docker container situation can definitely get very wonky. which was why I couldn't run my whole cluster inside the sprite.

I'm still on the lookout for the ideal setup.