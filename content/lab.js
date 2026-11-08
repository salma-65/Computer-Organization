window.PAGES = window.PAGES || {};
window.PAGES.lab = { title: "MIPS Lab — Lab 5 (MARS & basic instructions) + Lab 6 (I/O, branches, loops, arrays)", html: String.raw`
<p class="lead">Source: <b>LAB_5.pdf</b> (30 slides) and <b>LAB_6.pdf</b> (40 slides), by Eng. Abdelsalam Saeed. Everything below follows the slide order. Notes marked <span class="tag-extra">extra note</span> are small clarifications that are <u>not</u> on the slides (kept minimal and only where needed to trace code correctly).</p>

<div class="note"><b>Slide-coverage check:</b> Lab 5: install MARS → What is MIPS → features → registers → special registers → declaring variables → data directives → declarations → printing → add / sub / mul / mult / mul-vs-mult / sll / div / divu. Lab 6: input (int, float, string) → labels → if / if-else → branch pseudo-instructions → benefits → while loop → arrays → printing an array. All covered below.</div>

<h2 id="lab-a">PART A — Lab 5: MARS Simulator and MIPS Instructions</h2>

<h3 id="lab-install">A1. How to install MARS (slide 2)</h3>
<figure class="fig"><a href="assets/figs/lab5_s01.jpg" target="_blank"><img loading="lazy" src="assets/figs/lab5_s01.jpg" alt="Lab 5 slide 2: How to install MARS"></a><figcaption><b>Lab 5, slide 2</b> — original slide image: the MARS download page (<code>https://dpetersanderson.github.io/</code>), MARS V4.5 (Aug. 2014), with Options A/B/C to run the jar.</figcaption></figure>
<p class="ar" dir="rtl">الـ <b>MARS</b> هو الـ simulator اللي بنشغّل عليه كود MIPS. بتنزّله من الموقع <code>https://dpetersanderson.github.io/</code> (النسخة V4.5, Aug. 2014 على السلايد).</p>
<table>
<tr><th>Option</th><th>How to run MARS (as shown on the slide)</th></tr>
<tr><td><b>A: Desktop</b></td><td>Save the jar file on the desktop; run MARS by double-clicking the icon.</td></tr>
<tr><td><b>B: DOS shell using jar file</b></td><td>Save the jar in some folder; open a DOS shell in that folder; rename the jar to “Mars.jar”; run <code>java -jar Mars.jar</code></td></tr>
<tr><td><b>C: DOS shell using Java classes</b></td><td>Rename the jar to “Mars.jar”; extract with <code>jar -xf Mars.jar</code>; run <code>java Mars</code></td></tr>
</table>
<div class="warn"><b>Requirement:</b> as of V4.0, MARS requires <b>Java J2SE 1.5 (or later) SDK</b> installed on your computer.</div>

<h3 id="lab-mips">A2. What is MIPS? Key features (slides 3–4)</h3>
<p class="ar" dir="rtl">MIPS هي لغة <b>assembly</b> بتصميم بسيط ومنتظم، فهي مناسبة للمبتدئين.</p>
<ul>
<li><b>MIPS</b> = <b>M</b>icroprocessor without <b>I</b>nterlocked <b>P</b>ipeline <b>S</b>tages.</li>
<li><b>32 general-purpose registers</b>, each <b>32 bits</b> wide (basic version).</li>
<li><b>Load/Store architecture:</b> operations are performed on registers; <u>only load and store instructions access memory</u>.</li>
<li><b>Fixed instruction length:</b> all instructions are <b>32 bits</b> → simpler decoding.</li>
<li><b>Three-operand format:</b> most arithmetic instructions have 3 operands (e.g., <code>add $t0, $t1, $t2</code>).</li>
</ul>

<h3 id="lab-regs">A3. General-purpose registers (slide 5)</h3>
<table>
<tr><th>Name</th><th>Number</th><th>Description (from slide)</th></tr>
<tr><td><b>$zero</b></td><td>0</td><td>Constant value 0</td></tr>
<tr><td><b>$at</b></td><td>1</td><td>Assembler temporary</td></tr>
<tr><td><b>$v0–$v1</b></td><td>2–3</td><td>Function return values</td></tr>
<tr><td><b>$a0–$a3</b></td><td>4–7</td><td>Function arguments</td></tr>
<tr><td><b>$t0–$t7</b></td><td>8–15</td><td>Temporary registers, <u>not preserved across calls</u></td></tr>
<tr><td><b>$s0–$s7</b></td><td>16–23</td><td>Saved registers, <u>preserved across calls</u></td></tr>
<tr><td><b>$t8–$t9</b></td><td>24–25</td><td>Additional temporary registers</td></tr>
<tr><td><b>$k0–$k1</b></td><td>26–27</td><td>Reserved for kernel use</td></tr>
<tr><td><b>$gp</b></td><td>28</td><td>Global pointer</td></tr>
<tr><td><b>$sp</b></td><td>29</td><td>Stack pointer</td></tr>
<tr><td><b>$fp</b></td><td>30</td><td>Frame pointer</td></tr>
<tr><td><b>$ra</b></td><td>31</td><td>Return address</td></tr>
</table>
<h4>Special-purpose registers (slide 6)</h4>
<table>
<tr><th>Register</th><th>Description</th></tr>
<tr><td><b>HI</b></td><td>High result of multiplication and division operations</td></tr>
<tr><td><b>LO</b></td><td>Low result of multiplication and division operations</td></tr>
<tr><td><b>PC</b></td><td>Program Counter — holds the address of the next instruction to be executed</td></tr>
</table>
<div class="warn"><b>Tricky:</b> $t8–$t9 are numbered 24–25 (after $s7), not 16+. $zero is always 0 (you cannot change it). $at is for the <u>assembler</u> — don't use it as your own variable.</div>

<h3 id="lab-data">A4. Declaring variables: the .data segment (slides 7–9)</h3>
<pre class="code">.data
variable_name: .directive initial_value</pre>
<ul>
<li><b>variable_name</b> — name of the variable (<u>must start with a letter</u>)</li>
<li><b>.directive</b> — the data type (e.g., .word, .byte, .half, .asciiz)</li>
<li><b>initial_value</b> — optional value to initialize the variable</li>
</ul>
<table>
<tr><th>Directive</th><th>Description</th><th>Example</th></tr>
<tr><td><code>.word</code></td><td>Allocates <b>4 bytes</b> (1 word)</td><td><code>num: .word 42</code></td></tr>
<tr><td><code>.half</code></td><td>Allocates <b>2 bytes</b> (half-word)</td><td><code>short_num: .half 10</code></td></tr>
<tr><td><code>.byte</code></td><td>Allocates <b>1 byte</b></td><td><code>char: .byte 65</code> (ASCII 'A')</td></tr>
<tr><td><code>.space</code></td><td>Allocates <b>uninitialized</b> space</td><td><code>buffer: .space 100</code> (100 bytes)</td></tr>
<tr><td><code>.asciiz</code></td><td>String <b>with null terminator</b></td><td><code>message: .asciiz "Hello"</code></td></tr>
<tr><td><code>.ascii</code></td><td>String <b>without</b> null terminator</td><td><code>raw_text: .ascii "Hello"</code></td></tr>
</table>
<p>Slide 9 examples: <code>num1: .word 10</code> (4-byte integer = 10); <code>num2: .word 20</code>; <code>greeting: .asciiz "Hello, MIPS!"</code>; <code>char: .byte 'A'</code> (single byte holding the ASCII value of 'A', 65).</p>
<p class="ar" dir="rtl">الفرق الأساسي: <code>.asciiz</code> بتضيف <b>null terminator</b> (byte بصفر) في آخر الـ string، لكن <code>.ascii</code> لأ. و <code>.space</code> بتحجز مكان بدون قيمة ابتدائية (مثلاً buffer لإدخال string).</p>
<div class="warn"><b>Common mistake:</b> using <code>.ascii</code> for a string you will print with syscall 4 (no terminator → prints garbage past the end). Use <code>.asciiz</code>.</div>

<h3 id="lab-print">A5. Printing in MIPS: syscalls (slides 10–12)</h3>
<p class="ar" dir="rtl">الـ I/O بيتعمل بـ <b>syscall</b>: بنحط <b>رقم الخدمة</b> في <code>$v0</code>، ونحط الـ argument في <code>$a0</code> (أو <code>$f12</code> للـ float)، وبعدين ننفّذ <code>syscall</code>.</p>
<table>
<tr><th>$v0 code</th><th>Function</th><th>Registers used</th></tr>
<tr><td><b>1</b></td><td>Print an integer</td><td>$a0 = integer value</td></tr>
<tr><td><b>2</b></td><td>Print a floating-point (single)</td><td>$f12 = float value</td></tr>
<tr><td><b>3</b></td><td>Print a double-precision float</td><td>$f12 = double value</td></tr>
<tr><td><b>4</b></td><td>Print a string</td><td>$a0 = address of the string</td></tr>
<tr><td><b>11</b></td><td>Print a single character</td><td>$a0 = ASCII value of the char</td></tr>
<tr><td><b>10</b></td><td>Exit the program (used in Lab 6 examples)</td><td>—</td></tr>
</table>
<h4>Example 1 — Hello Assembly (print string)</h4>
<pre class="code">.data
 message: .asciiz "Hello, MIPS!\n"
.text
 li $v0, 4           # Syscall code for printing a string
 la $a0, message     # Load the address of the string into $a0
 syscall             # Perform the syscall</pre>
<table>
<tr><th>#</th><th>Instruction</th><th>Effect</th></tr>
<tr><td>1</td><td><code>li $v0, 4</code></td><td>$v0 = 4 (select “print string”)</td></tr>
<tr><td>2</td><td><code>la $a0, message</code></td><td>$a0 = <u>address</u> of the first character of “Hello, MIPS!\n”</td></tr>
<tr><td>3</td><td><code>syscall</code></td><td>Console prints <b>Hello, MIPS!</b> then a new line (because of <code>\n</code>)</td></tr>
</table>
<h4>Example 2 — Printing an integer</h4>
<pre class="code">.data
 num: .word 42
.text
 lw $a0, num         # Load the integer into $a0
 li $v0, 1           # Syscall code for printing an integer
 syscall             # Perform the syscall</pre>
<p><b>Trace:</b> <code>lw $a0, num</code> → $a0 = 42 (copied from memory); <code>li $v0, 1</code> → $v0 = 1; <code>syscall</code> → prints <b>42</b>.</p>
<div class="warn"><b>Common mistakes:</b> (1) for strings you load the <u>address</u> with <code>la</code>; for an integer you load the <u>value</u> with <code>lw</code>. (2) Forgetting to set $v0 before <code>syscall</code>. (3) Printing a float with $a0 (must be $f12).</div>

<h3 id="lab-classes">A6. MIPS instruction categories (slide 13)</h3>
<table>
<tr><th>Category</th><th>Examples on the slide</th></tr>
<tr><td>Arithmetic</td><td>ADD, SUB</td></tr>
<tr><td>Logical</td><td>AND, OR</td></tr>
<tr><td>Data transfer</td><td>LW, SW</td></tr>
<tr><td>Control flow</td><td>(branches / jumps — see Lab 6)</td></tr>
<tr><td>Comparison</td><td>SLT</td></tr>
<tr><td>Shift</td><td>SLL</td></tr>
<tr><td>Special</td><td>SYSCALL</td></tr>
</table>

<h3 id="lab-add">A7. Adding integers — <code>add</code> (slides 14–15)</h3>
<pre class="code">add $t0, $t1, $t2    # $t0 = $t1 + $t2
# $t0 = destination, $t1 = first source, $t2 = second source</pre>
<pre class="code">.data
 num1: .word 7
 num2: .word 3
.text
 lw $t1, num1          # Load 7 into $t1
 lw $t2, num2          # Load 3 into $t2
 add $t0, $t1, $t2     # $t0 = $t1 + $t2 (7 + 3 = 10)</pre>
<table>
<tr><th>After instruction</th><th>$t0</th><th>$t1</th><th>$t2</th></tr>
<tr><td>(start)</td><td>—</td><td>—</td><td>—</td></tr>
<tr><td><code>lw $t1, num1</code></td><td>—</td><td>7</td><td>—</td></tr>
<tr><td><code>lw $t2, num2</code></td><td>—</td><td>7</td><td>3</td></tr>
<tr><td><code>add $t0, $t1, $t2</code></td><td><b>10</b></td><td>7</td><td>3</td></tr>
</table>
<p class="ar" dir="rtl">لاحظ إن الـ <b>destination register بييجي الأول</b> في MIPS. ولازم تحمّل القيم من الـ memory لـ registers قبل ما تجمعها (Load/Store architecture).</p>

<h3 id="lab-sub">A8. Subtracting integers — <code>sub</code> (slides 16–17)</h3>
<pre class="code">sub $t0, $t1, $t2    # $t0 = $t1 - $t2   (signed subtraction)
# $t1 = minuend (the number subtracted FROM), $t2 = subtrahend</pre>
<pre class="code">.data
 num1: .word 10
 num2: .word 3
.text
 lw $t1, num1          # Load 10 into $t1
 lw $t2, num2          # Load 3 into $t2
 sub $t0, $t1, $t2     # $t0 = 10 - 3 = 7</pre>
<div class="warn"><b>Common mistake:</b> reversing the operands — <code>sub $t0,$t2,$t1</code> would give 3 − 10 = −7.</div>

<h3 id="lab-mul">A9. Multiplication: <code>mul</code>, <code>mult</code>, and <code>sll</code> (slides 18–25)</h3>
<p class="ar" dir="rtl">في تعليمتين للضرب: <code>mul</code> و <code>mult</code>. الاتنين بيضربوا، لكن بيختلفوا في مكان الـ result وحجمه.</p>
<h4><code>mul $rd, $rs, $rt</code></h4>
<ul><li>Result goes to a <b>single destination register</b> $rd.</li><li>Only the <b>least significant 32 bits</b> of the product are stored in $rd.</li></ul>
<h4><code>mult $rs, $rt</code></h4>
<ul><li>Stores the product in two special registers: <b>HI</b> (most significant 32 bits) and <b>LO</b> (least significant 32 bits) → a full <b>64-bit</b> result.</li>
<li>Retrieve with <code>mflo $rd</code> (move from LO) and <code>mfhi $rd</code> (move from HI).</li></ul>
<table>
<tr><th>Feature</th><th>mul</th><th>mult</th></tr>
<tr><td>Registers</td><td>Stores result in $rd</td><td>Uses HI and LO registers</td></tr>
<tr><td>Result size</td><td>32 bits</td><td>64 bits (split in HI &amp; LO)</td></tr>
<tr><td>Convenience</td><td>Simpler syntax</td><td>Requires mflo and mfhi</td></tr>
<tr><td>Use case</td><td>Small numbers</td><td>Large numbers or full 64-bit results</td></tr>
</table>
<h4>Execution trace: 100000 × 200000 (slides 20 and 23)</h4>
<p>Both examples load <code>num1 = 100000</code> and <code>num2 = 200000</code>. The true product is <b>20,000,000,000</b> = 0x4_A817_C800, which does <u>not</u> fit in 32 bits.</p>
<table>
<tr><th>Instruction</th><th>Result</th></tr>
<tr><td><code>mul $t0, $t1, $t2</code></td><td>$t0 = low 32 bits = 0xA817C800 = <b>−1,474,836,480</b> (as a signed 32-bit number) → <b>overflow/truncation: the upper bits are lost</b></td></tr>
<tr><td><code>mult $t1, $t2</code></td><td>HI = <b>0x00000004</b>, LO = <b>0xA817C800</b> (full 64-bit product preserved)</td></tr>
<tr><td><code>mflo $t3</code></td><td>$t3 = 0xA817C800 (lower 32 bits)</td></tr>
<tr><td><code>mfhi $t4</code></td><td>$t4 = 4 (upper 32 bits)</td></tr>
</table>
<p><span class="tag-extra">extra note</span> The numeric values above are computed (2×10<sup>10</sup> = 4×2<sup>32</sup> + 0xA817C800); the slides only show the code and say mul keeps the least significant 32 bits.</p>
<div class="warn"><b>Common mistakes:</b> (1) using <code>mul</code> when the product may exceed 32 bits; (2) forgetting <code>mflo</code>/<code>mfhi</code> after <code>mult</code> (the result is NOT in a normal register); (3) mixing up which half is HI vs LO.</div>
<h4>Multiplying by powers of 2 with <code>sll</code> (slides 24–25)</h4>
<pre class="code">sll $rd, $rt, x     # $rd = $rt × 2^x      (shift left logical by x positions)
sll $t0, $t1, 3     # $t0 = $t1 × 8        (2^3 = 8)</pre>
<p class="ar" dir="rtl">إزاحة الرقم لليسار بـ n خانات = ضرب في 2<sup>n</sup>. الحركة دي سريعة لكن <b>بتنفع بس للضرب في قوى الـ 2</b>، مش لأي ضرب عادي.</p>
<table>
<tr><th>If $t1 =</th><th>sll $t0,$t1,1 (×2)</th><th>sll $t0,$t1,2 (×4)</th><th>sll $t0,$t1,3 (×8)</th></tr>
<tr><td>5</td><td>10</td><td>20</td><td>40</td></tr>
</table>

<h3 id="lab-div">A10. Division: <code>div</code> and <code>divu</code> (slides 26–29)</h3>
<pre class="code">div  $rs, $rt     # signed division:   LO = $rs / $rt (quotient),  HI = $rs % $rt (remainder)
divu $rs, $rt     # unsigned division: same registers
mflo $t3          # quotient into $t3
mfhi $t4          # remainder into $t4</pre>
<pre class="code">.data
 num1: .word 9
 num2: .word 4
.text
 lw $t1, num1        # Load 9 into $t1
 lw $t2, num2        # Load 4 into $t2
 div $t1, $t2        # $t1 / $t2 -> quotient in LO, remainder in HI
 mflo $t3            # quotient  = 2
 mfhi $t4            # remainder = 1</pre>
<table>
<tr><th>After</th><th>$t1</th><th>$t2</th><th>LO</th><th>HI</th><th>$t3</th><th>$t4</th></tr>
<tr><td>lw, lw</td><td>9</td><td>4</td><td>—</td><td>—</td><td>—</td><td>—</td></tr>
<tr><td>div $t1,$t2</td><td>9</td><td>4</td><td><b>2</b></td><td><b>1</b></td><td>—</td><td>—</td></tr>
<tr><td>mflo $t3</td><td>9</td><td>4</td><td>2</td><td>1</td><td><b>2</b></td><td>—</td></tr>
<tr><td>mfhi $t4</td><td>9</td><td>4</td><td>2</td><td>1</td><td>2</td><td><b>1</b></td></tr>
</table>
<div class="note"><b>div vs divu:</b> same registers (quotient → LO, remainder → HI); <code>div</code> treats operands as <b>signed</b>, <code>divu</code> as <b>unsigned</b>. For 9 ÷ 4 both give quotient 2, remainder 1.</div>
<div class="warn"><b>Don't mix up:</b> quotient is in <b>LO</b> and remainder in <b>HI</b> (for multiplication HI is the upper half; for division HI is the remainder).</div>

<h2 id="lab-b">PART B — Lab 6: MIPS Instructions II</h2>

<h3 id="lab-input">B1. Getting user input (slides 2–8)</h3>
<table>
<tr><th>Syscall code</th><th>Function</th><th>Registers involved</th></tr>
<tr><td><b>5</b></td><td>Read integer</td><td>Result in <b>$v0</b></td></tr>
<tr><td><b>6</b></td><td>Read float</td><td>Result in <b>$f0</b></td></tr>
<tr><td><b>8</b></td><td>Read string</td><td><b>$a0</b> = buffer address, <b>$a1</b> = max length</td></tr>
</table>
<h4>Integer input</h4>
<pre class="code">.data
 input: .word 0          # Reserve memory to store the integer input
.text
 li $v0, 5               # Syscall code for reading an integer
 syscall                 # Perform the syscall
 sw $v0, input           # Store the input in memory</pre>
<p><b>Trace (user types 25):</b> $v0 = 5 → syscall waits for input → $v0 = 25 → <code>sw</code> copies 25 into memory location <code>input</code>.</p>
<h4>Float input</h4>
<pre class="code">.data
 input_float: .float 0.0   # Reserve memory for float input
.text
 li $v0, 6                 # Syscall code for reading a float
 syscall                   # Perform the syscall
 swc1 $f0, input_float     # Store the float input in memory</pre>
<p>The float arrives in <b>$f0</b> (not $v0); <code>swc1</code> stores a single-precision value from a floating-point register to memory.</p>
<h4>String input</h4>
<pre class="code">.data
 buffer: .space 50                  # Allocate space for the string (50 bytes)
 prompt: .asciiz "Enter a string: "
.text
 # Print the prompt
 li $v0, 4                          # Syscall code for print_string
 la $a0, prompt                     # Load the address of the prompt
 syscall
 # Get the string input
 li $v0, 8                          # Syscall code for reading a string
 la $a0, buffer                     # Load the address of the buffer
 li $a1, 50                         # Set the maximum length of the input
 syscall</pre>
<p class="ar" dir="rtl">الـ string بتتخزن في الـ <b>buffer</b>. لازم تحجز buffer كبير كفاية بـ <code>.space</code>، و <code>$a1</code> بتحدد أقصى طول.</p>
<div class="warn"><b>Common mistakes:</b> reading a float into $v0 (it's $f0); forgetting <code>la $a0, buffer</code>; setting $a1 larger than the <code>.space</code> size; not printing a prompt so the user doesn't know what to type.</div>

<h3 id="lab-labels">B2. Labels (slides 9–12)</h3>
<ul>
<li>A <b>label</b> marks a specific point in the program (jump/branch targets, loops, data locations). Syntax: <code>label_name:</code> — a name followed by a <b>colon</b>; it represents the <b>address</b> of the instruction or data that follows.</li>
<li><b>Uses:</b> (1) targets for <code>j</code>, <code>beq</code>, <code>bne</code>; (2) loops; (3) variables in the <code>.data</code> segment.</li>
<li><b>Best practices:</b> use descriptive names (main, loop, exit); <b>each label must be unique</b>; place labels directly above the code or data they represent.</li>
</ul>

<h3 id="lab-if">B3. If statements and branching (slides 13–19)</h3>
<table>
<tr><th>Instruction</th><th>Meaning</th><th>Syntax</th></tr>
<tr><td><b>beq</b> (Branch if Equal)</td><td>Branch to label if two registers are equal</td><td><code>beq $rs, $rt, label</code></td></tr>
<tr><td><b>bne</b> (Branch if Not Equal)</td><td>Branch to label if two registers are not equal</td><td><code>bne $rs, $rt, label</code></td></tr>
<tr><td><b>slt</b> (Set on Less Than)</td><td>$rd = 1 if $rs &lt; $rt, otherwise 0; usually combined with beq/bne</td><td><code>slt $rd, $rs, $rt</code></td></tr>
</table>
<h4>Example 1: if (a == b) c = 1; else c = 0;</h4>
<pre class="code">.data
 a: .word 5
 b: .word 5
 c: .word 0
.text
main:
 lw $t0, a                 # Load a into $t0
 lw $t1, b                 # Load b into $t1
 beq $t0, $t1, equal       # If a == b, jump to 'equal'
 li $t2, 0                 # Else, set c = 0
 sw $t2, c
 j end                     # Jump to the end
equal:
 li $t2, 1                 # Set c = 1
 sw $t2, c
end:
 li $v0, 10                # Exit program
 syscall</pre>
<table>
<tr><th>Step</th><th>Instruction</th><th>State / what happens</th></tr>
<tr><td>1</td><td>lw $t0, a</td><td>$t0 = 5</td></tr>
<tr><td>2</td><td>lw $t1, b</td><td>$t1 = 5</td></tr>
<tr><td>3</td><td>beq $t0,$t1,equal</td><td>5 == 5 → <b>branch taken</b> → PC goes to <code>equal</code></td></tr>
<tr><td>4</td><td>li $t2, 1</td><td>$t2 = 1</td></tr>
<tr><td>5</td><td>sw $t2, c</td><td>memory c = <b>1</b></td></tr>
<tr><td>6</td><td>li $v0,10 ; syscall</td><td>program exits (the else part was skipped)</td></tr>
</table>
<p class="ar" dir="rtl"><b>لو a ≠ b</b> الـ beq مش هيتنفذ، فهيكمل على <code>li $t2,0</code> و <code>sw</code> (c=0) وبعدين <code>j end</code> عشان يتخطى جزء الـ equal. من غير <code>j end</code> الكود هينزل ويعمل c=1 بالغلط!</p>
<h4>Example 2: if (a &lt; b) c = 1; else c = 0;</h4>
<pre class="code">.data
 a: .word 3
 b: .word 5
 c: .word 0
.text
main:
 lw $t0, a
 lw $t1, b
 slt $t2, $t0, $t1          # $t2 = 1 if $t0 < $t1, else 0
 bne $t2, $zero, less       # If $t2 != 0 (a < b), branch to 'less'
 li $t3, 0                  # Else, set c = 0
 sw $t3, c
 j end
less:
 li $t3, 1                  # Set c = 1
 sw $t3, c
end:
 li $v0, 10
 syscall</pre>
<table>
<tr><th>Step</th><th>Instruction</th><th>Registers / memory</th></tr>
<tr><td>1–2</td><td>lw $t0,a ; lw $t1,b</td><td>$t0 = 3, $t1 = 5</td></tr>
<tr><td>3</td><td>slt $t2,$t0,$t1</td><td>3 &lt; 5 true → <b>$t2 = 1</b></td></tr>
<tr><td>4</td><td>bne $t2,$zero,less</td><td>1 ≠ 0 → <b>branch taken</b> to <code>less</code></td></tr>
<tr><td>5–6</td><td>li $t3,1 ; sw $t3,c</td><td>c = <b>1</b></td></tr>
</table>
<div class="note"><b>Summary (slide 19):</b> use <code>beq</code>/<code>bne</code> for equality/inequality; use <code>slt</code> for less-than and combine with <code>bne</code>/<code>beq</code>; always set labels and program flow correctly for <u>both</u> the true and false conditions.</div>

<h3 id="lab-pseudo">B4. Branching pseudo-instructions (slides 20–24)</h3>
<p class="ar" dir="rtl">الـ <b>pseudo-instruction</b> هي تعليمة مبسطة الـ <b>assembler</b> بيترجمها لتعليمة أو أكتر حقيقية (real hardware instructions). بتستخدم الـ register <code>$at</code> (assembler temporary) من ورا الكواليس.</p>
<table>
<tr><th>Pseudo</th><th>Meaning</th><th>Equivalent real instructions (from slides)</th></tr>
<tr><td><code>b label</code></td><td>Branch unconditionally</td><td><code>j label</code></td></tr>
<tr><td><code>blt $t0,$t1,label</code></td><td>Branch if less than</td><td><code>slt $at,$t0,$t1</code> ; <code>bne $at,$zero,label</code></td></tr>
<tr><td><code>ble $t0,$t1,label</code></td><td>Branch if less than or equal</td><td><code>slt $at,$t1,$t0</code> ; <code>beq $at,$zero,label</code></td></tr>
<tr><td><code>bge $t0,$t1,label</code></td><td>Branch if greater than or equal</td><td><code>slt $at,$t0,$t1</code> ; <code>beq $at,$zero,label</code></td></tr>
<tr><td><code>bgt $t0,$t1,label</code></td><td>Branch if greater than</td><td><code>slt $at,$t1,$t0</code> ; <code>bne $at,$zero,label</code></td></tr>
<tr><td><code>bnez $t0,label</code></td><td>Branch if not zero</td><td><code>bne $t0,$zero,label</code></td></tr>
<tr><td><code>beqz $t0,label</code></td><td>Branch if equal to zero</td><td><code>beq $t0,$zero,label</code></td></tr>
</table>
<div class="note"><b>How to remember the swap trick:</b> there's no “slt greater than”, so <b>bgt</b> and <b>ble</b> swap the operands of slt ($t1 first). <b>blt</b> and <b>bge</b> keep the order. Then <b>bne</b> (branch when the slt result is 1) is used for blt/bgt and <b>beq</b> (branch when the result is 0) for ble/bge.</div>
<table>
<tr><th>Pseudo</th><th>slt operands</th><th>slt = 1 means</th><th>Branch with</th></tr>
<tr><td>blt</td><td>$t0, $t1</td><td>$t0 &lt; $t1 (true condition)</td><td>bne (branch when 1)</td></tr>
<tr><td>bgt</td><td>$t1, $t0</td><td>$t1 &lt; $t0, i.e. $t0 &gt; $t1 (true condition)</td><td>bne</td></tr>
<tr><td>ble</td><td>$t1, $t0</td><td>$t1 &lt; $t0 means $t0 &gt; $t1 (<u>false</u> condition)</td><td>beq (branch when 0)</td></tr>
<tr><td>bge</td><td>$t0, $t1</td><td>$t0 &lt; $t1 (<u>false</u> condition)</td><td>beq</td></tr>
</table>
<figure class="fig"><a href="assets/figs/lab6_s24.jpg" target="_blank"><img loading="lazy" src="assets/figs/lab6_s24.jpg" alt="Lab 6 slide 24: Benefits of Pseudo-Instructions"></a><figcaption><b>Lab 6, slide 24</b> — original slide image: Benefits of Pseudo-Instructions.</figcaption></figure>
<h4>Benefits of pseudo-instructions (slide 24)</h4>
<ol><li>They make assembly programming easier and more intuitive.</li><li>They abstract away the need to manually handle intermediate comparisons using registers like <b>$at</b> (assembler temporary).</li><li>The assembler translates them into actual MIPS instructions.</li></ol>

<h3 id="lab-while">B5. While loops (slides 25–30)</h3>
<pre class="code">// C-like structure
while (condition) {
   // body
}

# MIPS general structure
loop_start:
   # Evaluate condition
   # If condition is false, branch to loop_end
   # Loop body
   j loop_start          # Jump back to the start of the loop
loop_end:
   # Continue program</pre>
<p class="ar" dir="rtl">في الـ while بنتحقق من الشرط <b>في الأول</b>، ولو بقى false بنقفز (branch) لـ <code>loop_end</code>. آخر الـ body بنعمل <code>j loop_start</code> نرجع نتحقق تاني.</p>
<h4>Example: sum of numbers 1 to 5</h4>
<div class="warn"><b>Slide note:</b> the slide title says “Counting Down with a While Loop” but the code actually <u>counts up</u> from 1 to 5 and sums the numbers.</div>
<pre class="code">// C code
int sum = 0;  int i = 1;
while (i <= 5) { sum += i;  i++; }</pre>
<pre class="code">.data
 sum: .word 0      # Variable to store the sum
 i:   .word 1      # Loop counter
 n:   .word 5      # Upper limit
.text
main:
 lw $t0, i                 # Load i into $t0
 lw $t1, n                 # Load upper limit into $t1
 lw $t2, sum               # Load sum into $t2
loop_start:
 bgt $t0, $t1, loop_end    # If i > n, exit loop
 add $t2, $t2, $t0         # sum += i
 addi $t0, $t0, 1          # i++
 j loop_start              # Jump back to the start of the loop
loop_end:
 sw $t2, sum               # Store updated sum
 li $v0, 10                # Exit syscall
 syscall</pre>
<h4>Execution trace table</h4>
<table>
<tr><th>Check #</th><th>$t0 (i)</th><th>$t1 (n)</th><th>bgt $t0,$t1 ?</th><th>$t2 (sum) after body</th><th>$t0 after addi</th></tr>
<tr><td>1</td><td>1</td><td>5</td><td>1&gt;5 no</td><td>0+1 = 1</td><td>2</td></tr>
<tr><td>2</td><td>2</td><td>5</td><td>no</td><td>1+2 = 3</td><td>3</td></tr>
<tr><td>3</td><td>3</td><td>5</td><td>no</td><td>3+3 = 6</td><td>4</td></tr>
<tr><td>4</td><td>4</td><td>5</td><td>no</td><td>6+4 = 10</td><td>5</td></tr>
<tr><td>5</td><td>5</td><td>5</td><td>5&gt;5 no</td><td>10+5 = 15</td><td>6</td></tr>
<tr><td>6</td><td>6</td><td>5</td><td><b>6&gt;5 yes → exit</b></td><td>15</td><td>—</td></tr>
</table>
<p>After <code>sw $t2, sum</code>: memory <b>sum = 15</b>. The condition is checked <b>6 times</b>; the body executes <b>5 times</b>.</p>
<div class="warn"><b>Common mistakes:</b> forgetting <code>addi $t0,$t0,1</code> or <code>j loop_start</code> → infinite loop / one iteration; using <code>bge</code> instead of <code>bgt</code> would stop at i = 5 and sum only 1..4 (= 10); forgetting <code>li $v0,10; syscall</code> → execution falls past the end of the program.</div>
<h4>Key instructions for while loops (slide 29) and how the loop works (slide 30)</h4>
<ul>
<li><b>Branching:</b> <code>beq</code>, <code>bne</code> (equality/inequality); <code>blez</code>, <code>bgtz</code>, <code>blt</code>, <code>bge</code> (compare with zero or between two registers). <b>Jump:</b> <code>j</code> — unconditional jump to a label.</li>
<li><b>Condition evaluation</b> (e.g., <code>blez</code> = branch if less than or equal to zero) → <b>loop body</b> executes if the condition is true → after the body, <code>j</code> returns to the condition → <b>exit</b>: when the condition becomes false, branch to the label outside the loop.</li>
</ul>

<h3 id="lab-arrays">B6. Arrays in MIPS (slides 31–35)</h3>
<p class="ar" dir="rtl">MIPS مفيهاش array data structure. الـ array هي <b>block of contiguous memory</b> في الـ <code>.data</code>، وبتوصل لكل عنصر بـ <b>base address + offset</b>.</p>
<pre class="code">.data
 arr:   .word 10, 20, 30, 40, 50     # Declare an array of integers
 size:  .word 5                      # Size of the array
 f_arr: .float 1.1, 2.2, 3.3, 4.4    # Array of floats</pre>
<table>
<tr><th>Data type</th><th>Bytes per element</th></tr>
<tr><td>.word (integers)</td><td><b>4</b></td></tr>
<tr><td>.byte</td><td><b>1</b></td></tr>
<tr><td>.float</td><td><b>4</b></td></tr>
</table>
<div class="def"><b>Address formula:</b> address = base address + (index × element size). Arrays are <b>zero-indexed</b>.</div>
<p><b>Steps:</b> (1) load the base address with <code>la</code>; (2) compute the offset from the index and element size; (3) access with <code>lw</code>/<code>lwc1</code>.</p>
<h4>Accessing arr[2] (3rd element)</h4>
<pre class="code">la  $t0, arr          # Load base address of 'arr' into $t0
li  $t1, 2            # Index = 2
sll $t1, $t1, 2       # Multiply index by 4 (size of .word)
add $t2, $t0, $t1     # $t2 = address of arr[2]
lw  $t3, 0($t2)       # Load arr[2] into $t3</pre>
<table>
<tr><th>Instruction</th><th>Result</th></tr>
<tr><td>la $t0, arr</td><td>$t0 = base address of arr (address of 10)</td></tr>
<tr><td>li $t1, 2</td><td>$t1 = 2</td></tr>
<tr><td>sll $t1,$t1,2</td><td>$t1 = 2 × 4 = <b>8</b> (byte offset)</td></tr>
<tr><td>add $t2,$t0,$t1</td><td>$t2 = base + 8 → address of 30</td></tr>
<tr><td>lw $t3, 0($t2)</td><td>$t3 = <b>30</b></td></tr>
</table>
<p class="ar" dir="rtl">ليه بنعمل <code>sll … 2</code>؟ لأن الـ memory بتتعنون بالـ <b>byte</b> وكل integer بياخد 4 bytes، فالـ index لازم يتضرب في 4 (= shift left by 2).</p>
<h4>Accessing f_arr[1] (2nd element)</h4>
<pre class="code">la   $t0, f_arr      # Load base address of 'f_arr'
li   $t1, 1          # Index = 1
sll  $t1, $t1, 2     # Multiply index by 4 (size of .float)
add  $t2, $t0, $t1   # $t2 = address of f_arr[1]
lwc1 $f1, 0($t2)     # Load f_arr[1] into $f1</pre>
<p>Result: $f1 = <b>2.2</b>. Note <code>lwc1</code> (load word to coprocessor 1) loads a float into an FP register.</p>

<h3 id="lab-printarr">B7. Printing an array with a while loop (slides 36–40)</h3>
<pre class="code">.data
 arr:     .word 10, 20, 30, 40, 50
 size:    .word 5
 newline: .asciiz "\n"
.text
main:
 la $t0, arr                # Step 1: base address
 lw $t1, size               #         size = 5
 li $t2, 0                  #         i = 0
loop_start:
 bge $t2, $t1, loop_end     # Step 2: if i >= size, exit
 sll $t3, $t2, 2            # Step 3: i * 4
 add $t4, $t0, $t3          #         address of arr[i]
 lw  $a0, 0($t4)            #         $a0 = arr[i]
 li $v0, 1                  # Step 4: print integer
 syscall
 la $a0, newline            #         print newline
 li $v0, 4
 syscall
 addi $t2, $t2, 1           # Step 5: i++
 j loop_start
loop_end:
 li $v0, 10                 # Step 6: exit
 syscall</pre>
<table>
<tr><th>Iter</th><th>$t2 (i)</th><th>bge i,size?</th><th>$t3 (i×4)</th><th>$t4 (address)</th><th>$a0 = arr[i]</th><th>Console</th></tr>
<tr><td>1</td><td>0</td><td>0≥5 no</td><td>0</td><td>base+0</td><td>10</td><td>10↵</td></tr>
<tr><td>2</td><td>1</td><td>no</td><td>4</td><td>base+4</td><td>20</td><td>20↵</td></tr>
<tr><td>3</td><td>2</td><td>no</td><td>8</td><td>base+8</td><td>30</td><td>30↵</td></tr>
<tr><td>4</td><td>3</td><td>no</td><td>12</td><td>base+12</td><td>40</td><td>40↵</td></tr>
<tr><td>5</td><td>4</td><td>no</td><td>16</td><td>base+16</td><td>50</td><td>50↵</td></tr>
<tr><td>—</td><td>5</td><td><b>5≥5 yes → exit</b></td><td>—</td><td>—</td><td>—</td><td>(end)</td></tr>
</table>
<p><b>Expected output:</b> five lines — 10, 20, 30, 40, 50. <b>Why $a0 is used twice:</b> first it holds the integer to print, then it is reused for the address of the newline string.</p>
<div class="warn"><b>Common mistakes:</b> forgetting to multiply the index by 4 (you'd read overlapping bytes); using <code>bgt</code> instead of <code>bge</code> (would run one extra iteration and print garbage after the array); forgetting that printing needs <code>$v0</code> set before <b>each</b> syscall (the code resets $v0 to 1 and 4 each time).</div>

<h2 id="lab-practice">PART C — Practice exercises (AI-generated, based on the slides)</h2>
<div class="gen">These exercises are <b>AI-generated practice</b> built only from the slide content — they did <u>not</u> appear in the slides.</div>
<details class="ans"><summary>P1. Compute (a + b) × c and print it (a=2, b=3, c=4)</summary>
<pre class="code">.data
 a: .word 2
 b: .word 3
 c: .word 4
.text
 lw $t0, a
 lw $t1, b
 lw $t2, c
 add $t3, $t0, $t1     # 5
 mul $t4, $t3, $t2     # 20
 move $a0, $t4         # (pseudo) copy to $a0
 li $v0, 1
 syscall               # prints 20
 li $v0, 10
 syscall</pre></details>
<details class="ans"><summary>P2. Write an if/else: if (x &gt;= 10) y = 1 else y = 0</summary>
<pre class="code">lw $t0, x
li $t1, 10
bge $t0, $t1, big       # pseudo: slt $at,$t0,$t1 ; beq $at,$zero,big
li $t2, 0
sw $t2, y
j end
big: li $t2, 1
sw $t2, y
end: li $v0, 10
syscall</pre></details>
<details class="ans"><summary>P3. Print the numbers 5 down to 1 using a while loop</summary>
<pre class="code">li $t0, 5
loop_start:
 blez $t0, loop_end      # exit when i <= 0
 move $a0, $t0
 li $v0, 1
 syscall
 addi $t0, $t0, -1
 j loop_start
loop_end:
 li $v0, 10
 syscall</pre><p>Output digits: 5 4 3 2 1 (no separators since no newline/space is printed).</p></details>
<details class="ans"><summary>P4. Sum all elements of arr (10,20,30,40,50) — expected 150</summary>
<pre class="code">la $t0, arr
lw $t1, size
li $t2, 0          # i
li $t5, 0          # sum
loop_start:
 bge $t2, $t1, loop_end
 sll $t3, $t2, 2
 add $t4, $t0, $t3
 lw  $t6, 0($t4)
 add $t5, $t5, $t6
 addi $t2, $t2, 1
 j loop_start
loop_end:
 move $a0, $t5
 li $v0, 1
 syscall           # prints 150</pre></details>
<details class="ans"><summary>P5. Divide 17 by 5 — what are LO and HI? Which register holds the remainder?</summary>
<p>LO = <b>3</b> (quotient), HI = <b>2</b> (remainder). <code>mfhi</code> reads the remainder.</p></details>
<details class="ans"><summary>P6. Multiply a register by 16 without mul</summary>
<p><code>sll $t0, $t1, 4</code> (2<sup>4</sup> = 16).</p></details>
` };
