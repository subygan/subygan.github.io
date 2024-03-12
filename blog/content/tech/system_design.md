---
emoji: 🚛
title: System Design
description: System Design infromation that I come across
date: 2024-03-2
layout: base
---


### Scaling Websockets to millions of conections

- Heartbeat
- Requirement for fallback, http long polling
  - i.e. the client makes a request and the server for a long while 

Vertical Scaling has limits + single point of failure. Updates needs to break the connection