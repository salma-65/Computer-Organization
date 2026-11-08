# Exam Study Notebook (static website)

## How to open
1. Unzip the folder.
2. Double-click **index.html** (any modern browser). No internet, server, login or install is needed.

## What is inside
| Sidebar item | Status |
|---|---|
| Chapter 1 | Complete detailed notes (sections 1.1–1.13), 17 original figure pages, worked exercises |
| Chapter 2 | Detailed notes for 2.1–2.7, 2.10–2.20, figure pages and index. **§2.8–2.9 are missing from the uploaded PDF** (book pp. 96–110), so they are not written |
| MIPS Lab | Complete: Lab 5 (30 slides) + Lab 6 (40 slides), line-by-line code, traces, mistakes, practice |
| Question Bank | 132 questions (44 ORIGINAL from your material, 88 AI-GENERATED) |
| Final Revision | Chapter 1 + Chapter 2 + MIPS Lab |

## Using it
- **Search** box (press `/`): searches every page and every question/answer; click a result to jump and highlight.
- **Show answer** boxes expand/collapse. Question Bank has filters (section, source, type, level).
- 🌙 button toggles dark mode (remembered). On mobile, ☰ opens the sidebar.
- Click any figure to open the original page image in a new tab.

## File layout
- `index.html`, `style.css`, `script.js` — the site.
- `content/ch1a.js`, `content/ch1b.js`, `content/ch2a.js … ch2i.js, ch2z.js`, `content/lab.js`, `content/revision.js` — page content (HTML inside JS strings, easy to edit).
- `content/qbank.js`, `content/qbank2.js` — all questions (fields: src, ref, area, type, level, q, a, ar).
- `assets/figs/` — images rendered from your PDFs (original pages; nothing redrawn).

## Editing
Open a content file and edit the HTML text. For a new question, copy an object in `qbank.js`. Keep `src:"original"` only for questions that really come from the source.

## Notes on page numbers
Chapter 1: book page ≈ PDF page + 1. Chapter 2: book page = PDF page + 59 up to PDF page 37, then PDF page + 73 (pages 96–110 are missing from the file). Figures are cited by **PDF page**.
