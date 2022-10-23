---
title: Designing Data intensive applications notes
emoji: ⚜️
layout: base
description: My notes on reading, designing data intensive applications
date: 2022-10-23
---

## Ch-1: Reliable, Scalable and maintainable applications

- reliability, The system should continue to work __correctly__ even in the face of adversity (hw, sw or human).
  - __faults__ (either synthetic or natural) are when only part of the system misbehaves, If the whole system goes down then it is a __failure__.
  - Fault tolerance machinery can be tested and kept upto date by voluntarily turning of part of the system to see how the system fares in times of faults.
  - __Hardware Faults__ (HDD crash, Faulty RAM, blackout, etc)
    - HDDs have a Mean Time To Failure (MTTF)  of about 10 to 50 years => on a cluster of 10,000 disks, one disk might die per day.
    - This can be overcome with have a RAID setup, dual power supplies and hot swappable CPUs
  - __Software Errors__ Weakly correlated failures across systems.
    - Software bug in linux kernel on June 30, 2012 due to a leap second
    - Runaway processes using up CPU, memory and disk
    - These bugs __could lie dormant for a long time__ without any issues and have the potential to bring the whole system down.
  - __Human Errors__ Any system designed to be used/operated by humans should have a high degree of flexibility because __humans are known to be unreliable__ 
    - well-designed abstractions, APIs, and admin interfaces making it easier to access "the right way" and discouuraging the wrong way
    - Sandbox environments for people to play with
    - Test thoroughly at all levels, from unit tests, integrations tests and manual tests.
    - Quick and easy recovery in case of a failure 
  
- Scalability, As the system grows (data volume, traffic volume or complexity), system should be able to handle it.
  - __What is load ?__ Load can be described in many ways. the __load parameters__ are dependent on the architecture of the system. it can be, __requests per second, read write ratio in the DB, sinultaneously active members in a chat room, or something else.__ 
    - eg. Twitter, broadly has two ops _post tweet_ user can publish a new message to their followers (12k req/s at peak), _Home timeline_ A user can view tweets posted by the people they follow.
      - 12K req/s is easy to handle. But, the problem comes due to fan-out, where each user follows many people and each one of them follow a lot more.
      - There are broadly two approaches 
        1. When a user requests their home timeline, look up all the people they follow, find all the tweets for each of those user and merge them by time. 
        2. Maintain a cache for each user's home timeline, like a mailbox of tweets for each recipient. When a user tweets, lookup all their followers and insert it in their timelines. While this approach offloads a lot of computing ahead of time. Some times there might be requirements where a lot of users have a lot of followers in those cases the computation is just very high.
        3. In a hybrid approach twitter now marks users with significant followers and uses (1) for them and (2) for others
  - _What is performance?__ Once we've described the load, we can investigate what happens when the load increases. in online services it is responce time, in data processors it is throughput
    - 
- Maintainablility, System should be robust to change and be productively extensible