---
title: pocketbase
emoji: 📦
layout: base
description: Trying out pocketbase.
date: 2022-09-01 22:15:00
tags: ["tech", "programming"]
---

I've been looking for an alternative to firebase. Because OSS FTW!!

Pocketbase is an alternative with A bold claim.

But, it really does 2 things very well, AUTH APIs and CRUD APIs over DBs.

### pros:
- Is a single binary
- Uses sqlite3, which means the database is integrated with the app itself
- Written in go, but does not require CGO to integrate with sqlite3

### cons:
- Sqlite is only horizontally scalable.
- Feature set is limited.

