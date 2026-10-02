---
layout: base
emoji: 🦖
title: Cambrian Era of Models
description: accelerated evolution
date: 2026-10-01
tags: ["essay", "technology", "Machine Learning"]
image: /assets/images/cambrian.jpg
---



about 540 million years ago, life on earth went from a handful of simple body plans to almost every major animal phylum we have today. once the foundations needed were aligned, more oxygen in the water, new genetic toolkits, eyes, and predators. once the environment could support it, evolution stopped being slow and became combinatorial.


We're at a similar inflection point with LLMs. the past few years have been how do we get the biggest, largest LLM and how do get the most volume of tokens. but then now we're in a world where, GPUs are unattainable even if you have the money, RAM prices are skyrocketing. and we now have agents that have been around a few years now. 

# models are breaking down

the generalist models is being broken into specialists, and the specialists are getting absurdly small.

these are just a few recent examples,

- cactus shipped [Needle 3](https://cactuscompute.com/needle), a family of tool calling and extraction models that are **8 to 29 MB** on disk (29M to 121M params, 2-bit quantized). it runs on a raspberry pi at thousands of tokens per second, and after fine-tuning the 4 layer variant beats DeepSeek V4 Flash on mobile tool calling. the comparison has caveats (fine-tuned vs base, forced calls) obviously, but the broader point still stands: a model that fits in an email attachment is competitive with a frontier API on a narrow job.
- the earlier version of the same idea was literally pitched as "we distilled Gemini tool calling into a 26M model".
- someone did a [$500 RL fine-tune of a 9B open model](https://fermisense.com/when-machines-take-the-wheel/) that beat frontier models on catalog review. five hundred dollars.
- IEEE Spectrum wrote about [small models gaining traction where networks are unreliable](https://spectrum.ieee.org/small-language-models-ai-pharmaceuticals), pharma and field work where you can't assume a round trip to a datacenter.
- people are [fine-tuning Gemma 4, multimodal, on apple silicon](https://github.com/mattmireles/gemma-tuner-multimodal). on a laptop.

Claude can call it a "distillation attack" and try to make it sound more than what it is. but the frontier model is a teacher, not the product itself. you use it to generate data, label, judge, and then you distill the one behaviour you need into something tiny, fast and yours.

it's the same way biology works. a generalist survives everywhere and dominates nowhere. a specialist owns its niche completely. and the market for "extract these 12 fields from an invoice" or "pick the right tool from these 30" is much, much bigger than the market for "be smart in general".

this also changes what a benchmark means. a general model is graded on a hundred benchmarks and wins a few. a specialist is built to saturate one. once you pick a narrow enough target, saturation is a matter of data and iterations, not parameters.

# you should be building your own model


there's recipe to building models today it looks roughly like this,

1. **pick a narrow task**, tool calls, extraction, classification, routing, a specific code transform. the narrower, the better.
2. **get data**. your own logs if you have them. if not, have a frontier model generate and label examples, then have another model (or you) filter them. this is the part that matters most and the part people skip.
3. **pick a small open base**. something in the 0.5B to 9B range. Qwen, Gemma, Llama, whatever has the right license and tokenizer for your domain.
4. **fine-tune**. LoRA/SFT first. if you have a verifier (does the JSON parse, does the test pass, does the answer match), do RL on top.
5. **evals evals evals** against the frontier model you're replacing, on *your* data, not a leaderboard.


none of these steps need a lab really. the most hard part is step 2 which is not an ML problem, it's a knowing-your-problem problem. that's also why this is a moat, the frontier lab doesn't care about your niche. but it's your problem that you're better positioned to solve

"training a model" is closer to writing a good test suite than to building a rocket.

# ~~tokenmaxing~~ -> intelligence per task

the other half of this is what is happening to usage.


- april: TechCrunch, [tokenmaxxing is making developers less productive than they think](https://techcrunch.com/2026/04/17/tokenmaxxing-is-making-developers-less-productive-than-they-think/).
- may: [amazon employees tokenmaxxing under pressure to use AI tools](https://arstechnica.com/ai/2026/05/amazon-employees-are-tokenmaxxing-due-to-pressure-to-use-ai-tools/). Nature Machine Intelligence ran an editorial, [stop tokenmaxxing and deploy AI sensibly](https://www.nature.com/articles/s42256-026-01253-5). uber's COO said it's [getting harder to justify the token spend](https://www.businessinsider.com/uber-coo-andrew-macdonald-ai-token-spending-harder-justify-2026-5).
- june: the Economist, [companies are scrambling to curtail soaring AI costs](https://www.economist.com/business/2026/06/14/companies-are-scrambling-to-curtail-soaring-ai-costs).
- july/august: AP, [tokenmaxxing fades as workplaces cut tech spending](https://apnews.com/article/ai-token-openai-anthropic-corporate-31bb80ac1cd7862d05f6397177d826b1). microsoft tells engineers [tokenmaxxing is not what we are optimizing for](https://www.404media.co/microsoft-tells-engineers-tokenmaxxing-is-not-what-we-are-optimizing-for/).

the measure became the target and stopped being the measure of anything. 

what should actually be measured is intelligence required per task and then working your way back to the model size and data. the ecosystem for this is maturing now and it is a matter of time before we have organizations with thousands of specialized models running each vertical.

