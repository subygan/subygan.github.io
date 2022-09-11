---
layout: base
type: page
emoji:  💂🏻‍♂️
title: Twiddling with Wireguard
description: notes while tinkering with Wireguard
date: 2021-07-06 22:15:00
---

### Quirks:

- Wireguard is a "Transmission security" solution. Not an endpoint security solution. i.e. No password based auth or other gimmicks. It protects data between two peers, And it does it good. Everything else is left to the clients as implementation details. This is why solutions like tailscale and others are coming up as a layer on top of wireguard.

### Resources:

- [https://graspingtech.com/self-host-vpn-aws-lightsail/](https://graspingtech.com/self-host-vpn-aws-lightsail/)
- [https://serverfault.com/questions/948816/wireguard-user-authentication](https://serverfault.com/questions/948816/wireguard-user-authentication)

