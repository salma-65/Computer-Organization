window.PAGES.ch2.html += String.raw`
<h2 id="c2-4">2.4 Signed and Unsigned Numbers</h2>
<h3>Binary numbers and bit numbering</h3>
<ul>
<li>Base 2: the value of digit <i>d</i> at position <i>i</i> in base <i>b</i> is d × b<sup>i</sup> (i starts at 0 at the right). Example: 123<sub>ten</sub> = 1111011<sub>two</sub>.</li>
<li><b>Binary digit (bit):</b> 0 or 1, the “atom” of computing (high/low, on/off, true/false).</li>
<li>Bits of a MIPS word are numbered 31…0 from left to right. <b>Least significant bit (LSB)</b> = rightmost = bit 0; <b>most significant bit (MSB)</b> = leftmost = bit 31.</li>
<li>A 32-bit word has 2<sup>32</sup> patterns. As <b>unsigned</b> numbers they represent 0 … 2<sup>32</sup> − 1 (4,294,967,295).</li>
<li>First commercial computer offered decimal arithmetic, but a decimal digit needed several binary digits → inefficient; later computers went binary and convert to decimal only for I/O.</li>
<li><b>Overflow:</b> the proper result cannot be represented in the hardware bits; the language, OS and program decide what to do.</li>
</ul>
<h3>Representing negative numbers</h3>
<table><tr><th>Representation</th><th>Idea</th><th>Problems / notes</th></tr>
<tr><td><b>Sign and magnitude</b></td><td>Separate sign bit</td><td>Where to put the sign bit? Adder may need an extra step to set the sign. Has both +0 and −0. <b>Abandoned.</b></td></tr>
<tr><td><b>One's complement</b></td><td>Negative = invert every bit (2<sup>n</sup> − x − 1)</td><td>Two zeros (00…00 and 11…11); needs extra step to subtract. Balanced positives/negatives. Used by some early scientific computers.</td></tr>
<tr><td><b>Two's complement</b></td><td>Leading 0s = positive, leading 1s = negative</td><td><b>Used by every computer today (unanimous since 1965).</b> One extra negative number: −2,147,483,648 has no positive counterpart. Hardware only tests the MSB (sign bit).</td></tr>
<tr><td><b>Biased notation</b></td><td>Most negative = 00…0, most positive = 11…1, zero typically 10…0</td><td>Number + bias is non-negative; used for floating point (Chapter 3).</td></tr></table>
<div class="def"><b>Two's complement range (32 bits):</b> −2<sup>31</sup> = −2,147,483,648 (1000…0) up to 2<sup>31</sup> − 1 = 2,147,483,647 (0111…1). <b>Value</b> = x31 × (−2<sup>31</sup>) + x30 × 2<sup>30</sup> + … + x1 × 2<sup>1</sup> + x0 × 2<sup>0</sup>. Name origin: the unsigned sum of an n-bit number and its negative is 2<sup>n</sup>, so the complement of x is 2<sup>n</sup> − x.</div>
<table><tr><th>32-bit pattern (two's complement)</th><th>Value</th></tr>
<tr><td>0000…0000</td><td>0</td></tr><tr><td>0000…0001</td><td>1</td></tr><tr><td>0111…1111</td><td>2,147,483,647</td></tr>
<tr><td>1000…0000</td><td>−2,147,483,648</td></tr><tr><td>1000…0001</td><td>−2,147,483,647</td></tr>
<tr><td>1111…1101</td><td>−3</td></tr><tr><td>1111…1110</td><td>−2</td></tr><tr><td>1111…1111</td><td>−1</td></tr></table>
<div class="ex"><b>Binary → decimal:</b> 1111 … 1111 1100<sub>two</sub> = −2<sup>31</sup> + (2<sup>30</sup> + … + 2<sup>2</sup>) = −2,147,483,648 + 2,147,483,644 = <b>−4</b>.</div>
<div class="note"><b>Overflow in two's complement:</b> occurs when the leftmost retained bit differs from the infinite digits to the left (the sign bit is wrong): a 0 on the left when the number should be negative, or a 1 when it should be positive.</div>
<h3>Signed vs unsigned loads and sign extension</h3>
<ul>
<li><b>Sign extension:</b> copy the sign bit repeatedly to fill the rest of the register so the number stays correct. Unsigned loads fill the left bits with 0s.</li>
<li>Loading a 32-bit word into a 32-bit register: signed = unsigned (moot).</li>
<li><b>lb</b> (load byte) sign-extends into the 24 leftmost bits; <b>lbu</b> (load byte unsigned) zero-extends. C uses bytes for characters, so <b>lbu</b> is used practically exclusively.</li>
<li>C: <code>int</code> (signed) vs <code>unsigned int</code>. Memory addresses are unsigned (negative addresses make no sense).</li>
</ul>
<h3>Two shortcuts</h3>
<div class="ex"><b>1) Negation:</b> invert every bit, then add 1 (since x + ~x = 111…1 = −1, so ~x + 1 = −x).<br>2 = 0000…0010 → invert 1111…1101 → +1 = <b>1111…1110 = −2</b>. Going back: invert 0000…0001, +1 = 0000…0010 = 2.</div>
<div class="ex"><b>2) Sign extension of a 16-bit number to 32 bits:</b> replicate the MSB (sign bit) 16 times on the left and copy the old bits on the right. 16-bit 2 = 0000 0000 0000 0010 → 32-bit 0000…0010; 16-bit −2 = 1111 1111 1111 1110 → 32-bit 1111…1110. This works because positive numbers have infinitely many leading 0s and negatives infinitely many leading 1s.<br>The 16-bit immediate field in lw/sw/branch/addi/slti is a two's complement number: −32,768 (−2<sup>15</sup>) to 32,767 (2<sup>15</sup> − 1), sign-extended to 32 bits.</div>
<p class="ar" dir="rtl">الخلاصة: في MIPS بنستخدم <b>two's complement</b> للأرقام الموجبة والسالبة. السالب بيبدأ بـ 1. عشان تعكس الإشارة: اقلب كل البتات وزود 1. وعشان تكبّر رقم من 16 لـ 32 bit: انسخ الـ sign bit على اليسار (sign extension).</p>
<details class="ans"><summary>Check Yourself (§2.4) — 64-bit pattern 1111…1111 1000<sub>two</sub> (book answer)</summary><p>The answer is <b>−8<sub>ten</sub></b> (option 2): invert → 000…0111, +1 = 1000 = 8, so the value is −8.</p></details>
<p class="en"><b>Notation:</b> for fixed-width binary/hex numbers the sign is encoded in the bits, so “+”/“−” are not written in front of binary or hexadecimal strings.</p>
`;
