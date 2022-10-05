---
title: ARM
emoji: 📠
layout: base
---

A history lesson on ARM, The company that is at the epicenter of all tech innovation in the 21st century. 

Acorn computer, which had just made waves in 1991, by selling to British Broadcasting Corporation (BBC) Its __Proton__ processor. This was a largely accomplished by Hermann Hauser, Steve Furber and Sophie Wilson. They made a bid for BBCs __Microelectronics Education Programme__ with the revised spec of their older __Proton__ processor that fit BBCs needs. And sold it as __BBC MIcro__ close to 1.2 million processors. But, as 1983 inched close, there was mounting pressure from the release of IBM PC.

Acorn Computers, was gearing up for it's next release the __Electron__ processor. Sophie Wilson, Designer for the BBC Micro decided to add a proprietary slot that would be able to offload compute and be able to harvest the benefits of better chips, This was called the __tube__. At the time though there was a problem, CPUs were using memory very inefficiently and hence ran very slow. Which made it difficult to accomodate with the electron processor.

While pitching ideas, The team were dreaming up whether they would be able to build a CPU from scratch. But that would require a foundry. And designing something from scratch and getting it built is a humongous task for The ten person team at Acorn computers. but, Hermann was appreciative of this idea and introduced the team to the newly published, IBM paper on Reduced Instruction Set Computer (RISC). 

If the assumption that they could design, The next order of things then was to test the hypothesis that the Chip could be actually manufactured. To validate Wilson and Fuber went to the National Semiconductor Factory, Israel. But, these were behemoths with a lot of convoluted processes, It required hundreds of engineers and huge equipments. It would be impossible to get something built within this mess. Discouraged, they tried Western Design Center, Mesa, Arizona. This company was manufacturing Wilson's beloved 6502, Well known for its power efficiency as well as processing power. Western Design Center was also working on a successor to it at the time. It now seemed both designing as well as manufacturing the chip seemed like an attainable idea. 

Wilson, a lifelong builder with a math degree. started designing the chipset that would go well with the electron processor. Using RISC to develop meant that, the memory required to store programs were huge, and at the time 1 MB costed around the equivalent of $5,000 today. But, one advantage Acorn team had was that the memory prices were falling fast, But that is not going to save them yet. To Work around the small memory issue, Wilson used a load and store method. Where, the processor would only work on registers, a separate instruction would move the answer from the registers to external memory. 

Using RISC had the disadvantage that, the CPUs had more instructions to execute. But the advantage that, there were less complex instructions to execute. Which meant that the CPU did not waste cycles on complex routines. 

The next 18 months, The Acorn team would only be focused on designing and getting the chip ready. Furber took care of the layout design while Sophie was working on the Instruction set. Porting Software to The new chipset was doable without much ado. And they port most software, they were able to run BBC BASIC into the new instruction set. What was surprising to everybody was that, The Ported software, even though it was being interpreted, ran faster than their native counterpart. This was possible because the CPU, due to the simplified instructions was able to execute a lot more instructions than being hung on complex instructions.

April 26, 1985, Western Design Center had shipped the chips to Sophie. Sophie loads a program And it printed out mounting the chip into the __tube__ prints out , "Hello World, I am ARM". At this point ARM meant, Acorn RISC Machine. This was an incredible accomplishment for <10 person team. IBM and others were fighting bugs left right and center while little Acorn computers were able to create something that worked on the first try. The processor was 10 times faster than intel 80286 at the same clock speed. 

It was not all sunshine and flowers though. Electron was missing a few features, There was no onboard cache memory, no multiplication or division Circuits, no floating point operations (which was overcome by using barrel shifters.)

Arm was able to run in much less power. This was a complete design decision, because since they were very thrift about building the product. They would have to use a plastic casing. It was a necessity to keep the power draw low, else the plastic would melt due to the processor heat. Despite this, Part of Acorn was Sold to Olivetti, who were a printer maker. Wilson keeps working on Arm processor throughout. 

In 1986, ARM V2 comes out with support for Coprocessors. This means addons could be added to support additional processes like, a floating point coprocessor. It was fabricated in a 2 micrometer process. It also had a build in hardware multiplication modules. This let them get to 8 MHz without even increasing the power draw. By, 1987 Acorn had built a Graphics controller Chip, I/O controller and memory controller. All of these were ready along with a prototype computer to put them in.

By this time Acorn had a remote SD Team in Palo Alto, California. Acorn Archimedes was ready to ship But without any OS. Acorn management team went and talked with Paul Fellows, the head of the Acronsoft team to discuss of the possiblity of building a new OS. As Arthur describes himself "I was the team leader, I was the fool that said, 'yes we can do it'". And Hence the homegrown OS project Arthur was started.

But, problem was just around the corner. And this was more than a technical problem for Acorn to surmount with another rabbit out of the hat. By 1987, PCs had become more accessible with the advent of Apple Macintosh and IBM PCs, Which meant that people were expecting software to do more than just BASIC. For Example, Macintosh at the time had Microsoft Excel, Word processor and a whole host of installable applications which made it actually accessible to regular day use. Richard Manby from Acorn even wrote a program "Arthur Desktop" which was demo piece meant to showcase what the user could do with the window manager. But, it was not enough to woo the public to onboard onto the new platform. Despite great reviews Archimedes sold less than 100,000 units in the first few years.

