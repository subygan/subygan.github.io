---w
emoji: 🚊
title: ML Guardrails
description: My research diary on looking at ML Guardrails AKA model alignment
date: 2024-02-6
layout: base
---

The base premise is that, aligning the model for the goal that it was created for is a long tail problem and requires multiple guardrails to control it's output. Without this, the model could possibly go off the rails and create a lot of confusion.

There are multiple ways to align the model,
- Finetuning the model for the specific use case
- Creating Input/output validators that rejects any potentially harmful information
- Having a bias validator
- Using Retrieval Augmented Generation.
- Implementing validators at the last, decoding layer so that the model gets output in a certain direction
- Re-prompting with the malformed data to get valid structured data.

By far, the last method is the most accessible and cheap method for application layer developers. This makes sense as, in a typical Model-as-a-service type services, the api usually only gives the decoded text output and at that point, usually the only thing left to do is to give it back to the model and hope it works.


## NeMo

It's a proxy between the user and LLM. allows devs to define programmatic rails using __Colang__

### Topical Rails

- Dialogue flows (canonical form -> pre-defined user flows)

### Execution Rails
- Fact Checking Rail
- Hallucination Rail (Self consistency like SelfCheckGPT)
- Moderation Rail (Jailbreak detection and malicious user messages)
  - input moderation
  - Output moderation


## Guardrails.ai 

This is another open source startup that is attacking the same problem. They have an XML base RAIL language definition that is used to define an LLM flow.
they've implemented pydant to extract valid json output from the model and have reprompting and pipelining configs in the XML.
There are also multiple validators available out of the box so that it makes it easier to create the guardrails. Guardrails.ai does not yet have strategies to control and maintain conversation flow, like NeMo

- IMO, XML is a little unwieldy.

## SelfCheckGPT

- Generates the probability for a sentence
- Multiple variants

## chatGPT
- OpenAI actualy 

## Active problems
- Re-prompting is expensive, both in  terms of cost and time. making multiple non-async API calls are very inefficient and take a lot of time to get any reasonable output.
- The hypothesis of accessing the model through a REST API has actually reduced a lot of innovation possible in these areas. Unless companies start exposing ways to interact with the model and have access to deeper layers, the time delay problem is hard to solve. But, this is not in the horizon, especially with proprietary models.


Hallucination prevention
Application preventing security offense ouputs from LLMs

1. comparison study.
2. prompt rewrite engine -> offers security and improved results

lookup "prompt rewrites" paper.

definitely an interface between user and an LLM is going to be the future.

