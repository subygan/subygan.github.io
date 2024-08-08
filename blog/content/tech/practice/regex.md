---
title: Regex
emoji: ⠝
layout: base
description: Regex learning
date: 2022-11-06
---


\?(?!.*\]).*[^\(]\) - Select all content between the last `?` and the last `)` in a line and excludes if `]` comes between

useful to remove the query string in a url

uses something called as [Negative Lookahead](https://www.xlayer.co.za/forum/viewtopic.php?id=105) to exclude

---