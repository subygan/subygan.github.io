---
emoji: 🤖
title: ML journal
description: Journal of my Machine Learning twiddling
date: 2024-08-08
layout: base
---



# 09.27.23

- Tried ML model for face classification with,

```python

        self.backbone = torch.nn.Sequential(
            torch.nn.Conv2d(3,64,kernel_size=7,stride=4),
            torch.nn.Conv2d(64,128, kernel_size=3, stride=2),
            torch.nn.Conv2d(128,256,kernel_size=3, stride=2),
            torch.nn.Conv2d(256, 512,kernel_size=3, stride=2),
            torch.nn.Conv2d(512, 1024,kernel_size=3, stride=2),
            )

        self.cls_layer = torch.nn.Sequential(
            torch.nn.Flatten(),
            torch.nn.Linear( 4096,num_classes),
        )
```

This model overfit spectacularly, training accuracy after 20 epochs was 95% validation accuracy was 15%. 🤯

I'm reading research papers to see what I can do.
- [facenet](https://www.cv-foundation.org/openaccess/content_cvpr_2015/app/1A_089.pdf)
- [resnet](https://arxiv.org/abs/1512.03385)
