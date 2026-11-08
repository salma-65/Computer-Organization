window.PAGES.ch2.html += String.raw`
<h2 id="c2-11">2.11 Parallelism and Instructions: Synchronization</h2>
<p class="ar" dir="rtl">الـ tasks المتوازية سهلة لو مستقلة، بس غالبًا لازم تتعاون: واحد بيكتب والتاني بيقرا. عشان نعرف إمتى الكتابة خلصت ونقرا بأمان لازم <b>synchronize</b>. من غير كده بيحصل <b>data race</b>.</p>
<div class="def"><b>Data race:</b> two memory accesses form a data race if they are from different threads to the same location, at least one is a write, and they occur one after the other. <b>Synchronization</b> is needed to know when a task finished writing so it is safe for another to read. <b>Mutual exclusion:</b> a region where only a single processor can operate, built from <b>lock</b> and <b>unlock</b>.</div>
<ul>
<li>Synchronization is typically built with user-level software routines that rely on <b>hardware-supplied synchronization instructions</b> (usually used by system programmers to build a synchronization library).</li>
<li>Key hardware ability: <b>atomically</b> read and modify a memory location — nothing can interpose between the read and the write.</li>
<li><b>Atomic exchange (atomic swap):</b> interchanges a value in a register with a value in memory. Lock example: 0 = free, 1 = unavailable; a processor exchanges 1 with the lock location; the returned value is 1 if another processor already claimed it, 0 otherwise (and the lock becomes 1). If two processors try simultaneously, exactly one gets 0.</li>
<li>A single atomic memory operation needs a read and a write in one uninterruptible instruction (hard for processor design). Alternative: a <b>pair of instructions</b> that is <i>effectively atomic</i>.</li>
</ul>
<h3>MIPS: load linked (ll) and store conditional (sc)</h3>
<ul>
<li><b>ll</b> (load linked) is a special load; <b>sc</b> (store conditional) is a special store used in sequence.</li>
<li>If the memory location read by ll changes before the sc to the same address executes, the <b>sc fails</b>. sc stores the register value into memory and <b>sets that register to 1 if it succeeds, 0 if it fails</b>.</li>
</ul>
<pre class="code">again: addi $t0,$zero,1     # copy locked value
       ll   $t1,0($s1)      # load linked
       sc   $t0,0($s1)      # store conditional
       beq  $t0,$zero,again # branch if store fails
       add  $s4,$zero,$t1   # put load value in $s4</pre>
<p>At the end, $s4 and the memory location addressed by $s1 have been atomically exchanged. If any processor changes memory between ll and sc, sc returns 0 in $t0 and the sequence retries.</p>
<div class="note"><b>Elaboration points:</b> sc also fails on a context switch (useful for a single processor with multiple processes). ll/sc can build atomic compare-and-swap and atomic fetch-and-increment. sc fails after another store to the ll address <u>or any exception</u>, so only <b>register-register instructions</b> should be placed between ll and sc (otherwise repeated page faults could cause deadlock), and the number of instructions in between should be small.</div>
<details class="ans"><summary>Check Yourself (§2.11) — when to use ll/sc? (book answer)</summary><p><b>Both are true:</b> (1) cooperating threads of a parallel program need to synchronize for shared data; (2) cooperating processes on a uniprocessor need to synchronize for reading and writing shared data.</p></details>

<h2 id="c2-12">2.12 Translating and Starting a Program</h2>
<p class="ar" dir="rtl">4 مراحل بتحوّل C program على الـ disk لبرنامج شغال: <b>Compiler → Assembler → Linker → Loader</b>.</p>
<figure class="fig"><a href="assets/figs/ch2_p51.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch2_p51.jpg" alt="Figure 2.21"></a><figcaption><b>Figure 2.21</b> (PDF page 51) — translation hierarchy for C: C program → Compiler → Assembly language program → Assembler → Object (machine language module) + Object library routines → Linker → Executable (machine language program) → Loader → Memory. UNIX suffixes: x.c (C source), x.s (assembly), x.o (object), x.a (static library), x.so (dynamic library), a.out (executable). MS-DOS: .C, .ASM, .OBJ, .LIB, .DLL, .EXE.</figcaption></figure>
<table><tr><th>Step</th><th>Input → Output</th><th>Key points</th></tr>
<tr><td><b>Compiler</b></td><td>C → assembly language</td><td>High-level programs take far fewer lines than assembly → higher productivity. In 1975 many OS and assemblers were written in assembly (small memories, poor compilers); now optimizing compilers produce code nearly as good as an expert's, sometimes better for large programs.</td></tr>
<tr><td><b>Assembler</b></td><td>assembly → object file</td><td>Handles pseudoinstructions; builds the symbol table; accepts numbers in several bases (binary, decimal, hex).</td></tr>
<tr><td><b>Linker</b></td><td>object modules + libraries → executable</td><td>Combines independently assembled modules and resolves undefined labels.</td></tr>
<tr><td><b>Loader</b></td><td>executable → memory, runs</td><td>Places the program in main memory and starts it.</td></tr></table>
<h3>Assembler: pseudoinstructions, symbol table, object file</h3>
<div class="def"><b>Pseudoinstruction:</b> a common variation of assembly instructions treated as if it were an instruction in its own right; hardware need not implement it. <b>Assembly language:</b> a symbolic language that can be translated into binary machine language.</div>
<ul>
<li><code>move $t0,$t1</code> → <code>add $t0,$zero,$t1</code> ($zero supplies 0; the programmer cannot change it).</li>
<li><b>blt</b> → <b>slt</b> + <b>bne</b>; likewise <b>bgt, bge, ble</b>. Far-away branches become branch + jump. 32-bit constants are loaded despite the 16-bit immediate limit (lui + ori).</li>
<li>The only cost is reserving <b>$at</b> for the assembler. To understand the architecture and get best performance, study the real instructions (Figures 2.1 and 2.19).</li>
<li><b>Symbol table:</b> matches names of labels to the addresses of the memory words that instructions occupy (pairs of symbols and addresses).</li>
</ul>
<h4>The six pieces of a UNIX object file</h4>
<ol><li><b>Object file header</b> — size and position of the other pieces.</li><li><b>Text segment</b> — the machine language code.</li><li><b>Static data segment</b> — data allocated for the life of the program (UNIX also allows dynamic data that grows/shrinks).</li><li><b>Relocation information</b> — instructions and data words that depend on absolute addresses when loaded.</li><li><b>Symbol table</b> — remaining labels not defined, such as external references.</li><li><b>Debugging information</b> — how the modules were compiled so a debugger can map machine instructions to C source.</li></ol>
<h3>Linker (link editor)</h3>
<p class="ar" dir="rtl">لو غيّرت سطر واحد في procedure واحدة، مينفعش نعيد compile لكل البرنامج (خصوصًا الـ library اللي بتتغيرش). فبنعمل compile/assemble لكل procedure لوحدها، والـ <b>linker</b> بيربطهم.</p>
<div class="def"><b>Linker (link editor):</b> a systems program that combines independently assembled machine-language programs and resolves all undefined labels into an executable file. <b>Executable file:</b> a functional program in the object-file format with <u>no unresolved references</u> (may contain symbol tables/debug info; a “stripped executable” does not).</div>
<p><b>Three steps:</b> (1) place code and data modules symbolically in memory; (2) determine the addresses of data and instruction labels; (3) patch both the internal and external references. Patching is much faster than recompiling.</p>
<div class="ex"><b>Linking example.</b> Text segment starts at <b>0x0040 0000</b>, data segment at <b>0x1000 0000</b>, $gp = <b>0x1000 8000</b> (Figure 2.13). Procedure A: text 100<sub>hex</sub> bytes, data 20<sub>hex</sub> bytes → B's text starts at 0x0040 0100 and B's data at 0x1000 0020.
<table><tr><th>Instruction</th><th>Address</th><th>Result after linking</th></tr>
<tr><td>jal B (in A)</td><td>0x0040 0004</td><td>address field = address of B = 0x0040 0100 (pseudodirect)</td></tr>
<tr><td>jal A (in B)</td><td>0x0040 0104</td><td>address field = address of A = 0x0040 0000</td></tr>
<tr><td>lw $a0, X($gp)</td><td>0x0040 0000</td><td><code>lw $a0, 8000<sub>hex</sub>($gp)</code> → reaches 0x1000 0000 (word X)</td></tr>
<tr><td>sw $a1, Y($gp)</td><td>0x0040 0100</td><td><code>sw $a1, 8020<sub>hex</sub>($gp)</code> → reaches 0x1000 0020</td></tr></table>
The linker uses the <i>instruction type field</i> to know the format of the address to edit. <i>Elaboration:</i> jal drops the right two bits (word aligned): the field really holds 10 0040<sub>hex</sub>, not 40 0100<sub>hex</sub> (26 bits → 28-bit byte address).</div>
<div class="note"><b>Why 8000<sub>hex</sub> works:</b> the 16-bit address field 8000<sub>hex</sub> is sign-extended, so it means −32,768; $gp + (−8000<sub>hex</sub>) = 1000 8000<sub>hex</sub> − 8000<sub>hex</sub> = 1000 0000<sub>hex</sub> (word X). Likewise 8020<sub>hex</sub> sign-extends to −7FE0<sub>hex</sub> → 1000 0020<sub>hex</sub> (word Y). (This explanation is derived from the sign-extension rule in §2.4; the book just states the fields.)</div>
<h3>Loader (UNIX steps)</h3>
<ol><li>Read the executable file header to determine the size of the text and data segments.</li><li>Create an address space large enough for text and data.</li><li>Copy the instructions and data from the executable file into memory.</li><li>Copy the parameters (if any) to the main program onto the stack.</li><li>Initialize the machine registers and set the stack pointer to the first free location.</li><li>Jump to a start-up routine that copies the parameters into the argument registers and calls <code>main</code>; when main returns, the start-up routine terminates the program with an <b>exit</b> system call.</li></ol>
<h3>Dynamically linked libraries (DLLs)</h3>
<p><b>Static linking</b> (fastest to call) has disadvantages: the library becomes part of the executable (stale versions keep being used after bug fixes); it loads <u>all</u> called library routines even if not executed (standard C library = 2.5 MB). <b>DLLs:</b> library routines are not linked and loaded until the program runs.</p>
<ul><li>First DLL version: the loader ran a dynamic linker using extra information to find libraries and update external references, but still linked all routines that <i>might</i> be called.</li>
<li><b>Lazy procedure linkage:</b> each routine is linked only after it is first called, using a level of indirection (“Virtually every problem in computer science can be solved by another level of indirection”). Calls go to dummy entries at the end of the program, each with an indirect jump. First call: the dummy puts a number identifying the routine in a register and jumps to the dynamic linker/loader, which finds and remaps the routine and changes the indirect-jump address; later calls jump directly (one indirect jump only). The return pays no extra overhead.</li>
<li>DLLs need extra space for dynamic-linking information, cost overhead the first time, but avoid copying/linking whole libraries. Windows relies extensively on DLLs; it is also the default on UNIX today.</li></ul>
<figure class="fig"><a href="assets/figs/ch2_p57.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch2_p57.jpg" alt="Figure 2.22"></a><figcaption><b>Figure 2.22</b> (PDF page 57) — dynamically linked library via lazy procedure linkage: (a) first call (call dummy entry → indirect jump → dynamic linker/loader → remap DLL routine), (b) subsequent calls skip those steps.</figcaption></figure>
<h3>Starting a Java program</h3>
<figure class="fig"><a href="assets/figs/ch2_p58.jpg" target="_blank"><img loading="lazy" src="assets/figs/ch2_p58.jpg" alt="Figure 2.23"></a><figcaption><b>Figure 2.23</b> (PDF page 58) — translation hierarchy for Java: Java program → compiler → class files (Java bytecodes) → Java Virtual Machine (with Java library routines), which can invoke the JIT compiler to produce compiled Java methods in machine language.</figcaption></figure>
<ul>
<li>Java was invented to <b>run safely on any computer</b>, even if slower. It is compiled first to <b>Java bytecodes</b> (instructions easy to interpret; virtually no optimizations; types are checked). Programs are distributed as bytecodes.</li>
<li><b>Java Virtual Machine (JVM):</b> the program that interprets Java bytecodes. <b>Interpreter:</b> a program that simulates an instruction set architecture (the MIPS simulator used with the book is an interpreter). No separate assembly step.</li>
<li><b>Upside of interpretation:</b> portability (JVMs in hundreds of millions of devices). <b>Downside:</b> about 10× slowdown versus compiled C.</li>
<li><b>Just-In-Time (JIT) compiler:</b> compiles at run time, translating interpreted “hot” methods into native code (profiling finds hot methods); the compiled part is saved for next time. The gap between Java and C/C++ is closing.</li></ul>
<details class="ans"><summary>Check Yourself (§2.12) — book answer</summary><p>Most important interpreter advantage for Java's designers: <b>4) Machine independence</b>.</p></details>
`;
