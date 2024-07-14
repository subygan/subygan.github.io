---
emoji: 🦕
title: Git LFS
description: Working with Git LFS and other problems
date: 2024-07-11
layout: base
---


## Installing Git-lfs

MacOS:

```bash
brew install git-lfs
```

Linux:

```bash
curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash

sudo apt-get install git-lfs
```

## Working with lfs

LFS manages blobs by just storing the hash pointer of the file int the CVS and treating it as a blob of binary this is kept track in the `.gitattributes` file.



When you clone a repo with lfs content.
do
```bash
git lfs pull
```
to get the actual content. Else it'll be a text file with a pointer to the actual file


To add a new file to Git LFS, you need to first track it with Git, then tell Git LFS to manage it. Here's how you do that:

```bash
git lfs install
git lfs track "<filename>"
git add .gitattributes # Adding the .gitattributes file to the repo
git add <filename>
git commit -m "Add <filename> to Git LFS"
```


