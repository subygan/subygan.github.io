---
layout: base
title: All
emoji: ✅
description: All my articles in one place
---


{% for page in site.pages %}

{% if page.type == "page" %}
 [{{page.title}}]({{page.url}})
{% endif %}
{% endfor %}