Undeterred Wilson and her team had started fixing bugs in arthur and work on a replacement OS 'RISC OS'. 1989, ARM V3 was built on 1.5 micrometer with 4 kilobytes of L-1 cache memory. The clock speed was now at 25 MHz.

Wilson believed ARM could be pushed further, but resources were dwindling at Acorn with not a lot to sell. But, in 1990, Steve jobs got wind of the work being done at Acorn and offered to help them set up an Independent unit called Advanced RISC Machines Ltd. This would be a joint venture between Acorn Computers, Apple Computers and VLSI tech. The reason for this was because Apple Wanted to use Arm technology but did not want to be beholden to Acorn IP. Who, at the time were a competitors. Apple was to provide $ 3 Mil in Funding, VLSI technology would provide Equipments, and Acorn provided the IP. With a new tank of oxygen Wilson continued work on ARM.

In 1991 Robin Saxby from Motorola Takes Over as CEO. Apple Newton was launched on Arm Architecture. But, Apple overreached and Newton had a lot of shortcomings. And was a massive flop in the markets. This created Existential pressure on ARM, Trying to sustain itself on the back of one successful product was a blunder. Quick to seize opportunities, ARM introduced te IP business model. For an upfront cost, the Architecture would be licensed out to companies, And a lot of companies were in the market for fast, low energy processors. This helped in cementing ARM as the partner of pretty much everybody in the industry.

1993, Texas instruments using ARM at the core of their product were able to create a Breakthrough product. this let ARM solidify its position and it's licensing business model.

In 1994 the mobile phone industry was nascent and Nokia was advised to use ARM based chips, as their power efficiency would benefit portable phones. But, Nokia had concerns over the memory requirement of ARM. This led to ARM creating a custom 16 bit instruction set to reduce the memory foot print. Making it compatible with Nokia's requirements. Nokia 6110 Was a massive success and rocketed ARM to the center of the mobile ecosystem. ARM7 becomes a massive success.

ARM was trying to go public in 1997. It was a booming business with £ 26.6 Million valuation and a net income of £ 2.9 Million. But the tech sector bubble with sky-high valuations, makes it hard for ARM to go public. Finally in April 17th 1998, ARM goes public with a Joint Listing in Both, London Stock Exchange and NASDAQ at £ 5.75 per share. And ARM's stocks start bubbling up.

At one point in 1999 ARM was valued at 300 times it's Earnings. In the early 2000s the crash finally came. And when it did the tech sector was reduced to 90% of it's total valuation. Because of this ARM faces a crunch and has to tighten it's belt to survive through the onslaught.

ARM Attained a period of maturity through 2002 - 20005. Microprocessors were being required everywhere. Designing a microprocessor became more and more complex and required big teams of engineers. This started becoming ARM's moat, not a lot of companies had the upfront capital to setup and operate a humongous design team efficiently. It was faster and cheaper to license it out from ARM.

ARM has a very symbiotic relationship with all partners. ARM's success depends very crucially on partners success. 

By 2008, The Smartphone market boom happened and power efficient chips went from good to have to absolute necessity. And pretty much the only company with decades of power efficient chips was ARM. Depending on how you calculate, today it has a market share of 96% of all mobile chipsets.

the business model of ARM is such that, licensing for designs gets ARM up-front revenue but the royalties come into play much later sometimes even after 5 years. An example is, the ARM7, it is no longer supported by ARM but it is being shipped more and more every year. This shows the strength and insidious nature of ARM's products and their returns

on July 18, 2016 Softbank made an agreed offer for ARM for 23.4 Billion. The transaction was completed on september 5 and ARM Became part of Masayoshi Sun's Softbank. Later the ownership was restructured so that 25% of the stake was given to the Softbank Vision Fund. 

In 13 Sept 2020, Nvidia tries to Buy ARM from Softbank. This cold have been a huge blow to the competitors, because Nvidia could have strong Armed every competitor to submission by increasing the premium for licensing except themselves, Resulting in a very unfair market. This was thankfully stopped by Regulatory rules

Feb 2022, Rene Haas becomes CEO and he is trying to take ARM public. 

ARM today has competitors in RISC V and other architectures. But, Rene strongly believes that ARM's stability of instruction set will win over time. Unlike RISC V which allows custom instruction set. ARM does not allow custom instruction set and that prevents fragmentation.

Irrespective of their competitive status, everybody is a customer of ARM. Microsoft, Google, Samsung and so many others. ARM has horses in all lane, no matter who wins, it's a win for ARM. Rene says their focusing more and more on providing single System on Chip (SOC) solutions, like apple's M1's which should accelerate the industry very much. 


References:

- https://www.theverge.com/23373371/arm-chips-chip-shortage-ceo-rene-haas-tech-intel-apple-decoder
- https://archive.computerhistory.org/resources/access/text/2012/06/102746190-05-01-acc.pdf
- https://web.archive.org/web/20210325060916/https://www.latimes.com/archives/la-xpm-1990-11-28-fi-4993-story.html
- https://arstechnica.com/gadgets/2022/09/a-history-of-arm-part-1-building-the-first-chip/
- https://en.wikipedia.org/wiki/Arm_(company)
- https://community.arm.com/arm-community-blogs/b/architectures-and-processors-blog/posts/a-brief-history-of-arm-part-1
- https://community.arm.com/arm-community-blogs/b/architectures-and-processors-blog/posts/a-brief-history-of-arm-part-2
- http://www.rougol.jellybaby.net/meetings/2012/PaulFellows/index.html

