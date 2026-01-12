---
emoji: 🖥️
title: Unix
description: Unix gets quite worrisome really fast
date: 2024-08-19
layout: base
tags: ["tech"]
---



If you are on a unix-like environment, ports < 1024 (like 80) will require superuser privileges.

## Disk mounting and unmounting

```shell
sudo mount -o discard,defaults <diskid> <dir>
```

you can get the disk id by

```shell
ls -l /dev/disk/by-id
```

Checking disk usage

```shell
df
```

## size of sum of files in directory

```shell
du -bch <dirname>
```

## Checking the OS

```shell
lsb_release -a
````

or
```shell
cat etc/os-release
```


### Sudo issues

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
This is just icing on the cake for future use. As, I still am unable to find the default password.

Then, run

```shell
usermod -aG sudo ubuntu
```
This provides super user privileges to ubuntu.


### Linux Screen

I've run too many processes on a screen

list screen 
```shell
screen -ls
```

connect to screen 
```shell
screen -r <id>
```

remove screen 
```shell
screen -S <id> -X quit 
```

Scroll, `ctrl+A` then `esc` and scroll

detach, `ctrl+A,D`


