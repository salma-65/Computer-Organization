window.PAGES.ch2.html += String.raw`
<h2 id="c2-13">2.13 A C Sort Example to Put It All Together</h2>
<p class="en">Goal: derive MIPS code for two C procedures — <b>swap</b> (swap array elements) and <b>sort</b> (bubble/exchange sort that calls swap). <i>Note: this section uses ideas from §2.8 (parameter registers $a0–$a3, $s registers preserved, $ra, $sp, jal/jr, leaf procedures), which is missing from your PDF; the code itself is fully shown here.</i></p>
<div class="def"><b>Steps for hand-translating a procedure:</b> (1) allocate registers to program variables; (2) produce code for the body; (3) preserve registers across the procedure invocation.</div>
<h3>The procedure swap</h3>
<figure class="fig"><a href="assets/figs/ch2_p60.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch2_p60.jpg" alt="Figure 2.24"></a><figcaption><b>Figure 2.24</b> (PDF page 60) — C procedure <code>void swap(int v[], int k) { int temp; temp = v[k]; v[k] = v[k+1]; v[k+1] = temp; }</code></figcaption></figure>
<ul><li><b>Register allocation:</b> parameters v and k arrive in <b>$a0</b> and <b>$a1</b>; <code>temp</code> → <b>$t0</b> (swap is a leaf procedure, so no saved registers are needed → nothing to preserve).</li>
<li><b>Common mistake:</b> forgetting that sequential word addresses differ by <b>4</b>, not 1 → multiply k by 4 with a shift left by 2.</li></ul>
<pre class="code">swap: sll $t1, $a1, 2      # reg $t1 = k * 4
      add $t1, $a0, $t1    # reg $t1 = v + (k * 4); address of v[k]
      lw  $t0, 0($t1)      # reg $t0 (temp) = v[k]
      lw  $t2, 4($t1)      # reg $t2 = v[k + 1]  (next element)
      sw  $t2, 0($t1)      # v[k] = reg $t2
      sw  $t0, 4($t1)      # v[k+1] = reg $t0 (temp)
      jr  $ra              # return to calling routine</pre>
<figure class="fig"><a href="assets/figs/ch2_p61.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch2_p61.jpg" alt="Figure 2.25"></a><figcaption><b>Figure 2.25</b> (PDF page 61) — the original assembly code for swap with its blocks labelled “Procedure body” and “Procedure return”.</figcaption></figure>
<h3>The procedure sort</h3>
<figure class="fig"><a href="assets/figs/ch2_p62.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch2_p62.jpg" alt="Figure 2.26"></a><figcaption><b>Figure 2.26</b> (PDF page 62) — C procedure <code>void sort(int v[], int n)</code>: outer loop <code>for (i = 0; i &lt; n; i += 1)</code>, inner loop <code>for (j = i − 1; j &gt;= 0 &amp;&amp; v[j] &gt; v[j + 1]; j −= 1)</code> calling <code>swap(v, j)</code>.</figcaption></figure>
<ul>
<li><b>Register allocation:</b> v → $a0, n → $a1, i → <b>$s0</b>, j → <b>$s1</b>.</li>
<li><b>Outer for:</b> init <code>move $s0,$zero</code> (move is a pseudoinstruction); test exits if i ≥ n: <code>slt $t0,$s0,$a1</code> ; <code>beq $t0,$zero,exit1</code>; increment <code>addi $s0,$s0,1</code>; bottom <code>j for1tst</code>.</li>
<li><b>Inner for init:</b> <code>addi $s1,$s0,-1</code> (j = i − 1); decrement <code>addi $s1,$s1,-1</code>.</li>
<li><b>Two-part test (&amp;&amp;):</b> exit if either fails. First: <code>slti $t0,$s1,0</code> ; <code>bne $t0,$zero,exit2</code> (exit if j &lt; 0). Second: exit if v[j] ≤ v[j+1], i.e. v[j+1] ≥ v[j]: <code>slt $t0,$t4,$t3</code> ; <code>beq $t0,$zero,exit2</code>.</li>
<li><b>Passing parameters:</b> sort's $a0/$a1 are also needed by swap, so sort first copies them to <b>$s2</b> and <b>$s3</b> (faster than saving on the stack), then sets <code>move $a0,$s2</code> and <code>move $a1,$s1</code> before <code>jal swap</code>.</li>
<li><b>Preserving registers:</b> sort is itself called, so it must save <b>$ra</b>, and it uses saved registers $s0–$s3 → must save them. The prologue reserves <b>20 bytes</b> (5 words) of stack; the tail reverses it and adds <code>jr $ra</code>.</li></ul>
<pre class="code">sort:  addi $sp,$sp,-20      # make room on stack for 5 registers
       sw   $ra,16($sp)      # save $ra on stack
       sw   $s3,12($sp)      # save $s3
       sw   $s2, 8($sp)      # save $s2
       sw   $s1, 4($sp)      # save $s1
       sw   $s0, 0($sp)      # save $s0
       move $s2,$a0          # copy parameter $a0 into $s2
       move $s3,$a1          # copy parameter $a1 into $s3
       move $s0,$zero        # i = 0
for1tst: slt $t0,$s0,$s3     # $t0 = 0 if i >= n
       beq  $t0,$zero,exit1  # go to exit1 if i >= n
       addi $s1,$s0,-1       # j = i - 1
for2tst: slti $t0,$s1,0      # $t0 = 1 if j < 0
       bne  $t0,$zero,exit2  # go to exit2 if j < 0
       sll  $t1,$s1,2        # $t1 = j * 4
       add  $t2,$s2,$t1      # $t2 = v + (j * 4)
       lw   $t3,0($t2)       # $t3 = v[j]
       lw   $t4,4($t2)       # $t4 = v[j + 1]
       slt  $t0,$t4,$t3      # $t0 = 0 if v[j+1] >= v[j]
       beq  $t0,$zero,exit2  # go to exit2 if v[j+1] >= v[j]
       move $a0,$s2          # 1st parameter of swap is v
       move $a1,$s1          # 2nd parameter of swap is j
       jal  swap             # call swap
       addi $s1,$s1,-1       # j -= 1
       j    for2tst          # jump to test of inner loop
exit2: addi $s0,$s0,1        # i += 1
       j    for1tst          # jump to test of outer loop
exit1: lw   $s0,0($sp)       # restore $s0
       lw   $s1,4($sp)       # restore $s1
       lw   $s2,8($sp)       # restore $s2
       lw   $s3,12($sp)      # restore $s3
       lw   $ra,16($sp)      # restore $ra
       addi $sp,$sp,20       # restore stack pointer
       jr   $ra              # return to calling routine</pre>
<p class="en">The book states that the nine C lines of sort became about <b>35 lines</b> of MIPS. (Figure 2.27 on PDF page 66 shows the original listing with each block labelled: saving registers, procedure body, move parameters, pass parameters, restoring registers, procedure return.)</p>
<figure class="fig"><a href="assets/figs/ch2_p66.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch2_p66.jpg" alt="Figure 2.27"></a><figcaption><b>Figure 2.27</b> (PDF page 66) — the original MIPS assembly version of procedure sort.</figcaption></figure>
<div class="note"><b>Elaborations:</b> (1) <b>Procedure inlining:</b> the compiler copies the body of swap where it is called instead of using jal → avoids four instructions here; downside: code gets bigger if called from several places, which may raise the cache miss rate (Chapter 5). (2) MIPS compilers always reserve stack space for the four argument registers (decrement $sp by 16) in case of <b>vararg</b> (a pointer to pick, say, the third argument).</div>
<h3>Understanding program performance (Figures 2.28, 2.29)</h3>
<figure class="fig"><a href="assets/figs/ch2_p67.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch2_p67.jpg" alt="Figure 2.28"></a><figcaption><b>Figure 2.28</b> (PDF page 67) — effect of gcc optimization levels on the sort program: relative performance, compile time, clock cycles, instruction count, CPI.</figcaption></figure>
<ul><li><b>Fig. 2.28:</b> unoptimized code has the <b>best CPI</b>; <b>O1</b> has the <b>lowest instruction count</b>; <b>O3 is the fastest</b> → <b>time is the only accurate measure of program performance</b>.</li>
<li><b>Fig. 2.29:</b> unoptimized C is <b>8.3×</b> faster than interpreted Java for Bubble Sort; the <b>JIT</b> compiler makes Java <b>2.1×</b> faster than unoptimized C and within a factor of <b>1.13</b> of the highest-optimized C. For Quicksort the ratios are not as close (harder to amortize runtime-compilation over the shorter run). A better <b>algorithm</b> (Quicksort vs Bubble Sort) gives about <b>three orders of magnitude</b> improvement when sorting 100,000 items.</li></ul>
<figure class="fig"><a href="assets/figs/ch2_p68.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch2_p68.jpg" alt="Figure 2.29"></a><figcaption><b>Figure 2.29</b> (PDF page 68) — performance of two sort algorithms in C and Java using interpretation and optimizing compilers relative to unoptimized C.</figcaption></figure>
`;
