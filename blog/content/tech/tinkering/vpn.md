---
emoji:  💂🏻‍♂️
title: Searching for a self-hosted VPN
description: I'm trying to find a self-hosted VPN solution that is able to maintain an ACL. 
date: 2021-07-06 22:15:00
---

## Goals:

- Find a VPN solution that would be able to maintain an ACL.
- No licensing solutions


OpenVPN - Not Truly self-hosted, in the sense that you will have to pay for the software in the range of $7 per user. Even if you self host it

Wireguard - only transmission security, no endpoint security.

### Quirks:

- Wireguard is a "Transmission security" solution. Not an endpoint security solution. i.e. No password based auth or other gimmicks. It protects data between two peers, And it does it good. Everything else is left to the clients as implementation details. This is why solutions like tailscale and others are coming up as a layer on top of wireguard.

### Resources:

- [https://graspingtech.com/self-host-vpn-aws-lightsail/](https://graspingtech.com/self-host-vpn-aws-lightsail/)
- [https://serverfault.com/questions/948816/wireguard-user-authentication](https://serverfault.com/questions/948816/wireguard-user-authentication)
