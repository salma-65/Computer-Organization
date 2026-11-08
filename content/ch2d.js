window.PAGES.ch2.html += String.raw`
<h2 id="c2-6">2.6 Logical Operations</h2>
<p class="ar" dir="rtl">أحيانًا محتاجين نشتغل على <b>bits</b> جوه الـ word (مثلاً نفصل character من 8 bits) فاتضافت <b>logical operations</b> للغات وللـ ISA.</p>
<table><tr><th>Operation</th><th>C / Java</th><th>MIPS</th><th>Notes</th></tr>
<tr><td>Shift left</td><td>&lt;&lt;</td><td><code>sll</code></td><td>Fills emptied bits with 0s</td></tr>
<tr><td>Shift right</td><td>&gt;&gt;</td><td><code>srl</code></td><td>Logical (zero fill)</td></tr>
<tr><td>Bit-by-bit AND</td><td>&amp;</td><td><code>and</code>, <code>andi</code></td><td>1 only if both bits are 1</td></tr>
<tr><td>Bit-by-bit OR</td><td>|</td><td><code>or</code>, <code>ori</code></td><td>1 if either bit is 1</td></tr>
<tr><td>Bit-by-bit NOT</td><td>~</td><td><code>nor</code></td><td>NOT done as NOR with one operand zero: A NOR 0 = NOT(A OR 0) = NOT A</td></tr></table>
<h3>Shifts and the shamt field</h3>
<div class="ex"><code>sll $t2,$s0,4</code> (reg $t2 = reg $s0 &lt;&lt; 4). If $s0 = 9 = 0000…1001 then $t2 = 0000…1001 0000 = <b>144</b> (= 9 × 2<sup>4</sup> = 9 × 16).<br>Encoding (R-format): op = 0, rs = 0 (unused), rt = 16 ($s0), rd = 10 ($t2), shamt = 4, funct = 0.</div>
<ul><li><b>shamt</b> = shift amount, used in shift instructions. <b>Shifting left by i bits = multiplying by 2<sup>i</sup></b>.</li>
<li><b>sll</b> = shift left logical, <b>srl</b> = shift right logical. Both use op = 0 and funct = 0 (sll) / 2 (srl) with the shift amount in shamt.</li></ul>
<h3>AND, OR, NOR with examples</h3>
<pre class="code">$t2 = 0000 0000 0000 0000 0000 1101 1100 0000
$t1 = 0000 0000 0000 0000 0011 1100 0000 0000
and $t0,$t1,$t2   # $t0 = 0000 0000 0000 0000 0000 1100 0000 0000
or  $t0,$t1,$t2   # $t0 = 0000 0000 0000 0000 0011 1101 1100 0000
nor $t0,$t1,$t3   # with $t3 = 0:  $t0 = 1111 1111 1111 1111 1100 0011 1111 1111</pre>
<div class="def"><b>Mask:</b> a bit pattern used with AND to force 0s where the pattern has 0 (“conceals” some bits). <b>OR</b> places values into a field of 0s. <b>AND/OR/NOR definitions:</b> AND = 1 only if both bits are 1; OR = 1 if either is 1; NOT inverts; NOR = NOT of OR (1 only if both bits are 0).</div>
<ul><li>MIPS has <b>andi</b> and <b>ori</b> (constants are useful), but <b>no immediate NOR</b> (its main use is to invert one operand).</li>
<li><b>Elaboration:</b> the full MIPS also has XOR (1 when bits differ). andi/ori put <b>0s</b> in the upper 16 bits (zero-extend), unlike addi which sign-extends. C bit fields are inserted/extracted by compilers using and, or, sll, srl.</li></ul>
<details class="ans"><summary>Check Yourself (§2.6) — which operations can isolate a field? (book answer)</summary><p><b>Both</b>: (1) AND with a mask of 1s leaves 0s everywhere except the desired field; (2) a shift left by the right amount removes the bits to the left of the field, then a shift right puts the field into the rightmost bits with 0s elsewhere. AND leaves the field where it was; the shift pair moves the field to the rightmost part of the word.</p></details>

<h2 id="c2-7">2.7 Instructions for Making Decisions</h2>
<p class="ar" dir="rtl">اللي بيفرّق الكمبيوتر عن الآلة الحاسبة هو إنه <b>بياخد قرارات</b>. في MIPS الـ if بتتعمل بـ <b>conditional branches</b>.</p>
<table><tr><th>Instruction</th><th>Meaning</th></tr>
<tr><td><code>beq reg1,reg2,L1</code></td><td>Go to L1 if reg1 == reg2 (branch if equal)</td></tr>
<tr><td><code>bne reg1,reg2,L1</code></td><td>Go to L1 if reg1 != reg2 (branch if not equal)</td></tr>
<tr><td><code>j L</code></td><td>Unconditional branch = <b>jump</b>; the processor always follows it</td></tr></table>
<div class="def"><b>Conditional branch:</b> an instruction that requires comparing two values and allows a transfer of control to a new address based on the outcome. beq and bne are the conditional branches; the assembler computes branch addresses for you.</div>
<h3>if-then-else</h3>
<div class="ex"><code>if (i == j) f = g + h; else f = g - h;</code> with f..j = $s0..$s4:
<pre class="code">      bne $s3,$s4,Else   # go to Else if i != j
      add $s0,$s1,$s2    # f = g + h (skipped if i != j)
      j   Exit           # go to Exit
Else: sub $s0,$s1,$s2    # f = g - h (skipped if i = j)
Exit:</pre>
Tip: code is usually more efficient if you <b>test the opposite condition</b> and branch over the then-part.</div>
<h3>Loops</h3>
<div class="ex"><code>while (save[i] == k) i += 1;</code> with i = $s3, k = $s5, base of save = $s6:
<pre class="code">Loop: sll $t1,$s3,2        # $t1 = i * 4
      add $t1,$t1,$s6      # $t1 = address of save[i]
      lw  $t0,0($t1)       # $t0 = save[i]
      bne $t0,$s5,Exit     # go to Exit if save[i] != k
      addi $s3,$s3,1       # i = i + 1
      j   Loop             # go to Loop
Exit:</pre></div>
<div class="def"><b>Basic block:</b> a sequence of instructions without branches (except possibly at the end) and without branch targets or labels (except possibly at the beginning). Breaking a program into basic blocks is one of the first compilation phases.</div>
<h3>Comparisons: slt, slti, sltu, sltiu</h3>
<ul>
<li><code>slt $t0,$s3,$s4</code> → $t0 = 1 if $s3 &lt; $s4, else 0. <code>slti $t0,$s2,10</code> → $t0 = 1 if $s2 &lt; 10.</li>
<li>MIPS compilers build all relations (==, !=, &lt;, ≤, &gt;, ≥) from <b>slt, slti, beq, bne and $zero</b>. There is <b>no “branch on less than”</b> instruction: it would stretch the clock cycle or need extra cycles; two faster instructions are more useful.</li>
<li><b>Signed</b>: slt, slti. <b>Unsigned</b>: sltu, sltiu (MSB = 1 means a large number).</li></ul>
<div class="ex"><b>Signed vs unsigned:</b> $s0 = 1111…1111, $s1 = 0000…0001. <code>slt $t0,$s0,$s1</code> → signed: −1 &lt; 1 → <b>$t0 = 1</b>. <code>sltu $t1,$s0,$s1</code> → unsigned: 4,294,967,295 &gt; 1 → <b>$t1 = 0</b>.</div>
<div class="ex"><b>Bounds check shortcut:</b> “jump to IndexOutOfBounds if $s1 ≥ $t2 or $s1 is negative” needs only one unsigned compare, since negative numbers look like large unsigned numbers:
<pre class="code">sltu $t0,$s1,$t2                  # $t0 = 0 if $s1 >= length or $s1 < 0
beq  $t0,$zero,IndexOutOfBounds   # if bad, go to Error</pre></div>
<h3>Case/switch and jr</h3>
<p>A switch can be a chain of if-then-else, or a <b>jump address table (jump table)</b>: an array of words containing addresses of labels. Load the entry into a register and use <b>jr (jump register)</b> — an unconditional jump to the address in a register. (jr is also used for procedure return in §2.8.) The bedrock statement implementing decisions and loops at the ISA level is the <b>conditional branch</b>. <i>Elaboration:</i> delayed branches (Chapter 4) are hidden by the MIPS assembler.</p>
<details class="ans"><summary>Check Yourself (§2.7) — book answer</summary><p><b>I.</b> All four statements are true. <b>II.</b> Option 1: AND/OR logical operations implement <b>&amp;</b> and <b>|</b>, while conditional branches implement <b>&amp;&amp;</b> and <b>||</b> (short-circuit evaluation).</p></details>
`;
