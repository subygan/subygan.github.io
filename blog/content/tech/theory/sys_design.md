---
title: System Design notes
emoji: 👨🏼‍🎨
layout: base
description: Learning system design and adjacent notes
date: 2022-11-29
---
## Scaling to million users
- isolate, process and database
### DB scaling
- __Database replication__ Master(writes,updates), slave(reads) setup for databases helps scale reads in a database
  - When a master node goes down, a slave is selected and promoted to become the master\
### Process scaling
Scaling process nodes horizontally in a fan out fashion with a __load balancer__ in front, so that the requests can be distributed between servers. load balancers are able to keep track of the quality of the services. and make decisions on where to send which requests. 
- servers can also be __behind private IPs__ while the load balancer is behind a public IP. Enabling, better security.

###  Cache
- temporary storage area for quick access of data.
- Cache can be __present in tiers__ This means that, there is a single source of truth and multiple replicase. When a piece of data is stale or, not found in the cache, we query the original data source
- Cache invalidation and updation is a mammothian problem and needs care to prevent issues.
  - _Expiration policy_ is important to invalidate stale data. Without an expiration policy data remains, in memory or on disk forever without freeing up any space.
  - _Consistency_, Cache needs to reflect the ground reality of the data, not a mere shadow of it's past state. This is hard to attain and make.
  - _Eviction Policy_ Some form of eviction mechanism needs to be present, to make
### CDN
