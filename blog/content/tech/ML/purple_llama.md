---
emoji: 🦙
title: Purple LLama
description: Purple Llama CyberSecEval a secure coding benchmark
date: 2023-12-11
layout: base
---

PurpleLlama is a new framework proposed by Meta to evaluate LLMs for their secure coding ability.

## CyberSecEval
This is the core part of the research paper which has created a [benchmark for LLMs](https://github.com/facebookresearch/PurpleLlama/tree/main/CybersecurityBenchmarks) to test generated code.

Implementors only have to implement a class with a method signature `query(self, prompt: str) -> str` to test their respective LLM.

Meta advertises This as "Announcing Purple Llama: Towards open trust and safety in the new world of generative AI" in their [blog post](https://ai.meta.com/blog/purple-llama-open-trust-safety-generative-ai/)
But this naming is somewhat misleading as Purple LLama, the way it is implemented currently is that this checks the code output given by LLMs for security problems based on [MITRE Common Weakness Enumeration](https://cwe.mitre.org/).
They have a better title in the paper, "Purple Llama CyberSecEval: A benchmark for evaluating the cybersecurity risks of large language models" because that is what it does currently. This is a step in the right direction as adoption of LLMs hockey sticks into adoption, cybersecurity risk/vulnerability in one model could get distributed easily. Especially with the number of automated code generation tools that are being created with LLMs.    
Along with this Meta has also introduced a [CyberSafetyEval leaderboard](https://huggingface.co/spaces/facebook/CyberSecEval). This is good as it encourages companies to build models that provide secure code.

## [LLama Guard](https://ai.meta.com/research/publications/llama-guard-llm-based-input-output-safeguard-for-human-ai-conversations/)

LLama Guard is a finetuned LLama with Anthropic's [human preference dataset](https://github.com/anthropics/hh-rlhf). Llamaguard performs better than OpenAI Mod in ToxicChat.
Other than that, in almost every other tests, LlamaGuard performs better in Meta's tests and OpenAI performs better in theirs because of Obvious reasons.

Except for adaptability. where the model is expected to adapt to a new policy change. In this case, LLamaGuard performs better than OpenAI in OpenAI's own OpenAi Mod benchmark.
Adaptability was tested purely with prompts, as this is a very flexible way of improving the policy
It is great that Meta is publishing these model completely available to everyone.
It is also interesting to note that, we now have multiple SOTA models specializing in different tasks.

## notes and References:

- [Simon Willson's blog](https://simonwillison.net/2023/Dec/8/purple-llama/)