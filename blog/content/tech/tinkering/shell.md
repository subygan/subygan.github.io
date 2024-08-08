---
emoji: 🐚
title: Shell hacks
description: Hacky tools and ways to do things
date: 2024-07-23
layout: base
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