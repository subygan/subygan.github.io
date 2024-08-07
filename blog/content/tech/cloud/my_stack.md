---
emoji: 🥞
title: My Stack
description: How I deploy personal and Hobby apps.
date: 2024-07-15
layout: base
---

I used to deploy everything in an ec2 instance with docker-compose and nginx. Keeps it clean to apply small updates and also take backups. Where I'll run different postgres containers for different containers, with some volume mapping and a backup container that triggers a backup push.

But when running stuff these many layers above the OS, Things kinda bloat up and the server gets fairly costly (for me). A lot of these were one off apps like a bookmarker, blog etc. These services receive maybe 1 request per hour and not much.

I've wanted to move to a serverless system, because with these services that I don't expect to "scale" per se, it would be way way cheaper. 

## History (circa 2020 - 2023)

### AWS Lambda

Back in 2020 when I tried this, the cold start was a non-starter for me. and I don't remember lambda having container support as well, which was a bummer because now I will have to de-containerize my services. Which is more painful than containerizing them in the first place.

Plus when you're only receiving a couple dozen requests per day, it is quite impossible to keep the lambda warm.

### Cloudflare Workers

I liked the idea behind cloudflare workers very much, even the eventually consistent database was very alluring. But, Javascript (at the time) was a non-starter for me, because I burned myself very recently back then with a project and got stuck in the callback hell. I didn't want to go back there.

### Zappa

Zappa period was quite interesting because, they promise "serverless" from django (which was 40% of my services). Now, I don't have to manage lambdas myself, which I hated. But, I still have to manage the database and the server. Which is not what I wanted.

I spent a good couple of weekends tinkering with zappa, figuring out a way to do the database serverless as well.
For example, I mounted an S3 bucket as a file system so that it can be written on. But then faced a lot of file syncing and lost data problems. as well as slow startups because data is being constantly being pulled from S3.

without a simple solution for the database, zappa did not make sense to me


## Current Stack (circa 2023)

I currently deploy all my services in fly.io. Their service is quite magical, it rewrites your dockerfile into a firecracker VM and runs it super cheap. at the lower end per service, I get like $ 1 per month in bill. 

But then, the database was still a problem I still did not want to maintain a database. I wanted a serverless database.

Litestream by the same people who made fly.io was a good solution. Because, it streams the DB WAL to S3 and gives point in time recovery when the server is bought down with under 1 sec latency. It's been a setup that's been very solid for the past few months. It's incredible to be able to just deploy and forget about the hassle of maintaining a server, volumes, cost etc. I feel like I have so much bandwidth, its incredible.

Best. Stack. Ever.
