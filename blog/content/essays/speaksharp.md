---
emoji: 🌏
title: Postmortem from building an AI speech coach 
description: We spent 3 months building a product that a lot of people wanted, but nobody used. These are all my learnings from doing 15 expert discussions and 50 user sessions.
date: 2024-09-01
layout: base
---


# The problem

International Students have a hard time understanding and integrating with the culture.
This is true even if there's a good grasp of the language. 

The problem is not the language itself. But the accent, the word usage, and the million different cultural references.

# The product

We believed we could solve this by building [SpeakSharp.io](https://speaksharp.io) an Always on language assistant, which would be able to provide concise feedback on the pronunciation and also provide context on the cultural references. Even if we acquire 5% of the total International student population in the US, we would have a $10M ARR, or so we calculated. We even had a [27 page business plan](https://docs.google.com/document/d/1VEPdhb_0AGbCJ7LVRn0hYCTi5gdUGs2PXwKDYX9Czj0/edit?usp=sharing).

As someone who's previously built things and failed. I was aware of the pitfalls of building something that no one wants. Which was why, I decided to talk with experts and understand the problem space. These are some direct quote from people who have a decade of experience in language-learning/EdTech space,

> "You are young. Go find a better problem to work on. Education is a hard space." 

> "no one outside of Duolingo has been able to crack the language learning space. CAC is too high and the LTV is too low. Without gamification, it's hard to keep people engaged. And if gamification is the only thing keeping people engaged, why are you not doing it today?" 


But then, this did not matter because We had the idea!! ❤️‍🔥 and we were going to build it. Because we can prove them wrong.

# The Mistakes

I wanted to name these learnings. But, They are learnings only in Hindsight. When committing them, they were mistakes.

## Mistake #1: Doing everything in a "Scalable" way


This is by far the single most important learning for me. __Getting the product in front of users as fast as possible is the only important thing__, everything else is a distraction.
If a task does not directly contribute to getting the product in front of users, it is a waste of time.


At such an early stage. __Validation of the idea is infinitely more important than the scalability of the product__.

It is useless to have a thing that scales but nobody uses.

I now have a greater appreciation for the [do things that don't scale](https://paulgraham.com/ds.html) advice.

There is no point in automating most things. Just ssh into a server and deploy. Docker, Gitops, Github Actions, K8s, message queues are all a distractions at this stage. Things that work well for a team of 100 should not be adopted for a team of 2.

If the roadmap is anything more than a list of features and bugs, you should be worried.

If someone says JIRA. Turn around and walk away. It won't work.

## Mistake #2: Not Listening to users more often

I understand product problem quite intimately. I knew the language barrier that stops me from making new friends. I myself was an International student in foreign grounds. I had a hard time understanding the culture and the language. So everybody would want to improve in that dimension right?

Wrong.

While everyone is going through it, nobody wants to improve.

Even our close friend circle didn't use the product more than a couple of times and needed constand reminders to use it.

We were fervently working under the guise that if only we could remove a little bit more friction, people would use it.

If the user is unable to bear a little bit of friction, for the value that the product provides. How are they going to bear the friction of paying for it?


## Mistake #3: Learning too many new things at once

I built the app from scratch.

I've been a systems engineer for the last 5 years. While I could configure a k8s cluster half awake, I've never built a native mobile app before.

And it was an idiotic ambitious idea to try to build an app that ran on all platforms from day 1.

Flutter was completely new. While its a great framework, it abstracts too many platforms and each platform comes with their own thorny issues. For example, permissioning model for macOS, Windows, Android and iOS are all different. And I had to learn all of them and spent a day on it.

Even setting up each of these development environment is an uphill battle with multiple IDEs and SDKs.

I should've probably started with something that I was more familiar with, like react and deployed it on the web. (But No!!! my mind said. We want it native, We want it smooth, and We want it "always on".)

I've documented (most)  my fronted development woes [here](/tech/bugs/frontend).


## Things that went Great

I'm so thankful for the resources that we had at our perusal.

The Swartz Center from CMU provided us with a place to work, and Server Credits without which we couldn't have built the product.

I had multiple discussions with [Craig Markovitz](https://www.linkedin.com/in/markovitzcraig/)  (who gave the funds to buy boba for our first user sessions) and [Adam Paulisic](https://www.linkedin.com/in/paulisick/). Each of which were Eye opening and gave me a lot of drive to continue working on the product. It's incredible the amount of time and care that they provided.

We won the SPARK grant. Which was a great morale boost.

I'm damn proud of the hours we put into making the individual pieces work. It was an absolute grind, but the possibility of making something that could change the lives of people was a great motivator.


## What's next?

Even though I've stopped working on this. I believe this is quite a good idea and there is market for it.

But, it needs steep investment in terms of time and money to make it work.

Which is why I'm excited for products like [Fluently](https://getfluently.app/), [Yoodli](https://yoodli.ai/) and a host of new AI language learning apps that are coming up.

Personally, I'm working on something new that I'll be excited to share soon.