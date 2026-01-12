---
emoji: q🅫
title: QMD for Hugo
description: How I handle qmd
date: 2025-12-29
layout: base
tags: ["tech", "programming"]
---

I really love just taking notes, run code and having it in my blog.

Quarto is quite cool, I end up committing both the `.qmd` and `.md` files generated from running `quarto render` locally. (haven't gotten to cicd yet.)

This is how the _quarto.yaml file looks like.

```yaml
project:
  type: hugo

format: 
  hugo-md:          # use hugo markdown format
    code-fold: true
    method: goldmark # Ensures compatibility with Hugo's engine
  
execute: 
  warning: false
  freeze: auto       # prevents re-running code unless the file changes
  cache: true        # Optional: speeds up rendering for files that ARE being run
```


I use the katex workflow to render Latex because that is part of what I write and it has worked good so far. qmd files get render into md along with the $...$ syntax and hugo takes over the rendering and creates the required html
