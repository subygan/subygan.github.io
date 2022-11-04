---
title: Designing Data intensive applications notes
emoji: ⚜️
layout: base
description: My notes on reading, designing data intensive applications
date: 2022-10-23
---

## Ch-1: Reliable, Scalable and maintainable applications

- reliability, The system should continue to work __correctly__ even in the face of adversity (hw, sw or human).
  - __faults__ (either synthetic or natural) are when only part of the system misbehaves, If the whole system goes down then it is a __failure__.
  - Fault tolerance machinery can be tested and kept upto date by voluntarily turning of part of the system to see how the system fares in times of faults.
  - __Hardware Faults__ (HDD crash, Faulty RAM, blackout, etc)
    - HDDs have a Mean Time To Failure (MTTF)  of about 10 to 50 years => on a cluster of 10,000 disks, one disk might die per day.
    - This can be overcome with have a RAID setup, dual power supplies and hot swappable CPUs
  - __Software Errors__ Weakly correlated failures across systems.
    - Software bug in linux kernel on June 30, 2012 due to a leap second
    - Runaway processes using up CPU, memory and disk
    - These bugs __could lie dormant for a long time__ without any issues and have the potential to bring the whole system down.
  - __Human Errors__ Any system designed to be used/operated by humans should have a high degree of flexibility because __humans are known to be unreliable__ 
    - well-designed abstractions, APIs, and admin interfaces making it easier to access "the right way" and discouuraging the wrong way
    - Sandbox environments for people to play with
    - Test thoroughly at all levels, from unit tests, integrations tests and manual tests.
    - Quick and easy recovery in case of a failure 
  
- Scalability, As the system grows (data volume, traffic volume or complexity), system should be able to handle it.
  - __What is load ?__ Load can be described in many ways. the __load parameters__ are dependent on the architecture of the system. it can be, __requests per second, read write ratio in the DB, sinultaneously active members in a chat room, or something else.__ 
    - eg. Twitter, broadly has two ops _post tweet_ user can publish a new message to their followers (12k req/s at peak), _Home timeline_ A user can view tweets posted by the people they follow.
      - 12K req/s is easy to handle. But, the problem comes due to fan-out, where each user follows many people and each one of them follow a lot more.
      - There are broadly two approaches 
        1. When a user requests their home timeline, look up all the people they follow, find all the tweets for each of those user and merge them by time. 
        2. Maintain a cache for each user's home timeline, like a mailbox of tweets for each recipient. When a user tweets, lookup all their followers and insert it in their timelines. While this approach offloads a lot of computing ahead of time. Some times there might be requirements where a lot of users have a lot of followers in those cases the computation is just very high.
        3. In a hybrid approach twitter now marks users with significant followers and uses (1) for them and (2) for others
  - _What is performance?__ Once we've described the load, we can investigate what happens when the load increases. in online services it is responce time, in data processors it is throughput
    - Even if we make the same request over and over again, we'll get slightly different response time on every try. And this can vary wildly due to various reasons. Hence __It is better to represent this as a distribution__ .
    - Average time of a service is generally taken to mean the _arithmetic mean_ but, it is not really a good measure.
    - Percentile is a better measure for response times, `p50 of 200ms` is the measure of the median which means that, This is a probability function, which means that atleast 50% of a request would have less than 200ms response time.
      - The outliers can be measured by `p95, p99, p999` and so on. These are called _tail latencies_ , if p95 is 10s then it means that 95 %  of all requests take less than 10s. tail latencies are important for critical services like aws and others.
    - These percentiles are often used in Service Level objectives (SLOs) and service level agreements (SLAs), contracts that define the expected performance and availability of a service.
    - High percentiles become important in services which are valled multiple times as part of serving a single end-user request. The final request can b __only as fast as the slowest request__ 
    - __Approaches for comping with load__ , Architectures are different for one load vs 10X the load.
      - REsources can be _scaled up or scaled out_. Distributing load across multiple machines is called _Shared nothing Architectures_, services can also be _elastic_ meaning being flexible to load and scale up/out based on load.
      - Generally Stateful services are hard to scale than stateless services. This means, the database is kept as a monolith than distributing it.
