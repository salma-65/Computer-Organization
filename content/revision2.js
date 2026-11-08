window.PAGES.revision.html = window.PAGES.revision.html.replace(/<div class="note"><b>Coverage:<\/b>[\s\S]*?<\/div>/, '<div class="note"><b>Coverage:</b> Chapter 1, <b>Chapter 2</b> (except §2.8–2.9, missing from your PDF) and the MIPS Lab (Lab 5 + Lab 6).</div>') + String.raw`
<h2 id="rv2-def">9. Chapter 2 — important definitions</h2>
<table><tr><th>Term</th><th>Definition</th></tr>
<tr><td>Instruction set</td><td>Vocabulary of commands understood by an architecture.</td></tr>
<tr><td>Stored-program concept</td><td>Instructions and data stored in memory as numbers.</td></tr>
<tr><td>Word</td><td>Natural unit of access; 32 bits in MIPS = register size.</td></tr>
<tr><td>Data transfer instruction</td><td>Moves data between memory and registers (lw, sw…).</td></tr>
<tr><td>Alignment restriction</td><td>Data aligned on natural boundaries; MIPS words at multiples of 4.</td></tr>
<tr><td>Spilling registers</td><td>Placing less used variables in memory.</td></tr>
<tr><td>Two's complement</td><td>Signed representation: leading 0s positive, leading 1s negative; range −2<sup>31</sup>…2<sup>31</sup>−1.</td></tr>
<tr><td>Sign extension</td><td>Replicate the sign bit to widen a number.</td></tr>
<tr><td>Opcode / funct / shamt</td><td>Operation field; selects variant in R-format; shift amount.</td></tr>
<tr><td>Conditional branch / basic block</td><td>Compare and transfer control; sequence with no branches inside.</td></tr>
<tr><td>Mask</td><td>Bit pattern used with AND to conceal bits.</td></tr>
<tr><td>PC-relative / pseudodirect addressing</td><td>PC + constant (branches); 26-bit field concatenated with upper PC bits (jumps).</td></tr>
<tr><td>Pseudoinstruction</td><td>Assembler instruction that hardware doesn't implement (move, blt…).</td></tr>
<tr><td>Symbol table / linker / loader</td><td>Label→address table; combines object modules; puts program in memory.</td></tr>
<tr><td>Atomic / data race / ll-sc</td><td>Indivisible read-modify-write; unsynchronized conflicting accesses; load linked / store conditional pair.</td></tr>
<tr><td>JVM / JIT / bytecode</td><td>Interpreter / run-time compiler / Java's instruction set.</td></tr></table>

<h2 id="rv2-design">10. Three design principles &amp; related ideas</h2>
<ol><li><b>Simplicity favors regularity</b> (fixed 32-bit instructions, 3 operands).</li><li><b>Smaller is faster</b> (32 registers).</li><li><b>Good design demands good compromises</b> (R, I, J formats).</li></ol>
<p>Great ideas used: <b>make the common case fast</b> (addi constants, PC-relative branches), <b>abstraction</b> (assembler hides details).</p>

<h2 id="rv2-formats">11. Instruction formats</h2>
<table><tr><th>Format</th><th>Fields (bits)</th><th>Examples</th></tr>
<tr><td>R</td><td>op 6, rs 5, rt 5, rd 5, shamt 5, funct 6</td><td>add (funct 32), sub (34), and, or, nor, sll, srl, slt, jr</td></tr>
<tr><td>I</td><td>op 6, rs 5, rt 5, address/immediate 16</td><td>lw (35), sw (43), addi (8), andi, ori, lui, beq, bne, slti</td></tr>
<tr><td>J</td><td>op 6, address 26</td><td>j (2), jal</td></tr></table>
<ul><li>Register numbers: $t0–$t7 = 8–15, $s0–$s7 = 16–23.</li>
<li>Branch: target = (PC + 4) + offset × 4, offset ±2<sup>15</sup> words (±128 KB). Jump: 26-bit word address → 28-bit byte address + upper 4 bits of PC (256 MB block).</li>
<li>Immediate: addi/slti/lw/sw sign-extend the 16-bit field; <b>andi/ori zero-extend</b>.</li></ul>

<h2 id="rv2-instr">12. Instruction cheat sheet (from Chapter 2)</h2>
<table><tr><th>Group</th><th>Instructions</th></tr>
<tr><td>Arithmetic</td><td>add, sub, addi (no subi)</td></tr>
<tr><td>Data transfer</td><td>lw, sw, lh, lhu, sh, lb, lbu, sb, ll, sc, lui</td></tr>
<tr><td>Logical</td><td>and, or, nor, andi, ori, sll, srl (NOT = nor with $zero)</td></tr>
<tr><td>Branch/compare</td><td>beq, bne, slt, sltu, slti, sltiu (no branch-on-less-than)</td></tr>
<tr><td>Jump</td><td>j, jr, jal</td></tr></table>

<h2 id="rv2-confused">13. Chapter 2 — frequently confused / tricky</h2>
<ul>
<li>Array index × <b>4</b> for word arrays (offset 4×i, not i).</li>
<li>lb sign-extends, lbu zero-extends; slt signed vs sltu unsigned (−1 &lt; 1 signed, but 0xFFFFFFFF &gt; 1 unsigned).</li>
<li>In lw, <b>rt is the destination</b>; in sw rt is the source.</li>
<li>Branch offset is in <b>words</b>, relative to <b>PC + 4</b>; jump uses the full word address.</li>
<li>j cannot leave its 256 MB block; beq reaches only ±128 KB (assembler inserts bne + j).</li>
<li>Two's complement has one extra negative number; overflow when the sign bit is wrong.</li>
<li>Test the <b>opposite</b> condition to branch over the then-part.</li>
<li>Big-endian (MIPS): word address = leftmost byte.</li>
<li>x86: 8 GPRs, two-operand, variable length 1–15 bytes; ARMv7: 15 GPRs, condition field in every instruction; ARMv8: 32 GPRs, closer to MIPS.</li>
<li>Fallacies: powerful instructions ≠ faster; assembly ≠ always faster; successful ISAs do change (x86 &gt; 1 instruction/month).</li>
<li>Pitfalls: +1 for next word; pointer to a local (automatic) variable outside its procedure.</li></ul>
<div class="warn"><b>Not covered (missing from your PDF):</b> §2.8 procedures/stack/register conventions and §2.9 ASCII/strings/Unicode.</div>
<h3>Chapter 2 checklist</h3>
<ul class="check">
<li><label><input type="checkbox"> I can compile C assignments, if/else and while loops to MIPS.</label></li>
<li><label><input type="checkbox"> I can encode/decode R-type and I-type instructions.</label></li>
<li><label><input type="checkbox"> I can convert two's complement numbers, sign-extend and spot overflow.</label></li>
<li><label><input type="checkbox"> I can explain lui+ori, PC-relative and pseudodirect addressing.</label></li>
<li><label><input type="checkbox"> I can explain compiler → assembler → linker → loader, DLLs, JVM/JIT.</label></li>
<li><label><input type="checkbox"> I can explain ll/sc and data races.</label></li>
<li><label><input type="checkbox"> I know the ARM/x86/MIPS differences and the fallacies/pitfalls.</label></li></ul>
`;
