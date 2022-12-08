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

__GeoDNS__ is used to resolve IP addresses based on the location of a user
This is useful to serve the requests of the user fast and on the edge

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
