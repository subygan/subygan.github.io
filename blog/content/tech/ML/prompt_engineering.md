---
emoji: 🤖
title: prompt engineering
description: prompt examples
date: 2024-01-23
layout: base
tags: ["tech", "machine-learning"]
---

## in context learning


## chain-of-thought
Broadly three classes of reasoning tasks
"let's think step by step" seems to be the key phrase

- closed domain reasoning, includes solving canonical domain problems
  - Math, word, logic
- open domain reasoning question-answering that requires broad knowledge, across multiple documents
  - Strategies such as 
- common sense reasoning tasks.

## reasoning performance

![reasoning perf](/assets/images/reasoning_perf.png)

### advantages of cot:
- Allocate additional computation.
- Breakdown into an "interpretable window"
- Could be generalizable to any problems that we face

CoT creates rationale for how the model can think about the problem.

intentionally concise style performs slightly better than CoT in coms cases.

The model is stringing together words with high probability. CoT lets you traverse the most optimal answer path among all possibilities by always chasing a higher probability answer.

#### few shot cot
- Requires carefully crafted few-shot example.

#### answer extraction
- "Therefore the answer is"
- prevents the model from thinking endlessly in a loop

misleading trigger phrases derail the model from thinking clearly. Maybe, this is because of the __recency bias__ 

### references:
- "Scaling language model: Methods, analysis & insights from training gopher"
- "Chain of thought prompting elicits reasoning in llms"
- https://deepmind.google/discover/blog/language-modelling-at-scale-gopher-ethical-considerations-and-retrieval/

### critiques again cot

- Naive and Greedy: first response is assumed to be the best
- Answers with multi hop perform oorly
- Zero-shot CoT misses steps or semantic coherence

### self consistency

- Making sure the model is consistent with its own self and it's responses.

### missing steps (plan and solve (ps) prompting)

- First ask the model to create a plan and then solve it. instead of just CoT

### fixing calculation errors with ps+prompting

- Make the variables come first in the output, so that the model does not lose track of the variables that are involved in the prompt.\

### step-back prompting
- Make an abstract question and then use that abstract question to create answer and then step through it.

__Few shot__ prompting requires pre-meditation of what the logic behind the answer is going to look like. 


### prompt engineering in the library

- CLEAR framework, Journal of academic Librarianship.![link](https://www.sciencedirect.com/science/article/pii/S0099133323000599)
- CRISPe framework for conciseness ![link](https://sourcingdenis.medium.com/crispe-prompt-engineering-framework-e47eaaf83611)
- scite for research tool assistant, available at guides.library.cmu.edu/az/databases

## project

__Expectation__: AI Generated Social media influencer.
  - Focus on one target platform, Youtube, X/twitter, insta, LinkedIn, etc.
  - Not just marketing tool, should be a social relationship asset.
  - Fully ai generated influencer, ariada lopez

__Tools that could help__
- Input Sources:
  - GDELT Project
  - Open interpreter
- Output Tools:

__Things that can be done__
  - RAG for personality information,


__Open Questions__

- Networks
  - Sports

- Which platform, Network, products, data source?

### todo

- 