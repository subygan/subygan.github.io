---
title: Readlog
emoji: 🧑🏻‍🏫
layout: base
type: page
description: I try to write about stuff I find around the internet here
date: "now"
---

## 211221

- [There's no such thing as a tree](https://eukaryotewritesblog.com/2021/05/02/)
  - A pretty good primer on convergent evolution and such.
  - The axolotl metamorphosis on exposure to hormones is... pretty disturbing.
  - The axolotl metamorphosis on exposure to hormones is... pretty disturbing.
  
- for no Absolute reason Got curious of the growth of AdGrok Because, usually success stories are written with hindsight bias. [Here's the whole list](https://hn.algolia.com/?dateRange=all&page=0&prefix=true&query=adgrok&sort=byDate&type=story)
  - So they basically built a type of alternative, simpler frontend for google ads and sold it
  - Used the link bait from Antonio's blogs to drive traffic (he says so in a blog).
  - Sold to twitter.
  - But they seem to have had a pretty good product as well. a lot of good comments

- [Symlink \[wiki\]](https://en.wikipedia.org/wiki/Symbolic_link)
  - Symlink can map one folder with another. thereby linking them
  - Most linux operations can be made on both folders but. deleting the symlink does not delete the target. `mv` and `cp` works the same way
  - _Question: can symlink type thing be done between two files over an NFS?_
- [How Big is 2<sup>256</sup> 3B1B \[Video\]](https://www.youtube.com/watch?v=S9JGmA5_unY)
  - Its incredible how easy it is to forget, just how big some numbers are.
  - I guess the law of large numbers still applies.
- [RSS vs Atom](http://www.intertwingly.net/wiki/pie/Rss20AndAtom10Compared)
  - Pretty good points. 
  - It's interesting how protocols need to be non-private or copyrighted to usually work.
  - I think, Privatizing a protocol is very analogous to privatizing english or spanish. It just won't work. Languages and protocols need to be free and open for mass adoption. and without that the protocols.
  - Analogous thread in jekyll [https://github.com/jekyll/jekyll-feed/issues/2](https://github.com/jekyll/jekyll-feed/issues/2)

## 211220

- [AirBnb's journey into smoothening out ios build process.](https://medium.com/airbnb-engineering/designing-for-productivity-in-a-large-scale-ios-application-9376a430a0bf)
  - I didn't exactly understand half of what was said. I'll have relook later when I have a better understanding of stuff
  
- [Avoiding internet centralisation](https://mnot.github.io/avoiding-internet-centralization/draft-nottingham-avoiding-internet-centralization.html)
  - Types of cenralization
    - __Direct centralisation__ - eg. chat, messaging and videoconferencing protocol use this method
    - __Neessary centralisation__ - eg. DNS, Certificate Authority (CA) due to technical limitations. 
    - __Indirect Centralization__ - In theory all nodes in the Internet are equivalent. But realistically some nodes drive much of the traffic of the internet
    - __Inherited Centralization__ - The network between two endpoints is a few stack below the OSI model. But whoever controls the network basically has control over the internet as well
    - __Platform Centralisation__ - While the protocol itself doesn't maintain centralization. It enables centralised service providers to have more control Over others. eg HTTP
  - __Limits of Decentralisation__ - there is no completely decentralised system. Although there has been some attempt at it. Centralisation starts evolving
    - __Federation is not enough__ - SMTP was evolved as a method to have a decentralised way to receive message even when the underlying Network, IP or the server changes. One way it is done is, The DNS handles the finding the user part and the Mail Transfer Agent (MTA) can be used to route message to anyone. But this has created a situation where there are Indirectly centralised systems like Gmail. Who have much better network effects and are able to elbow other small players away.
    - __Multi-Stakeholder Administration is hard__ - This is a model of centralisation where Multiple representatives from various stakeholders come together to decide on something. For example ICANN, CA, Browser Forum. These are a type of centralization but in some ways they are less centralised, as well
    - __Blockchains are not magical__ - Blockchains try to reduce centralization risk by distributing intermediary or otherwise potentially centralized functions to members of a large pool of protocol participants. The assignment of a task usually cannot be controlled (to avoid sybill attacks). These prevent _direct centralization, inherited centralisation_. There are a few issues with this though
      - __Distributed consensus protocols can have significant implications for privacy.__ Because all activities are shared with many unknown parties. Private Information Retrieval is incredibly (PIR) is incredibly easy
      - A lot communication back and forth + proof-of-work makes the whole network inefficient,
      - Distributed consensus protocol are still __not proven to scale__.
      - Responsibilities are diffused to certain unknown parties in the network. Making, control and management very difficult.
    - It is also possible that centralisation risk can happen elsewhere, eg, bitcoin trading places
  
## 211219
- https://www.hackerfactor.com/blog/index.php?/archives/895-Connecting-the-iDOTs.html
  - TIL that companies can have custom headers and use it track stuff.
- [https://training.kalzumeus.com/newsletters/archive/do-not-end-the-week-with-nothing](https://training.kalzumeus.com/newsletters/archive/do-not-end-the-week-with-nothing)
  - Rered this, Incredible stuff about why I am doing this stuff

## 211218

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
  
