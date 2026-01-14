---
emoji: 🎥
title: media processing in the cli
description: using ffmpeg, imagemagick and so on
date: 2025-12-12
layout: base
tags: ["tech", "programming"]
---


convert `RW2` format to `jpg` with imagemagick. while maintaining quality.

```bash
for f in *.RW2; do
  magick "$f" -quality 85 "GooglePhotosBackup/${f%.*}.jpg"
  exiftool -tagsFromFile "$f" -all:all "GooglePhotosBackup/${f%.*}.jpg" -overwrite_original
done
```

convert mp4 into good quality video.

```bash
for f in *.{MP4}; do
  ffmpeg -i "$f" -map_metadata 0 -vcodec libx265 -crf 22 -tag:v hvc1 -movflags +faststart "GooglePhotosBackup/${f%.*}.mp4"
done
```
