---
emoji: 📦
title: Batch processing LLM Inference
description: Notes from running LLM operation over 1M documents. 
date: 2024-07-14
layout: base
---

I experimented with a lot of models, and as advertised claude3-haiku gave the best results, in terms of quality and cost. At the time of writing 1K input tokens cost $0.00025. Which is mind blowingly cheap, because the next best model was about 8 times costlier not to mention gpt 4o which was about 20 times costlier.

AWS was obvious for my experiments, Apart from chatgpt group of models, they have pretty wide range of models and it's fairly easy to experiment with them in the playground.
But the SDK are still in beta, and the documentation is still strewn across multiple places.

As of the writing of this article, the stable channel of SDKs are not shipped with the bedrock APIs. The best way is to download it from,

Uninstall any botocore or boto3 that you might have installed previously.
```shell
pip uninstall botocore boto3
```

Install the bedrock SDK by running 

```shell
wget https://d2eo22ngex1n9g.cloudfront.net/Documentation/SDK/bedrock-python-sdk-reinvent.zip
unzip bedrock-python-sdk-reinvent.zip

cd bedrock-python-sdk-reinvent

python3 -m pip install botocore-1.32.4-py3-none-any.whl
python3 -m pip install boto3-1.29.4-py3-none-any.whl
```

Batch inference works, like this. You upload a jsonl formatted file to s3 and then point an output location.


The SDK supports these operations,

{{% code file="/tech/cloud/aws_batch.py" language="python" %}}


The annoying part in setting up the batch inference was the s3 permissioning errors.


## Debugging


There were multiple, unable to access bucket with role type errors.
Which could be solved by changing the **trust boundary** of the bucket to include `bedrock.amazonaws.com`


Max file size allowed is, 512 MB.
For my output token count of 1K at least, when I uploaded 250 MB input. The job failed with a Max time reached when it reached 60%.
So, more likely the real valid file size is 150 MB.

I fragmented my dataset into 150 MB chunks and made multiple jobs out of them. This worked well.

### links
- [troubleshooting bedrock doc](https://docs.aws.amazon.com/bedrock/latest/userguide/security_iam_troubleshoot.html) 
- [Code samples doc](https://docs.aws.amazon.com/bedrock/latest/userguide/batch-inference-example.html)