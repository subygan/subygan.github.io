---
emoji: 🦤
title: Building an extension
description: My notes on building a browser extension
date: 2022-02-02 22:15:00
type: page
layout: base
---

browser extensions have been an area of interest for a while. I tried building an extension that would help me save stuff in my [readlog](/readlog). Sort of simply highlight stuff from within the page.

## Chrome extension Architecture.

There are Broadly a few moving pieces in an extension, `manifest.json`, `Background script/service worker`, `content-script`, `popup.html`, `popup.js`

![extension Architecture](/assets/extension_architecture.png)

### manifest.json

Manifest.json is the central part that makes sure that the extension gets registered properly.

### Background script

Background script is simply just a [service worker](https://developers.google.com/web/fundamentals/primers/service-workers) that runs in the background. Each chrome profile that has an extension has exactly one service-worker. This is shared across all tabs
The debugging window for a background script can be found from the [chrome://extensions/](chrome://extensions/) window.

### Content-Script

Content scripts are spawned per tab and are run for that tab, specifically. This helps in getting tab specific content and execute scripts in tabs.

### popup.html

This is the thing that gets displayed when the icon is clicked from the window.

### popup.js

Popup js is should be sent with the app bundle and loaded from `popup.html` and it can't be loaded from third party site as the Content Security policy prevents it.

### Messaging passing

`popup.js`, `content-script` and `background script` all talk with each other by passing messages with each other by using the [chrome messages api](https://developer.chrome.com/docs/extensions/mv3/messaging/).

### [Chrome.scripting](https://developer.chrome.com/docs/extensions/reference/scripting/) API

this api can be used to execute arbitrary script in a tab.

### stuff I found useful

- [Chrome extension V3](https://github.com/SimGus/chrome-extension-v3-starter)
