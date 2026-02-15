---
emoji: 🤖
title: GPT2
description: a new era of language synthesis
date: 2019-07-16
layout: base
tags: ["tech", "tinkering", "computer"]
---


It is such a great time to be alive! so many new things and so many innovations in all fields. I was reading about the GPT-2 which was released by OpenAI a few months back, in this blog. GPT-2 is a Natural language synthesiser, that is able to synthesise paragraphs naturally based on the raw input given to it.

OpenAI, concerned that people might use this to generate random rapid fake news which is based on this synthesiser, hasn’t let the whole of the GPT-2 out. But, as a proof of concept, they have open sourced, the 345M sampling one, for now. Theoretically, they have a synthesiser that is 4 times as fast as the one available for the public.

I decided I’d try playing with it a little bit. Which was very amazing, not because a machine had done it, but because a human has taught a machine, all the nuances of grammar and the infinitely complicated arena of language. This is a definite show on the prowess of the human self

And the whole process was so simple, yet the results so impressive.

```
In January 1991 during the Iran nuclear deal and subsequent negotiations I came along because one day while flying I spotted them taking off their jet seats - as my dad (the then president when he made this discovery as a teen).
On February 25 1981 a Ulyss, Iran-registered Boeing 800 jet, flown by US General Charles Ebersly to Cairo during that crucial US intervention, took one final flying jump to Tehran then headed south - the plane then making an extra descent and dropping three days' total power as she did! At 8PM Tehran-Ain is just 15-20 seconds slower by land or at runway 4 for each one-segments exit/reentraction from 10m in any kind but then we can use those 5, 9m wide landing bands we talked for over 2km earlier of course which provides perfect visual symmetry during these sorts of "special".
With such fine flight lines Iran and all related nations will feel an awful disappointment on your first fly round at 1 of many but remember it happened when Iran were playing with real rockets all across their "spit bowl"- as it happened for about a 2h20...
```

And the story goes on and on and on. Even though a bit incoherent, notice the near perfect grammar usage and the relevance of the content pumped out, everything is somewhat related. Just Beautiful.

One can wonder, how the world will be with these impressive improvements in 10 years. Despite the concerns of fake news, this is still a beautiful finding.

You just had to have python installed and using pip3 install a bunch of other dependencies like, fire, regex, tqdm and Cuda. which one can do with,

Reader, Beware DO NOT use Windows. Definitely not beginner friendly and you are much better off, working on linux or mac. If you only have windows, try dual booting, with some kind of linux, which is surprisingly easy.

```
pip3 install regex fire tqdm cuda tensorflow

git clone https://github.com/openai/gpt-2.git
```

That done, all that is left is to just cloning the OpenAi repo. Which goes like,

In the directory you like. Now to download the 345M pre-trained model.

```
python3 download_model.py 345M
```

Just to save some time, add the path variable,

```
export PATH=$PATH:/home/mgagne/.local/bin
```

And… done!

You now have a functioning, bleeding edge natural language synthesiser. You can call your Not-So-Perfect synthesiser to write stories for you.

All you have to now do is,

```
cd gpt-2
python3 src/generate_unconditional_samples.py --top_k 40 --model-name 345M
```

And, out comes the prompt to give your input, give something in and watch the magic of your computer pumping out stories using its “imagination”.

