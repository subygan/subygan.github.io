---
emoji: 🗝️
title: privacy problems and attacks in machine learning
description: ML problems are usually solved by throwing more data at it. More data, compounds the privacy problems faced by these models. This is a list of papers and articles that talk about these problems.
date: 2024-07-19
layout: base
tags: ["tech", "privacy"]
---

## privacy problems and attacks in machine learning

- __Membership inference attacks__: These aim to determine if a particular data point was used to train a model. Researchers study how to detect and mitigate such attacks to protect individuals' privacy.
- __Model inversion attacks__: These attempt to reconstruct training data from model outputs. Understanding these vulnerabilities helps in developing more robust privacy-preserving techniques.
- __Data reconstruction in federated learning__: This examines how malicious participants could potentially extract private information from other participants during collaborative training.
- __Model extraction attacks__: These involve extracting a model's architecture or parameters, which could be used to launch further attacks or to steal intellectual property.
- __Data Poisoning in Edge ML__: This is a problem where the data that is being used to train the model is poisoned by an attacker. This is a huge problem in edge ML where the data is not curated and is coming from a variety of sources.
- __Differential privacy techniques__: Researchers explore how to add controlled noise to data or model outputs to preserve privacy while maintaining utility.
- __Secure multi-party computation__: This involves developing protocols for multiple parties to jointly compute on private data without revealing individual inputs.
Homomorphic encryption: This allows computations on encrypted data, potentially enabling privacy-preserving machine learning on sensitive information.
Privacy-preserving record linkage: Techniques to securely combine datasets from multiple sources without compromising individual privacy.



## papers and other readings

- [Membership Inference Attacks Against Machine Learning Models](https://www.cs.cornell.edu/~shmat/shmat_oak18.pdf)
  - MIA is an attack vector against ML models where the original dataset is inferred from the model's output distribution. This leverages a very curious failure of ML models where they overfit to previously seen data. Based on the confidence scores from the models it is possible to rebuild the original dataset. This has privacy impact in that, it is possible to rebuild a dataset from a model that was trained on it. This is a huge privacy violation.
  - In this paper the authors train an ML model to look at the target model's predictions on the inputs it trained on versus the input it did not train on.

- [Model Inversion Attacks that Exploit Confidence Information and Basic Countermeasures](https://dl.acm.org/doi/10.1145/2810103.2813677)
  - This paper showcase attack is done on Facial Recognition Models, where the attacker is able to figure out the original face on ML models with different ML models 