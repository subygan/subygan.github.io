---
layout: base
type: page
emoji: ♦️
title: Django issues and quick fixes
description: Fighting with django
date: 2022-02-04 22:15:00
---

CSRF token invalid `__URL__` not in trusted origin

This happens because there is no `CSRF_TRUSTED_ORIGINS` in the settings file. Also make sure that the url __does not have an end slash__
 
 ---