- Maintainablility, System should be robust to change and be productively extensible
  - _operability_ Make it easy for operations teams to keep the system running smoothly.
    - Monitoring, tracking down problems, keeping the platform up to date, Keeping tabs on system as a whole
    - Defining processes that make operations predictable and help keep the production environment stable.
  - _Simplicity_, Complexity in software slows everyone down and brings down productivity, these are complex systems are called _a big ball of mud_ . Software which is easier to understand.
    - there are several possible _symptoms of complexity_ __explosion of the state space, tight coupling of modules, tangled dependencies, inconsistent naming and terminology, hacks to solve performance problems, special-casing to work around issues elsewhere

## Ch-2 Data models and Query Languages

Data models impacts _How we think about the problem_ making it an important part of decision making.

The idea behind an API is that it, _hides the complexity of the layer below it_ 

Data models can hide a lot of complexities on what they do and don't allow. This makes it important to decide the underlying data model used.

- __Relational Model Vs Document Model__ 
  - in 1970, relational model was a theoretical proposal, mid 1980's RDBMSes have become the tool of choice for people.
  - before relational model, developers had to think a lot about the internal representation fo the data in the database. The goal of the relational model was to hide that implementation detail behind a cleaner interface
  - Other models like, _Network model_ and _hierarchical model_ were the main alternatives, but the relational model came to dominate them.

- __Birth of NoSQL__ is a new attempt to overthrow SQL. A few factors for the adoption of NoSQL databases
  - A need for more scalability, which is hard for relational data, while trivial to do with Non-relational databases
  - Specialised query operations that are not well-supported by the relational model
  - Frustration with the restrictiveness of relational schemas and a desire for a more dynamic and expressive data model.
- __Object-relational Mismatch__ Most languages are Object Oriented, This means there is an awkward translation layer is required between the obects in the application code and the database models and sometimes application models and database models drift away, this is called __impedence mismatch__ 

ORM frameworks can reduce the amount of boilerplate required for this translation.

eg, 
a resume in linkedin can be represented like, so

![sql_resume](/assets/images/ddia/sql_resume.png)
(example given in "Designing Data intensive applciations")

For sucha  document, JSON has the appeal of being much simpler than XML. Document-oriented databases like MongoDB.
For example the same document can be represented like, so.

![json_resume](/assets/images/ddia/json_resume.png)
(example given in "Designing Data intensive applciations")

JSON's unstructured format can be an issue in some use cases. But, it provides better _locality_. The one to many relationships from user's positions educational history and contact info imply a tree structure.

### Many-to-one and Many-to-Many Relationships

If the user has free-text fields for entering the region and the industry, then it makes sense to store them as plain-text strings. But, having a dropdown list with pre-assigned values has it's own benefits

- Consistent style/spellings
- Remove ambiguity
- Ease of updating
- Localization support - easier while translating
- Better search

Generally __Human understandable/used words can change, So it is better to use references, and use ID for the word everywhere else__. Because Human known words can and do change (name of a city, person, place or thing for example). The rule of thumb is that we use references in places where human understandable words are used. This, _reduces duplication_ while also giving flexibility to change in the name.

Normalising of this type of data uses a _many to one _ relationship. This does not fit nicely into the document model. In relational databases, it is normal to refere to rows in other tables by ID, because joins are easy. But, in document model joins are a lot harder perform because multiple queries will have to be performed. 

In the resume example, we could simplify it by __making schools as entities__ And then referencing them in the resume. This allows us to group people from same school together. Making people as entities would let us build features like, a section where people can recommend each other.

In some ways, NoSQL might be repeating history. IBM's Information Management System (IMS) developed in 1968, used a model called _hierarchical model_ , Which has similarities to JSON. IMS Worked well for one to many scenarios, it didn't fare well with many to many scenarios. In those times to solve the limitations of the hierarchical model, two new model of data representation where bought out, _Relational model_ and _network model_ The network model, even though had a fan following has basically faded into obscurity. 

