---
title: Zappa notes
emoji: ⚡️
layout: base
description: Using, zappa to deploy stateful serverless apps
date: 2022-10-08
--- 

Zappa comes with the wild promise of being able to run serverless python wsgi applications written in frameworks like, flask and django. It's an interesting proposition. and one I've been wanting to deploy myself.

Zappa comes with a cli and can be installed with `pip3 install zappa` and then doing `zappa init` => Go through the setup => `zappa deploy <stage_name>` and the service is deployed in aws lambda, with keep awake using cloudwatch, domain, service versioning and so much more. => `zappa update <stage_name>` updates the service with the new code, it can be rolled back, rolled forward and so on. => `zappa tail <service_name>` to get the service logs.



Resources:
- https://blog.perwagnernielsen.dk/django_sqlite_zappa.html
