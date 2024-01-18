---
emoji: 🔐
title: Data privacy
description: 
date: 2024-01-16
layout: base
---

These are my notes from Nishant's excellent book, [Data Privacy: Runbook for Engineers](https://www.oreilly.com/library/view/data-privacy/9781617298998/)


## 1 Privacy engineering

- Data Security is usually tightly coupled with privacy. Data security is a base condition to guarantee privacy.
- Data privacy is about how data of users is being accessed and processed.
- There are 4 broad process for data privacy that the author describes,
  - Data classification
  - Data inventory
  - Data deletion
  - Data obfuscation

### How data flows.
- From a Tech leader's standpoint, they need a catalog of data to figure out the tooling to deploy for each case.
- Without the catalog the leader would be flying blind.

### Why privacy
- Direct motivators for companies
  - Fines are getting bigger and numerous each year.
  - non-investment in the Early stage cases late-stage headaches
    - I liked the Gamebuster example, where IP addresses where being queried by automated scripts and copied in other tables, A clear failure of access control. which led to multiple impacts across the product. My question was, how would a leader be aware of this structure? is getting their hands dirty the only way?
  - Investigations are usually long and take a lot of the company's and it's leader's valuable time. eg. Bill Gates and his Distraction.
\[personal note,\] it was interesting to me that all the Data protection examples are from EU and none from America. Show's the fragmented regulation in the US?
- There is a lag between engineering and the law, which means engineering has to be prescient about the future laws and it's consequences.
- Regulatory certifications, makes it easier to,
  - Have structure and systems
  - Increase trust in the product
  - Makes work more efficient, because there are already answers to questions

Early data tagging makes it easier to maintain privacy in the system. If we continue Facebook's [ink metaphor](https://www.vice.com/en/article/akvmke/facebook-doesnt-know-what-it-does-with-your-data-or-where-it-goes#:~:text=%E2%80%9CWe%E2%80%99ve%20built%20systems%20with%20open%20borders), With ink that is tagged, you could at least make the ink immiscible and trace it and separate it back. So early tagging is very important. because tags can then be filtered.

#### privacy and macro business

Increasing Publich awareness about privacy has increased scrutiny for companies

Once a law such as GDPR, or CCPA has been passed, it exposes companies to investigations and scrutiny. Which could damage trust and relationships in the business. These laws are backward enforceable, meaning it's applicable to tools and processes that were present before the law. 
\[personal anecdote\], I've talked with people at companies where data is still replicated across multiple different services and deleting a user data is still something that a person manually spends, hours scrubbing across multiple databases. 

### Privacy tools and options

- Know the entrypoints of sensitive data such as, name, DOB, SSN, IP Address etc
- Protect this information with Access control tools
- Reduce the exposure of these data. Handle it like you would handle Radioactive elements.

#### Build vs Buy

- Buying might mean the data is exposed to a third party. While, building might keep it in house.
- In some cases, Buying might be cheaper than building. But, building would help you make it more customized.
- External tools might optimize for consistency over availability which are a no-go for privacy tools.

The author also goes through detailed analysis of tools such as BigId and OneTrust. These tools are generally designed to be integrated __after__ data has proliferated a lot.

## 2. Understanding Data Privacy

- Privacy is Hard because,
  - Privacy is subjective and could mean different things for different people
  - Data is only as protected as the weakest link in the system. Vulnerability at one stage leads to overall compromise
  - It's easy and cheap to copy data, which means right after the moment data enters your system, it starts getting proliferated across multiple systems.
- Privacy requires broadly 4 expectations,
  - __data protection__, meaning the received data is reliably protected from external threat actors
  - __Right to know__, Companies are guardians of data and need to provide the user with the right to look at what data the company has on them.
  - __Right to be forgotten__, The user has the expectation of them completely not being in the company's system when they delete their account
  - __Judicial investigations__, Some data needs to be retained and managed for judicial purposes.
Each of these expectations can be mapped back to a Privacy engineering task,
  - __Data minimization, Authentication, Authorization__
  - __Data Inventory and categorization__
  - __Audits__

### stakeholders and their view.
Every stakeholder in the system have different goals and would be pushing for different data reuirements. eg, Data analytics team needs more data, while the Systems team wants to collect less data

Every data store where data gets settled, needs to have __retention policies__.
When using encryption, other problems like, Key management, rekeying, securing the key, also crop up.


I also liked the hypothetical scenario of the video game platform, and it's increasing appetite for Data and inevitably a breach. While the company was growing really fast, the privacy risk was also growing due to unconditioned permissions.

The author gave examples of data breach from Equifax, OPM, LabCorp and Quest Diagnostics. Interestingly these were all US companies in contrast to the regulatory fines.

The customized gym example showed that unnecessary paranoia by companies also make them lose thier unique value proposition over time. There is a requirement for having __Adequate amount of safeguards.__


### 3 Data classification

Why is data classification necessary?
- There is an asymmetry between the data collector and the Data source. You can collect data from millions of people using a 5 - 6 orders of magnitude smaller teams of people. This is unlike traditional labour, where the effort required scales linearly with the volume of work to be done. 
- It makes __Data Governance__ easier
- Classifying data prioritizes the engineering effort required to secure certain data.
- Not all data are created equally and need to be treated equally.

How you can implement data classification?
- Certain Data have the reidentifiability problem where one datapoint can uniquely identify an individual.
- some data can be mapped against a different dataset to de-anonymize the users
- The author talks about anonymization and differentially private ideas, indirectly.

How does, data classification can help satisfy compliance challenges?
-

How data classification can work cross-functionally?
- 
-
An end-to-end data classification process?