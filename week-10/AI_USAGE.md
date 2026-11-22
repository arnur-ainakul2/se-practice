# AI Usage Disclosure — Week 10

Required by the course academic policy (Generative AI use level **D — AI-integrated**).
You are responsible for the accuracy, testing and integrity of everything you submit,
including anything an AI tool produced.

| Tool | Exact model / plan | Used for | Which files it touched |
| --- | --- | --- | --- |
| Codex | Codex Luna 6 | Read-only risk review (Task 2) | None modified; project files were inspected only. |
| Codex | Codex Luna 6 | AGENTS.md review and approved patch (Task 6) | `app/AGENTS.md`, `lab-report.md` |
| Codex | Codex Luna 6 | Minimal patches for risks R4 and R3 (Task 8) | `app/src/App.tsx`, `app/src/booking.ts`, `app/src/utils/availability.ts`, `app/src/utils/availabilityRules.ts`, `app/src/data/sampleData.ts`, `lab-report.md` |
| Codex | Codex Luna 6 | Regression tests and assistance drafting/reviewing other report sections (Tasks 3–5, 7, 9–10) | `app/src/booking.test.ts`, `lab-report.md`, `submission.yml` |

**The review in Task 2 ran in a mode where the assistant could not edit, and `git status` showed no
change afterwards:** yes 
<!-- If it edited anything, say what and how you undid it. -->

**I labelled every claim in lab-report.md §3.2 after opening the cited file myself:** yes 

**Every change to `app/` was reviewed by me as a diff before I accepted it:** yes
<!-- Name anything you rejected in §8; name here anything you accepted without reading. -->

**I used another assistant as well (to explain a risk, to draft text in lab-report.md, …):** no
<!-- If "yes": which one, the exact model, and for which section. -->

**Every terminal output in lab-report.md was pasted from a real run, unedited:** yes

**I can explain every score in my register, and why my release decision follows from it, without
the assistant:** yes 

**Anything I accepted from the AI without fully understanding it:**
<!-- Name the file and the part. An honest entry here costs far less than a blank one that turns out to be untrue. -->
nope

Signed: Ainakul Arnur
Date: 11/22/2026
