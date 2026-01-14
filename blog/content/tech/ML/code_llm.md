---
emoji: ⚙️
title: llm code generation notes
description: I explore LLMs and generating code. 
date: 2024-03-19
layout: base
tags: ["tech", "machine-learning"]
---


This is going to be binary analysis with LLM type thing
The idea is to see, if LLMs are able to understand the "language" of binaries and are able to retrieve the underlying vulnerability.

## high level topics

- Decompilation
- Code creation for tasks.

### [chatgpt does better in julia than python why?](https://www.stochasticlifestyle.com/chatgpt-performs-better-on-julia-than-python-and-r-for-large-language-model-llm-code-generation-why/)

- Julia code and stdlib is more consistent than in python
- gpt trips up in the same way new learners of python trip up
- There's too much data on python which means people of different experience levels write python code meaning the training data is inconsistent. But, Julia is usually written by highly specialized people hence the code generation is on a specific level.


### codegen tools
- Starcoder
  - LLM finetuned
- StableLm
  - By stability.ai https://github.com/Stability-AI/StableLM
- Refact Code LLM
  - https://refact.ai/blog/2023/introducing-refact-code-llm/
  - 32% HumanEval

## security in generated code
- [White Rabbit](https://huggingface.co/WhiteRabbitNeo/WhiteRabbitNeo-13B-v1)


## decompilation projects

- https://github.com/kukas/deepcompyle
- https://github.com/albertan017/LLM4Decompile
- [Harnessing the power of LLMs to Suport Binary Taint analysis](https://arxiv.org/pdf/2310.08275.pdf)
  - Straightforward binary and prompting technique, does better than traditional methods requiring complex understanding of very complex tools for taint analysis


## datasets

- [Juliet dataset](https://samate.nist.gov/SARD/test-suites/112)
- [Human Eval](https://github.com/openai/human-eval) is a dataset of prompt and output execution library from OpenAI
  - [Human Eval leaderboard](https://paperswithcode.com/sota/code-generation-on-humaneval) 

## runnning ai generated code

- [Autogen vs Crewai](https://e2b.dev/blog/crewai-vs-autogen-for-code-execution-ai-agents)

## other research papers

- [Evaluating Large Language Models Trained on Code](https://arxiv.org/abs/2107.03374)

## tasks
- https://github.com/bigcode-project