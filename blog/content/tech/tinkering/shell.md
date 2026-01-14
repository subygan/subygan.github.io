---
emoji: 🐚
title: shell hacks
description: Hacky tools and ways to do things
date: 2024-07-23
layout: base
tags: ["tech", "programming"]
---

## number of lines in a file

```sh
wc -l file.txt
```

## split file into multiple files

```sh
split -l 1000 file.txt
```

## append two files into one

```sh
cat file1.txt file2.txt > file3.txt
```

## find pid of port

```sh
sudo lsof -i :<portnumber>
```