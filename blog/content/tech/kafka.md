---
emoji: ▓ 
title: Kafka
description: Reading kafka documentation
date: 2023-04-3, Mon, 20:51
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
