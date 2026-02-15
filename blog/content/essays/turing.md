---
emoji:  ⚙️
title: on turing 
description: and computers
date: 2019-05-12
layout: base
tags: ["essay", "writing", "computer"]
---

![turing](/assets/images/alan_turing_notebook.webp)

I was aware that, computers used logic gates and that they operated using binary bits. But, how do the stupid transistors turn into these amazing computers? This was an intriguing question I’ve bee having for a long while. But, considering that I was blindly throwing the wall and hoping that some of them sticks. I had no possibility of dwelling a lot on these things. And I was this ignoramus, blindly typing away google search strings and questions.


To overcome this, as a new mission. I started reading about the history of computers. Hoping that coming from the origins might be helpful in orienting myself over what is necessary. And I’ve been reading a lot of computer history. from the mechanical computers to the IBM PCs. Which got me into the queer involvement of Alan Turing in this whole jeopardy. Alan Turing, a mathematician is heralded as the visionary who laid the groundwork for modern computers. To the ignoramus me, the fact that a mathematician was the cause of the computer revolution seemed extremely outlandish. So, I decided I’d read his paper ‘On computable numbers with an application to entscheindungsproblem’


In the past year or so, I’ve been developing this habit of reading Research. Even if I don’t understand parts of it, I’ll read them completely from start to finish and it has sort of grown on me. My journal collection has been growing at a steady pace. Mostly they’re non-complex psychology papers that are not an easy read, but not a tough one either. This was my first venture into a hardcore technical paper. And to be fair, I’d be lying if I say that, I understood it all. But, I’ve invested a reasonable amount of time and these are what I’ve understood.


Turing Starts off his paper with a bunch of descriptions about computable numbers, computing machines and what are the operations performed by it. He doesn’t provide a blueprint of such a machine, neither does he dwell into the mechanics of it all. (He managed to build one himself when the time demanded it though.) Which were sort of easy to follow.


The supposed machine is to have a sheet of paper of infinite length and be separated into several individual cells from left to right. and the machine has a head that can copy, read, write, compare. This head is also able to move from each cell, to the cell that is desired.


Then he mentions states of the machine. The states of the machine is the combination of all its previous states and he represents these in tables.


![turing](/assets/images/turing/1.webp)


What these tables do are quite obvious once the idea is known. the m-config column stands for the present state of the machine. The symbol section notes what is expected from that specific section of the paper. The operations column describes what is to be done once the said symbol is found. P is for print and R is for move to the right. (eg) P0 means print 0. PO,R means print ) and move right. and the final m-config table, notes the final state of the machine to do the next step. One might not be wrong in thinking that this is exactly like an instruction set in a programming language. It is true, it is strikingly similar to a programming language what is impressive is the way Turing uses it, a hundred years before. The machine described above, prints an infinite number of alternating 1s and 0s.


![turing](/assets/images/turing/2.webp)

In this illustration that I’ve given, with my barely legible handwriting, I’ve shown the state of the machine at the end of each state (row). The position of the head is at the darkened position. If you refer the table it can be seen that the final instruction loops back to the final position. This would be today’s classic looping function. But, these ideas where quite new, even to the intellectual elites of those times.



![turing](/assets/images/turing/3.webp)


Turing goes on to show that, the previous table can also be represented as the one above. They are one and the same. This is what one might call a conditional statement in today’s world. Turing then goes on to explain a way to represent these instruction sets (as we may call them) as simplified sets of symbols, like these


![turing](/assets/images/turing/4.webp)


For the full explanation, refer Turing’s paper. The bottomline is that, Turing used these, so that he doesn’t need to use up pages upon pages of his paper just for instruction sets. They are the exact same as the tables, just written differently. And to show that increasingly complex computational machines can be built using these few instructions, Turing shows the table for a machine that prints the value of 1/3.


![turing](/assets/images/turing/5.webp)

Table for 1/3

![turing](/assets/images/turing/6.webp)
Shortened form

Now that, it is proven that anything that is demanded of the machine can be accomplished. He ventures deeper into his idea. Once these tables are formed, it is possible to represent these tables in a more compressed form. For example consider this table.


![turing](/assets/images/turing/7.webp)

In which, the row.

![turing](/assets/images/turing/8.webp)

can, further be compressed as,

![turing](/assets/images/turing/9.webp)

Which means, the whole table can be represented as,

![turing](/assets/images/turing/10.webp)

These letters represent all the functions done that should be done by a machine at any given time. And then Turing introduces the idea of Standard Description. A Standard description further simplifies the above representation even further. The standard description would be,

![turing](/assets/images/turing/11.webp)

Then, he introduces the idea of Description number. These description number is just the conversion of the binary given out by the machine after the above instruction is converted, into decimal. The Description number of these representations would be.


![turing](/assets/images/turing/12.webp)

The brilliant thing is that, Turing has managed to convert a machine into a number. This means that for every number there is a machine (Which might be circled or circle free).


This gives an important insight into how computers work (atleast I think It does). In C++ or any compiler language, the given instruction set is converted into binaries. These binaries are basically the Description number of a machine that you’ve created, using a language that is meant to be understandable for humans.

Then he goes on to solve the entscheindungsproblem using the principle that he’s created with his machines. Which we won’t be dwelling into because this area is the birth of computing machines not the proof to entscheindungsproblem. You can read all about it, and it is super interesting even for the completely ignorant math student, me. But, we are here to learn about computers so that is what we’ll do.

After this machines and Description numbers idea, Turing goes on to open up about Hilbert and Ackerman’s logicism. It is an equally fascinating study on how any statement in the verbal world could be converted into logical statements and how they can be derived. It is insanely good and unnecessary to explain. But, one should know that, the reason why logic gates are used in computers is to do the basic operations that Turing mentions, Copy, read, write or compare. If the computer is able to come to give an output that two things (True or False, 1 or 0) equal or not equal Then they will be able to do the basic operations that Turing describe. Thereby they can be bent to do any computational operation.

It’s truly the fault of this society that, It pushed him to suicide. If not for the stigma and abhorance of the society towards Homosexuality, computing world might have progressed twenty years earlier.
