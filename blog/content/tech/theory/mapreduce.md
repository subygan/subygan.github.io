---
title: Mapreduce
emoji: 🗺️
layout: base
description: Notes from the google's mapreduce paper
date: 2022-12-24
---

MapReduce is a programming model published in 2004 by google, to process large data in clusters

in general, it involves 2 events 

```
map(String key, String value):
// key: document name
// value: document contents
    for word in value:
        EmitIntermediate(w, "1"); // Write to intermediate file store

reduce(String key, Iterator values):
// key: a word
// values: a list of counts

    int result = 0 
    for each v in values:
        result += ParseInt(v);
    Emit(AsString(result)); //Write to output file
```

### Workflow

- MapReduce library in the user program __splits the input files into M pieces__. Then it __starts up copies of the program in a cluster of machines__.
- One copy is the master, everything else are workers. There are M map tasks and R reduce tasks to assign. Master assigns M/R to idle workers.
- worker parses the input data and passes each pair to user-defined map function. intermediate values are buffered in memory.
- Periodically, buffered values => written to disk => forwarded to master => forwarded to reduce workers
- Reduce workers => notified by master, of the disk location => r-workers make rpc call to fetch file from m-worker => sort based on keys (so that same intermediate keys are grouped together) => passes key and correspond intermediaet value to the user-defined reduce function. output is appended ot a final output file for this partition.
- when all map-reduce tasks are done. master wakes up the user program.

### Master Data Structures

- State of tasks
- intermediate data location