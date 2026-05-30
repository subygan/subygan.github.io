---
emoji: 🗳️
title: binaries and postgres
description: Can you just store binaries in postgres?
date: 2026-05-18
layout: base
tags: ["tech", "programming"]
---

Postgres is awesome, but can You get away with it being a filesystem or stash space for your application. here are some calculations I did.


there are a few types, depending on your application,

- `bytea` (byte Array) - basically a dumb byte array. good for stash once and forget. updates are tricky because you'd have to read the whole thing and update, leading to write amplification. size limit of 1GB.
- `Binary Large Objects` (BLOB) - can stream data to the same row. basically cheap append only binary. size limit of 1GB.
- `JSONB` - can store JSON text in a custom binary format, allowing for quick key look up over the binary.


## a note on TOAST

postgres default page size is 8KB. a single table tuple cannot span multiple pages in postgres.

when a field exceeds 2KB, Postgres offloads the data to TOAST (The Oversized-Attribute Storage Technique)

There is a separate TOAST table where postgres stores this data automatically.

## Benefits
- immediate consistency of data.
- durability of the data being stored immediately in a database
- transactional guarantee and atomicity for arbitrary bites.

## Issues
- backups become complex.
- Failover and recovery takes too long.
- DB dump take longer (because of the large database size).
- Difficult to handle exponential scaling.
- In managed services, cost grows massively. (because typically they're charge per GB stored)


the operational complexity is a little too high in my opinion even though immediately consistent