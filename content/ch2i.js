window.PAGES.ch2.html += String.raw`
<h2 id="c2-17">2.17 Real Stuff: x86 Instructions</h2>
<p class="ar" dir="rtl">بعض مصممي الـ ISA بيحطوا عمليات أقوى من ARM و MIPS عشان يقللوا عدد التعليمات. الخطر: ده ممكن يكون على حساب البساطة فتبقى كل تعليمة أبطأ (clock أبطأ أو cycles أكتر). "طريق تعقيد العمليات مليان مخاطر".</p>
<h3>Evolution of the Intel x86 (milestones)</h3>
<p class="en">ARM and MIPS were the vision of single small groups in 1985. The x86 is the product of several independent groups over 35 years, adding features “as someone might add clothing to a packed bag”.</p>
<table><tr><th>Year</th><th>Milestone</th></tr>
<tr><td>1978</td><td><b>8086</b>: 16-bit architecture, assembly-compatible extension of the 8-bit 8080; registers have <u>dedicated uses</u> → not a general-purpose register architecture.</td></tr>
<tr><td>1980</td><td><b>8087</b> floating-point coprocessor: ~60 FP instructions; uses a <b>stack</b> instead of registers.</td></tr>
<tr><td>1982</td><td><b>80286</b>: 24-bit address space, memory-mapping and protection model.</td></tr>
<tr><td>1985</td><td><b>80386</b>: 32-bit registers and address space, new addressing modes, paging in addition to segmentation; can run 8086 programs unchanged. Nearly general-purpose register machine.</td></tr>
<tr><td>1989–95</td><td>80486, Pentium, Pentium Pro: higher performance; only four instructions added (three for multiprocessing, one conditional move).</td></tr>
<tr><td>1997</td><td><b>MMX</b> (57 instructions, uses the FP stack): SIMD on multiple short data elements.</td></tr>
<tr><td>1999</td><td><b>SSE</b> (70 instructions, Pentium III): eight separate 128-bit registers, single-precision FP; four 32-bit FP operations in parallel; cache prefetch and streaming stores.</td></tr>
<tr><td>2001</td><td><b>SSE2</b> (144 instructions): double precision (pairs of 64-bit FP operations); compilers can use the SSE registers as normal FP registers instead of the stack; first used by the Pentium 4.</td></tr>
<tr><td>2003</td><td><b>AMD64</b> (by AMD, not Intel): address space 32 → 64 bits; registers widened to 64 bits; 16 registers; 16 SSE registers; new “long mode”; plus legacy and compatibility modes.</td></tr>
<tr><td>2004</td><td>Intel adopts AMD64 as <b>EM64T</b> (adds 128-bit atomic compare-and-swap); SSE3 adds 13 instructions.</td></tr>
<tr><td>2006</td><td><b>SSE4</b>: 54 instructions (sum of absolute differences, dot products, sign/zero extension, population count…), virtual-machine support.</td></tr>
<tr><td>2007</td><td>AMD SSE5: 170 instructions.</td></tr>
<tr><td>2011</td><td><b>AVX</b>: SSE register width 128 → 256 bits; redefines ~250 instructions and adds 128 new.</td></tr></table>
<p>The history shows the <b>“golden handcuffs” of compatibility</b>: the existing software base was too important to jeopardize. About 350M x86 chips are made per year vs 9 billion ARMv7 chips. The x86 largely drove the PC generation and still dominates the cloud portion of the PostPC era, but has not yet been competitive in personal mobile devices. The book focuses on the 32-bit subset from the 80386.</p>
<h3>x86 registers and data addressing modes</h3>
<ul>
<li>80386 extended all 16-bit registers (except segment registers) to 32 bits by prefixing <b>E</b>; only <b>8 GPRs</b> → MIPS programs can use 4× as many, ARMv7 twice as many.</li>
<li>Arithmetic, logical and data-transfer instructions are <b>two-operand</b>: one operand is both source and destination (more register pressure), and <b>one operand can be in memory</b> (no memory–memory mode). Immediates may be 8, 16 or 32 bits.</li>
<li>Displacements can be 8 or 32 bits. There are restrictions on which registers can be used in each addressing mode (Figure 2.38). <b>Base plus scaled index</b> (Base + 2<sup>Scale</sup> × Index, Scale = 0–3; plus optional displacement) is not in ARM or MIPS; it avoids the multiplies by 4 needed to turn an index into a byte address.</li>
</ul>
<figure class="fig"><a href="assets/figs/ch2_p80.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch2_p80.jpg" alt="Figures 2.36 and 2.37"></a><figcaption><b>Figures 2.36 and 2.37</b> (PDF page 80) — the 80386 register set (8 GPRs plus segment pointers, instruction pointer/PC, condition codes) and the allowed operand-type combinations for arithmetic/logical/data transfer (register–register, register–immediate, register–memory, memory–register, memory–immediate; the only restriction is no memory–memory).</figcaption></figure>
<figure class="fig"><a href="assets/figs/ch2_p81.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch2_p81.jpg" alt="Figure 2.38"></a><figcaption><b>Figure 2.38</b> (PDF page 81) — x86 32-bit addressing modes with register restrictions and the equivalent MIPS code (register indirect, based mode with 8- or 32-bit displacement, base plus scaled index, base plus scaled index with displacement).</figcaption></figure>
<h3>x86 integer operations</h3>
<ul>
<li>8086 supports 8-bit (byte) and 16-bit (word) data; 80386 adds 32-bit (double word); AMD64 adds 64-bit (quad word). A bit in the code segment register sets the default data size (16 or 32); an <b>8-bit prefix</b> overrides it for one instruction. Prefixes (from the 8086) can: override the default segment register, <b>lock the bus</b> (synchronization), or <b>repeat</b> the next instruction until ECX counts down to 0. The 80386 added an address-size override prefix.</li>
<li><b>Four major classes:</b> (1) data movement (move, push, pop); (2) arithmetic and logic (test, integer and decimal arithmetic) — destination can be a register or memory; (3) control flow (conditional branches, unconditional jumps, calls, returns); (4) string instructions (string move and compare — part of the 8080 ancestry, rarely executed, often slower than software routines).</li>
<li>Conditional branches use <b>condition codes/flags</b> (like ARMv7) set as a side effect. PC-relative branch addresses are in <b>bytes</b> because x86 instructions are not all 4 bytes long.</li>
</ul>
<figure class="fig"><a href="assets/figs/ch2_p82.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch2_p82.jpg" alt="Figure 2.39"></a><figcaption><b>Figure 2.39</b> (PDF page 82) — typical x86 instructions and functions (JE, JMP, CALL, RET, MOV, PUSH, POP, ADD, SUB, CMP, TEST, MOVS…). CALL saves the EIP (Intel's PC) of the next instruction on the stack.</figcaption></figure>
<h3>x86 instruction encoding</h3>
<ul>
<li>Complex, many formats; length varies from <b>1 byte</b> (no operands) up to <b>15 bytes</b> (extra 1-byte prefixes, 4-byte immediate and 4-byte displacement, 2-byte opcode, scaled-index byte).</li>
<li>The opcode byte usually has a bit (w) saying 8-bit or 32-bit operand; d field = direction of the move. Many instructions use a <b>postbyte</b> “mod, reg, r/m” for addressing-mode information; the base-plus-scaled-index mode uses a second postbyte “sc, index, base”.</li>
<li>Intel had a 16-bit microprocessor two years before competitors' more elegant architectures (e.g., Motorola 68000); this head start led to the selection of the 8086 for the IBM PC. The large market let AMD and Intel afford resources to overcome the complexity; compilers avoid the hard-to-implement parts and the frequently used components are not too hard to implement.</li>
</ul>
<figure class="fig"><a href="assets/figs/ch2_p84.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch2_p84.jpg" alt="Figure 2.41"></a><figcaption><b>Figure 2.41</b> (PDF page 84) — typical x86 instruction formats (JE, CALL, MOV, PUSH, ADD, TEST). Figure 2.42 (PDF page 85) shows the encoding of the mod/reg/r/m postbyte.</figcaption></figure>

<h2 id="c2-18">2.18 Real Stuff: ARMv8 (64-bit) Instructions</h2>
<ul>
<li>The problem “almost impossible to overcome” in an ISA is <b>too small a memory address</b> (example: the 16-bit-address MOStek 6502 of the Apple II was condemned by lack of address bits). x86 was extended to 32 then 64 bits; many others were left behind.</li>
<li>ARM began designing a 64-bit-address version in 2007, revealed in 2013. It is a <b>complete overhaul</b>, not just wider registers — and it is closer to MIPS than to ARMv7.</li></ul>
<table><tr><th>ARMv8 dropped from v7</th><th>ARMv8 added (like MIPS)</th></tr>
<tr><td>The conditional execution field in nearly every instruction</td><td><b>32</b> general-purpose registers</td></tr>
<tr><td>The special 12-bit immediate interpretation → simple 12-bit constant</td><td>One register hard-wired to 0 (but it means the stack pointer in loads/stores)</td></tr>
<tr><td>Load Multiple / Store Multiple</td><td>Addressing modes that work for all word sizes</td></tr>
<tr><td>The PC as one of the registers (writing it caused unexpected branches)</td><td>A <b>divide</b> instruction; equivalents of MIPS branch-if-equal and branch-if-not-equal</td></tr></table>
<p class="en">Conclusion: the main similarity between ARMv7 and ARMv8 is the name.</p>

<h2 id="c2-19">2.19 Fallacies and Pitfalls</h2>
<table><tr><th>Type</th><th>Statement</th><th>Why it is wrong / key idea</th></tr>
<tr><td>Fallacy</td><td><b>More powerful instructions mean higher performance.</b></td><td>x86 prefixes (e.g., repeat) allow memory-to-memory move with one instruction, but loading into registers and storing back (code replicated to reduce loop overhead) copies about <b>1.5×</b> as fast, and using larger floating-point registers about <b>2.0×</b> as fast as the complex move.</td></tr>
<tr><td>Fallacy</td><td><b>Write in assembly language to obtain the highest performance.</b></td><td>Compilers have become sophisticated; the gap closes fast. To compete, the assembly programmer must master pipelining and memory hierarchies (Ch. 4, 5). Compilers now ignore C register hints. Dangers: longer coding/debugging time, loss of portability, difficulty maintaining; coding takes longer with more lines; programs live longer than expected.</td></tr>
<tr><td>Fallacy</td><td><b>The importance of commercial binary compatibility means successful instruction sets don't change.</b></td><td>Backward binary compatibility is sacrosanct, yet x86 has grown dramatically — on average <b>more than one instruction per month</b> over 35 years (Figure 2.43).</td></tr>
<tr><td>Pitfall</td><td><b>Forgetting that sequential word addresses in byte-addressed machines do not differ by one.</b></td><td>The next word is at +4 (word size in bytes), not +1.</td></tr>
<tr><td>Pitfall</td><td><b>Using a pointer to an automatic variable outside its defining procedure.</b></td><td>Returning a pointer to a local array: the stack memory is reused as soon as the procedure returns (stack discipline) → pointers to automatic variables lead to dangling references.</td></tr></table>
<figure class="fig"><a href="assets/figs/ch2_p88.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch2_p88.jpg" alt="Figure 2.43"></a><figcaption><b>Figure 2.43</b> (PDF page 88) — growth of the x86 instruction set over time (number of instructions by year).</figcaption></figure>

<h2 id="c2-20">2.20 Concluding Remarks</h2>
<ul>
<li><b>Two principles of the stored-program computer:</b> instructions indistinguishable from numbers, and alterable memory for programs.</li>
<li>Choosing an instruction set is a <b>balance among</b> the number of instructions needed to execute a program, the number of clock cycles per instruction, and the speed of the clock.</li>
<li><b>Three design principles:</b> (1) <b>Simplicity favors regularity</b> — all instructions one size, always three register operands in arithmetic, register fields in the same place in each format. (2) <b>Smaller is faster</b> — 32 registers instead of many more. (3) <b>Good design demands good compromises</b> — larger addresses/constants vs same-length instructions.</li>
<li>Great idea <b>make the common case fast</b> applies to ISAs: PC-relative addressing for conditional branches, immediate addressing for constants.</li>
<li>Assembly language (readable by humans) is translated by the assembler, which also “extends” the ISA with symbolic instructions (pseudoinstructions).</li></ul>
<figure class="fig"><a href="assets/figs/ch2_p89.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch2_p89.jpg" alt="Figure 2.44"></a><figcaption><b>Figure 2.44</b> (PDF page 89) — the MIPS instruction set covered so far, with the pseudoinstructions and the MIPS core in the summary table; <b>Figure 2.45</b> (PDF page 90) — MIPS instruction classes, examples, corresponding C/Java operators and frequency of use in SPEC2006 integer and FP programs (see the figure index).</figcaption></figure>
`;
