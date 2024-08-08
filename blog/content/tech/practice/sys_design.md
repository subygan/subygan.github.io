---
emoji: 👨🏼‍🎨 
title: System Design
description: notes while learning system design
date: 2023-04-3, Mon, 19:42
layout: base
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

## CDN
CDN is a network of geographically dispersed servers used to deliver static content. CDN servers can store the same static asset in multiple locations and return based on proximity to the user.

Static assets are cached and looked up in the edge servers, if not found then the main server is queried and the result, cached.

All the problems a cache faces is also faced here. Cache invalidation, Consistency and eviction policy

## Stateless web tier

Having a state tightly coupled with the application makes it harder to horizontally scale. To make it horizontally scalable, we need to isolate the data from the application layer, using a NoSQL or RDBMS databses.

NoSQL databases are easier to scale across multiple machines.

## Data centers

### request routing
- __GeoDNS__ is used to resolve IP addresses based on the location of a user
This is useful to serve the requests of the user fast and on the edge
- Get __routable address block__ and advertise on BGP4 to route traffic to the nearest server 
- Have the client ping all servers and figure out the fastest one and use it.


## Message queue

A message queue acts as a sequential buffer between producer and consumer.
This helps in decoupling and asynchronising tasks between both components, So that the producer can free up compute to take care of other requests

## Logging metrics, automation

logging helps traceback system faults and errors. These error logs are at server level or use tools to aggregate them to a centralized service for easy search and viewing.

Automated testing for errors should be increased, as the system gets complex.

## Database scaling,

## Vertical scaling
Increasing the capacity of the server helps us, in serving more requests than what was required.
Greater risk of __single point of failure__ 

## Horizontal scaling/sharding
Horizontal scaling is when multiple servers are able to operate on the data, by distributing data among themselves. 

When considering sharding, selecting the right sharding key is very important as the key should ensure that, the data gets distributed between the nodes uniformly

### Resharding data:
When we outgrow a single shard, a database can be resharded into even more fragments. But, this could increase query time.

### Celebrity/hotspot key problem
if a multiple frequently used/updated data is sent to the same shard, that specific could become a hotspot for traffic and become a bottleneck

### Join and de-normalization
Making joins across tables becomes harder as we shard the data more.

## Estimation

progression:

1KB => 1MB => 1GB => 1TB => 1PB


2<sup>10</sup> => 1 KB
2<sup>20</sup> => 1 MB
2<sup>30</sup> => 1 GB
2<sup>40</sup> => 1 TB
2<sup>50</sup> => 1 PB

L1 cache reference => 0.5 ns
L2 cache reference => 7 ns
Branch mispredict => 5 ns
Mutex lock/unlock  => 100 ns
Main memory reference => 100 ns


## Questions to ask

- If Designing db
  - bytes per record ?
  - number of Reads per second, number of writes per second ?
  - Delay time ?
  - Consistency model?
- Designing a service?
  - max QPS?
  - Availability regions?
- Media?
  - Load time?
  - CDN cost?


## Rate limiter
used to limit how many requests are allowed per IP, api token, user, etc...


Where to put the rate limiter? alongside the application? in the load  balancer?
return _429_ too many requests 

### Available algorithms:
- __Token bucket__, have an in memory structure per user/token/IP that counts down, if becomes 0 reject else, count down and allow. For every minute/second/hour update all structures to their maximum value.
  - Updating all structure might be cheap for small number of users. But, as the number of users increase, updating for all users would be very costly and slow.
- __Leaking bucket__, Requests are put into a fixed size queue. And for every interval requests are pulled and processed.
  - Might not work for requests that move slow.
- __Fixed window counter__, there are tokens for predefined window sizes where we count every request and then count up and drop everything that crosses the limit.
  - problem happens when requests come out on the edges. eg. in the window between 500ms of the previous time window and 500 ms of the current time window. a burst of 3 + 3 requests could end up 6 requests in that 1s. Which might not be reliable, for some use cases.
- __Sliding window log__, Time stamps are stored in memory for every request by a user. When a new request comes in, timestamp older than current window are thrown away while the other requests are kept. if the count between these, two timestamps is more than the threshold request is rejected else accepted. _redis sorted sets_ can be used to store data 
  - Too much memory consumption and is wasted
- __Sliding window counter__, 
  - This, takes the fixed window log and then adds a layer of calculation, where we do the formula 
    ```shell
    req in current window + %age overlap * req in prev window
    ```
  - this is pretty smart, as it interpolates from already available data
  - might not work for strict look-back windows.

### Rate limiter in Distributed environment.

- __Race conditions_
  - Use mutexes to increment values. 
  - Use `sorted set` like data structures in redis, which removes rate limiting. while also moving data storage to a different source.
- __Synchronization issue__
  - web-tier is stateless, requests from same origin could be directed to the same servers


### Scaling Websockets to millions of conections

- Heartbeat
- Requirement for fallback, http long polling
  - i.e. the client makes a request and the server for a long while

Vertical Scaling has limits + single point of failure. Updates needs to break the connection

## Consistent Hashing



## Definitions

- __GeoDNS__, routes all requests to the closest
- __BGP4__, Border Gateway Protocol 4  is an internet protocol that is able to store and share reachability information with others in the Autonomous System.
- __Token Bucket__, rate limiting algorithm by having counters and refreshing them in intervals
- __leaking bucket__, rate limiting algorithm by pushing everything to a `bounded queue` and batch processing per interval.
- __sliding window log__, rate limiting algorithm, where we store every request within the permitted window and count everything within before allowing requests to pass through.
