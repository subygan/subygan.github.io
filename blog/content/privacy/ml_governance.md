---
emoji: 🤖
title: AI governance and threat modelling
description: AI/ML applications bring with them a new class of problems and solutions. These are my notes learning about this
date: 2023-11-9
layout: base
---

## How are ML systems measured.

While training this is the loss and accuracy of the prediction.

For LLMs there are benchmarks like,
- ARC (A12 Reasoning Challenge) ![benchmark.](https://arxiv.org/abs/1803.05457)
  - Knowledge Reasoning framework, instead of a Q&A like SQuAD (Stanford Question Answering Dataset) and (SNLI) Stanford Natural Language Inference.
  - __Distributed evidence__ in sentences, meaning that the answer is evenly distributed throughout the question.

- API-bank, LLM tool usage, evaluation ![API-bank implementation](https://arxiv.org/abs/2304.08244).
- hellaSwag, to evaluate common sense of LLMs by having "adversarial endings" 
- GLUE (General Language Understanding) and SuperGLUE, MMLU, 