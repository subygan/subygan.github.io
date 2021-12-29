---
layout: base
type: page
emoji: 
title: 
description: 
date: yyyy-mm-dd 22:15:00
---

When using aws a lot of times its annoying to type `sudo` for all commands. instead it is much simpler to just grant super user privileges to the ubuntu user only.

in the ubuntu shell do the following
```shell
sudo su -
```

this should switch to a different type of shell. Now, you are in the root user shell.

from there, run 

```shell
passwd ubuntu
```

This should prompt you to set a new username password
This is just icing on the cake for future use. As, I still am unable to find the default password anywhere.

Then, run

```shell
usermod -aG sudo ubuntu
```
This provides super user privileges to ubuntu.