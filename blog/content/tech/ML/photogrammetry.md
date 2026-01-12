---
emoji: 📷
title: Photogrammetry/VideoGrammetry or the dark art of capturing 2d and generating 3d models
description: Exploring photogrammetry and adjacent areas
date: 2024-10-11
layout: base
tags: ["tech", "machine-learning"]
---

# Capturing

## Questions:

Is it possible to go from, photo/video to high fidelity 3d model, with strong support for texture, without losing a lot of details on noise?


What is the upper limit to the accuracy of commodity sensors?


How impactful is ML ideas such as NERFs and Gaussian splats

## Prior Art

One surprising [post](https://peterfalkingham.com/2019/01/16/small-object-photogrammetry-how-to-take-photos/) was from Peter Falkingham using a DSLR and a tripod.
the final output was amazing. He was using 2018 version of [AliceVision Meshroom](https://alicevision.org/). Which was shockingly good, also open source. 
I should try it out deeply some time. It seems like, it derives the camera orientation directly. Pretty magical. 

Intuitively it feels like, capturing and embedding Gyroscope and other sensor data from the phone would be really useful.

At some point there was a fork of Open Camera for Android available which embeds the metadata with the images taken. But, unfortunately the project is no longer supported

For ios it seems like capturing the [gyroscope data is possible](https://blender.stackexchange.com/questions/28690/how-to-import-recorded-iphone-gyro-data-into-blender). but in the native app, I'm not so sure.

[This video](https://www.youtube.com/watch?v=TeIi0BsR1Qs) was also quite interesting going from photos to image in ideal lighting conditions. I liked that, he compares it with an industry grade scan of the same object.


### iphones 

in capturing information, iphones do have an advantage in having a lidar.

Apple provides native support for this, which is quite interesting. I personally would be skeptical of using it with apple's historical mess of shipping and fixing bugs in their platforms.

[`RealityKit` Object Capture API](https://developer.apple.com/documentation/realitykit/realitykit-object-capture)

 Create 3D models from photos taken on an iPhone or iPad. The resulting USDZ files can be used in AR Quick Look, Xcode projects, or other 3D content workflows. To get the best results, take high-quality photos from multiple angles without strong shadows or highlights.

# rendering

## Questions

- Is WebGL/WebGPU enough to render 3d models ?
- What is the battery load on rendering this? why do websites, wait for user interaction to load the model?
- How likely can we go from photo -> 2.5D object -> render with `useAnimatedSensor` for deeper interaction?
- AR/VR use cases?

## Prior Art

TBD

## misc references:

- https://peterfalkingham.com/2019/01/16/small-object-photogrammetry-how-to-take-photos/
- https://www.mdpi.com/1424-8220/23/2/728
- [How photogrammetry increases cognition](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2020.00144/full)