window.PAGES = window.PAGES || {};
window.PAGES.ch2 = { title: "Chapter 2 — Instructions: Language of the Computer", html: String.raw`
<p class="lead">Source: <b>Chapter2.pdf</b> (102 pages). Page references use <b>PDF page</b>; book page = PDF page + 59 (e.g., Figure 2.1 is on PDF page 5 = book page 64). Figures are original page images. Notes are written section by section; see the bottom of the page for the figure index.</p>
<div class="note"><b>ازاي تذاكر:</b> الشرح بالعربي المصري وبعده الصياغة الإنجليزية للامتحان. الـ instructions والـ registers بتفضل إنجليزي زي ما هي.</div>

<h2 id="c2-1">2.1 Introduction</h2>
<p class="ar" dir="rtl">عشان تتحكم في الـ hardware لازم تتكلم لغته. "كلمات" الكمبيوتر اسمها <b>instructions</b> و"القاموس" بتاعه اسمه <b>instruction set</b>. لغات الكمبيوتر شبه بعض (زي لهجات إقليمية) فبعد ما تتعلم واحدة التانية سهلة.</p>
<div class="def"><b>Instruction set:</b> the vocabulary of commands understood by a given architecture. <b>Stored-program concept:</b> the idea that instructions and data of many types can be stored in memory as numbers, leading to the stored-program computer.</div>
<ul>
<li>The book's main instruction set is <b>MIPS</b> (from MIPS Technologies), an elegant example of instruction sets designed since the 1980s.</li>
<li>Three other sets are previewed: <b>ARMv7</b> (similar to MIPS; more than 9 billion ARM chips were made in 2011 — the most popular instruction set), <b>Intel x86</b> (PC and the cloud of the PostPC era), <b>ARMv8</b> (extends address size from 32 to 64 bits; ironically closer to MIPS than to ARMv7).</li>
<li>Instruction sets are similar because all computers are built from similar hardware technology and must provide a few basic operations; designers share the goal of making hardware and compilers easy to build while maximizing performance and minimizing cost and energy. (Burks, Goldstine and von Neumann, 1947: practical considerations — simplicity of equipment — decide.)</li>
<li>The chapter is top-down: starts from a notation like a restricted programming language and refines it to the real language. Examples are in C.</li>
</ul>
<figure class="fig"><a href="assets/figs/ch2_p05.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch2_p05.jpg" alt="Figure 2.1 page"></a><figcaption><b>Figure 2.1</b> (PDF page 5) — MIPS assembly language revealed in this chapter (also Column 1 of the MIPS Reference Data Card). Lists the registers ($s0–$s7, $t0–$t9, $zero, $a0–$a3, $v0–$v1, $gp, $fp, $sp, $ra, $at; 2<sup>30</sup> memory words, byte addressed) and instructions: add, sub, addi, lw, sw, lh, lhu, sh, lb, lbu, sb, ll, sc, lui, and, or, nor, andi, ori, sll, srl, beq, bne, slt, sltu, slti, sltiu, j, jr, jal.</figcaption></figure>

<h2 id="c2-2">2.2 Operations of the Computer Hardware</h2>
<p class="ar" dir="rtl">أي كمبيوتر لازم يعمل حساب. في MIPS التعليمة الحسابية بتعمل <b>عملية واحدة بس</b> وليها <b>3 operands بالظبط</b>.</p>
<pre class="code">add a, b, c      # a = b + c  (the sum of b and c is placed in a)</pre>
<p>Summing four variables b, c, d, e into a takes <b>three</b> instructions:</p>
<pre class="code">add a, b, c      # a = b + c
add a, a, d      # a = b + c + d
add a, a, e      # a = b + c + d + e</pre>
<ul>
<li><b>#</b> starts a comment; comments end at the end of the line; each line holds <b>at most one instruction</b>.</li>
<li>Exactly three operands (two sources + one destination) → <b>hardware for a fixed number of operands is simpler</b>.</li>
</ul>
<div class="def"><b>Design Principle 1: Simplicity favors regularity.</b></div>
<h3>Compiling C into MIPS</h3>
<table><tr><th>C</th><th>MIPS (symbolic)</th></tr>
<tr><td><code>a = b + c; d = a - e;</code></td><td><code>add a,b,c</code> ; <code>sub d,a,e</code></td></tr>
<tr><td><code>f = (g + h) - (i + j);</code></td><td><code>add t0,g,h</code> ; <code>add t1,i,j</code> ; <code>sub f,t0,t1</code> (compiler creates temporaries t0, t1)</td></tr></table>
<p class="ar" dir="rtl">لازم نقسم الجملة المعقدة لتعليمات كتير لأن كل تعليمة بتعمل عملية واحدة. الـ compiler هو اللي بيعمل الترجمة وبيعمل temporary variables.</p>
<details class="ans"><summary>Check Yourself (§2.2) — book answer</summary><p>Most lines → fewest lines: <b>MIPS (assembly), C, Java</b>.</p></details>
<p class="en"><b>Elaboration:</b> Java was envisioned to rely on a software interpreter whose instruction set is <b>Java bytecodes</b>; today Java systems typically compile bytecodes into native instructions using <b>Just-In-Time (JIT) compilers</b>.</p>

<h2 id="c2-3">2.3 Operands of the Computer Hardware</h2>
<h3>Register operands</h3>
<ul>
<li>Arithmetic operands must be in <b>registers</b>: special locations built directly in hardware (the “bricks” of computer construction). MIPS has <b>32 registers</b>, each <b>32 bits</b>.</li>
<li><b>Word</b> = the natural unit of access, usually 32 bits = register size in MIPS.</li>
<li><b>Design Principle 2: Smaller is faster.</b> Many more registers would lengthen the clock cycle (signals travel farther) and need more instruction bits (Section 2.5). “31 registers may not be faster than 32” — a guideline, not an absolute.</li>
<li>Naming: <b>$s0, $s1…</b> for variables of C/Java; <b>$t0, $t1…</b> for temporaries.</li>
</ul>
<div class="ex"><b>Example:</b> f,g,h,i,j in $s0–$s4: <pre class="code">add $t0,$s1,$s2   # $t0 = g + h
add $t1,$s3,$s4   # $t1 = i + j
sub $s0,$t0,$t1   # f = $t0 - $t1</pre></div>
<h3>Memory operands</h3>
<p class="ar" dir="rtl">الـ arrays والـ structures كبيرة ومش هتتحط في 32 register، فبتتخزن في الـ <b>memory</b>. الحساب بيتم على registers بس، فمحتاجين <b>data transfer instructions</b> تنقل بين memory و registers.</p>
<ul>
<li><b>Data transfer instruction:</b> moves data between memory and registers. <b>Address:</b> value that locates a data element in memory.</li>
<li>Memory is a large one-dimensional array; the address is the index starting at 0 (Figure 2.2: third element has address 2, Memory[2] = 10).</li>
<li><b>lw (load word)</b>: memory → register. Format: <code>lw reg, offset(base_register)</code>; address = offset + contents of base register. <b>sw (store word)</b>: register → memory.</li>
<li><b>Offset</b> = the constant; <b>base register</b> = the register added to it.</li>
</ul>
<figure class="fig"><a href="assets/figs/ch2_p09.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch2_p09.jpg" alt="Figure 2.2 page"></a><figcaption><b>Figure 2.2</b> (PDF page 9; Figure 2.3 on PDF page 11) — memory addresses and contents at those locations (simple index version, before byte addressing); Figure 2.3 (same/next page) shows the real MIPS addresses: word addresses are multiples of 4.</figcaption></figure>
<div class="ex"><b>Example:</b> g = h + A[8]; with g=$s1, h=$s2, base of A in $s3. A[8] is at byte offset 4×8 = <b>32</b>:
<pre class="code">lw  $t0, 32($s3)    # $t0 = A[8]
add $s1, $s2, $t0   # g = h + A[8]</pre></div>
<div class="note"><b>Byte addressing:</b> virtually all architectures address individual bytes, so sequential word addresses differ by <b>4</b>. Offset must be 4 × index (A[8] → 32, not 8). Forgetting this is the pitfall noted in §2.19. <b>Alignment restriction:</b> MIPS words must start at addresses that are multiples of 4. <b>MIPS is big-endian</b> (word address = address of the leftmost “big end” byte).</div>
<div class="ex"><b>Example:</b> A[12] = h + A[8]; (h in $s2, base in $s3):
<pre class="code">lw  $t0, 32($s3)    # $t0 = A[8]
add $t0, $s2, $t0   # $t0 = h + A[8]
sw  $t0, 48($s3)    # A[12] = $t0     (4 × 12 = 48)</pre></div>
<ul>
<li><b>Spilling registers:</b> putting less commonly used (or later-needed) variables into memory because programs have more variables than registers. The compiler keeps the most frequently used variables in registers.</li>
<li>Registers are faster, have higher throughput and use less energy than memory (an arithmetic instruction reads two registers and writes one; a data transfer moves only one operand without operating on it).</li>
<li>DRAM sizes are binary (GiB, TiB) because addresses are binary numbers.</li>
</ul>
<h3>Constant or immediate operands</h3>
<ul>
<li>More than half of MIPS arithmetic instructions use a constant operand in SPEC CPU2006. Loading constants from memory is slower and costs energy, so MIPS provides <b>addi (add immediate)</b>: <code>addi $s3,$s3,4   # $s3 = $s3 + 4</code></li>
<li>MIPS has <b>no subtract immediate</b>, because addi supports negative constants.</li>
<li><b>$zero</b> (register 0) is hard-wired to 0 → e.g., <i>move</i> is just an add with $zero. Using frequency to include constants = <b>make the common case fast</b>.</li>
</ul>
<details class="ans"><summary>Check Yourself (§2.3) — how fast do the number of registers grow? (book answer)</summary><p><b>Very slow</b>: programs are distributed in the language of the computer, so there is inertia in the ISA; registers increase only as fast as new instruction sets become viable.</p></details>
<p class="en"><b>Elaboration:</b> MIPS-32 (32-bit registers) vs MIPS-64 (32 64-bit registers). The base register is also called the <b>index register</b> in the original design; offset+base also fits structures (register points to the structure start, offset selects the field).</p>
` };