### The network model
The network model was standardised by __Conference on Data System Langugages (CODASYL)__. This _CODASYL_ model was implemented by several database vendors.

CODASYL model was a subset of the network model where each entity only had one parent, while the network model could have n parents. These were referenced with each others, unlike in SQL, these references were more like pointers, than IDs even though they were stored in the Disk.

This means, that every data had an _access path_ and these path had to be traversed from the root node, like you would traverse a linked list. Even the CODASYL committee agreed that, this is like traversing an N-dimensional data space.


### Relational model

Simple => a relation (table) is just a collection of tuples (rows)

- Any/all rows can be matched and read based on a column designated for keys.

in RDBs the __query optimiser__ decides which parts of the query to execute in which order and what indexes to uses. => basically an _access path_ 
query optimisers are complex entities and cool thing is that once you create a query optimiser, all applications that use it can leverage it.

### Schema flexibility in document model

document models have no schema and that is a big advantage => all schema evaluation can be enforced at the application level, instead of the database level. => makes document model very flexible, while the relational model is rigid and requires big migration of the database to add/remove columns.


### Data locality for queries

if data is accessed often, having all the data in the same locality is better for performance. This is how document databases operate and makes it better for performance. relational database might not guarantee that all data for a particular query would be in the same segment in memory and might require multiple seeks to complete.

Google spanner database offers same locality properties in relational data model, by schema to declare rows taht should be interleaved. Most relational databases also support XML and json formats. Postgres has a _jsonb_ format which stores json data in an optimal format making it easier to index data inside json blobs.

### Query Languages for data

SQL is a _declarative query language_ while, IMS and CODASYL have _imperative query language_ 

Most common programming languages are imperative. Meaning, they'll have to be clear about what they say and achieve.

```
function getSharks() {
  var sharks = []
  for (var i=0; i<animals.length; i++) { 
    if (animals[i].family === "Sharks") {
      sharks.push(animals[i]);
    }
  }
  return sharks; 
}
```

eg of imperative language

this is almost equivalent to the relational algebra,


sharks = σ<sub>family</sub> = <sub>“Sharks”</sub> (animals)

where, σ is the selection operator, returning only those animals that match the condition family = "Sharks".

in SQL this would be,
`SELECT * FROM animals WHERE family='Sharks';`

imperative => you decide the pattern of access, you decide the way to filter and everything else
declarative => We dictate, how we want the data and the final conditions of the data, not how to fetch it. The data implementation detail is essentially hidden from the user and the database is allowed to make decisions based on the data it has. like, cleanup jobs and memory journaling.

### Queries on the web

css queries in html documents are an example of declarative queries as well.

For example

```css
li.selected > p {
  background-color: blue ;
}
```

this is a query that basically says all selected list item with paragraph should be blue

alternatively this can be done more verbosely in javascript by

```js
var liElements = document.getElementsByTagName("li"); for (var i = 0; i < liElements.length; i++) {
  if (liElements[i].className === "selected") { var children = liElements[i].childNodes; for (var j = 0; j < children.length; j++) {
    var child = children[j];
    if (child.nodeType === Node.ELEMENT_NODE && child.tagName === "P") {
      child.setAttribute("style", "background-color: blue");
    }
  } }
}
```
which is a lot more verbose. and this has the disadvantage of not using the optimisations offered by the browser itself.

### Map reduce

Map reduce is a model to process large amount of data across many machines.


eg, counting the number of elements in a db
this can be done by querying for all observations with the criteria and then counting them. example,
`SELECT data_trunc('month', observation_timestamp) AS observation_month, sum(num_animals) AS total_animals FROM observations WHERE family='Sharks' GROUP BY observation_month`

in map reduce can, this can be done by

```js
db.observations.mapReduce( 
    function map() { //2. Map, called once for every document
      var year = this.observationTimestamp.getFullYear(); 
      var month = this.observationTimestamp.getMonth() + 1; 
      emit(year + "-" + month, this.numAnimals); //3 emit string of format "2014-12" and a value
    },
    function reduce(key, values) { //4. emitted values from map go here as args. This is then processed
      return Array.sum(values); 
      },
    {
      query: { family: "Sharks" }, //1.Query filter
      out: "monthlySharkReport"
    });

```

