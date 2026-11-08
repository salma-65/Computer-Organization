window.PAGES.ch2.html += String.raw`
<h2 id="c2-8">2.8 Supporting Procedures &amp; 2.9 Communicating with People — NOT IN YOUR PDF</h2>
<div class="warn"><b>Important: missing pages in the uploaded file.</b> Chapter2.pdf jumps from <b>book page 96</b> (PDF page 37, which ends with the first paragraph of §2.8) straight to <b>book page 111</b> (PDF page 38, start of §2.10). So book pages 96–110 — §2.8 <i>Supporting Procedures in Computer Hardware</i> (stack, $sp, $ra, jal, jr, $a/$v/$s/$t conventions) and §2.9 <i>Communicating with People</i> (ASCII, bytes, strings, Unicode) — <u>are not in your file</u>. I have not written notes for them, because I will not invent content that I cannot read. Please upload the missing pages (book pp. 96–110) and I will add them.<br>
<b>What the PDF does contain about them:</b> (1) the opening definition — a <b>procedure/function</b> is a stored subroutine that performs a specific task based on the parameters it is given; parameters are the interface between the procedure and the rest of the program, and procedures are one way to implement abstraction in software; (2) the Check Yourself answers: §2.8 “Both are true”; §2.9: I. 1) and 2); II. 3). (The questions themselves are on the missing pages, so the answers cannot be interpreted.)</div>

<h2 id="c2-10">2.10 MIPS Addressing for 32-Bit Immediates and Addresses</h2>
<p class="en"><i>PDF page note: this section starts on PDF page 38 (book page 111). From here, book page = PDF page + 73.</i></p>
<h3>32-bit immediate operands: lui + ori</h3>
<p class="ar" dir="rtl">الـ immediate field 16 bit بس. لو الثابت 32 bit بنستخدم <b>lui</b> (load upper immediate) تحط الـ 16 bit العليا، وبعدين <b>ori</b> تحط الـ 16 bit السفلى.</p>
<div class="def"><b>lui:</b> transfers the 16-bit immediate into the <b>leftmost 16 bits</b> of the register and fills the lower 16 bits with 0s (Figure 2.17).</div>
<div class="ex">Load 0000 0000 0011 1101 0000 1001 0000 0000 into $s0:
<pre class="code">lui $s0, 61          # 61 = 0000 0000 0011 1101  → $s0 = 0000 0000 0011 1101 0000 0000 0000 0000
ori $s0,$s0,2304     # 2304 = 0000 1001 0000 0000 → $s0 = 0000 0000 0011 1101 0000 1001 0000 0000</pre></div>
<ul>
<li>If the assembler breaks large constants/addresses into pieces it needs a temporary register → reason for <b>$at</b> (assembler temporary).</li>
<li><b>Careful:</b> addi sign-extends the 16-bit immediate (copies its leftmost bit into the upper 16 bits); <b>ori</b> loads 0s into the upper 16 bits, so the assembler uses lui + ori for 32-bit constants.</li>
</ul>
<figure class="fig"><a href="assets/figs/ch2_p39.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch2_p39.jpg" alt="Figure 2.17"></a><figcaption><b>Figure 2.17</b> (PDF page 39) — effect of lui: <code>lui $t0, 255</code> puts 0000 0000 1111 1111 in the upper half of $t0 and zeros in the lower half.</figcaption></figure>
<h3>Addressing in branches and jumps: J-format</h3>
<table><tr><th>Format</th><th>Fields</th></tr>
<tr><td><b>J-type</b> (jump, jal)</td><td>op (6 bits) | address (26 bits)</td></tr></table>
<ul>
<li><code>j 10000</code>: jump opcode value = <b>2</b>; the address field holds the <b>word</b> address (byte address ÷ 4).</li>
<li>A conditional branch needs two registers, so only <b>16 bits</b> remain for the address. <code>bne $s0,$s1,Exit</code> → op 5, rs 16, rt 17, address = offset to Exit.</li>
<li>If branch addresses had to fit in 16 bits, programs couldn't exceed 2<sup>16</sup>. Solution: <b>PC-relative addressing</b> — address = PC + constant in the instruction.</li>
<li>Why PC? Conditional branches are in loops and ifs, so they go to nearby instructions (about half of SPEC conditional branches go less than 16 instructions away). Branch within ±2<sup>15</sup> <u>words</u> of the current instruction. This is <b>making the common case fast</b>.</li>
<li>The PC is incremented early, so the offset is <b>relative to PC + 4</b> (the following instruction), not the branch itself.</li>
<li>Since every instruction is 4 bytes, the offset counts <b>words</b>, so the 16-bit field reaches 4× as far. The 26-bit jump field is also a word address = a <b>28-bit byte address</b>.</li>
<li>jump-and-link (procedure calls) have no reason to be near the call, so jump and jal use J-type with long addresses, not PC-relative.</li>
<li><b>Elaboration:</b> the PC is 32 bits; the jump replaces only the lower 28 bits of the PC and keeps the upper 4 bits. The loader/linker must avoid placing a program across a 256 MB boundary (64 million instructions); otherwise a jump must be replaced by <b>jr</b> after loading the full 32-bit address into a register.</li>
</ul>
<div class="ex"><b>Branch offset in machine code.</b> The §2.7 while loop placed at address 80000:
<table><tr><th>Address</th><th>Instruction</th><th>op</th><th>rs</th><th>rt</th><th>rd / address</th><th>shamt</th><th>funct</th></tr>
<tr><td>80000</td><td>sll $t1,$s3,2</td><td>0</td><td>0</td><td>19</td><td>9</td><td>2</td><td>0</td></tr>
<tr><td>80004</td><td>add $t1,$t1,$s6</td><td>0</td><td>9</td><td>22</td><td>9</td><td>0</td><td>32</td></tr>
<tr><td>80008</td><td>lw $t0,0($t1)</td><td>35</td><td>9</td><td>8</td><td colspan="3">0</td></tr>
<tr><td>80012</td><td>bne $t0,$s5,Exit</td><td>5</td><td>8</td><td>21</td><td colspan="3"><b>2</b></td></tr>
<tr><td>80016</td><td>addi $s3,$s3,1</td><td>8</td><td>19</td><td>19</td><td colspan="3">1</td></tr>
<tr><td>80020</td><td>j Loop</td><td>2</td><td colspan="5"><b>20000</b></td></tr>
<tr><td>80024</td><td>Exit:</td><td colspan="7"></td></tr></table>
The bne offset is <b>2</b>: it is relative to the <u>following</u> instruction (80016) → 80016 + 2×4 = 80024 (Exit). It is not relative to the branch (80012) and it is not the full address 80024. The jump uses the <b>full word address</b>: 20000 × 4 = 80000 (Loop).</div>
<div class="ex"><b>Branching far away:</b> if the target is beyond 16 bits, the assembler inverts the condition and adds a jump. <code>beq $s0,$s1,L1</code> becomes:
<pre class="code">bne $s0,$s1,L2     # inverted condition, skip the jump
j   L1             # jump has a much longer range
L2:</pre></div>
<h3>MIPS addressing mode summary (Figure 2.18)</h3>
<table><tr><th>#</th><th>Mode</th><th>Where is the operand / how is the address formed</th><th>Example</th></tr>
<tr><td>1</td><td><b>Immediate addressing</b></td><td>The operand is a constant (16 bits) within the instruction</td><td>addi, andi, ori, slti</td></tr>
<tr><td>2</td><td><b>Register addressing</b></td><td>The operand is a register</td><td>add, sub, and, or</td></tr>
<tr><td>3</td><td><b>Base (displacement) addressing</b></td><td>Operand is in memory at (register + constant in the instruction); loads/stores can access bytes, halfwords or words</td><td>lw, sw, lb, lbu</td></tr>
<tr><td>4</td><td><b>PC-relative addressing</b></td><td>Branch address = PC + (16-bit constant shifted left 2 bits)</td><td>beq, bne</td></tr>
<tr><td>5</td><td><b>Pseudodirect addressing</b></td><td>Jump address = 26-bit field (shifted left 2) concatenated with the upper 4 bits of the PC</td><td>j, jal</td></tr></table>
<p>Modes 1–3 identify <u>data operands</u>; modes 4–5 identify <u>instruction addresses</u>. A single operation can use more than one mode (add + addi use register and immediate addressing). Nearly all microprocessors have 64-bit address extensions (Appendix E, §2.18).</p>
<figure class="fig"><a href="assets/figs/ch2_p44.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch2_p44.jpg" alt="Figure 2.18"></a><figcaption><b>Figure 2.18</b> (PDF page 44) — the five MIPS addressing modes with the operands shaded.</figcaption></figure>
<h3>Decoding machine language (Figures 2.19, 2.20)</h3>
<figure class="fig"><a href="assets/figs/ch2_p46.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch2_p46.jpg" alt="Figure 2.19"></a><figcaption><b>Figure 2.19</b> (PDF page 46) — MIPS instruction encoding: the op field (bits 31–26) by row (bits 31–29) and column (bits 28–26); R-format funct values (bits 5–0) in the lower table. E.g., lw = row 4, column 3 = 100011<sub>two</sub>.</figcaption></figure>
<figure class="fig"><a href="assets/figs/ch2_p47.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch2_p47.jpg" alt="Figure 2.20"></a><figcaption><b>Figure 2.20</b> (PDF page 47) — MIPS instruction formats: R-format (op, rs, rt, rd, shamt, funct), I-format (op, rs, rt, address/immediate), J-format (op, 26-bit address); all are 32 bits.</figcaption></figure>
<table><tr><th>Format</th><th>Bit widths</th><th>Used by</th></tr>
<tr><td>R</td><td>op 6 | rs 5 | rt 5 | rd 5 | shamt 5 | funct 6</td><td>Arithmetic/logical, shifts, jr</td></tr>
<tr><td>I</td><td>op 6 | rs 5 | rt 5 | address/immediate 16</td><td>Data transfer, branches, immediate</td></tr>
<tr><td>J</td><td>op 6 | address 26</td><td>j, jal</td></tr></table>
<div class="ex"><b>Decode 00af8020<sub>hex</sub>:</b> binary 0000 0000 1010 1111 1000 0000 0010 0000. op (bits 31–26) = 000000 → R-format. Fields: rs = 5 ($a1), rt = 15 ($t7), rd = 16 ($s0), shamt = 0, funct = 100000 (32) = add. → <code>add $s0,$a1,$t7</code>.</div>
<details class="ans"><summary>Check Yourself (§2.10) — book answers</summary>
<p><b>I.</b> Range of conditional branches: option 4 — about <b>±128K</b> (32K words × 4 bytes) around the branch.<br>
<b>II.</b> Range of jump and jump-and-link: option 6 — <b>anywhere within a block of 256M addresses</b> where the PC supplies the upper 4 bits.<br>
<b>III.</b> Machine instruction 0000 0000<sub>hex</sub>: option 4 — <b>sll</b> (it is <code>sll $zero,$zero,0</code>, a harmless no-op; the book's option list also contains “undefined opcode”, which is not the answer).</p></details>
`;
