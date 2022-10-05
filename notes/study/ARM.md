# ARM

Expecting competition from IMB PC, Sophie wilson, Designer fo the BBC micro had added a slot called the "TUBE" that could connect to a more powerful CPU. Most CPUs, used memory very inefficiently and ran much slowly. Wilson's team had built microchips but with much less pieces.
Hermann supported Wilson, by introducing them to  IBMs RISC research paper.

- Wilson Used, Load and store method which means it would work only on registers, separate instructions would move the answer from the registers to external memory => This means that CPUs had more instructions to execute but critically less __complex__ instructions to execute.
- CPU instructions are executed in stages
  - Instruction Fetch
  - Instruction Decode
  - Register Select
  - Register Read
  - Shift
  - ALU
  - Register Write

- Disadvantage => RISC took more instructions => they required more memory => But, memory prices were dropping at breakneck speed so they won't be a probelm in the future
- ARM took 18 months to build. The team spent a lot of time testing the design before putting into silicon
- Furber => layout design. Wilson => instruction set.
- Furber wrote whole ARM emulator.
- They were able to write very large amount of software, port BBC BASIC to ARM. Some software ran faster than their original platform even though they were being interepreted into ARM machine code.
- April 26, 1985 => wilson plugs it into the TUBE and issued a print statement and it printed out "Hello World, I am ARM".
- Incredible accomplishment for a team of under 10 people.
- Missing features => no onboard cache memory => no multiplication or division circuites => lacked floating point unit => ops with non-whole numbers were slower => using simple barrel shifter helped with floating point numbers.
- It was roughly 10 times faster than intel 80286 at the same clock speed.
- ARM was also designed to run at very low power. Wilson, says this was a complete cost saving measure. One of the first test boards ran everything without ever getting a proper connection, but just the electrical leakage.
- 1985, Acorn Sold to Olivetti, printer maker.
- 1986, ARM V2 comes out => Support for coprocessors like, a floating point coprocessor(popular add-on). It was fabricated on a 2 micrometer process. And built-in hardware for multiplication circuites. => Fabricated on a 2 micrometer process, which meant 8MHz without consuming more power than before
- 1987 => graphics controller chip, I/O controller and a memory controller. => all were ready along with a prototype computer to put them in.
- It was 1987, people expected more than BASIC.
- Acorn setup a remote SD Team in PA, Calif. Acorn Archimedes was ready ship, but no OS. So, Acorn management went to talk to Paul Fellows, the head of the Acornsoft team who had written a bunch of languages for the BBC Micro. They asked him If he could write one, and he said yes, with only 5 months left.
- The OS was called "Project Arthur", started as an extension of BBC BASIC.
- The first Archimedes shipped in June 1987, some of them still sporting the BBC branding => The computers were fast =. introductory price was 800 pounds against teh mac which was selling at 5500 dollars and had similar computing power. but word had, a huge ecosystem of softwares like, Microsoft Word, Excel and so on. <100,000 systems were sold over the first couple of years.
- Acorn fixed the bugs on arthur and started working on a replacement OS, RISC OS which shipped in 1989 and a revision of the ARM CPU, V3 followed. 
- V3
  - 1.5 micrometer => increased 4 kb of fast level-1 cache memory. The clock speed was 25 MHz
