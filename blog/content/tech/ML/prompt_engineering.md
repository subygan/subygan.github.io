---
emoji: 🤖
title: Prompt Engineering
description: prompt examples
date: 2024-01-23
layout: base
---

## In Context Learning


## Chain-of-Thought
Broadly three classes of reasoning tasks
"let's think step by step" seems to be the key phrase

- closed domain reasoning, includes solving canonical domain problems
  - Math, word, logic
- open domain reasoning question-answering that requires broad knowledge, across multiple documents
  - Strategies such as 
- common sense reasoning tasks.

## Reasoning Performance

![reasoning perf](/assets/images/reasoning_perf.png)

### Advantages of CoT:
- Allocate additional computation.
- Breakdown into an "interpretable window"
- Could be generalizable to any problems that we face

CoT creates rationale for how the model can think about the problem.

intentionally concise style performs slightly better than CoT in coms cases.

The model is stringing together words with high probability. CoT lets you traverse the most optimal answer path among all possibilities by always chasing a higher probability answer.

#### few shot CoT
- Requires carefully crafted few-shot example.

#### Answer extraction
- "Therefore the answer is"
- prevents the model from thinking endlessly in a loop

misleading trigger phrases derail the model from thinking clearly. Maybe, this is because of the __recency bias__ 

### References:
- "Scaling language model: Methods, analysis & insights from training gopher"
- "Chain of thought prompting elicits reasoning in llms"
- https://deepmind.google/discover/blog/language-modelling-at-scale-gopher-ethical-considerations-and-retrieval/



