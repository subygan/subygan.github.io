---
emoji: 📱
title: entropy, displays and disruption
description: how displays are getting closer and closer to your eyes, encompassing everything.
date: 2018-04-21
layout: base
tags: ["essay", "writing", "personal"]
---



Extremely long back. I saw this random video of an 8x8x8  which had these crazy animations that were mind-boggling to me and I’ve always been wanting to create one of my own. Only problem being I’m just too much of a lazy douche to do anything.


A little while back, I decided screw this. and randomly bought like some 1000 LEDs and while it was on its way, searched around for the best way to build one. The best You can hope to help is this really long ass instructable.


They cover almost everything that is to know about this project. You might wanna be ready for a good long read.


Once, I got the LEDs delivered. I started to get on with it and started soldering the hell away. to be precise this has 1086 soldering joints all of which have to be quite reliably strong. Figured I’ll have loads of time to figure the rest of the circuits later.


Their design was also sort of simpler and effective than most that was provided online.


It took me about two hours to complete a single layer of LED


![1st layer](/assets/images/led-cube/1layer.jpg)


Rinse and Repeat eight more times.


20 hours later, I had the required layers.


stacking each one took about another hour.


10 hours of absolute concentration and 16 hand burns later.


![8layer](/assets/images/led-cube/8layer.jpg)


Now there’s only the wire thing to be figured out…..


Sort of.


Cuz, I still have this Really complicated circuit architecture to figure out. Which I’ve been heavily procrastinating on.


and the spark of a moment appeared when I was in absolute despair. I could just use an Arduino to control all the 72 I/O ports in the cube. The Only problem is, even the Arduino Mega has only 54 I/O ports.


After a couple days of googling, I found people saying two Arduinos could be made to be in sync Like the Master-Slave system. So, had to buy them.


While they were on their way. I was struggling with the wire problem. See, cable management of this thing is ridiculously confusing. So, thought I’d use an 8 set male pin to connect all the wires.


The only problem was they had only like, 1 mm between them. within which I’d have to solder the wires, without touching each other. Which, after an hour of absolute agony. I did,


![pins](pins.jpg)


It worked, sort of. After a couple while, the solder started breaking off. So, had to break them off myself. Enter really sad face here


I found my salvation in ribbon cables. They’re super easy to solder and pretty durable. I was done with the whole thing in a couple of hours.


Now, for something to fuel my overgrown ego,


<iframe width="560" height="315" src="https://www.youtube.com/embed/54Gwf2QGsFg?si=kfeI6XsqgX8ZeFY7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


Now, that everything that’s easy is done. I should just figure out what the animations are going to be. It’ll take me another bunch of weeks before I am able to do something that’s remotely acceptable.


## Lessons learnt:

- Be prepared and Be clear about what you wanna do. Before doing it.
- Patience is a virtue and Haste gives you hand burns.