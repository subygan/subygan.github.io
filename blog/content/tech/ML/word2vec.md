---
emoji: 🈴
title: Word Embedding Models
description: I've beeen working with word embeddings a lot lately.
date: 2024-08-4
layout: base
---

__My aim for this blog was to keep it as not too technical as possible.__


Word embeddings is a way to represent words as a vector.
Which lets us do all kinds of trickery like how far a word like "King" is away from "Queen" and how they are related to each other with.
Very useful when building applications with semantic understanding.

I've been using gensim a lot.
gensim is a very popular library for working with words in ML models and making them super easy to use.
Usually models like Word2Vec (Google) and FastText (Facebook) are trained ahead of time on a corpus and then based on how useful/relevant that corpus is, to our target we can utilize it.

In my case, I was trying to find similarity in company names and their types.
So, I had to fine-tune this model with my new words.
I split every single word in the company name and then used FastText to train it.

One interesting point with using gensim and training a new model is that, it spits out 4 different files in all.
and all 4 files are needed to load the model again.

I utilized a dataset of 20 Million companies. Which took a minute to load and train and then I had move all these 4 files around to get it to work. which was a fair amount of work.
Maybe I'll do a patch on gensim to load it in one fat file.

One cool thing about these vectors is that, once you save it they are model agnostic. (i.e.) you can train in FastText and then load it in Word2Vec
[This comparison notebook between word2Vec and FastText](https://github.com/piskvorky/gensim/blob/develop/docs/notebooks/Word2Vec_FastText_Comparison.ipynb) was pretty useful for me.

