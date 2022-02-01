---
layout: base
type: page
emoji: 
title: Searching for a cross platform framework
description: My journey on trying to find a cross platform application development framework.
date: 2022-01-29 22:15:00
---

This is still a WIP and I'll be updating each one as I explore new stuff

## Why Cross platform?
There are majorly 2 mobile platforms and 3 desktop platforms. Browsers are acting as a cool layer between this, within the realms of which applications are consistently rendered and usability is not spoilt. This is awesome, because now you don't need 5X the development effort to deliver a software experience But only one. Which means velocity can be much faster. But the problem with this, is that "websites" are not really perceived as serious applicaitons. And there is very little control over the user experience. Native apps are a better way to deliver applications.

## Requirement

- build apps across all 5 platforms with max code overlap across. (ideally)
- Small build size
- Snappy performance
- If only desktop apps only
    - >95% code overlap
- If only mobile apps
    - >95% code overlap.
    - uptodate API support


## Options.
There are broadly a few ways this is being done.

- Use a browser to render the application (electron, Deskgap, nwjs, et al.)
- Provide SDKs that compile to native code (Qt, flutter, et al)

## Browser based solutions

### [Electron](https://www.electronjs.org/)
Electron supports all major desktop platforms. And simple HTML, CSS and JS stack works perfectly fine without any issue.

Electron is unanimously disliked by everyone for being such a memory hog, which seems unescapable when you're shipping an entire browser with the application. Also, this kinda bloats up the app bundle as well. A hello world production app takes up about 50 MB which is insane. [station's story](https://web.archive.org/web/20200926071714/https://stationhq.com/blog/station-1-the-technical-back-story) is a cautionary tale to anyone who tries to go down this path.


### [NWjs](https://nwjs.io/)
creates a node runtime in the browser to render the website. which means, on first install it has to be bundled with everything that comes with it as well. This could get pretty heavy overtime.


![node_modules image](/assets/images/nodem.png)


One nice(?) thing about NWjs is that it still supports windows xp.

### [NeutralinoJS](https://neutralino.js.org/)
Neutralinojs takes slightly a different(smarter?) approach by using the system's default browser instead of bundling a whole chromium browser with it.
Neutralino clearly has its benefits over the other two in both build size and memory footprint. It still supports only desktop applications

- [Neutralinojs vs NWjs vs node evaluation](https://github.com/neutralinojs/evaluation)

### [React Native](https://reactnative.dev/)



## Resources I found useful

- [Flutter vs react Native](https://www.thedroidsonroids.com/blog/flutter-vs-react-native-what-to-choose-in-2021)