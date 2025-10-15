---
layout: base
type: page
emoji: ⛓️‍💥 
title: Makemore
description: building a LM that predicts sequence of characters
date: 2025-02-24
---

makemore is a character level language model and models the sequences of characters.
specifically to create names.


## bigram

only looks at the previous words and predicts the next word.

is an exponential modelling of the problem


## bag of words 


## MLP for name creation

Bengio et al

Converting every character into a one hot encoded matrix (embeddings)
and then being able to run it through a model apply tanh so that those are all scores
and in the end applying  softmax to convert it into a 

  