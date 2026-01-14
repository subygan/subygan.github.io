---
layout: base
emoji:  ☁
title: local tunnels with cloudflare
description: notes while tinkering with ruby
date: 2021-07-06 22:15:00
tags: ["tech", "programming"]
---


instantly being able to spin up a tunnel with https in my local machine is useful in a lot of cases

### resources
 - [https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/)

There is a `key.json` file + config.yaml file. where all the routing details are stored.

these are located under `~/.cloudflare/`

_skip caching_

go to page rules
and add a page rule to `cache level: Bypass`
https://community.cloudflare.com/t/unsolicited-utomatic-caching-via-argo-tunnels-at-cf-edge/308615

### downsides

- js is cached making it harder to do js development. (stale: 25Jul2022, use page rules)