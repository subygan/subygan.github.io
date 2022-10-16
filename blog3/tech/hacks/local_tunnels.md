---
layout: base
type: page
emoji:  ☁
title: local tunnels
description: Making local tunnels
date: 2021-07-06 22:15:00
---


instantly being able to spin up a tunnel with https in my local machine is useful in a lot of cases

### Resources
 - [https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/)

There is a `key.json` file + config.yaml file. where all the routing details are stored.

these are located under `~/.cloudflare/`

_skip caching_

go to page rules
and add a page rule to `cache level: Bypass`
https://community.cloudflare.com/t/unsolicited-utomatic-caching-via-argo-tunnels-at-cf-edge/308615

### Downsides

- js is cached making it harder to do js development. (stale: 25Jul2022, use page rules)


### Web socket tunnel


