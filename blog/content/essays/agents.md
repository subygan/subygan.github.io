---
title: (mostly) successful cases of software rewrites with agents in 2026
emoji: 🎲
description: skillful orchestrators are able to deploy teams of agents to fold time multi-year projects into a few weeks.
date: 2026-02-26
location: springhill, nashville
layout: base
tags: ["essay", "tech", "software"]
---

In the past few weeks there have been examples of successful agent usage at a shocking scale. some in production no less.

## [ladybird](https://ladybird.org/)

after struggling with swift in the browser for a year or so. andreas kling the bdfl for ladybird concluded it was [not worth pursuing swift](https://github.com/LadybirdBrowser/ladybird/issues/933). it was such a rebellious choice at the time for a browser. but ffi in swift needs a ton of working it seems like.


after this andreas and team decided to accept rust as a possibility as chrome and firefox already have rust in their codebase. and they ported the [libJS](https://github.com/LadybirdBrowser/ladybird/tree/master/Libraries/LibJS) which is a core part of ladybird.

>The lexer, parser, AST, and bytecode generator are relatively self-contained and have extensive test coverage through test262, which made them a natural starting point.

it is such a wise choice because andreas also has a target format that needs to be byte accurate as well. which means there is no way for the agents to slop. There is only one correct solution everything else can be discarded.


the entire port took about 2 weeks. and 20K lines of rust. which results in byte to byte accurate output. and there is no noticable performance regression found. which is important.



[blog](https://ladybird.org/posts/adopting-rust/)


[code](https://github.com/LadybirdBrowser/ladybird/pull/8104)


## [cloudflare](https://www.cloudflare.com/)

an engineering manager from cloudflare rebuilt Next.js on top of vite using a team of ai agents.

the key things here were,

- this has been sort of scoped and tried before in some form other with projects such as opennext and others
- this might've taken a few engineers a few months to a year to get to this level of accuracy

the team also had a few things going for them.

- Next.js is well-specified. It has extensive documentation
- Next.js has an elaborate test suite.
- Vite is an excellent foundation. and there has been different platforms supported on top of vite

The process was like this,

1. Define a task ("implement the next/navigation shim with usePathname, useSearchParams, useRouter").
2. Let the AI write the implementation and tests.
3. Run the test suite.
4. If tests pass, merge. If not, give the AI the error output and let it iterate.

in a loop

a few things that caught my attention were,

> Most abstractions in software exist because humans need help. We couldn't hold the whole system in our heads, so we built layers to manage the complexity for us. Each layer made the next person's job easier....
>
> AI doesn't have the same limitation. It can hold the whole system in context and just write the code. It doesn't need an intermediate framework to stay organized. It just needs a spec and a foundation to build on.

[blog](https://blog.cloudflare.com/vinext/)


[code](https://github.com/cloudflare/vinext?tab=readme-ov-file)

##  [anthropic](https://www.anthropic.com/)

Nicholas Carlini from Anthropic ran parallel agents in a "clean room" environment (no internet) with only the rust standard library and reference c implementation to build


for reference, the gcc compiler is being worked on 1987, with millions of hours of developer time to create it. although a developer 


while there are limitations to this implementation. this is a clear sign of things to come. In the hands of a more subject matter expert, i have no doubt that the results will be a lot more cooler.


[blog](https://www.anthropic.com/engineering/building-c-compiler)


[code](https://github.com/anthropics/claudes-c-compiler)


# interesting things in common:


- each of these projects are clearly scoped ahead of time with a much deeper level of detail, in most cases they were reimplementations. which makes it easier to break the project into more reasonable tasks for the agent
- there were extensive test cases, which can give clear feedback to the agents on what is working and what is not.
- individual sandboxed enviroments for each task. enable each agent to be independent of their works as much as possible and resolve merge conflicts with agents.
- all the dependencies are locked and the only goal of the agents is to move towards compatibility with the tests. if the dependencies were also being shuffled around by agents it creates more uncertainty.


all of these feel obvious in hindsight. but are quite hard to replicate and is only applicable for a very narrow set of software system. because a lot of software, 

- does not have such extensive tests.
- 