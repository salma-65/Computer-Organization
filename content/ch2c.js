window.PAGES.ch2.html += String.raw`
<h2 id="c2-5">2.5 Representing Instructions in the Computer</h2>
<p class="ar" dir="rtl">الكمبيوتر بيشوف التعليمة كـ <b>أرقام</b> (high/low signals). كل جزء من التعليمة رقم، وبنحطهم جنب بعض فتتكوّن التعليمة. الأسماء زي <code>$s0</code> بتتحول لأرقام registers.</p>
<h3>Register numbers</h3>
<p>$s0–$s7 → registers <b>16–23</b>; $t0–$t7 → registers <b>8–15</b> (the other registers are explained in later sections). So $s1 = 17, $s2 = 18, $t0 = 8, $t1 = 9, $s3 = 19.</p>
<h3>R-format (register format)</h3>
<table><tr><th>Field</th><th>op</th><th>rs</th><th>rt</th><th>rd</th><th>shamt</th><th>funct</th></tr>
<tr><td>Bits</td><td>6</td><td>5</td><td>5</td><td>5</td><td>5</td><td>6</td></tr></table>
<ul>
<li><b>op</b>: basic operation, traditionally called the <b>opcode</b>. <b>rs</b>: first register source operand. <b>rt</b>: second register source operand. <b>rd</b>: register destination (gets the result). <b>shamt</b>: shift amount (0 until §2.6). <b>funct</b>: function code, selects the specific variant of the operation in op.</li>
<li>A segment of an instruction is a <b>field</b>. The numeric form of instructions is <b>machine language</b>; a sequence of them is <b>machine code</b>; the layout is the <b>instruction format</b>.</li>
<li>All MIPS instructions are exactly <b>32 bits</b> (regularity: same size as a data word).</li>
</ul>
<div class="ex"><b>Example:</b> <code>add $t0,$s1,$s2</code><table><tr><th>op</th><th>rs</th><th>rt</th><th>rd</th><th>shamt</th><th>funct</th></tr>
<tr><td>0</td><td>17</td><td>18</td><td>8</td><td>0</td><td>32</td></tr>
<tr><td>000000</td><td>10001</td><td>10010</td><td>01000</td><td>00000</td><td>100000</td></tr></table>
op = 0 and funct = 32 together say “add”; rs = 17 ($s1) and rt = 18 ($s2) are sources; rd = 8 ($t0) is the destination; shamt unused = 0.</div>
<h3>Hexadecimal (Figure 2.4)</h3>
<p>Base 16; each hex digit = 4 binary digits (replace group by group; if the length is not a multiple of 4, go from right to left). Notation: subscript <sub>ten</sub>, <sub>two</sub>, <sub>hex</sub>; C/Java use <code>0xnnnn</code>.</p>
<div class="ex">eca8 6420<sub>hex</sub> = 1110 1100 1010 1000 0110 0100 0010 0000<sub>two</sub>; and 0001 0011 0101 0111 1001 1011 1101 1111<sub>two</sub> = 1357 9bdf<sub>hex</sub>.</div>
<h3>I-format (immediate format)</h3>
<p class="ar" dir="rtl">مشكلة: الـ <code>lw</code> محتاجة register أو اتنين + ثابت (offset). لو الثابت ياخد 5 bits (rt field) يبقى أقصى حاجة 32، وده صغير جدًا. فاضطروا يعملوا format تاني. ده معنى <b>Design Principle 3: Good design demands good compromises.</b></p>
<table><tr><th>Field</th><th>op</th><th>rs</th><th>rt</th><th>constant or address</th></tr><tr><td>Bits</td><td>6</td><td>5</td><td>5</td><td>16</td></tr></table>
<ul>
<li>Used by immediate and data-transfer instructions. Compromise: keep <b>all instructions the same length</b> but use <b>different formats</b> for different kinds (R-type, I-type).</li>
<li>16-bit address → lw can reach a region of ±2<sup>15</sup> = ±32,768 bytes (±2<sup>13</sup> = ±8192 words) around the base register rs; addi constants are limited to ±2<sup>15</sup>.</li>
<li>More than 32 registers would be hard: rs and rt would each need another bit.</li>
<li>In <b>lw</b>, rt is the <b>destination</b> register (meaning of rt changes). Example: <code>lw $t0,32($s3)</code> → op 35, rs 19, rt 8, address 32.</li>
<li>The formats are distinguished by the value of the first field (op). The first three fields of R- and I-type have the same size and names; the I-type 4th field = sum of the last three R-type fields.</li>
</ul>
<h3>Encoding table so far (Figure 2.5 / 2.6)</h3>
<table><tr><th>Instruction</th><th>Format</th><th>op</th><th>rs</th><th>rt</th><th>rd</th><th>shamt</th><th>funct / address</th></tr>
<tr><td>add</td><td>R</td><td>0</td><td>reg</td><td>reg</td><td>reg</td><td>0</td><td>funct 32</td></tr>
<tr><td>sub</td><td>R</td><td>0</td><td>reg</td><td>reg</td><td>reg</td><td>0</td><td>funct 34</td></tr>
<tr><td>addi</td><td>I</td><td>8</td><td>reg</td><td>reg</td><td>n.a.</td><td>n.a.</td><td>constant</td></tr>
<tr><td>lw</td><td>I</td><td>35</td><td>reg</td><td>reg</td><td>n.a.</td><td>n.a.</td><td>address</td></tr>
<tr><td>sw</td><td>I</td><td>43</td><td>reg</td><td>reg</td><td>n.a.</td><td>n.a.</td><td>address</td></tr></table>
<p class="en">Note: add and sub have the same op (0); the hardware uses <b>funct</b> to pick add (32) or subtract (34).</p>
<figure class="fig"><a href="assets/figs/ch2_p24.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch2_p24.jpg" alt="Figure 2.5 page"></a><figcaption>Original pages containing Figures 2.4–2.6 (hex table, instruction encoding, MIPS architecture revealed through §2.5) are shown in the figure index at the end of this chapter; this page image is the Figure 2.5 area.</figcaption></figure>
<div class="ex"><b>A[300] = h + A[300];</b> with $t1 = base of A, $s2 = h:
<pre class="code">lw  $t0,1200($t1)    # $t0 = A[300]        (1200 = 300 × 4)
add $t0,$s2,$t0      # $t0 = h + A[300]
sw  $t0,1200($t1)    # A[300] = $t0</pre>
<table><tr><th></th><th>op</th><th>rs</th><th>rt</th><th>rd / address</th><th>shamt</th><th>funct</th></tr>
<tr><td>lw</td><td>35</td><td>9</td><td>8</td><td colspan="3">1200</td></tr>
<tr><td>add</td><td>0</td><td>18</td><td>8</td><td>8</td><td>0</td><td>32</td></tr>
<tr><td>sw</td><td>43</td><td>9</td><td>8</td><td colspan="3">1200</td></tr></table>
Binary: lw = 100011 01001 01000 0000 0100 1011 0000; add = 000000 10010 01000 01000 00000 100000; sw = 101011 01001 01000 0000 0100 1011 0000 (1200<sub>ten</sub> = 0000 0100 1011 0000<sub>two</sub>). lw and sw differ only in the op field (third bit from the left).</div>
<h3>Stored-program concept (Figure 2.7)</h3>
<ul>
<li>Two key principles: <b>(1) instructions are represented as numbers; (2) programs are stored in memory to be read or written just like data.</b></li>
<li>Memory can hold the editor's source code, compiled machine code, the text the program uses, even the compiler itself. A machine for accounting can become one that helps write a book “in the blink of an eye” just by loading different programs.</li>
<li><b>Binary compatibility:</b> programs are shipped as files of binary numbers, so computers inherit ready-made software if compatible with an existing ISA → the industry aligns around few ISAs.</li>
<li>The desire for same-size instructions conflicts with the desire for many registers (each extra register bit costs bits in every register field) → most ISAs have 16 or 32 general-purpose registers.</li>
</ul>
<figure class="fig"><a href="assets/figs/ch2_p27.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch2_p27.jpg" alt="Figure 2.7 area"></a><figcaption><b>Figure 2.7</b> (see figure index) — the stored-program concept: memory holds an accounting program, an editor's source code in C, the compiled machine code, and the compiler itself.</figcaption></figure>
<details class="ans"><summary>Check Yourself (§2.5) — book answer</summary><p><b>4) sub $t2, $t0, $t1</b> (the encoded instruction shown in the book decodes to rd = $t2, rs = $t0, rt = $t1 with funct 34 = sub).</p></details>
`;
