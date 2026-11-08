window.PAGES = window.PAGES || {};
window.PAGES.revision = { title: "Final Revision", html: String.raw`
<div class="note"><b>Coverage:</b> this revision covers <b>Chapter 1</b> and the <b>MIPS Lab (Lab 5 + Lab 6)</b>. The Chapter 2 revision items will be added after Chapter 2 notes are completed (see PROJECT_PROGRESS.md).</div>

<h2 id="rv-def">1. Important definitions (Chapter 1)</h2>
<table>
<tr><th>Term</th><th>Definition</th></tr>
<tr><td>Moore's Law</td><td>Integrated-circuit resources double every 18–24 months.</td></tr>
<tr><td>PC / Server / Supercomputer / Embedded</td><td>PC: single user, low cost. Server: multi-user via network, dependability. Supercomputer: highest performance/cost servers. Embedded: one predetermined application inside another device (largest class).</td></tr>
<tr><td>PMD, Cloud Computing, WSC, SaaS</td><td>Battery-operated wireless devices with apps; servers rented over the Internet; giant datacenters (~100,000 servers); software delivered as a service via a thin client.</td></tr>
<tr><td>Multicore microprocessor</td><td>One chip with multiple processors (“cores”).</td></tr>
<tr><td>Operating system / Compiler / Assembler</td><td>Interface between program and hardware (I/O, memory allocation, protected sharing); high-level → assembly; assembly → machine language.</td></tr>
<tr><td>Instruction set architecture (ISA)</td><td>Interface between hardware and lowest-level software; ABI = ISA + OS interface.</td></tr>
<tr><td>Five classic components</td><td>Input, output, memory, datapath, control (datapath + control = processor).</td></tr>
<tr><td>DRAM / SRAM / Cache</td><td>Main-memory technology / faster, less dense cache technology / small fast buffer for DRAM.</td></tr>
<tr><td>Volatile / nonvolatile</td><td>Loses data without power / keeps it. Main memory is volatile; secondary memory is nonvolatile.</td></tr>
<tr><td>Wafer, die, yield</td><td>Slice of silicon ingot; individual chip cut from the wafer; % good dies.</td></tr>
<tr><td>Response time vs throughput</td><td>Time to complete one task vs total work per unit time.</td></tr>
<tr><td>CPU time, user CPU time, system CPU time</td><td>CPU computing time for the task (excludes I/O wait); in program; in OS on behalf of program.</td></tr>
<tr><td>CPI / IPC</td><td>Average clock cycles per instruction / instructions per clock cycle (=1/CPI).</td></tr>
<tr><td>SPECratio</td><td>Reference time ÷ measured time; summarized by the geometric mean.</td></tr>
</table>

<h2 id="rv-formulas">2. Formulas and conditions (Chapter 1)</h2>
<pre class="code">Performance = 1 / Execution time
X is n× as fast as Y:      n = Exec time_Y / Exec time_X
CPU time = Clock cycles × Clock cycle time = Clock cycles / Clock rate
Clock cycles = Instruction count × CPI
CPU time = IC × CPI × Cycle time = IC × CPI / Clock rate
Cost per die = Cost per wafer / (Dies per wafer × Yield)
Dies per wafer ≈ Wafer area / Die area
Yield = 1 / (1 + Defects per area × Die area / 2)^2
Dynamic power ∝ ½ × C × V² × f        (energy per transition ∝ ½ C V²)
Amdahl: T_after = T_affected / improvement + T_unaffected
MIPS = IC / (Time × 10^6) = Clock rate / (CPI × 10^6)
SPECratio = Reference time / Execution time      Geometric mean = (Π ratio_i)^(1/n)
ssj_ops per watt = Σ ssj_ops_i / Σ power_i</pre>

<h2 id="rv-eight">3. Eight great ideas (memorize in order)</h2>
<ol><li>Design for Moore's Law</li><li>Use Abstraction to Simplify Design</li><li>Make the Common Case Fast</li><li>Performance via Parallelism</li><li>Performance via Pipelining</li><li>Performance via Prediction</li><li>Hierarchy of Memories</li><li>Dependability via Redundancy</li></ol>

<h2 id="rv-num">4. Numbers worth memorizing (Chapter 1)</h2>
<ul>
<li>TB = 10¹², TiB = 2⁴⁰ (10% larger); KiB is 2% larger than KB; YiB is 21% larger than YB.</li>
<li>Color pixel: 8+8+8 = 24 bits.</li>
<li>Flash wears out after 100,000–1,000,000 writes.</li>
<li>DRAM 50–70 ns; disk 100,000–400,000× slower; flash 100–1000× slower; disk ≈100× cheaper per GB; flash 7–10× cheaper per GB.</li>
<li>DRAM capacity quadruples every ~3 years (≈60%/yr) for 20 years (&gt;16,000×).</li>
<li>Chip manufacturing: 20–40 steps; 2–8 metal layers; one transistor layer.</li>
<li>~40% of server-chip power is leakage; voltage fell 5 V → 1 V in 20 years (≈15% per generation).</li>
<li>Uniprocessor performance growth: ≈25%/yr before mid-1980s, ≈52%/yr after, ≈22%/yr since 2002.</li>
<li>SPEC CPU2006: 12 integer + 17 floating-point benchmarks. Multicore shipping since 2006.</li>
</ul>

<h2 id="rv-confused">5. Frequently confused concepts (Chapter 1)</h2>
<table>
<tr><th>Pair</th><th>Difference</th></tr>
<tr><td>TB vs TiB</td><td>10¹² vs 2⁴⁰ bytes</td></tr>
<tr><td>Response time vs throughput</td><td>one task's time vs work per unit time</td></tr>
<tr><td>Elapsed time vs CPU time</td><td>includes I/O and other programs vs excludes them</td></tr>
<tr><td>Clock rate vs clock cycle time</td><td>inverses</td></tr>
<tr><td>CPI vs instruction count</td><td>cycles/instruction vs number of instructions; both needed</td></tr>
<tr><td>Power vs energy</td><td>watts (joules/second) vs joules</td></tr>
<tr><td>Dynamic vs static (leakage) power</td><td>from switching vs from leakage when off</td></tr>
<tr><td>Main (primary) vs secondary memory</td><td>volatile running memory vs nonvolatile storage</td></tr>
<tr><td>Compiler vs assembler</td><td>high-level→assembly vs assembly→binary</td></tr>
<tr><td>Architecture vs implementation</td><td>the ISA abstraction vs hardware that obeys it</td></tr>
</table>

<h2 id="rv-mistakes">6. Common mistakes &amp; tricky details (Chapter 1)</h2>
<ul>
<li>Judging performance by only clock rate, MIPS or instruction count.</li>
<li>Expecting an improvement of one part to speed up the whole proportionally (Amdahl).</li>
<li>Saying “increase performance by decreasing execution time” confusingly — say “improve”.</li>
<li>Believing low-utilization computers use little power.</li>
<li>Forgetting that CMOS power depends on voltage <u>squared</u>.</li>
</ul>

<h2 id="rv-mips">7. MIPS Lab — rules and instructions</h2>
<table>
<tr><th>Topic</th><th>Key facts</th></tr>
<tr><td>MIPS</td><td>Microprocessor without Interlocked Pipeline Stages; 32 registers × 32 bits; load/store; 32-bit fixed instruction; three-operand arithmetic.</td></tr>
<tr><td>Registers</td><td>$zero 0; $at 1; $v0–$v1 2–3; $a0–$a3 4–7; $t0–$t7 8–15; $s0–$s7 16–23; $t8–$t9 24–25; $k0–$k1 26–27; $gp 28; $sp 29; $fp 30; $ra 31. Special: HI, LO, PC.</td></tr>
<tr><td>Directives</td><td>.word 4 B, .half 2 B, .byte 1 B, .space N bytes uninitialized, .asciiz string with null, .ascii without.</td></tr>
<tr><td>Print syscalls</td><td>1 int ($a0), 2 float ($f12), 3 double ($f12), 4 string ($a0 address), 11 char ($a0), 10 exit.</td></tr>
<tr><td>Input syscalls</td><td>5 int → $v0; 6 float → $f0; 8 string: $a0 buffer, $a1 max length.</td></tr>
<tr><td>Arithmetic</td><td>add/sub $rd,$rs,$rt; mul $rd,$rs,$rt (low 32 bits); mult $rs,$rt → HI:LO (mflo/mfhi); sll $rd,$rt,x = ×2^x; div/divu $rs,$rt → LO quotient, HI remainder.</td></tr>
<tr><td>Branches</td><td>beq, bne, slt (+beq/bne), j. Pseudo: b, blt, ble, bge, bgt, bnez, beqz (use $at).</td></tr>
<tr><td>Loops</td><td>label; test condition (branch out if false); body; j back; exit label.</td></tr>
<tr><td>Arrays</td><td>Declared in .data; la base; offset = index × element size (4 for .word/.float, 1 for .byte); sll by 2; add; lw/lwc1 0(addr).</td></tr>
</table>
<h3>Pseudo-instruction conversions (very likely exam item)</h3>
<pre class="code">b    label            →  j label
blt  $a,$b,L          →  slt $at,$a,$b ; bne $at,$zero,L
ble  $a,$b,L          →  slt $at,$b,$a ; beq $at,$zero,L
bge  $a,$b,L          →  slt $at,$a,$b ; beq $at,$zero,L
bgt  $a,$b,L          →  slt $at,$b,$a ; bne $at,$zero,L
bnez $a,L             →  bne $a,$zero,L
beqz $a,L             →  beq $a,$zero,L</pre>
<h3>Common mistakes (MIPS)</h3>
<ul>
<li>Forgetting the exit syscall (<code>li $v0,10; syscall</code>).</li>
<li>Forgetting <code>j loop_start</code> or the counter increment.</li>
<li>Index not multiplied by 4 for word arrays.</li>
<li>Using .ascii instead of .asciiz for printed strings.</li>
<li>mul on products larger than 32 bits; forgetting mflo/mfhi after mult/div.</li>
<li>Reading float into $v0 (it's $f0); forgetting <code>la $a0,buffer</code> for string input.</li>
<li>Duplicate labels; missing <code>j end</code> after the else part.</li>
<li>Swapped operands in sub.</li>
</ul>

<h2 id="rv-checklist">8. Last-minute checklist</h2>
<ul class="check">
<li><label><input type="checkbox"> I can list the three computer classes and PMD/Cloud/SaaS.</label></li>
<li><label><input type="checkbox"> I know the eight great ideas in order with examples.</label></li>
<li><label><input type="checkbox"> I can draw the five components and explain compiler → assembler.</label></li>
<li><label><input type="checkbox"> I can compute CPU time, CPI, speedup, yield, cost per die.</label></li>
<li><label><input type="checkbox"> I can apply Amdahl's Law and explain why MIPS misleads.</label></li>
<li><label><input type="checkbox"> I know the dynamic power equation and why voltage matters most.</label></li>
<li><label><input type="checkbox"> I know the MIPS registers table and the data directives.</label></li>
<li><label><input type="checkbox"> I know syscall codes (1,2,3,4,5,6,8,10,11).</label></li>
<li><label><input type="checkbox"> I can trace if/else, while loops and array printing.</label></li>
<li><label><input type="checkbox"> I can convert pseudo branches to real instructions.</label></li>
<li><label><input type="checkbox"> (Pending) Chapter 2 revision items.</label></li>
</ul>
` };
