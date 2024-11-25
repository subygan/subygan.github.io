---
emoji: 🧐
title: Product Ideas
description: a dump of Product ideas that I come up with 
date: 2022-07-16
layout: base
---

Inspiration comes from many places. I love jotting them down here.


### Small app ideas
- Ideas with [Model Context Protocol](https://www.anthropic.com/news/model-context-protocol) enabling LLM Agents with cool tools
  - Object storage for models
  - Memory layer for any agent
  - Auth layer for agents to authenticate into a page. It is quite obvious how this can even be extended into a secret manager for agents as when these things grow there is a need to manage private and personal data. Maybe credit card information, etc.
- Inventory management with Video models. Going from video -> list of inventory. Gemini can do it, tested.
- talk with a youtube video
  - Simple extension to inject a chat window + summarization
- Talking with a document
- Unstructured data to structured data
- Image or Video cropping with SAM2 or [SAMURAI](https://yangchris11.github.io/samurai/) models.
- Video Editing LLM going from a long form video
- LLamacoder for any LL
  - https://github.com/nutlope/llamacoder
- async prompt processing APIs
- Python library for overarching batch prompts
- Release Youtube chrome Extension
- Browser automation for testing, automatically booking tickets etc.
- native MP3 player, with a remote library

## Problems I have

- LLM x privacy
- Consumer AI products - character.ai,
- Automated Browser agent
- Data manager
- Simple to use embedded database + plugins
- Large scale unstructured to structured data system
- LLM workspace
- LLM Operating System
- 100 years ago today
  - Wouldn't it be interesting to read a newspaper 100 years ago today.
- Menu -> Images
  - The menucard in hotels are shitty and I am having to google every single thing when I come up with a new cuisine. I would love to go from menu card to image with ingredients and other details.

- [15/08/24, 17:48:15] friend - Cmu: I think the notion AI is still not what people need
  [15/08/24, 17:49:21] friend - Cmu: It's a tool that you could talk with, no problem. But lots of the time user still want to read the original notes
  [15/08/24, 17:49:38] friend - Cmu: And understand the big picture of all his notes and knowledge
  [15/08/24, 17:50:32] friend - Cmu: He wants to see a network of all of the notes he has and has a visualization tool to zoom in/out, filter specific tag, see the layered relations of knowledge, etc
  [15/08/24, 17:51:00] friend - Cmu: The user wants such an AI tool to auto generate tags, and categories relations
  [15/08/24, 17:51:22] friend - Cmu: The only thing he needs to do himself is to just write random things
  [15/08/24, 17:52:07] friend - Cmu: It doesn't even need to be an organized paragraph. Just a random sentence. And it shall be categorized and tagged, and pop up when the user is browsing that tag or category, or related category
  [15/08/24, 17:53:53] friend - Cmu: Which would be more interesting is that if the interface is not textual, but audio. The user records his own conversation, and could read a summary report of his daily thoughts. And could refer to any of his thought he had had one year ago
  [15/08/24, 17:56:31] friend - Cmu: I mean context window will always be a constraint  for users. The bigger the context window of any AI is, the bigger the context will be. It's like the Wintel relation
  [15/08/24, 17:57:43] friend - Cmu: Notion QA is a tool that suits for smaller window, human still need to refer to the whole knowledge base or database themselves. A lot more often than refer to the answer given by any QA tool, indeed.
  - ^^^^^^^^^^ from my friend
- 19/08/2024 Bulk processing gpt stuff is still a pain. I'd love a simple interface to dump some csv, jsonl etc and receive outputs.

### idea dump/graveyard

- So, in email newsletters, the sponsor block is usually embedded into the newsletters. But, we could do better than that. We can have a dynamic, sponsor section. with gif. If you remember that timer-in-mail thing. It fetches gif based on the timing. We can do something very similar, but for ads. this means, You can show new ads to repeat customers. but there are certain problems. The resolution cannot be great. Also, we don’t have any data on how many people reopen old emails. My guess is not a lot.
- serverless database solution. Which will be consistently distributed. While also being super cheap.
  - 16/08/2024 this is being done
- github, slack or such integration which could notify you on many devices.  You could just write a dirty script and then you will be notified sorta like this. https://ntfy.sh/
- Micro hosting services. Not every service needs to have six 9 SLA. A lot of services can go down occasionally and can still be fine. Providing a service which would make it cheap to host small stuff would be super useful. It could be marketed like a tinkerer's machine
- A newsletter platform that is simple to use, embed etc. I’ve tried, mailchimp and others. There is too much back and forth to make a newsletter. Right now, substack is pretty much the only people who are doing this. Maybe a simple dashboard where you bring the domain name and we setup everything else. And all you have to do is embed the newsletter onto any site. and it comes with out of the box email verification and all
- Business card generator. very similar to https://thisresumedoesnotexist.com/. but, for business card. there can be options for exporting into the relevant format for editing and printing
- transcriber app that works from anywhere within your laptop. Like right now, if you’re watching a video/audio that’s in your local or in some random website. We don’t have a transcriber. This is very similar to what pixel phones are doing right now.
- Personal wealth management solution that optimises for the most return. Imagine like a personal quant who’s trying to reduce risk increase returns and so on… instead of you handling it a machine might do sentiment analysis and do this for you. In some ways, cash is just an asset. Maybe we can have a scenario where if the market is crashing it has a better way to convert to cash
- Shared timer like application that  basically lets to people work together. So, kinda like focusmate but only the timer and some voice, maybe. But, the timer is key and it controls all distracting sites as well.
- A movie quote search engine. I don’t know how useful it would be. But, I’ve had scenarios where I was thinking of some quote from some movie and I couldn’t find it. Because google’s tools are not optimised for this. We could index the subtitle files and do search over it. And, provide tools specify the type/genre for fine grained search. Maybe IMDB does it now. Okay. IMDB, didn’t have it. but there is https://www.quodb.com/
- I actually see a very specific concern for, privacy related. “huge databases”, Like, there are these companies like needl.ai and others who are hoping to run multiple instances of a private vault. One per customer and every single one, spanning several million rows. There is definitely scope for a simpler privacy solution. Maybe an open source one, where anybody can spin up a “secure” database. Which has strict control
- Live Oyster and sea food shop in bangalore. or places that have zero access to sea. My instinct is that, sea creatures (Atleast a subset of them.) can be grown in artificial environments. But, getting the seeds/eggs would be a pain. But, there is very good demand for live sea creatures in those places. Beacuse now, it can be sold as a premium thing
- Hospitality industry booking in india is very bad. The big players are all slow buggy and inefficient. I think, there could be a market for premium priced hotels only. Think, something like, a platform for people ready to shell out 8K or higher. per night. Like, People with that ability have different expectations and needs than thrifty people. On a similar vein, I’ll register this as well.
- buying in bulk through Zomato and Swiggy is really inefficient. These people just want 40 Pizzas to be delivered, on time at the right place. Swiggy and zomato are all optimized for, small atomic deliveries. And, there are a lot of these bulk orders happening...
- Marketing sourcing solution. That gets leads. In, b2b sales of stuff like building materials or others. Generally, the lead generation would be through connections and relationships you already have. My hunch is that this relationship can be made more robust and accelerated. The problem with b2b sales is that, the businesses who buy the product expect some level of support and hand holding. Hence the relationships are more important. I think this can be done better, by having like a specific marketplace for super quality guaranteed products. Indiamart comes closest. But it's still like a middleman who just introduces people, without much vetting (maybe I'm assuming, stuff here). But there definitely is a market for guaranteed servicing and support for niche devices and tools
- Like, you can just outsource a trip or an experience to be custom built for you. All logistics problems will be solved by the concierge on behalf of you. This could be stuff like, finding the best way to organize a party. Either by getting quotes/ideas from multiple agents and compiling them or completing an end-to-end solution for a marriage or company party. Just state the problem, explain the ideal solution. Somebody will get it done for you.
- Friendly running community. The application will help people keep tabs of each others running and their health. People can even run together, even when apart. schedule events and so on... The key to this business though is, building a community of people who are passionate about running.
- Privacy based solutions

## micro ideas 2022-11-23

- chat widget for websites connected with slack
- Github bot to figure out dead links in a repo
- Github CI failure notifications for PRs I raised, in a private message in slack
- wedding photo album for easy sharing.
  - Would be useful with posterity and sharability
- View someone's twitter profile in reverse order, i.e. oldest tweet first.
  - Not a lot of tools exist right now
- Hovering widget app with timer + schedule in mac
- **focusmate for exam preparing**
  - There could be seperate cohorts who are trying to prepare for separate exams.
  - This is better than focusmate, because those who match would have a shared context
- Update extension
- Extension to convert any audio/video to text.
- Using the same idea as the clock in email thing. But, it can be used to serve advertisements in news letters

### cicd

- pipeline taking too long to run is an issue. There are a lot of optimisation players who are coming up.
  - [depot.dev](https://depot.dev/)
    - build containers faster.
    - test faster, [lambdatest](https://www.lambdatest.com/intl/en-in), browserstack and others.
    - I've faced pipelines, where 70% of the 2-hour pipeline time spent on building containers, because it is pulling a lot of the previous layers and reassembling everything, every time.
- Being able to test the pipeline locally would be awesome for devops engineers who are trying to test the pipelines
- There are not a lot of solutions to test infra directly. If we think about it, testing infra should be the top priority. Because infra people are constantly shifting things in blackboxed, json or yaml files and infra is the critical part that can get messed up easily.
  - Something like [biceplang](https://github.com/Azure/bicep) or [AWS CDK](https://docs.aws.amazon.com/whitepapers/latest/introduction-devops-aws/aws-cdk.html), should create a template that would test your infra end to end.
  - Think of this, like a full-fledged integration test, but with some type of containment.
  - similar stuff, https://www.datree.io/

### serverless

If ec2 made the jump from having to own a machine to just spinning one up virtually from a bigger machine managed by someone else. Serverless will do the same thing to ec2. From having to spin up containers and manage their resources to shifting that responsibility to the platform underneath.

I predict that, very similar to "traditional" softwares vs virtualised machines. Hardcore software would take a while to get converted to serverless, but until then it will be for tinkering, small projects and hobby projects. eg. netlify, vercel

There are also accelerators to these in the forms of web assembly, which lets deployment and rollbacks for compute, easy.

- Serverless eventually consistent database
  - https://www.cockroachlabs.com/blog/how-we-built-cockroachdb-serverless/
  - https://github.com/rqlite/rqlite
  - https://aws.amazon.com/rds/aurora/serverless/
- A framework to build completely serverless applications, from storage to compute.
  - Imagine a software service, that is able to leverage a serverless distributed database, does computation on micro-vms, serves the user and then goes silent.
  - There definitely is scope for having abstracted framework that will be able to expose these in different formats.
  - eg.
    - [webiny](https://github.com/webiny/webiny-js), a serverless cms
    - [aws chalice](https://github.com/aws/chalice), but only (python x aws)
    - [jets](https://github.com/boltops-tools/jets), ruby framework for serverless
- Testing serverless services is still very immature without proper tooling and a lot of emulation
- When serverless
- There would also be scope for offering traditional services, like UDP streaming, pdf/image/whatever processing. through serverless machines and offering them at a much cheaper rate.

- Resources
  - https://firecracker-microvm.github.io/

### Event driven
Event driven architectures are gaining a lot of momentum. There are a few problems inherent to that system,

- since calls are async, there are queues everywhere, this is generally addressed through a pub-sub system like kafka to relay the mesages in a a queue.
- Managing state across pods/instances is hard, despite kafka's guarantees, message misses do happen.
- Rolling back, when something goes haywire is hard.
- Retry seems to be the hailmary in most cases.
- If the publisher is sending buggy messages and crashing the subscribers, it is inherently hard.

### Integrations

- integrations with multiple services and offerings to make them homogenous or generic is something almost everybody is interested in.
  - eg. Zapier,
  - Problem with these integration services is that, the APIs won't be able to handle the edge cases, hence end up being too generic.
  - eg. There are a lot of scope for integrated experiences. eg, whatsapp/discord/slack message management through a single interface for community managers.
  - Kubernetes for notifications infra. Basically a generic phone call/sms, email service which lets us switch the underlying providers easily like, twilio, gupshup .notification apis are
  - Generic payments gateway that lets us A/B testing

### ETL

ETL solutions, either to aggregate data in some form or matter
- Services that take one format of input and transform to another are also very much in demand. The problem is, there is no clear path to productisation other than providing the underlying infra to run these workflows or building tools to build these workflows, of which there are many.
  - https://www.alteryx.com/products/designer-cloud and appian and many many others.

### Privacy

privacy is the hot new talk of the town and there are a lot of gaps in the ecosystem.

- Cryptography x privacy
  - There are a lot of privacy invading services coming like, [needl.ai](https://www.needl.ai/), [needl.tech](https://www.needl.tech/) and others, who are basically offering a personal/personlized Knowledge Management Service (KMS). These services are powered by integrating/scraping across multiple data entrypoints, like google docs, imessage, whatsapp, telegram, slack, rss feeds etc. The amount personal data captured by these services is incredible. While, I'm sure these services will have encryption at rest. It would be really hard to run it on an encrypted database, with good asymmetric encryption like the one offered by keybase.
    - For services like these, it makes sense to offer a database that is completely isolated from the infra and only accessible as an api, that encrypts while active and supports heavy operations like, range queries and full text search.
  - FHE is too slow to be useful, today.
- Machine learning x privacy
  - Moving ML inferences from the server to the client.
    - There are a lot of Local ML platforms like ONNX and TFlite that are enabling people to run ML models on lightweight devices like mobile phones.
  - Some form of Federated learning, to collect the derivations instead of the data. Basically compute will be meeting data instead of beaming up the data and doing compute.
    - prediction: Moving data around is going to be increasingly complex and difficult, as countries start safeguarding their data, in those cases training ML models remotes and then aggregating the models is a very smart way of getting the knowledge from the data, without the data itself.
    - Imagine 100s of hospitals with their patient details and X-rays for tumor siloed out, no hospital is actually going to share that data with another, but with FL and other methods, it would be ridiculously simple to train models in the location where the data is and then slowly start aggregating them globally. With a bit of differential privacy and a loss to accuracy, we can develop very good prediction models
    - https://www.thepullrequest.com/p/the-future-of-ads-privacy


A lot of these ideas are future facing. Every future facing idea is usually a little twist on top of whatever is standard/hot/obvious right now. which means there will always be a huge middleground full of players who would be far enough behind that, they would need help covering the distance between past and the present. Which means, there is some type of consulting opportunity with every single piece above as well.

### PrepMate

Aspirants who are preparing for exams are heavily moving towards remote preparation. Barring the exceptional few, it is hard to keep motivation alive. and work and work and work.

PrepMate is a focusmate fork, specialised for exam preparation. People who are preparing for exams can schedule preparation sessions with each other and match with random people (or people from their own milieu) And Setup prepsession with them. When the time comes, people will be allowed to access the video call. Both parties can introduce themselves and their goals and then mute each other and work for 45 - 90 minutes. After that, there can be an optional discussion to go over each other's notes or maybe in discuss light stuff.

### Happy flow (new user)

- Signs up with G
- Gets introduction video/ guide about the platform.
- Goes directly to the meeting scheduler UI
- Schedules meeting with people for the future.
- Gets notification 30 minutes and 10 minutes before the call.
- Joins call, Finds a person who is preparing the same exam but from a different city/state/country. 
- Both parties introduce each other and mention their goals. Then both party mutes each other.
- Works for 45/90 minutes. gets a notification saying session has ended.
- Participants are given 30 minutes to discuss their session and other banter.
- Marks person as favorite (So that this person will be given preference next time).

### Challenges

- Video calls could end up being very resource intensive and require a lot of resources.
- Stability of the calls + app. Study session __must__ not be broken. ++
- Multilingual support. 
  - This has to be anticipated for, from day one. As most people might not be upto speed on the same language.
- Supporting even very basic versions of phones not costly ones.
- Which exams to focus on, in the beginning.

### Why now?

- Accelerated remote work
- Hyper-focused audience group.


### Competitors

- Focusmate