- 1990 Advanced RISC Machines LTD was announced as a join venture between Acorn Computers, Apple Computer and VLSI tech. The reason for this was because Apple Wanted to use Arm technology but didn't want to base a product on Acorn IP - who at the time were considered a competitor. Apple provided $3 mil, VLSI Technology provided Equipments, And Acorn provided the IP
- 1991 => Robin Saxby from Motorola overtakes as CEO, 1991. Apple Newton was launched on Arm Architecture => Apple overreached and Newton had a lot of shortcomings. => Arm realizes they can't sustain on Single products and Sir Robin introduced the IP business model. => The Architecture was licensed at an upfront licensing fee to many companies, this made Arm a partner with a lot of companies. 
- 1993, Texas Instruments => Created a breakthrough design => Arm formalized their licensing business model. => Increases the licensing business
- 1994, Mobile revolution => Nokia against, because of memory demands => custom 16 bit per instruction lowering memory demands. => Nokia 6110 resulted in massive success => ARM7 becomes a massive success => Since has 165 licenses and has produced over 10 Billion chips
- 1997, Going public => 26.6 Mil pound private business with 2.9 M net income. => Tech sector bubble made it hard to go public
- April 17th 1998 => Joint Listing => London Stock Exchange and NASDAQ at 5.75 pounds.
- late 1990s, Booming tech companies => Arm valued at 300 times its actual earnings for 1999 => early 2000's the crash came. => Tech sector reduced by 90 % => Arm faces a crunch
- 2002 - 2005, Age of Maturity => Microprocessors were becoming small parts of the whole stack => How to make SoC Solutions => Building required hardcore design team => this made it easy for Arm to license IP.
- 2001 => ARM926EJ-S released with fully synthesizable 5 stage pipeline integrated MMU, as well as hardware support for Java Acceleration and Some DSP ops.
- Partner Success is Arm Success => Symbiotic relationship with partners => 
- 2005 - 2012 => Cortex family was the diversification that Arm bought to the industry. Cortex-A continued the current offerings following on from the ARM11 following the trend of leading edge mobile applications. => 2008, Smartphone market booms and power efficient chips were the absolute requirement.
- 96% share of mobile market,
- Licensing provides up-front revenue for Arm, but the royalties come into play only after 5 years. An example of this is the ARM7, which is no longer sold or supported by Arm. But it is shipped more every year.
- 18 July 2016, Softbank made an agreed offer for ARM for 23.4 Billion => transaction completed 5 September 2016.
- 25 percent stake of Arm was transferred to, Softbank Vision Fund.
- 13 Sept 2020, Nvidia Tries to buy ARM from softbank. Regulatory pressure stopped it.
- Feb 2022, Rene Haas becomes CEO.

### From Rene Haas 
- Arm wins even if qualcomm chips are used, or samsung chips are used.
- Arm works closely in the CHIPS act even though they don't directly produce chips. But, it could impact their bottomline
- Arm is mostly an IP based company doing 2 billion in revenue with 50% margin.
- Apple's chips are better because, Arm only does CPU. But, apple by having the architectural license from Arm. Was able to build a SOC with integrated RAM, GPU and everything. ARM hadn't invested a lot in this area, because they are a CPU company. Now, they are investing in SoC for others as well. Engulfing the whole compute stack.
- Architectural license means that, ARM licenses the architecture and the licence holder implements it and ARM comes in and validates it to make sure the instruction set and the chip itself is ARM compliant. This is incredibly difficult to do, So other than apple nobody else holds the license.
- Pretty much everybody, irrespective of competition are ARM customers. Amazon, google, microsoft, qualcomm, samsung, and every downstream user only increases ARM bottomline. So, Whoever wins the War, ARM wins irrespective of it.  
- Real competitors are RISC V, but they are missing that rigidity and reliability that ARM provides. RISC V allows for custom Instructions, which creates fragmentation within the ecosystem and also amplifies incompatibility

### Sophie Wilson:

    Education:
        - Born => Leeds, Yorkshire, England. Moved to Burn Bridge
        - Parents, Mother => Physics teacher. Father => English
        - Father builds everything from, car to boat to tent van to furniture from scratch. She has that same spirit of building something all the time.
        - Always having the urge to build
        - Goes to Cambridge => Math
        - Before going to university => '74, '75 => Builds, Wrap detector for ICI Fibre Research => Detect breaks in fibres when they are being used to wrap. => Builds droplet counting machine => not impressed with the results, rebuild it with CMOS circuitry for better power efficiency => rebuild wrap detector with CMOS
        - University '75 => 1st year, maths => Some guy at ICI fibers set up his own company => electronic cow feeder => meets, first PDP-8 computer => programs in 6502 =>goes back to university, tells everyone about the 6502 => because it was cheap => Becomes the person for building low power stuff in Cambridge.
        - Hermann Hauser gets to hear about this and gets her to design a pocket diary => Design in 3 weeks => Hermann builds and sells it.
        - Hermann sets himself a consultancy for processors
        - Wilson solves the problem of electrosctatic machines messing with processors and making them payout money => by using another circuit which detects elctrostatic and just shuts the chip down instead of letting it operate
        - Joins Acorn with Hermann after graduation.
        - Writes the first BASIC assembler to avoid hand coding from scratch

