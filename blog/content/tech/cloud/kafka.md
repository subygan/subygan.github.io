---
emoji: ▓ 
title: Kafka
description: Reading kafka documentation
date: 2023-04-03
layout: base
---

## Apache kafka
__event streaming platform__ 

- _Events?_ - incident of change

### Kafka and Events - Key/value pairs

based on __Distributed commit log__

kafka represents everything in memory in bytes and data is serialised by the language SDK.

domain objects are representation of datastructures present in the screen

_Values_ are typically serialised representation of a domain object

_Keys_ can also be complex domain objects, but are often _primitive data types_ 


### Kafka Topics
A topic is like a table in an RDB. Topics can be used to hold different kinds of events.
A topic is a __log of events__. They are _append only_. Events in the logs are immutable. its very difficult to make something "unhappen". 
Logs are fundamentally durable things. Traditional enterprise messaging systems have topics and queues, buffering between source and destination
Since Kafka topics are logs, there is nothing inherently temporary about the data in them. Every topic can be configured to expire or retain indefinitely.

### kafka partitioning

To achieve horizontal scalability, kafka can run in multiple nodes while replicating.

partitioning, takes a single topic log (imagine table) and breaks it into multiple logs, each of which can live on a separate node in the kafka cluster. This enables us to split the processing across many nodes
These partitions are represeneted as keys
if a message has no key, all messages will be distributed round-robin among all the topic's partitions.

### Kafka and file system

Kafka is hyper optimised for sequential read of messages.

The "Sequential" part is crucial as it lets as reduce a lot of architecture complexity.
In a typical B-Tree you can expect these operations to have O(log N). But, in the case of Kafka only one is enough because kafka manages an append only log, which means read, write and update are all O(1)
This relative ease of message management also enables kafka to maintain messages for longer periods than a typical message queue

### Reduced Byte copying

Typically, Data is read from input and then transformed and, pushed to output.

Kafka uses few optimizations to overcome this.
- all consumers, producers, clients and servers utilize the same message format, so that there is reduced byte processing.
- the `sendfile` syscall is utilized, so that data does reaches the userspace and gets handled by the kernel.
- batching messages sent from server to client, so that data is packed efficiently per network call and there are no wasted bytes


### Kafka Consumer design
The consumer polls in batchs


Kafka used to have zookeeper now, it utilizes a RAFT based consensus mechanism after the KIP-500 update.
### Resources

- [A Gentle introduction to Kafka](https://www.gentlydownthe.stream/)