This enables us to perform distributed queries. But, nothing is stopping SQL DBs to not do the same. They are able to handle the same very well as well.

## Graph like Data Models

Graph DBs are very useful in one-to-many cases. But, _relational models can only handle simple cases of relations_. In cases where much more complicated Databases are required, a graph database makes a lot more sense. Graph DBs generally have vertices and edges some examples include 
- _social graphs_,  Vertices are people and edges indicate which people know each other
- _web graph_, Vertices are web pages and edges indicate HTML links to other pages
- _Rail networks_, Vertices are junctions, and edges represent the roads or lines between them

Navigation systems, Shortest path finding algorithms can work on these databases

## Property graphs

Each vertex consists of 

- A unique identifier
- A set of outgoing edges
- A set of incoming edges
- A collection of properties(kv pairs)

Each edge consists of

- A unique identifier
- The vertex at which the edge starts (the tail vertex)
- The vertex at which the edge ends (the _head_ vertex)
- A label to describe the kind of relationship between the two vertices
- A collection of properties (key-value pairs)


In this model, both vertex and edge can be tables in a DB and everything can be done using queries
for example,
A property graph can be created using

## Triple-Stores and SPARQL

The triple-store model is mostly equivalent to the property graph model.
in a triple-store, all informations is stored in the form of very simple three-part statements: (subject, predicate, object). for example,

(Jim, likes, bananas). The subject is equivalent to a vertex in a graph. 


### Cypher Query language
query language for property graphs


## Ch-3 Storage and retrieval

- simplest database possible.
  - append data to a file in comma seperated fashion. fetch when required
    eg,
  ```shell
    db_set () {
    echo "$1,$2" >> database
    }
    db_get () {
    grep "^$1," database | sed -e "s/^$1,//" | tail -n 1
    }
  ```
  - writes are fast, read is slow as O(n).
  - To _effectively find the keys_  we need an _index_ . But writing to the index takes extra time during writes, slowing it down
  - The trade off is, well chosen indexes fasten queries. But, slowdown writes
  - Simplest index would be a hashmap which stores the offset of the data in the file. making it faster to fetch
Usecase, we need to record number of times a video is played.
  - We can only append to a file. break the file into even sized chunks, when it reaches a certain size. _compaction_ can then be performed on these segments.
  - While compaction is happening, reads can still happen in the old files. Merging of multiple segments can also be done, without impact to reads
  - Here, every segment has it's own hashmap. To find a key, we check in the recent segment's hashmap and then the next and then the next.
  - __file format__ binary blob is better than csv
  - __Deleting__ When deleting a special record is made against that key. While merging, those keys are deleted
  - __Crash recovery__ Hashmap creation for every segment while startup would be slow. writing down index to disk helps in that
  - __Partially written records__ When database crashes while appending, it could mangle the data. Bitcask files include checksums, allowing corruption detection
  - __Concurrency control__ have only one writer thread. Reads, can be concurrent
  - This only works if the _hashtables fit into memory_. Hash maps on disk is finnicky. Range queries are not efficient

### SSTables and LSM-Trees

- In the same above structure, _we can store logs in string sorted format_ . Also, _a key only appears once in a merged segment_

- maintain a memtable before writing anything down. when the memtable becomes bigger than a threshold. Write to disk as an SSTable file.
- While reading, we can try the memtable first and in the most recent disk segment and the next and so on.
- Occassionally Merge segments with these properties => compaction + merge

### Making an LSM-tree from

## Technical Words:

- __impedence mismatch__ - Drift between, ORM and actual DB model
- __data normalisation__ - Standardising data representation by using entity reference instead of, 
- __Triple-Store__ - Model of data where, tuples of 3 are stored in graph like databases and can be queried
- __Compaction__ - throwing away duplicate keys in the log and using only the recent ones.
- __Sorted String tables__ - 
- __memtable__ - in-memory tree