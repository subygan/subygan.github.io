---
emoji: ☁️
title: Cloud intro
description: a brief intro to cloud.
date: 2026-04-28
layout: base
tags: ["tech", "cloud"]
---

## What is the cloud ?

essentially a bunch of server running in a random datacenter.

![server rack](/assets/images/cloud-intro/rack.jpeg)


These racks and racks of servers can run cohesively together as one simple computer using the Internet. by communicating to each other.


These data center cost a lot to setup. So if someone wanted to just run a small computer till the end of time for $20. They can ask this huge computer to simulate a small computer within it, this is called a [Virtual Machine](https://www.reddit.com/r/virtualization/comments/1lak0rw/explain_like_im_5_how_do_virtual_machines_work/).


So basically any large computer (called a "host") can simulate many, smaller "machines".


creating one big computer and then simulating smaller computers within it, is more efficient because, you can deliver power very efficiently, you can keep the computers cool even more efficiently. making it 5 - 10 times more efficient than running a separate small computer. It is also cheaper, because big data center buyers can buy the physical components (like wires and chips) for bulk rates.


## AWS: 

Amazon Web Services (AWS), was the original inventor of the "cloud" idea.


They figured out that, since they already have paid for these large data centers for the Amazon ecommerce app. they can break this large data center into smaller units and rent them to people.


unbenknownst to themselves they created a trillion dollar industry of renting compute.


You can pretty much buy all kinds of computers for cheap. there are Compute only nodes (Called EC2) which can even deliver a computer with 3600 GB of RAM and 100 TB of storage.

__fun fact:__

because of how efficient and popular AWS is, they now store ~5 Zettabytes of data.

## GCP

Exactly the same as AWS. but owned by Google. Second biggest cloud.

## Azure: 

Exactly the same as AWS. but owned by Microsoft. Third biggest cloud.


## Docker:

since ~ 2007 (AWS was invented)

developing software changed. Now people don't have to build for each Operating system (linux, macos, windows, unix etc.) share it with the user. Instead somebody can build software for one operating system (usually linux) and let the user access it through the browser.


This is very similar to how software like, Rstudio, youtube, etc. are working today.


So basically everyone in a company is writing software that will be run in 1 operating system forever.


Sometimes, developing software can get tedious because the software that is being deployed in the sever might depend on a specific OS version or library version. all of this can get very very tedious to manage, when developing locally.


To solve this problem Docker was invented.

Basically,
docker is a small Virtual Machine that can run locally exactly as it would in the cloud. You can run a specific linux version, specific git version locally. without actually altering your local Operating System. You've isolated a whole operating system to be run anywhere, locally in a mac, or a windows or in a server.
