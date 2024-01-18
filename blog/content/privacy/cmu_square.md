---
emoji: ◻️
title: CMU Square
description: My notes on CMU's Square framework
date: 2024-01-18
layout: base
---

SQUARE (Software Quality Requirements Engineering) is SEI's framework for "Improving identification, analysis, specification and management (of software)".

This, Broadly involves 9 steps,

1. __Agree on Definitions__
   - Defining what a specific term and having that consensus lets team communicate effectively and lets them be on the same page.
   - These definitions could also be taken from IEEE and other standard definitions.
   - eg. Access Control Lists (ACL), Stakeholder, SQL injection.
2. __Identify Security Goals__, 
   - Before even starting the process of setting up a security process and frameworks, it is important to have a mutual consensus on what the priorities of the organization are.
   - It is not possible to have a whole goal as "Secure everything." because different areas and systems require different levels of access and security.
   - With security, the tradeoff made is that, at the cost of increased security, usability is hindered and there will be other stakeholders who would be expecting ease of use of the software systems.
   - __Collecting requirements__ from all stakeholders in the org, is important and makes it easier to understand. This could involve brain storming sessions and sorting conflicts in opinions between stakeholders.
   - It is better to have goals in one sentences
3. __Develop Artifacts to support security requirements__,  
   - Developing artifacts here means creating architecture and system diagrams, that make the mutually agreed upon idea visually verifiable.
   - This makes it easier for stakeholders to understand the systems and verify whether it aligns with their goals.
4. __Perform Risk Assessment__,
   - Once the Artifacts are developed, the system should be verified for security vulnerability.
   - This can be done with having a threat model and verify whether the system is resistant against this threat actor.
   - The exit criteria is to look up the vulnerabilities and validate that the system architecture satisfies the Security Goals of the Organization
5. __Select elicitation technique__,  
   - This means to select a technique to discuss with the experts involved and get their opinion from a certain angle. 
   - Some fo the example techniques include, **Structured/unstructured interviews, Use/misuse cases \[Jacobson 92\], Facilitated meeting sessions, such as Joint Application Development and the Accelerated, Requirements Method \[Wood 89, Hubbard 99\], Soft Systems Methodology \[Checkland 89\]**
6. __Elicit Security requirements__, 
   - This answers the question, **what** the systems is going to be doing, instead of being concerned with the **how** of the question.
   - This step is at the heart of the SQUARE process.
   - It helps in understanding the __expectation__ from the system by different stakeholders.
   - It is important to have definite values instead non-quantifiable systems. eg. We should be able to tolerate a DDoS with throughput 1 tb/s 
7. __Categorize requirements__ as to level (system, software, etc.) and whether they are requirements or other kinds of constraints., 
   - This categorization step helps in the next, prioritization step
   - Some example of categories could be, essential, non-essential, system-level, software-level, Architecture-level etc.
8. __Prioritize requirements__, 
   - Based on the classification of the previous steps, the requirements need to be prioritized for the team to be acted upon.
   - The prioritization should align with the security goals of the system.
9. __Requirement inspection__,
   - At this stage in the process, the stakeholders of the systems should come to a consensus on whether the requirements are aligned with their individual goals and help the org in progressing.

## My notes
The framework focuses very much on __Requirement Engineering Team__ and their requirement. To me it feels like, This assumes a waterfall like model, or before the systems are put into place.

This is my personal opinion, but the framework expects and provides a very happy path to the requirement definition goal. Usually organizations are more chaotic and the expectations of the stakeholders changes over time. 

## References:
- [https://insights.sei.cmu.edu/library/security-quality-requirements-engineering-square](https://insights.sei.cmu.edu/library/security-quality-requirements-engineering-square)
- [https://insights.sei.cmu.edu/documents/751/2005_005_001_14594.pdf](https://insights.sei.cmu.edu/documents/751/2005_005_001_14594.pdf)