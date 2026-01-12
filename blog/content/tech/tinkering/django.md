---
layout: base
emoji: ♦️
title: Django issues and quick fixes
description: Fighting with django
date: 2022-02-04 22:15:00
tags: ["tech", "programming"]
---

CSRF token invalid `__URL__` not in trusted origin

This happens because there is no `CSRF_TRUSTED_ORIGINS` in the settings file. Also make sure that the url __does not have an end slash__
 
 ---

log all sql queries

simply add in `settings.py`

```python
LOGGING = {
 'version': 1,
 'disable_existing_loggers': False,
 'handlers': {
  'file': {
   'level': 'DEBUG',
   'class': 'logging.FileHandler',
   'filename': 'sql.log',
  },
 },
 'loggers': {
  'django.db.backends': {
   'handlers': ['file'],
   'level': 'DEBUG',
   'propagate': True,
  },
 },
}

```
