---
emoji: 📚
title: library of congress information
description: Looking through the library of congress for a project
date: 2024-08-17
layout: base
tags: ["tech", "programming"]
---

Library of Congress is really an incredible repository of content.
Just scrolling through library of congress is a fascinating mental exercise.

One of my focus was creating news snippets across time from newspapers.
Library of Congress has a sereis called [Chronicling America](https://guides.loc.gov/chronicling-america). which has collected photocopied and OCRd newspapers from 1800s

It's incredibly well managed and beautifully managed.

Every newspaper is identified using an LCCN and there's pretty viewer as well a bulk downloader. which provides all content with the data.
Based on my initial exploration the OCR is fairly on point and I like how it handles the column and row separations really well.

I'm working on converting this wall of text into a dataset of news content with date.

## bulk downloading.

based on the task assignment each newspaper is bundled as tar files. 

There's a file count limit of 10 file for 10 minutes.
But other than that everything is fine.

## lccn

Library of Congress Control Number is a well thought system to identify individual resources.
there's an easy way to go from lccn to newspaper name and information.
