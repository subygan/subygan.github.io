---
title: Fixing chrome extension issues
description: logging all the issues I've faced..
layout: base
type: page
emoji: 
date: 2022-02-12 22:15:00
---

### an Unknown error occured while fetching the script.

This happens when trying to load the extension. the manifest.json was pointing to the right service worker but still couldn't fetch it. The problem was that there was some import error or other issue in the service-worker script. I fixed it and the whole thing loaded like a breeze.

### Changes failing to load in the page we are testing or no changes

Reload the page. The content script that is applied to a page does not change after we reload the extension. It has to be reloaded to apply the newly spawned content scripts.