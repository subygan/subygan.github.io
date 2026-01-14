---
emoji: 🛣️
title: graphs and llms
description: There are a lot of graph problems being re-thought __for LLMs__ and __by LLMs__
date: 2024-02-11
layout: base
tags: ["tech", "machine-learning"]
---

I'll add the ones with the most fun:utilization first

### building graphs using llms:

This strategy comes clearly under the __by LLMs__ category and the most obvious one as well. Because of their semantic understanding, LLMs can be prompted into providing the triplets of relationship between the entities in a piece of text. Throw a piece of text, and it draws a graph of the relationship between subjects and objects
This is a relatively straightforward utilization of an LLM's ability to find pattern in text.
eg. [GraphGPT](https://news.ycombinator.com/item?id=34605772)w

### pathfinding in a graph

LLMs are not trained to traverse graphs. Especially, they've not been explicitly taught how to model a graph from a triplet. But seems like they perform fairly well. The first graph in the blog from [jacob brazeal]https://jacobbrazeal.wordpress.com/2022/09/23/gpt-3-can-find-paths-up-to-7-nodes-long-in-random-graphs/) is very telling.
GPT-3 was able to 

## references
