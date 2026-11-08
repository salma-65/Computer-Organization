window.PAGES.ch2.html += String.raw`
<h2 id="c2-14">2.14 Arrays versus Pointers</h2>
<p class="ar" dir="rtl">الـ pointers في C بتتلخبط على الناس. لو قارنت كود assembly اللي بيستخدم array index بالكود اللي بيستخدم pointer هتفهمها. الهدف: إزاي الـ pointers بتتحول لتعليمات MIPS.</p>
<figure class="fig"><a href="assets/figs/ch2_p69.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch2_p69.jpg" alt="Figure 2.30"></a><figcaption><b>Figure 2.30</b> (PDF page 69) — two C procedures that set an array to zeros: <code>clear1(int array[], int size)</code> uses indices (<code>for (i = 0; i &lt; size; i += 1) array[i] = 0;</code>); <code>clear2(int *array, int size)</code> uses pointers (<code>for (p = &amp;array[0]; p &lt; &amp;array[size]; p = p + 1) *p = 0;</code>). <b>&amp;</b> = address of; <b>*</b> = object pointed to; incrementing an int pointer by 1 moves it by <b>4 bytes</b>.</figcaption></figure>
<h3>Array version (clear1): array → $a0, size → $a1, i → $t0</h3>
<pre class="code">      move $t0,$zero        # i = 0
loop1: sll  $t1,$t0,2       # $t1 = i * 4
      add  $t2,$a0,$t1      # $t2 = address of array[i]
      sw   $zero,0($t2)     # array[i] = 0
      addi $t0,$t0,1        # i = i + 1
      slt  $t3,$t0,$a1      # $t3 = (i < size)
      bne  $t3,$zero,loop1  # if (i < size) go to loop1</pre>
<h3>Pointer version (clear2): p → $t0</h3>
<pre class="code">      move $t0,$a0          # p = address of array[0]
loop2: sw   $zero,0($t0)    # Memory[p] = 0
      addi $t0,$t0,4        # p = p + 4
      sll  $t1,$a1,2        # $t1 = size * 4
      add  $t2,$a0,$t1      # $t2 = address of array[size]
      slt  $t3,$t0,$t2      # $t3 = (p < &array[size])
      bne  $t3,$zero,loop2  # if (p < &array[size]) go to loop2</pre>
<p>Both versions assume size &gt; 0 (ANSI C would test first; a test can be added by a jump before the loop to the slt).</p>
<p><b>Faster pointer version:</b> the end-of-array address does not change, so move <code>sll $t1,$a1,2</code> and <code>add $t2,$a0,$t1</code> <u>before</u> the loop. Then the loop is only: <code>sw $zero,0($t0)</code> ; <code>addi $t0,$t0,4</code> ; <code>slt $t3,$t0,$t2</code> ; <code>bne $t3,$zero,loop2</code>.</p>
<div class="note"><b>Comparison:</b> the array version must recompute the scaled index and address each iteration (the multiply/shift and add are inside the loop). The pointer version increments the pointer directly and moves the scaling shift and the array bound outside the loop → instructions per iteration drop from <b>6 to 4</b>. These manual optimizations correspond to compiler optimizations: <b>strength reduction</b> (shift instead of multiply) and <b>induction variable elimination</b> (eliminating array address calculations within loops).</div>
<p class="en">Modern optimizing compilers produce array-version code that is just as good; programmers today prefer that the compiler do the heavy lifting.</p>

<h2 id="c2-15">2.15 Advanced Material: Compiling C and Interpreting Java</h2>
<p class="en">Only the introduction is in your PDF (“the rest of Section 2.15 can be found online”). It states that the compiler significantly affects performance, so understanding compiler technology is critical to understanding performance; compiler construction is normally a one- or two-semester course. The second part (online) shows Java bytecodes used for interpretation and the MIPS code for the Java versions of earlier C segments including Bubble Sort, covering the JVM and JIT compilers. <b>Object-oriented language:</b> a language oriented around objects rather than actions, or data versus logic.</p>

<h2 id="c2-16">2.16 Real Stuff: ARMv7 (32-bit) Instructions</h2>
<ul>
<li><b>ARM:</b> the most popular ISA for embedded devices; more than 9 billion devices in 2011, growth about 2 billion per year. Originally <b>Acorn RISC Machine</b>, later <b>Advanced RISC Machine</b>. Appeared the same year as MIPS (1985) and follows similar philosophies. <b>Principal difference: MIPS has more registers, ARM has more addressing modes.</b></li>
<li>Both have a similar core of arithmetic-logical and data-transfer instructions (Figure 2.32). ARM has <b>no divide instruction</b>.</li></ul>
<table><tr><th>Feature (Figure 2.31)</th><th>ARMv7</th><th>MIPS</th></tr>
<tr><td>Instruction size</td><td>32 bits</td><td>32 bits</td></tr>
<tr><td>Integer registers</td><td>15 GPR × 32 bits</td><td>31 GPR × 32 bits ($zero is register 0)</td></tr>
<tr><td>Register for constant 0</td><td>No (separate opcodes needed)</td><td>Yes: $zero</td></tr>
<tr><td>Data addressing modes</td><td>9 (including complex calculations)</td><td>3 simple modes</td></tr>
<tr><td>Conditional branch method</td><td>4 condition-code bits (negative, zero, carry, overflow) in the program status word</td><td>Compares register contents (beq, bne, slt)</td></tr></table>
<figure class="fig"><a href="assets/figs/ch2_p73.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch2_p73.jpg" alt="Figures 2.31 and 2.32"></a><figcaption><b>Figures 2.31 and 2.32</b> (PDF page 73) — similarities in ARM and MIPS instruction sets, and ARM register-register and data-transfer instructions equivalent to the MIPS core (e.g., add/subtract with trap on overflow, load high part, shifts, load byte/halfword signed and unsigned, atomic exchange).</figcaption></figure>
<h3>Addressing modes</h3>
<p>ARM data modes (Figure 2.33): register operand; immediate operand; register + offset (displacement/based); register + register (indexed); register + scaled register (scaled); register + offset and update register; register + register and update register; autoincrement/autodecrement; PC-relative data. ARM can shift one register by any amount, add it to other registers to form the address, then update a register. ARM shifts the offset left 1 or 2 bits for halfword/word data to extend range.</p>
<figure class="fig"><a href="assets/figs/ch2_p74.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch2_p74.jpg" alt="Figure 2.33"></a><figcaption><b>Figure 2.33</b> (PDF page 74) — summary of ARM data addressing modes.</figcaption></figure>
<h3>Compare and conditional branch</h3>
<ul><li><b>Condition codes:</b> N (negative), Z (zero), C (carry), V (overflow). Setting them is <b>optional</b> on each arithmetic/logical instruction (fewer pipeline problems).</li>
<li><b>CMP</b> subtracts (difference sets codes); <b>CMN</b> adds; <b>TST</b> = logical AND (sets all codes but overflow); <b>TEQ</b> = exclusive OR (sets the first three).</li>
<li><b>Conditional execution:</b> every ARM instruction starts with a <b>4-bit field</b> that decides whether it acts as a nop or a real instruction depending on the condition codes → conditional branches are “conditionally executing the unconditional branch”. It avoids branching over a single instruction.</li></ul>
<figure class="fig"><a href="assets/figs/ch2_p75.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch2_p75.jpg" alt="Figure 2.34"></a><figcaption><b>Figure 2.34</b> (PDF page 75) — instruction formats, ARM and MIPS; differences: the 4-bit conditional execution field in every ARM instruction and smaller register fields (16 vs 32 registers).</figcaption></figure>
<h3>Unique features of ARM</h3>
<ul><li>Extra arithmetic-logical instructions (Figure 2.35, PDF page 76): reverse subtract, bit clear (Rd = Rs1 &amp; ~Rs2), and support for <b>multiword arithmetic</b> (add/subtract with carry).</li>
<li><b>12-bit immediate:</b> the 8 least-significant bits are zero-extended to 32 bits, then rotated right by (first 4 bits of the field × 2). It can represent all powers of two in a 32-bit word.</li>
<li><b>Operand shifting</b>: the second register of all arithmetic/logical operations can be shifted first: shift left logical, shift right logical, shift right arithmetic, rotate right.</li>
<li><b>Block loads/stores:</b> a 16-bit mask selects any of the 16 registers to load/store in one instruction (used to save/restore registers on procedure entry/return; today mostly block memory copy).</li></ul>
`;
