---
emoji: ⚔️ 
title: Searching for a cross platform framework
description: My journey on trying to find a cross platform application development framework.
date: 2022-01-29 22:15:00
layout: base
---

This is still a WIP and I'll be updating each one as I discover and play with new stuff.

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

examples: slack, discord, VS code, [more stuff here](https://www.electronjs.org/apps)

### [NWjs](https://nwjs.io/)
creates a node runtime in the browser to render the website. which means, on first install it has to be bundled with everything that comes with it as well. This could get pretty heavy overtime.


![node_modules image](/assets/images/nodem.png)


One nice(?) thing about NWjs is that it still supports windows xp.

### [NeutralinoJS](https://neutralino.js.org/)
Neutralinojs takes slightly a different(smarter?) approach by using the system's default browser instead of bundling a whole chromium browser with it.
Neutralino clearly has its benefits over the other two in both build size and memory footprint. It still supports only desktop applications

similar

- [Neutralinojs vs NWjs vs node evaluation](https://github.com/neutralinojs/evaluation)

examples: [here](https://neutralino.js.org/apps/)

### [React Native](https://reactnative.dev/)

As far as I've seen React Native feels like a mix of so many things. its a sublet from a "web"-framework that has been changed fairly to interact with native components written in `JAVA`, `objective C` and `C#` using so called bridges. This mildly reminds me of the [chimera](https://en.wikipedia.org/wiki/Chimera), a freak of nature not really sure why.

examples: Coinbase, shopify, flipkart and [others](https://github.com/ReactNativeNews/React-Native-Apps)

Personal notes:
- the hot reload is nice

### [Qt](https://www.qt.io/)

Qt is a cross platform proprietory framework that is being used by a lot of applications. they provide a free version with an [LGpl](https://www.gnu.org/licenses/lgpl-3.0.en.html) license and link the app dynamically instead of statically. Which, might satisfying for most application. Also, it requires you to write in  `c++` and does not exactly support android. The widgets can get old. and new native features might be a bit late to come by.

Personal notes:
- Having to use a proprietary IDE for development is annoying

example apps: telegram, skype

### [Flutter](https://flutter.dev/)

Flutter is a multiplatform application development framework which uses dart as a main language. It's relatively new, being published in 2019. It supports android, ios, macOS, linux, windows and web. And runs in [near native performance](https://medium.com/swlh/flutter-vs-native-vs-react-native-examining-performance-31338f081980). It does not use native components directly, like React native instead choosing to paint all the widgets using the [Skia](https://skia.org/) 2d rendering engine, which means the widgets aren't exactly native but native-like. 

examples: Zomato, Zerodha and [others](https://flutter.dev/showcase)

### [Kotlin](https://kotlinlang.org/docs/multiplatform.html)

Kotlin Multiplatform is a framework build on top of kotlin to build apps for multiple platforms including, web, tvOS, macOS, android, ios. Kotlin skews more towards business logic and is heavy in that angle. It works by having custom modules for seperate platforms and one unifying part. Since Kotlin, has complete backward compatibility with Java and runs in the JVM, it is able to support multiple platforms.

personal notes:

- having tried to develop android apps, the whole setup is huge and heavy. Android studio + adb just sucks up a lot of memory.
- There is no hot reload. Meaning the feedback loop is incredibly slow.
- Kotlin is pretty easy to pick up.


## Resources I found useful

- [Flutter vs react Native](https://www.thedroidsonroids.com/blog/flutter-vs-react-native-what-to-choose-in-2021)
- [kotlin vs xamarin vs flutter vs react native ](https://doit.software/blog/flutter-vs-kotlin-which-is-best-for-cross-platform-app-development#screen26)
    - A pretty comprehensive explanation of everything involved
- [Gravity of cross platform apps](https://allenpike.com/2021/gravity-of-cross-platform-apps)
    - A pretty good reason for why big companies have the need to switch to electron&co
    - [one password migration to electron](https://blog.1password.com/1password-8-the-story-so-far/)
- [What happens to react Native app during compiling](https://stackoverflow.com/questions/41124338/does-react-native-compile-javascript-into-java-for-android)
    - Basically a JS process is running in the background and send commands via bridges.
- [understanding react native bridge concept](https://hackernoon.com/understanding-react-native-bridge-concept-e9526066ddb8)
- [Kotlin vs Flutter](https://discuss.kotlinlang.org/t/should-i-start-learning-kotlin-or-go-with-flutter/14567/2)
- [Why Dart instead of kotlin](https://discuss.kotlinlang.org/t/google-flutter-what-could-be-their-reason-for-choosing-dart-over-kotlin/21179/2)
- [People who went full on in flutter](https://news.ycombinator.com/item?id=30145434)
    - This guy raises some valid problems with flutter.
- [Migrating from react native to Android in zerodha](https://zerodha.tech/blog/from-native-to-react-native-to-flutter/)
    - Then these guys say, flutter was awesome.
- [flutter testing framework](https://docs.flutter.dev/testing)
- [Alibaba's flutter story](https://alibabatech.medium.com/utilizing-flutter-best-practice-from-alibaba-236a53aa32c8)
    - They seem to love it.
- [Flutter vs React Native](https://www.youtube.com/watch?v=X8ipUgXH6jw)
- [flutter, RN, swift objective C performance benchmark ](https://medium.com/swlh/flutter-vs-native-vs-react-native-examining-performance-31338f081980)
- [React native issues and positives at shopify](https://shopify.engineering/managing-native-code-react-native)