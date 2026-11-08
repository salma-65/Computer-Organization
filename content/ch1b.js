window.PAGES.ch1.html += String.raw`
<h2 id="c1-5">1.5 Technologies for Building Processors and Memory</h2>
<figure class="fig"><a href="assets/figs/ch1_p24.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch1_p24.jpg" alt="Original page with Figures 1.10 and 1.11"></a><figcaption><b>Figures 1.10 and 1.11</b> (PDF page 24). Fig. 1.10: relative performance per unit cost of technologies used in computers (1951 vacuum tube = 1, 1965 transistor = 35, 1975 integrated circuit = 900, then VLSI and ULSI up to 2013; source: Computer Museum, Boston). Fig. 1.11: growth of capacity per DRAM chip (kibibits) 1977–2012; capacity quadrupled almost every three years (≈60% per year) for 20 years, recently closer to doubling every 2–3 years.</figcaption></figure>
<ul>
<li><b>Transistor:</b> an on/off switch controlled by electricity.</li>
<li><b>Integrated circuit (IC):</b> combines dozens to hundreds of transistors in a single chip. <b>VLSI</b> = very large-scale integrated circuit (hundreds of thousands to millions of transistors).</li>
<li>Moore predicted the growth rate of the <u>number of transistors per chip</u>. DRAM capacity: quadruples every 3 years → more than 16,000× increase since 1977.</li>
<li><b>Silicon</b> (found in sand) does not conduct well → <b>semiconductor</b>. Chemical processing can create three kinds of regions: excellent conductors (microscopic copper or aluminum wire), excellent insulators (plastic sheathing or glass), and areas that conduct or insulate under special conditions (switches) → <b>transistors</b>.</li>
</ul>

<h3>Chip manufacturing process (Figure 1.12, 1.13)</h3>
<figure class="fig"><a href="assets/figs/ch1_p25.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch1_p25.jpg" alt="Original page with Figure 1.12"></a><figcaption><b>Figure 1.12</b> (PDF page 25) — chip manufacturing: silicon ingot → slicer → blank wafers → 20 to 40 processing steps → patterned wafers → wafer tester → dicer → dies → bond die to package → packaged dies → part tester → tested packaged dies → ship to customers. In the example, 1 wafer gave 20 dies, 17 passed: yield = 17/20 = 85%.</figcaption></figure>
<figure class="fig"><a href="assets/figs/ch1_p26.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch1_p26.jpg" alt="Original page with Figure 1.13"></a><figcaption><b>Figure 1.13</b> (PDF page 26) — a 12-inch (300 mm) wafer of Intel Core i7: 280 dies at 100% yield, each 20.7 × 10.5 mm, 32-nm technology. Partial dies at the wafer edge are useless.</figcaption></figure>
<ol>
<li><b>Silicon crystal ingot</b> (8–12 in diameter, 12–24 in long) is finely sliced into <b>wafers</b> (≤ 0.1 in thick).</li>
<li>Wafers go through 20–40 steps creating transistors, conductors, insulators. Modern ICs have <u>one</u> layer of transistors and 2–8 levels of metal conductor separated by insulators.</li>
<li>Patterned wafers are tested (<b>wafer tester</b>), then <b>diced</b> into <b>dies</b> (chips).</li>
<li>Good dies are connected to the I/O pins of a package (<b>bonding</b>), tested again, and shipped.</li>
</ol>
<div class="def"><b>Yield</b> = the percentage of good dies out of the total number of dies on the wafer. <b>Defects</b> (flaws in the wafer or in patterning steps) make a perfect wafer practically impossible; dicing lets you discard only the unlucky dies.</div>
<div class="note"><b>Cost vs die size:</b> the cost of an IC rises quickly as die size increases, because (1) yield falls and (2) fewer dies fit on a wafer. Using the next-generation (smaller feature size, e.g. 32 nm) process shrinks the die → better yield and more dies per wafer.</div>
<h3>Elaboration — the three cost equations</h3>
<pre class="code">Cost per die   = Cost per wafer / (Dies per wafer × Yield)
Dies per wafer ≈ Wafer area / Die area
Yield          = 1 / (1 + (Defects per area × Die area / 2))^2</pre>
<p class="ar" dir="rtl">المعادلة الأولى سهلة. التانية تقريبية لأنها مش بتشيل المنطقة اللي في حافة الـ wafer. التالتة تجريبية (empirical) والـ exponent له علاقة بعدد خطوات التصنيع الحرجة. النتيجة: التكلفة <b>مش linear</b> مع مساحة الـ die.</p>
<details class="ans"><summary>Worked: Exercise 1.10 (original, page 57) — yield and cost per die</summary>
<p><i>Question (condensed):</i> Wafer 1: 15 cm diameter, cost 12, 84 dies, 0.020 defects/cm². Wafer 2: 20 cm diameter, cost 15, 100 dies, 0.031 defects/cm². (1.10.1) yield for both; (1.10.2) cost per die.</p>
<p>Die area = wafer area / dies. Wafer 1: π·7.5² = 176.7 cm² → 2.10 cm² per die. Wafer 2: π·10² = 314.2 cm² → 3.14 cm² per die.<br>
Yield 1 = 1/(1+0.020×2.10/2)² ≈ <b>0.959</b>; Yield 2 = 1/(1+0.031×3.14/2)² ≈ <b>0.909</b>.<br>
Cost per die 1 = 12/(84×0.959) ≈ <b>0.149</b>; cost per die 2 = 15/(100×0.909) ≈ <b>0.165</b> (same currency units as the question). 1.10.3 and 1.10.4 are left as practice using the same formulas.</p></details>
<details class="ans"><summary>Check Yourself (1.5) — why is high-volume chip cheaper? (book answer: 1, 3 and 4 are valid)</summary>
<p>1 (process can be tuned), 3 (expensive masks amortized over more chips) and 4 (development cost independent of volume) are valid reasons. 5 can be generally true but doesn't have to be. 2 is not a reason (designing a high-volume part is not less work).</p></details>

<h2 id="c1-6">1.6 Performance</h2>
<h3>Defining performance (Figure 1.14)</h3>
<figure class="fig"><a href="assets/figs/ch1_p28.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch1_p28.jpg" alt="Original page with Figure 1.14"></a><figcaption><b>Figure 1.14</b> (PDF page 28) — capacity, range and speed of commercial airplanes; last column = capacity × cruising speed (passenger throughput). Concorde has the highest cruising speed, DC-8 the longest range, Boeing 747 the largest capacity and best passenger-throughput.</figcaption></figure>
<p class="ar" dir="rtl">"أحسن performance" معناها إيه؟ زي الطيارات: أسرع طيارة للراكب الواحد (Concorde) غير أسرع طيارة لنقل 450 راكب (747). كذلك الكمبيوتر:</p>
<table>
<tr><th>Metric</th><th>Who cares</th><th>Definition</th></tr>
<tr><td><b>Response time / execution time</b></td><td>Individual user (PMDs)</td><td>The total time between the start and completion of a task</td></tr>
<tr><td><b>Throughput / bandwidth</b></td><td>Datacenter managers (servers)</td><td>The total amount of work done in a given time</td></tr>
</table>
<div class="note">Decreasing response time almost always improves throughput. Adding extra processors for separate tasks improves only throughput (no single task gets faster) unless requests were queueing.</div>
<details class="ans"><summary>Check Yourself (1.6, a) — throughput vs response time (book answers)</summary>
<p>1(a) Extra network channel: <b>both</b> response time and throughput improve. 1(b) Faster networking software (reduced delay, same throughput): <b>latency (response time) only</b>. 1(c) More memory: <b>neither</b> (in that network-limited scenario). 2: C is 4× as fast as B (28 s) → C takes <b>7 seconds</b>.</p></details>

<h3>Relating performance and execution time</h3>
<pre class="code">Performance_X = 1 / Execution time_X
X is n times as fast as Y:  n = Performance_X / Performance_Y = Execution time_Y / Execution time_X</pre>
<p class="ar" dir="rtl">Performance وexecution time <b>عكس بعض (reciprocals)</b>. عشان كده بنقول "improve performance" مش "increase" عشان منتلخبطش.</p>
<div class="ex"><b>Example:</b> A runs a program in 10 s, B in 15 s. A is n times as fast as B: n = 15/10 = <b>1.5</b>.</div>

<h3>Measuring time</h3>
<table>
<tr><th>Term</th><th>Meaning</th></tr>
<tr><td><b>Wall clock time / response time / elapsed time</b></td><td>Total time to complete a task, including disk accesses, memory accesses, I/O activities, OS overhead — everything</td></tr>
<tr><td><b>CPU execution time (CPU time)</b></td><td>Time the CPU spends computing for this task; excludes waiting for I/O or running other programs</td></tr>
<tr><td><b>User CPU time</b></td><td>CPU time spent in the program itself</td></tr>
<tr><td><b>System CPU time</b></td><td>CPU time spent in the OS performing tasks on behalf of the program</td></tr>
<tr><td><b>System performance</b></td><td>Elapsed time on an <u>unloaded</u> system</td></tr>
<tr><td><b>CPU performance</b></td><td>User CPU time</td></tr>
</table>
<div class="warn"><b>Tricky:</b> The user experiences <u>elapsed time</u>, not CPU time. Separating user from system CPU time is hard to do accurately.</div>

<h3>Clock cycles</h3>
<ul>
<li><b>Clock cycle</b> (also tick, clock tick, clock period, clock, cycle): the discrete time interval determining when hardware events happen.</li>
<li><b>Clock period (cycle time)</b> e.g. 250 ps; <b>Clock rate</b> e.g. 4 GHz — they are <u>inverses</u>.</li>
</ul>

<h3>CPU performance and its factors</h3>
<pre class="code">CPU execution time = CPU clock cycles for a program × Clock cycle time
                   = CPU clock cycles for a program / Clock rate

CPU clock cycles   = Instructions for a program × Average clock cycles per instruction (CPI)

CPU time = Instruction count × CPI × Clock cycle time = (Instruction count × CPI) / Clock rate

Time/Program = (Instructions/Program) × (Clock cycles/Instruction) × (Seconds/Clock cycle)</pre>
<p class="ar" dir="rtl"><b>الـ hardware designer</b> يقدر يحسّن الـ performance بإنه يقلل عدد الـ clock cycles للبرنامج أو يقلل طول الـ clock cycle — وغالبًا في trade-off بينهم. <b>CPI</b> هو متوسط عدد الـ cycles للـ instruction الواحدة (average over all instructions executed).</p>
<div class="def"><b>CPI</b> = clock cycles per instruction = average number of clock cycles each instruction takes to execute. It is an <u>average</u> since different instructions take different times. It lets you compare two implementations of the <u>same ISA</u> (same instruction count). <b>IPC</b> = instructions per clock cycle = 1/CPI (some processors execute multiple instructions per cycle, so CPI can be below 1).</div>

<div class="ex"><b>Example 1 (clock rate):</b> A: 10 s at 2 GHz. B must run in 6 s but needs 1.2× the clock cycles of A. A cycles = 10 s × 2×10<sup>9</sup> = 20×10<sup>9</sup>. For B: 6 s = (1.2 × 20×10<sup>9</sup>)/rate_B → rate_B = 24×10<sup>9</sup>/6 = <b>4 GHz</b> (twice A's clock rate).</div>
<div class="ex"><b>Example 2 (CPI comparison):</b> A: cycle time 250 ps, CPI 2.0; B: 500 ps, CPI 1.2; same ISA, same instruction count I. Time_A = I×2.0×250 ps = 500·I ps; Time_B = I×1.2×500 ps = 600·I ps → A is faster by 600/500 = <b>1.2×</b>.</div>
<div class="ex"><b>Example 3 (two code sequences):</b> Instruction classes A, B, C have CPI 1, 2, 3. Sequence 1 uses (2, 1, 2) instructions = 5 instructions → cycles = 2×1+1×2+2×3 = <b>10</b>, CPI = 10/5 = <b>2.0</b>. Sequence 2 uses (4, 1, 1) = 6 instructions → cycles = 4+2+3 = <b>9</b>, CPI = 9/6 = <b>1.5</b>. Sequence 2 is faster even though it executes <u>more</u> instructions.</div>
<div class="warn"><b>Common mistake:</b> judging performance with only one factor (e.g., instruction count). Only the <b>product</b> of instruction count × CPI × clock cycle time (= execution time) is reliable. <b>The only complete and reliable measure of performance is time.</b></div>

<h3>How hardware/software affect the three factors</h3>
<table>
<tr><th>Component</th><th>Affects</th></tr>
<tr><td>Algorithm</td><td>Instruction count; possibly CPI (e.g., more divides → higher CPI)</td></tr>
<tr><td>Programming language</td><td>Instruction count; CPI (e.g., Java data abstraction → indirect calls, higher CPI)</td></tr>
<tr><td>Compiler</td><td>Instruction count and CPI</td></tr>
<tr><td>Instruction set architecture</td><td>All three: instruction count, CPI and clock rate</td></tr>
</table>
<p>How measured (Figure 1.15, PDF page 37): CPU execution time — run the program; clock cycle time — published in documentation; instruction count — software profiling tools, a simulator, or hardware counters; CPI — depends on memory system, processor structure, and instruction mix. The instruction count depends on the architecture, not on the implementation; CPI varies by application and implementation.</p>
<figure class="fig"><a href="assets/figs/ch1_p37.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch1_p37.jpg" alt="Original page with Figure 1.15"></a><figcaption><b>Figure 1.15</b> (PDF page 37) — basic components of performance and how each is measured: CPU execution time (seconds/program), instructions executed (instructions/program), CPI (clock cycles/instruction), clock cycle time (seconds/clock cycle).</figcaption></figure>
<div class="ex"><b>Java compiler example:</b> 15 s program; the new compiler needs 0.6× the instructions but raises CPI by 1.1×: new time = 15 × 0.6 × 1.1 = <b>9.9 s</b> (about 1.5× faster).</div>
<p class="en">Elaboration: Some processors vary the clock rate (e.g., Core i7 temporarily boosts clock ~10% until the chip gets warm — Intel “Turbo mode”), so use the <i>average</i> clock rate.</p>

<details class="ans"><summary>Worked: Exercise 1.5 (original, page 55) — P1, P2, P3</summary>
<p><i>Question (condensed):</i> Same ISA. P1: 3 GHz, CPI 1.5. P2: 2.5 GHz, CPI 1.0. P3: 4.0 GHz, CPI 2.2. (a) highest performance in instructions/second; (b) cycles and instructions if each runs 10 s; (c) reduce time 30% with +20% CPI — required clock rate?</p>
<p>(a) IPS = clock/CPI: P1 = 2.0×10<sup>9</sup>, P2 = <b>2.5×10<sup>9</sup></b>, P3 = 1.82×10<sup>9</sup> → <b>P2</b> is highest.<br>
(b) Cycles = rate × 10 s: P1 = 30×10<sup>9</sup>, P2 = 25×10<sup>9</sup>, P3 = 40×10<sup>9</sup>. Instructions = cycles/CPI: P1 = 20×10<sup>9</sup>, P2 = 25×10<sup>9</sup>, P3 ≈ 18.2×10<sup>9</sup>.<br>
(c) New time = 7 s, new CPI = 1.2×CPI: rate = (IC × 1.2 × CPI)/7. P1 ≈ <b>5.14 GHz</b>, P2 ≈ <b>4.29 GHz</b>, P3 ≈ <b>6.86 GHz</b>.</p></details>
<details class="ans"><summary>Worked: Exercise 1.6 (original, page 55) — four instruction classes</summary>
<p><i>Question (condensed):</i> P1: 2.5 GHz, CPIs 1, 2, 3, 3 (classes A–D). P2: 3 GHz, CPI 2 for all. Program of 1.0E6 instructions: 10% A, 20% B, 50% C, 20% D. Find the global CPI, clock cycles, and which is faster.</p>
<p>P1 CPI = 0.1×1 + 0.2×2 + 0.5×3 + 0.2×3 = <b>2.6</b> → 2.6×10<sup>6</sup> cycles → 1.04 ms. P2 CPI = <b>2.0</b> → 2.0×10<sup>6</sup> cycles → 0.667 ms. <b>P2 is faster</b> (≈1.56×).</p></details>
<details class="ans"><summary>Worked: Exercise 1.7 (original, page 56) — compilers</summary>
<p><i>Question (condensed):</i> Compiler A: 1.0E9 instructions, 1.1 s. Compiler B: 1.2E9 instructions, 1.5 s. Cycle time 1 ns. (a) average CPI; (b) clock-speed ratio if execution times are equal; (c) new compiler with 6.0E8 instructions and CPI 1.1: speedup vs A and B.</p>
<p>(a) CPI_A = 1.1 s / (1 ns × 1.0E9) = <b>1.1</b>; CPI_B = 1.5/(1 ns × 1.2E9) = <b>1.25</b>.<br>
(b) Equal time → f_A/f_B = (CPI_A×IC_A)/(CPI_B×IC_B) = 1.1E9/1.5E9 ≈ <b>0.73</b>: the processor running A's code needs only ≈ 73% of the clock rate (B's code needs a clock that is 1.36× faster).<br>
(c) New time = 6.0E8 × 1.1 × 1 ns = 0.66 s → speedup vs A = 1.1/0.66 ≈ <b>1.67×</b>, vs B = 1.5/0.66 ≈ <b>2.27×</b>.</p></details>
<details class="ans"><summary>Worked: Exercise 1.11 (original, page 57) — SPEC bzip2 (selected parts)</summary>
<p><i>Question (condensed):</i> bzip2: instruction count 2.389E12, execution time 750 s, reference time 9650 s, clock cycle time 0.333 ns.</p>
<p>1.11.1 CPI = time/(IC × cycle time) = 750/(2.389E12 × 0.333E-9) ≈ <b>0.94</b>. 1.11.2 SPECratio = 9650/750 ≈ <b>12.87</b>. 1.11.3 +10% instructions, same CPI → CPU time +10% → <b>825 s</b> (+75 s). 1.11.4 +10% instructions and +5% CPI → ×1.155 → ≈ <b>866 s</b> (+15.5%). 1.11.5 New SPECratio = 9650/866.25 ≈ <b>11.14</b> (a decrease of ≈ 1.73). The remaining sub-parts (1.11.6–1.11.11) use the same equations.</p></details>
<details class="ans"><summary>Worked: Exercise 1.15 (original, page 59) — parallel overhead</summary>
<p><i>Question (condensed):</i> t = 100 s on one processor. On p processors: t/p + 4 s overhead. Compute per-processor time, speedup and speedup/ideal for p = 2…128.</p>
<table><tr><th>p</th><th>Time (s)</th><th>Speedup</th><th>Actual/ideal</th></tr>
<tr><td>2</td><td>54.0</td><td>1.85</td><td>0.93</td></tr><tr><td>4</td><td>29.0</td><td>3.45</td><td>0.86</td></tr>
<tr><td>8</td><td>16.5</td><td>6.06</td><td>0.76</td></tr><tr><td>16</td><td>10.25</td><td>9.76</td><td>0.61</td></tr>
<tr><td>32</td><td>7.125</td><td>14.04</td><td>0.44</td></tr><tr><td>64</td><td>5.5625</td><td>17.98</td><td>0.28</td></tr>
<tr><td>128</td><td>4.78125</td><td>20.92</td><td>0.16</td></tr></table>
<p class="ar" dir="rtl">الدرس: الـ overhead الثابت بيخلي الـ speedup ميوصلش للـ ideal، وكل ما زودنا processors الفرق بيزيد.</p></details>

<h2 id="c1-7">1.7 The Power Wall</h2>
<figure class="fig"><a href="assets/figs/ch1_p39.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch1_p39.jpg" alt="Original page with Figure 1.16"></a><figcaption><b>Figure 1.16</b> (PDF page 39) — clock rate and power for eight generations of Intel x86 microprocessors (from the 80286 to the Core i5 Ivy Bridge). Both grew rapidly for decades, then flattened. The Pentium 4 jumped in clock rate and power but less in performance; the Prescott thermal problems led to abandoning the Pentium 4 line; Core 2 reverted to a simpler pipeline with lower clock rates and multiple processors per chip.</figcaption></figure>
<p class="ar" dir="rtl">الـ clock rate والـ power كبروا مع بعض لأنهم مترابطين، ووقفوا لأننا وصلنا لحد الـ <b>cooling</b> المعقول للـ commodity microprocessors. ده اسمه <b>Power Wall</b>. في عصر PostPC أهم resource بقى الـ <b>energy</b> (battery life وتكلفة تشغيل الـ WSC).</p>
<ul>
<li><b>Technology:</b> dominant IC technology is <b>CMOS</b> (complementary metal oxide semiconductor). Main energy source = <b>dynamic energy</b>: energy consumed when transistors switch 0→1 or 1→0.</li>
<li>Energy (joules) is a better measure than power (watts), since watts = joules/second.</li>
</ul>
<pre class="code">Energy ∝ Capacitive load × Voltage²            (pulse: 0→1→0 or 1→0→1)
Energy ∝ ½ × Capacitive load × Voltage²        (a single transition)
Power  ∝ ½ × Capacitive load × Voltage² × Frequency switched</pre>
<p>Frequency switched is a function of clock rate; capacitive load per transistor depends on the <b>fanout</b> (number of transistors connected to an output) and the technology (capacitance of wires and transistors).</p>
<div class="ex"><b>Why did clock rate grow 1000× while power grew only 30×?</b> Voltage was lowered with each generation (about 15% per generation); power depends on voltage <u>squared</u>. In 20 years, voltage dropped from 5 V to 1 V.</div>
<div class="ex"><b>Example:</b> New processor has 85% of the capacitive load, voltage reduced 15%, and frequency reduced 15% → Power_new/Power_old = 0.85 × 0.85² × 0.85 = 0.85<sup>4</sup> ≈ <b>0.52</b> — about <b>half</b> the power.</div>
<div class="warn"><b>The problem today:</b> lowering voltage further makes transistors too <b>leaky</b> (like faucets that can't be shut off). About <b>40%</b> of power in server chips is <b>static (leakage)</b> power. Cooling can't be pushed much (e.g., 300 W is too expensive for PCs/servers/PMDs).</div>
<p class="en">Elaboration: Static energy consumption occurs because of leakage current that flows even when a transistor is off → more transistors means more power even if always off. Power is a challenge because it must be brought in (hundreds of pins for power and ground; multiple interconnect levels) and dissipated as heat (server chips can burn &gt;100 W).</p>
<p class="en">Designers tried: bigger cooling devices and turning off parts of the chip not used in a given cycle. Then they chose a different path: <b>multiple processors per chip</b>.</p>

<h2 id="c1-8">1.8 The Sea Change: Uniprocessors to Multiprocessors</h2>
<figure class="fig"><a href="assets/figs/ch1_p43.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch1_p43.jpg" alt="Original page with Figure 1.17"></a><figcaption><b>Figure 1.17</b> (PDF page 43) — growth in processor performance since the mid-1980s relative to the VAX 11/780 (SPECint). Before mid-1980s: ≈25%/year (technology-driven). Since then ≈52%/year (architecture/organization ideas) — about ×7 higher in 2002 than at 25%. Since 2002: ≈22%/year (limits of power, available instruction-level parallelism, long memory latency).</figcaption></figure>
<ul>
<li>Since 2006 all desktop and server companies ship microprocessors with <b>multiple processors per chip</b> (called <b>cores</b>); benefit is more on <u>throughput</u> than response time. A “quad-core” chip has four cores.</li>
<li>Before: programmers got ×2 performance every 18 months <u>without changing code</u>. Now they must <b>rewrite programs for multiple processors</b> and keep improving as cores increase. <b>Parallelism is now required for performance.</b></li>
<li><b>Hardware/Software Interface:</b> pipelining is <i>instruction-level parallelism</i> (hardware hides parallelism). Explicitly parallel programming was the “third rail” of computer architecture.</li>
</ul>
<h3>Why is parallel programming hard?</h3>
<ol>
<li>Parallel programming is performance programming: it must be correct <u>and fast</u> (otherwise write sequential code).</li>
<li>You must divide the work so each processor has roughly the same amount to do at the same time, and the overhead of scheduling and coordination must not eat the benefit.</li>
</ol>
<p class="en">Newspaper analogy: 8 reporters could write 8× faster only if the task is split (<b>scheduling</b>), the load is balanced (<b>load balancing</b>), communication and <b>synchronization</b> overhead is small, and no part depends on all the others finishing.</p>
<div class="note"><b>Roadmap of parallelism in the book:</b> Ch.2 §2.11 synchronization; Ch.3 §3.6 subword parallelism; Ch.4 §4.10 parallelism via instructions; Ch.5 §5.10 cache coherence; Ch.5 §5.11 RAID; Ch.6 full chapter on multicore/parallel processing; Appendix C: GPU.</div>

<h2 id="c1-9">1.9 Real Stuff: Benchmarking the Intel Core i7</h2>
<ul>
<li><b>Workload:</b> the set of programs a user runs. <b>Benchmarks:</b> programs specifically chosen to measure performance, forming a workload that predicts the actual workload.</li>
<li><b>SPEC (System Performance Evaluation Cooperative):</b> vendor-funded effort to create standard benchmark sets. SPEC CPU2006 = 12 integer benchmarks (CINT2006) + 17 floating-point benchmarks (CFP2006).</li>
<li><b>SPECratio</b> = reference-processor execution time ÷ measured execution time. Bigger = faster (inverse of execution time). The summary number is the <b>geometric mean</b> of the SPECratios.</li>
</ul>
<pre class="code">SPECratio = Reference time / Execution time
Geometric mean = (Π_{i=1..n} Execution time ratio_i)^(1/n)
overall ssj_ops per watt = (Σ ssj_ops_i) / (Σ power_i)     (i = 0%…100% load in 10% steps)</pre>
<figure class="fig"><a href="assets/figs/ch1_p46.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch1_p46.jpg" alt="Original page with Figure 1.18"></a><figcaption><b>Figure 1.18</b> (PDF page 46) — SPECINTC2006 benchmarks on a 2.66 GHz Intel Core i7 920: for each benchmark, instruction count (billions), CPI, clock cycle time (ns), execution time, reference time and SPECratio. CPI varies by more than a factor of 5.</figcaption></figure>
<figure class="fig"><a href="assets/figs/ch1_p47.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch1_p47.jpg" alt="Original page with Figure 1.19"></a><figcaption><b>Figure 1.19</b> (PDF page 47) — SPECpower_ssj2008 on a dual-socket 2.66 GHz Intel Xeon X5650 with 16 GB DRAM and one 100 GB SSD: performance (ssj_ops) and average power at each 10% load level.</figcaption></figure>
<div class="note"><b>Why geometric mean?</b> It gives the same relative answer no matter which computer is used to normalize the results; an arithmetic mean of normalized times would change depending on the reference machine.</div>
<p class="en">SPECpower (from SPECJBB2005, Java business applications) reports power consumption of servers at different workload levels in 10% increments; performance is throughput in business operations per second (ssj_ops).</p>

<h2 id="c1-10">1.10 Fallacies and Pitfalls</h2>
<p><b>Fallacy</b> = a commonly held misconception (with a counterexample). <b>Pitfall</b> = an easily made mistake, often a generalization of a principle true only in a limited context.</p>
<table>
<tr><th>Type</th><th>Statement</th><th>Why (key idea)</th></tr>
<tr><td>Pitfall</td><td>Expecting the improvement of one aspect of a computer to increase overall performance by an amount proportional to the size of the improvement</td><td><b>Amdahl's Law</b> — improvement is limited by how much the improved feature is used.</td></tr>
<tr><td>Fallacy</td><td>Computers at low utilization use little power</td><td>Servers' utilization is mostly 10–50% (100% less than 1% of the time at Google) but they still draw a large fraction of peak power (best 2012 SPECpower system: 33% of peak power at 10% load). Argues for <b>energy-proportional computing</b> (e.g., 10% of peak power at 10% load).</td></tr>
<tr><td>Pitfall</td><td>Using a subset of the performance equation as a performance metric</td><td>E.g., <b>MIPS</b>, which ignores instruction count differences and CPI variation.</td></tr>
</table>
<pre class="code">Execution time after improvement = (Execution time affected by improvement / Amount of improvement) + Execution time unaffected

MIPS = Instruction count / (Execution time × 10^6) = Clock rate / (CPI × 10^6)</pre>
<div class="ex"><b>Amdahl example:</b> Program takes 100 s; multiply = 80 s. Want 5× faster → target 20 s. 20 = 80/n + 20 → 80/n = 0 → <b>impossible for any n</b>. The enhancement is limited by the 80% usage (and “make the common case fast” also has this demoralizing corollary, the <i>law of diminishing returns</i>).</div>
<div class="warn"><b>Why MIPS misleads:</b> (1) it doesn't account for the capabilities of instructions — can't compare ISAs with different instruction counts; (2) MIPS varies between programs on the same computer (CPI varies by &gt;5× in SPEC on the Core i7); (3) a new program that executes more but faster instructions can raise MIPS while the real performance falls.</div>
<details class="ans"><summary>Check Yourself (1.10) — book answer</summary><p>a. Computer A has the higher MIPS rating. b. Computer B is faster (execution time is what counts).</p></details>
<details class="ans"><summary>Worked: Exercise 1.12 (original, page 58) — fallacies check</summary>
<p><i>Question (condensed):</i> P1: 4 GHz, CPI 0.9, 5.0E9 instructions. P2: 3 GHz, CPI 0.75, 1.0E9 instructions.</p>
<p>Time P1 = 5E9×0.9/4E9 = <b>1.125 s</b>; Time P2 = 1E9×0.75/3E9 = <b>0.25 s</b>.<br>
1.12.1 P1 has the larger clock rate, but P2 is faster (4.5×) → fallacy confirmed.<br>
1.12.2 For the time P1 needs for 1.0E9 instructions (1E9×0.9/4E9 = 0.225 s), P2 can execute 0.225×3E9/0.75 = <b>9.0E8</b> instructions.<br>
1.12.3 MIPS: P1 = 5E9/(1.125×10<sup>6</sup>) ≈ <b>4444</b>; P2 = 1E9/(0.25×10<sup>6</sup>) = <b>4000</b>. P1 has the larger MIPS but P2 is faster → fallacy confirmed.<br>
1.12.4 With 40% FP instructions: MFLOPS P1 = 0.4×5E9/(1.125×10<sup>6</sup>) ≈ <b>1778</b>; P2 = 0.4×1E9/(0.25×10<sup>6</sup>) = <b>1600</b>.</p></details>
<details class="ans"><summary>Worked: Exercise 1.13 (original, page 58) — Amdahl</summary>
<p><i>Question (condensed):</i> Program takes 250 s: 70 s FP, 85 s load/store, 40 s branch (so INT = 250 − 70 − 85 − 40 = 55 s).</p>
<p>1.13.1 FP time −20% → saves 14 s → total <b>236 s</b> (5.6% reduction). 1.13.2 To cut total time by 20% (50 s) using INT only, INT would have to drop by 50 s of 55 s ≈ <b>91%</b>. 1.13.3 <b>No</b>: branch instructions total only 40 s &lt; 50 s needed.</p></details>
<details class="ans"><summary>Worked: Exercise 1.14 (original, page 59)</summary>
<p><i>Question (condensed):</i> 50M FP (CPI 1), 110M INT (CPI 1), 80M L/S (CPI 4), 16M branch (CPI 2); 2 GHz.</p>
<p>Total cycles = 50M + 110M + 320M + 32M = 512M → time = <b>0.256 s</b>. 1.14.1 Twice as fast needs ≤ 256M cycles, but non-FP cycles alone are 462M → <b>impossible</b> by improving FP CPI. 1.14.2 L/S cycles must be 256M − 192M = 64M → L/S CPI = 64M/80M = <b>0.8</b> (from 4). 1.14.3 New cycles = 0.6×160M + 0.7×352M = 96M + 246.4M = 342.4M → time 0.1712 s → <b>≈1.50× faster</b> (33% less time).</p></details>

<h2 id="c1-11">1.11 Concluding Remarks</h2>
<ul>
<li>Cost/performance of computers will keep improving; designers and programmers must understand a wider variety of issues.</li>
<li><b>Abstraction</b>: hierarchical layers, each hiding details from the one above; the most important interface is the <b>instruction set architecture</b>. Keeping the ISA constant allows many implementations to run identical software; downside: it may preclude innovations that need the interface to change.</li>
<li><b>Reliable performance measure = execution time of real programs.</b> Execution time = (Instructions/Program) × (Clock cycles/Instruction) × (Seconds/Clock cycle). Individually the factors don't determine performance; only the product does.</li>
<li><b>Silicon + Moore's Law</b> fuel hardware progress; two key organizational ideas: exploiting <b>parallelism</b> (multiple processors) and exploiting <b>locality</b> in a memory hierarchy (caches).</li>
<li><b>Energy efficiency replaced die area as the most critical resource</b> → multicore → programmers must write parallel software.</li>
<li>Designs are judged by cost and performance and also energy, dependability, cost of ownership and scalability.</li>
<li>Book map: Datapath (Ch. 3, 4, 6, Appendix C), Control (Ch. 4, 6), Memory (Ch. 5), Input and Output (Ch. 5, 6). Ch.2 = instruction sets (interface between compilers and computer); Ch.3 = arithmetic; Appendix B = logic design; Appendix A = reference for the Ch.2 instruction set.</li>
</ul>
<p class="en">1.12 Historical Perspective and Further Reading is online (not in the PDF).</p>

<h2 id="c1-13">1.13 Exercises — remaining original items (practice list)</h2>
<p>All original exercises are in the question bank (Question Bank → “Original: Chapter 1”). Exercises not fully solved above (<b>1.1, 1.8, 1.9, 1.10.3–1.10.4, 1.11.6–1.11.11</b>) are listed in the bank with the formula to use; 1.1 is a discussion question.</p>
` ;
