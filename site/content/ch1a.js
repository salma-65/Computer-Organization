window.PAGES = window.PAGES || {};
window.PAGES.ch1 = { title: "Chapter 1 — Computer Abstractions and Technology", html: String.raw`
<p class="lead">Source: <b>Chapter1.pdf</b> (Patterson &amp; Hennessy, <i>Computer Organization and Design</i>, MIPS edition). Page references below use <b>PDF page</b> numbers; the printed book page is usually <b>PDF page + 1</b>. Figures are the <b>original page images</b> from your PDF (nothing is redrawn).</p>

<div class="note"><b>How to read this page / ازاي تذاكر منها:</b> كل section فيها شرح بالعربي المصري، وبعده <span class="en-tag">English (exam wording)</span>. الـ definitions والـ formulas بالإنجليزي زي ما هي في الكتاب.</div>

<h2 id="c1-1">1.1 Introduction</h2>

<h3>The information revolution &amp; Moore's Law</h3>
<p class="ar" dir="rtl">الكمبيوتر عمل "ثورة تالتة" جنب الثورة الزراعية والصناعية: الـ <b>information revolution</b>. وبقى فيه نوع جديد من العلماء: <b>computational scientists</b> جنب الـ theoretical والـ experimental. التقدم ده سببه الأساسي <b>Moore's Law</b>. كل ما تكلفة الحوسبة تتحسن 10 مرات، تطبيقات جديدة بتبقى عملية اقتصاديًا.</p>
<p class="en"><b>English:</b> Computers led to a third revolution (information revolution) alongside the agricultural and industrial ones. The industry depends on the rapid improvement promised by <b>Moore's Law</b>. Each time the cost of computing improves by a factor of 10, new applications become practical. Examples listed: computers in automobiles, cell phones, the human genome project, the World Wide Web, search engines.</p>

<h3>Three classes of computing applications</h3>
<table>
<tr><th>Class</th><th>Main emphasis</th><th>Key points to memorize</th></tr>
<tr><td><b>Personal computers (PC)</b></td><td>Good performance to a <u>single user</u> at <u>low cost</u></td><td>Usually run third-party software; drove the evolution of many computing technologies (~35 years old).</td></tr>
<tr><td><b>Servers</b></td><td>Large workloads, accessed via a <u>network</u>; greater computing, storage and I/O capacity; <u>dependability</u></td><td>Widest range of cost/capability. Low end ≈ a desktop without screen/keyboard (~$1000). High end = <b>supercomputers</b> (tens of thousands of processors, many terabytes of memory, tens to hundreds of millions of dollars) used for weather forecasting, oil exploration, protein structure, etc.</td></tr>
<tr><td><b>Embedded computers</b></td><td>Run <u>one application / set of related applications</u>, integrated with hardware; strict limits on <u>cost and power</u></td><td><b>Largest class</b> of computers, widest range of applications and performance. Examples: car microprocessors, TV, airplane/cargo-ship control networks. Users usually don't see they use a computer. Dependability is often by simplicity (consumer devices) or redundancy (large systems).</td></tr>
</table>
<p class="ar" dir="rtl"><b>ملحوظة:</b> الـ supercomputer نوع من الـ servers (بيتظبط كـ server) وغالي جدًا، بس نصيبه من سوق الكمبيوتر صغير. الـ embedded هو الأكبر عددًا.</p>

<h3>Units: decimal vs binary prefixes (Figure 1.1)</h3>
<figure class="fig"><a href="assets/figs/ch1_p05.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch1_p05.jpg" alt="Original page with Figure 1.1"></a><figcaption><b>Figure 1.1</b> (PDF page 5) — decimal vs binary byte terms. Original page image from Chapter1.pdf. It shows KB…YB = 10<sup>3</sup>…10<sup>24</sup> and KiB…YiB = 2<sup>10</sup>…2<sup>80</sup>, with “% larger” 2%, 5%, 7%, 10%, 13%, 15%, 18%, 21%.</figcaption></figure>
<table>
<tr><th>Decimal term</th><th>Value</th><th>Binary term</th><th>Value</th><th>% larger</th></tr>
<tr><td>kilobyte (KB)</td><td>10<sup>3</sup></td><td>kibibyte (KiB)</td><td>2<sup>10</sup></td><td>2%</td></tr>
<tr><td>megabyte (MB)</td><td>10<sup>6</sup></td><td>mebibyte (MiB)</td><td>2<sup>20</sup></td><td>5%</td></tr>
<tr><td>gigabyte (GB)</td><td>10<sup>9</sup></td><td>gibibyte (GiB)</td><td>2<sup>30</sup></td><td>7%</td></tr>
<tr><td>terabyte (TB)</td><td>10<sup>12</sup></td><td>tebibyte (TiB)</td><td>2<sup>40</sup></td><td>10%</td></tr>
<tr><td>petabyte (PB)</td><td>10<sup>15</sup></td><td>pebibyte (PiB)</td><td>2<sup>50</sup></td><td>13%</td></tr>
<tr><td>exabyte (EB)</td><td>10<sup>18</sup></td><td>exbibyte (EiB)</td><td>2<sup>60</sup></td><td>15%</td></tr>
<tr><td>zettabyte (ZB)</td><td>10<sup>21</sup></td><td>zebibyte (ZiB)</td><td>2<sup>70</sup></td><td>18%</td></tr>
<tr><td>yottabyte (YB)</td><td>10<sup>24</sup></td><td>yobibyte (YiB)</td><td>2<sup>80</sup></td><td>21%</td></tr>
</table>
<p class="ar" dir="rtl">زمان كلمة terabyte كانت معناها 2<sup>40</sup> byte، بعدين ناس الـ storage والـ communications بدأوا يقصدوا بيها 10<sup>12</sup>. عشان يمنعوا اللخبطة: <b>TB = 10<sup>12</sup></b> و <b>TiB = 2<sup>40</sup></b>. نفس الكلام على الـ bits: gigabit (Gb) = 10<sup>9</sup> bits و gibibit (Gib) = 2<sup>30</sup> bits.</p>
<div class="warn"><b>Common mistake:</b> المسافة بين الـ binary والـ decimal بتتراكم كل ما نطلع في الجدول (2% عند KB وتوصل 21% عند YB). TB ≠ TiB.</div>

<h3>The PostPC Era</h3>
<figure class="fig"><a href="assets/figs/ch1_p06.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch1_p06.jpg" alt="Original page with Figure 1.2"></a><figcaption><b>Figure 1.2</b> (PDF page 6) — number of tablets and smart phones manufactured per year versus PCs and traditional cell phones, 2007–2012. Smart phones passed PCs in 2011; tablets are the fastest-growing category (nearly doubling 2011→2012).</figcaption></figure>
<p class="ar" dir="rtl">دلوقتي بنعيش في عصر الـ <b>PostPC Era</b>: الـ <b>PMD (Personal Mobile Device)</b> (موبايل ذكي / tablet) هو اللي بدل الـ PC، والـ <b>Cloud Computing</b> هو اللي بدل الـ server التقليدي.</p>
<ul>
<li><b>Personal Mobile Devices (PMDs):</b> small wireless devices that connect to the Internet; battery operated; typically cost hundreds of dollars; software installed by downloading <i>apps</i>; touch screen or speech instead of keyboard and mouse. Examples: smart phones, tablets.</li>
<li><b>Cloud Computing:</b> large collections of servers that provide services over the Internet; some providers rent dynamically varying numbers of servers as a utility. Built on giant datacenters called <b>Warehouse Scale Computers (WSCs)</b> (e.g., ~100,000 servers; Amazon and Google).</li>
<li><b>Software as a Service (SaaS):</b> delivers software and data as a service over the Internet, usually via a thin program such as a browser running on the client, instead of installed binary code. Examples: web search, social networking.</li>
<li><b>Multicore microprocessor:</b> a microprocessor containing multiple processors (“cores”) in a single integrated circuit.</li>
</ul>

<h3>Why learn computer organization? (What you can learn in this book)</h3>
<p class="ar" dir="rtl">في الستينات والسبعينات كان الـ constraint الأساسي هو حجم الـ memory، فكان الـ credo: "قلّل استخدام الـ memory عشان البرنامج يبقى سريع". دلوقتي اتغير: لازم تفهم <b>parallel nature of processors</b> و <b>hierarchical nature of memories</b>، وكمان <b>energy efficiency</b>.</p>
<p class="en"><b>English:</b> The book answers: how high-level programs are translated and executed; the hardware/software interface; what determines program performance and how to improve it; techniques to improve performance and energy efficiency; why the industry switched from sequential to parallel processing; and which great ideas built modern computing.</p>

<div class="def"><b>Understanding Program Performance (table, PDF page 8–9):</b>
<table>
<tr><th>Component</th><th>How it affects performance</th><th>Covered in</th></tr>
<tr><td>Algorithm</td><td>Determines both the number of source-level statements and the number of I/O operations executed</td><td>Other books</td></tr>
<tr><td>Programming language, compiler, architecture</td><td>Determines the number of computer instructions for each source-level statement</td><td>Chapters 2 and 3</td></tr>
<tr><td>Processor and memory system</td><td>Determines how fast instructions can be executed</td><td>Chapters 4, 5, 6</td></tr>
<tr><td>I/O system (hardware and OS)</td><td>Determines how fast I/O operations may be executed</td><td>Chapters 4, 5, 6</td></tr>
</table></div>
<p class="en">Matrix-vector multiply running example (speedups): subword parallelism ×3.8 (Ch. 3), instruction-level parallelism/loop unrolling ×2.3 (Ch. 4), cache blocking ×2.5 (Ch. 5), thread-level parallelism/OpenMP ×14 (Ch. 6) — overall about a factor of 200.</p>

<details class="ans"><summary>Check Yourself (1.1) — discussion answers</summary>
<p>Book answer: <i>discussion questions, many answers are acceptable</i> (§1.1, page 10). Idea: embedded processors greatly outnumber PCs and PostPC processors; a bottleneck can be the algorithm, the language/compiler, the operating system, the processor, or the I/O system and devices.</p></details>

<h2 id="c1-2">1.2 Eight Great Ideas in Computer Architecture</h2>
<p class="ar" dir="rtl">دي 8 أفكار اخترعها مصممو الكمبيوتر في آخر 60 سنة، وكل واحدة ليها icon. لازم تحفظ <b>الاسم + المعنى + مثال/analogy الكتاب</b>.</p>
<table>
<tr><th>#</th><th>Great idea</th><th>Meaning (EN)</th><th>الفكرة بالمصري / icon</th></tr>
<tr><td>1</td><td><b>Design for Moore's Law</b></td><td>Integrated-circuit resources double every 18–24 months (1965 prediction by Gordon Moore, an Intel founder). Architects must anticipate where technology will be when the design <i>finishes</i>, not where it starts.</td><td>صمّم للتكنولوجيا اللي هتبقى موجودة وقت ما تخلّص، زي الـ skeet shooter. Icon: “up and to the right” graph.</td></tr>
<tr><td>2</td><td><b>Use Abstraction to Simplify Design</b></td><td>Represent the design at different levels; lower-level details are hidden to offer a simpler model at higher levels.</td><td>اخفي التفاصيل السفلية. Icon: abstract painting.</td></tr>
<tr><td>3</td><td><b>Make the Common Case Fast</b></td><td>Optimizing the common case enhances performance better than optimizing the rare case; the common case is often simpler and easier to enhance. Requires measurement to know what is common.</td><td>حسّن الحالة الأكتر حدوثًا. Icon: sports car.</td></tr>
<tr><td>4</td><td><b>Performance via Parallelism</b></td><td>Get more performance by performing operations in parallel.</td><td>اشتغل في حاجات كتير مع بعض. Icon: multiple jet engines.</td></tr>
<tr><td>5</td><td><b>Performance via Pipelining</b></td><td>A particular pattern of parallelism: overlap stages (analogy: “bucket brigade” fighting a fire).</td><td>خط تجميع. Icon: sequence of pipes.</td></tr>
<tr><td>6</td><td><b>Performance via Prediction</b></td><td>It can be faster on average to guess and start working rather than wait, if recovery from a misprediction is cheap and the prediction is fairly accurate.</td><td>خمّن وابدأ. Icon: crystal ball.</td></tr>
<tr><td>7</td><td><b>Hierarchy of Memories</b></td><td>Fastest, smallest, most expensive per bit at the top; slowest, largest, cheapest per bit at the bottom. Caches give the illusion that main memory is nearly as fast as the top and as big and cheap as the bottom.</td><td>طبقات ذاكرة. Icon: layered triangle.</td></tr>
<tr><td>8</td><td><b>Dependability via Redundancy</b></td><td>Include redundant components that can take over when a failure occurs and help detect failures.</td><td>نسخة احتياطي. Icon: tractor-trailer (dual tires).</td></tr>
</table>
<details class="ans"><summary>Exercise 1.2 matching (original question, page 55) — model answer</summary>
<p><i>Question (condensed):</i> match the eight ideas to examples from other fields.</p>
<ul>
<li>a. Assembly lines in automobile manufacturing → <b>Performance via Pipelining</b></li>
<li>b. Suspension bridge cables → <b>Dependability via Redundancy</b> (many parallel cables, one failure doesn't collapse the bridge)</li>
<li>c. Aircraft/marine navigation systems that incorporate wind information → <b>Performance via Prediction</b></li>
<li>d. Express elevators in buildings → <b>Make the Common Case Fast</b></li>
<li>e. Library reserve desk → <b>Hierarchy of Memories</b></li>
<li>f. Increasing the gate area on a CMOS transistor to decrease switching time → <b>Performance via Parallelism</b> (this is a judgement-based match)</li>
<li>g. Electromagnetic aircraft catapults enabled by the new reactor's increased power → <b>Design for Moore's Law</b></li>
<li>h. Self-driving cars reusing existing sensor systems → <b>Use Abstraction to Simplify Design</b></li>
</ul>
<p class="ar" dir="rtl">ملحوظة: الكتاب مش مدّي answer key للتمرين ده؛ المطابقة دي اجتهاد (خصوصًا f). راجعها مع الدكتور.</p></details>

<h2 id="c1-3">1.3 Below Your Program</h2>
<figure class="fig"><a href="assets/figs/ch1_p12.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch1_p12.jpg" alt="Original page with Figure 1.3"></a><figcaption><b>Figure 1.3</b> (PDF page 12) — hardware and software as hierarchical layers (concentric circles): hardware in the center, systems software around it, applications software outermost.</figcaption></figure>
<p class="ar" dir="rtl">الـ hardware مش بيفهم غير instructions بسيطة جدًا. عشان نروح من تطبيق كبير لتعليمات بسيطة بنستخدم <b>layers of software</b> (ودي فكرة abstraction). التطبيق في الخارج، والـ <b>systems software</b> بين الـ hardware والـ applications.</p>
<h3>Systems software: two central types</h3>
<ul>
<li><b>Operating system:</b> interface between the user's program and the hardware; provides services and supervisory functions: (1) handling basic input and output operations, (2) allocating storage and memory, (3) providing protected sharing of the computer among multiple applications. Examples: Linux, iOS, Windows.</li>
<li><b>Compiler:</b> translates a program written in a high-level language (C, C++, Java, Visual Basic) into instructions the hardware can execute.</li>
</ul>
<h3>From a high-level language to the language of hardware</h3>
<figure class="fig"><a href="assets/figs/ch1_p14.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch1_p14.jpg" alt="Original page with Figure 1.4"></a><figcaption><b>Figure 1.4</b> (PDF page 14) — a C program compiled into assembly language, then assembled into binary machine language. Some compilers skip the middle step and produce machine language directly.</figcaption></figure>
<table>
<tr><th>Level</th><th>Definition</th><th>Example in the book</th></tr>
<tr><td><b>High-level programming language</b></td><td>Portable language such as C, C++, Java, Visual Basic composed of words and algebraic notation that a compiler translates into assembly language</td><td><code>A + B</code></td></tr>
<tr><td><b>Assembly language</b></td><td>Symbolic representation of machine instructions</td><td><code>add A, B</code></td></tr>
<tr><td><b>Machine language</b></td><td>Binary representation of instructions (numbers in base 2)</td><td><code>1000110010100000</code></td></tr>
</table>
<ul>
<li><b>Bit (binary digit):</b> one “letter” of the computer alphabet — 0 or 1 (on/off electrical signals).</li>
<li><b>Instruction:</b> a command the hardware understands, a collection of bits that can be thought of as a number. Using numbers for both instructions and data is a foundation of computing.</li>
<li><b>Assembler:</b> program that translates a symbolic version of an instruction into the binary version (the first translation program invented).</li>
<li><b>Compiler:</b> translates high-level language into assembly (or directly into machine language).</li>
</ul>
<p class="ar" dir="rtl"><b>ترتيب الترجمة:</b> High-level (C) → <i>Compiler</i> → Assembly → <i>Assembler</i> → Machine language (binary). ده جواب سؤال Exercise 1.3.</p>
<h3>Three benefits of high-level languages</h3>
<ol>
<li><b>Natural thinking:</b> English words and algebraic notation; languages can be designed for their use (Fortran for scientific computation, Cobol for business data processing, Lisp for symbol manipulation; domain-specific languages).</li>
<li><b>Improved programmer productivity:</b> fewer lines to express an idea (conciseness).</li>
<li><b>Portability:</b> programs are independent of the computer they were developed on, since compilers and assemblers can translate to any computer's binary instructions.</li>
</ol>
<details class="ans"><summary>Exercise 1.3 (original, page 55) — model answer</summary>
<p><b>Answer:</b> A high-level program (e.g., C) is translated by a <b>compiler</b> into <b>assembly language</b>; an <b>assembler</b> then translates the assembly into <b>binary machine language</b>, which the processor executes directly. (Some compilers produce machine language directly.)</p></details>

<h2 id="c1-4">1.4 Under the Covers</h2>
<p class="ar" dir="rtl">أي كمبيوتر بيعمل 4 وظائف: <b>input, output, process, store</b>. وده بيتترجم لـ <b>5 classic components</b>.</p>
<div class="def"><b>The Big Picture — five classic components:</b> input, output, memory, datapath, control. (Datapath + control = the <b>processor</b>.) This organization is independent of hardware technology.</div>
<figure class="fig"><a href="assets/figs/ch1_p16.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch1_p16.jpg" alt="Original page with Figure 1.5"></a><figcaption><b>Figure 1.5</b> (PDF page 16) — organization of a computer with the five classic components. The processor gets instructions and data from memory; input writes data to memory; output reads data from memory; control sends the signals that determine the operations of the datapath, memory, input, and output.</figcaption></figure>
<table>
<tr><th>Component</th><th>Role</th></tr>
<tr><td>Input</td><td>Feeds the computer (e.g., microphone, keyboard)</td></tr>
<tr><td>Output</td><td>Result of computation sent to the user (e.g., speaker, display)</td></tr>
<tr><td>Memory</td><td>Where programs are kept while running, plus the data they need (built from DRAM)</td></tr>
<tr><td>Datapath</td><td>Performs the arithmetic operations (the “brawn”)</td></tr>
<tr><td>Control</td><td>Tells datapath, memory and I/O what to do according to the program's instructions (the “brain”)</td></tr>
</table>
<p class="en">Some devices (e.g., wireless networks) provide both input and output.</p>

<h3>Display and touch screens</h3>
<figure class="fig"><a href="assets/figs/ch1_p17.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch1_p17.jpg" alt="Original page with Figure 1.6"></a><figcaption><b>Figure 1.6</b> (PDF page 17) — each coordinate in the frame buffer determines the shade of the corresponding point on the display. Pixel (X0, Y0) holds 0011 (lighter) and pixel (X1, Y1) holds 1101.</figcaption></figure>
<ul>
<li><b>LCD (liquid crystal display):</b> a thin, low-power display. It is <u>not</u> a light source; it controls the transmission of light. Rod-shaped molecules form a twisting helix that bends light; a current straightens them. Because the liquid sits between two screens polarized at 90°, light passes only when bent. <b>Active matrix:</b> a tiny transistor switch at each pixel; color active matrix has three transistor switches per point (red-green-blue mask).</li>
<li><b>Pixel (picture element)</b> – the display is a matrix of pixels represented as a matrix of bits called a <b>bit map</b>. Typical tablet display: 1024×768 up to 2048×1536. A color display might use <b>8 bits per primary color (R, G, B) = 24 bits/pixel</b>.</li>
<li><b>Frame buffer (raster refresh buffer):</b> hardware that stores the bit map; the bit pattern per pixel is read out to the display at the refresh rate.</li>
<li><b>Touch screen:</b> many tablets use <b>capacitive sensing</b>: glass covered with a transparent conductor; a touch distorts the electrostatic field → change in capacitance; allows multiple simultaneous touches (gestures).</li>
</ul>
<details class="ans"><summary>Worked: Exercise 1.4 (original, page 55) — frame buffer size</summary>
<p><i>Question (condensed):</i> 8 bits per R,G,B color, frame 1280×1024: (a) minimum frame-buffer size in bytes; (b) minimum time to send one frame over a 100 Mbit/s network.</p>
<p>(a) 1280 × 1024 pixels × 3 bytes = <b>3,932,160 bytes</b> (= 3.75 MiB). (b) 3,932,160 × 8 = 31,457,280 bits ÷ 100×10<sup>6</sup> bit/s ≈ <b>0.315 s</b>.</p>
<p class="ar" dir="rtl">الفكرة: كل pixel = 24 bit = 3 bytes، نضرب في عدد الـ pixels، وبعدين نحول bytes لـ bits ونقسم على السرعة.</p></details>

<h3>Inside the iPad 2: chips, processor, memory</h3>
<figure class="fig"><a href="assets/figs/ch1_p19.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch1_p19.jpg" alt="Original page with Figures 1.7 and 1.8"></a><figcaption><b>Figures 1.7 and 1.8</b> (PDF page 19) — Fig. 1.7: components of the Apple iPad 2 A1395 (I/O dominates the device). Fig. 1.8: the logic board with five integrated circuits; the large chip in the middle is the Apple A5 (dual ARM cores at 1 GHz + 512 MB DRAM in the package), next to a 32 GB flash chip; power and I/O controller chips on the right.</figcaption></figure>
<figure class="fig"><a href="assets/figs/ch1_p20.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch1_p20.jpg" alt="Original page with Figure 1.9"></a><figcaption><b>Figure 1.9</b> (PDF page 20) — the processor integrated circuit inside the A5 package: 12.1 × 10.1 mm, 45-nm process, two identical ARM cores plus a PowerVR GPU with four datapaths.</figcaption></figure>
<ul>
<li><b>Integrated circuit (IC / chip):</b> device combining dozens to millions of transistors.</li>
<li><b>Processor (CPU – central processor unit):</b> the active part of the computer; follows the program's instructions to the letter (adds, tests numbers, signals I/O devices). Comprises <b>datapath</b> and <b>control</b>.</li>
<li><b>Memory (main memory) – DRAM:</b> <u>dynamic random access memory</u>. “Random access” means access time is basically the same for any location (unlike sequential-access tapes). A5 package: two memory chips of 2 gibibits each = 512 MiB.</li>
<li><b>Cache memory:</b> small, fast memory inside the processor acting as a buffer for the DRAM; built from <b>SRAM</b> (static random access memory), which is faster but less dense, hence more expensive, than DRAM. SRAM and DRAM are two layers of the memory hierarchy.</li>
</ul>

<h3>Instruction set architecture (ISA) and the ABI</h3>
<ul>
<li><b>Instruction set architecture (ISA, “architecture”):</b> the abstract interface between the hardware and the lowest-level software; includes everything programmers need to know to make a binary machine-language program work correctly (instructions, I/O devices, etc.).</li>
<li><b>Application binary interface (ABI):</b> the combination of the basic instruction set and the operating-system interface provided for application programmers.</li>
<li><b>Implementation:</b> hardware that obeys the architecture abstraction. An ISA lets many implementations of varying cost and performance run identical software. (Analogy: digital clock functions vs quartz/LED hardware.)</li>
</ul>
<div class="note"><b>Big idea:</b> both hardware and software consist of hierarchical layers using abstraction; the ISA is a key interface between the levels.</div>

<h3>Storage: volatile vs nonvolatile</h3>
<table>
<tr><th>Term</th><th>Meaning</th></tr>
<tr><td><b>Volatile memory</b></td><td>Retains data only while powered (e.g., DRAM)</td></tr>
<tr><td><b>Nonvolatile memory</b></td><td>Retains data without power (e.g., DVD, disks, flash)</td></tr>
<tr><td><b>Main / primary memory</b></td><td>Volatile memory holding programs and data while they run (DRAM since 1975)</td></tr>
<tr><td><b>Secondary memory</b></td><td>Nonvolatile memory used to store programs and data between runs; next lower layer of the hierarchy (magnetic disks; flash in PMDs)</td></tr>
<tr><td><b>Magnetic disk</b></td><td>Nonvolatile secondary storage in servers; access times ≈ 5–20 ms (per the margin definition)</td></tr>
<tr><td><b>Flash memory</b></td><td>Nonvolatile semiconductor memory; slower than DRAM but cheaper; smaller, more rugged and more power-efficient than disks; <b>bits wear out after 100,000–1,000,000 writes</b> (file systems must track writes and spread them out)</td></tr>
</table>
<details class="ans"><summary>Check Yourself (1.4) — DRAM vs flash vs disk (book answer, page 24)</summary>
<table><tr><th>Technology</th><th>Volatility</th><th>Access time</th><th>Cost per GB</th></tr>
<tr><td>DRAM</td><td>Volatile</td><td>50–70 ns</td><td>$5–$10</td></tr>
<tr><td>Disk</td><td>Nonvolatile</td><td>100,000–400,000× slower than DRAM</td><td>≈100× cheaper than DRAM</td></tr>
<tr><td>Flash</td><td>Nonvolatile</td><td>100–1000× slower than DRAM</td><td>7–10× cheaper than DRAM</td></tr></table></details>

<h3>Networks</h3>
<ul>
<li><b>Advantages of networked computers:</b> (1) <b>Communication</b> (high-speed information exchange), (2) <b>Resource sharing</b> (share I/O devices), (3) <b>Nonlocal access</b> (use the computer from far away).</li>
<li><b>Ethernet / LAN (local area network):</b> up to about a kilometer, up to 40 Gb/s; connects computers on the same floor; LANs are interconnected with <b>switches</b> (can also provide routing and security).</li>
<li><b>WAN (wide area network):</b> crosses continents, backbone of the Internet; typically optical fibers leased from telecom companies.</li>
<li><b>Wireless (IEEE 802.11):</b> 1 to nearly 100 Mbit/s; made cheap by building radios in CMOS; enabled the PostPC Era; all users in the area share the medium.</li>
<li>Cost of communication increases with both speed and distance. First standardized Ethernet had 10 Mbit/s <b>bandwidth</b>, shared by tens to a hundred computers; today 1–40 Gb/s shared by a few.</li>
</ul>
` };
