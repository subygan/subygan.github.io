---
emoji: 🦫
title: A Backend Engineer Writes Frontend
description: Writing frontend should be straightforward, Or so I thought...
date: 2024-05-6
layout: base
---

My friend Limin and I, were playing around with some LLM agents and realized that these agents could be a very good way to learn a language as they have a much better grip on the language and are able to provide great feedbacks.

Hence, started our journey of building an LLM application that could listen to conversations, provide feedback on Qualitative ( How I could've rephrased a sentence to be clear), Holistic ( How to better structure thought or argument ) dimensions.

Being the least-worst person to be doing frontend in the team, I took on the job of writing a frontend Application in Flutter.
To my caffeine and enthusiasm addled brain, Flutter's promise fo "Cross-platform" and "sing-codebase" were a godsend.

After praying at the altar of Xcode, Android studio and, `flutter doctor`. I had a working environment setup in under an hour.
Naturally the ambitious person I was, I selected all platforms when setting up assuming being a native application would be very cool and easy.

I'm walking through my [git history](https://github.com/ProductLoft/FE/commits/main/) to remind myself of the pain.

On a Sunday, I spent 4 hours trying to align a text to the center, after creating a nested mangle of dart objects I gave up, came back, spent another 3 hours and gave up again. Flutter has a nifty tool called [Flutter Inspector](https://docs.flutter.dev/tools/devtools/inspector) that helps in debugging the nested mess. This tool was a god send for me, because I realized I had multiple `Row` objects inside some variations of `Column` objects. Which was making it completely unusable. (Enter [XKCD 1513](https://xkcd.com/1513/)).

One thing about the "cross platformability" is that, most libraries don't support everything. In fact not everything can be supported in every platform. For example, the Sqlite flutter library `sqflite` is supported in Android, IOS and Mac. Everything else requires FFIs that were implemented in other packages. In the web, the ideal solution for a DB type usage is to use the IndexDB not sqlite.

I was also stuck with the app being unable to access the microphone or reach the internet in MacOs in release build for a long while. took me a lot of sleuthing to realize that the *.plist file did not give internet access. Similar story for android. Similarly for, yep you guessed it iOS as well.

As a primordial example of premature optimization, I also spent 6 hours setting up a functional Github-Actions pipeline. So that, I'll have the installation file magically land on my lap when I merge to main. Oh! how wrong I was. Every single platform has its own build pipeline and requirement and asset management styles. Why with 35 years of personal computer history isn't there a single asset management solution is beyond me.

In the end we realized, the easiest way to distribute an application was through the web and spent another 10 hours writing a web version as well. I guess PG [was right](https://paulgraham.com/road.html) in focusing only on the web, It just took me 23 years extra.

Part of the Mistakes were because, I was a noob to the platform and part of it was because how tangled Frontend development is.
I've developed a massive respect to people work on these application which work consistency across so many platforms.
And, I kinda don't blame companies for shipping every app with a chrome browser anymore.
