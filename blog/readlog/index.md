---
title: Readlog
emoji: 🧑🏻‍🏫
layout: base
---

##211219
- https://www.hackerfactor.com/blog/index.php?/archives/895-Connecting-the-iDOTs.html
  - TIL that companies can have custom headers and use it track stuff.
- [https://training.kalzumeus.com/newsletters/archive/do-not-end-the-week-with-nothing](https://training.kalzumeus.com/newsletters/archive/do-not-end-the-week-with-nothing)
  - Rered this, Incredible stuff about why I am doing this stuff

##211218

- [Mounting and Unmounting file system](https://docs.oracle.com/cd/E19455-01/805-7228/6j6q7ueup/index.html) 
  - Basically new files can be mounted and unmounted based on the reuqirements.
  - There is a `/etc/mnttab` file that keeps track fo the file system
- [How signal does end-to-end encrypted group video calls ](https://signal.org/blog/how-to-build-encrypted-group-calls/)
  - Signal engineering is pretty good. 
  - the article goes into detail on how they handle key rotations on the fly and how signal makes sure that even the media forwarding servers that optimise content delivery are not able to view the data in calls.
  - It's pretty good.
  

## 211216
- glupteba botnetwork litigation by google
  - Here's the technical write up [https://blog.google/threat-analysis-group/disrupting-glupteba-operation/](https://blog.google/threat-analysis-group/disrupting-glupteba-operation/)
  - Here's their legal write up [https://blog.google/technology/safety-security/new-action-combat-cyber-crime/](https://blog.google/technology/safety-security/new-action-combat-cyber-crime/)
  - Here's their litigation doc [https://storage.googleapis.com/gweb-uniblog-publish-prod/documents/1_Complaint.pdf](https://storage.googleapis.com/gweb-uniblog-publish-prod/documents/1_Complaint.pdf)
  - Bottomline: Somebody's using the blockchain as a resiliency platform to host botnet. So, when some authority removes the botnet. the botnet never goes away because it lives in the blockchain. Interesting and a more realistic use case for blockchain, I've seen so far
  
- [Bringing bounce and elastic easing to CSS \[Youtube\]](https://youtu.be/8FuafvJLDpM)
  - An interesting take on how an inside of a spec creation looks.
  - The guys discuss about how to create a bounce and elastic easing. using bezier curves and why there can't be more than one output per line and how they solved that problem and how it made it difficult to do spring effect and how that was solved.

## 211212

- Was reading (and writing!!!) about Docker and its internals which can be found [here](https://github.com/suriya-ganesh/docker_learn)
- [https://lwn.net/Articles/105375/](https://lwn.net/Articles/105375/)
  - Linus Torvalds article on management Torvalds, is quite the good dark comic writer.
- [https://www.kj7nzl.net/blog/sending-sms-messages-through-iss/](https://www.kj7nzl.net/blog/sending-sms-messages-through-iss/)
  - Sending SMS through the ISS.
  - People really are inventive.
  
