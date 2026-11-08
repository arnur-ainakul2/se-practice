# AI Usage Disclosure — Week 08

Required by the course academic policy (Generative AI use level **D — AI-integrated**).
You are responsible for the accuracy, testing and integrity of everything you submit,
including anything an AI tool produced.

| Tool | Exact model / plan | Used for | Which files it touched |
| --- | --- | --- | --- |
| Claude | Claude Sonnet 5.5/ Free (as recorded in lab-report.md) | Diagnosis without the skill (Task 4) | No direct file edits; response was manually pasted into lab-report.md §5. |
| Claude | Claude Sonnet 5.5/ Free (as recorded in lab-report.md) | Diagnosis with bug-detector (Task 5) | No direct file edits; response was manually pasted into lab-report.md §6. |
| Codex | GPT-6-based Codex; exact build/version not displayed | Reviewed project, added regression tests, made both minimal fixes, and edited the report | app/src/booking.test.ts, app/src/booking.ts|

**`skills/bug-detector/SKILL.md` was typed by me from the deck's text, not generated:** yes

**I applied the patches myself, one minimal change per bug, after reviewing what the assistant
proposed:** no — Codex edited app/src/booking.ts at my request: changed the overlap comparison for BUG-A and removed the bookings.push side effect for BUG-B. I reviewed the diffs and Vitest runs.
<!-- If an assistant edited app/ directly, say which change and how you reviewed it. -->

**I used another assistant as well (to explain a failure, to draft text in lab-report.md, …):** yes — Claude for Tasks 4 and 5; Codex (GPT-6-based, exact build/version not displayed) for code review/edits 
<!-- If "yes": which one, the exact model, and for which section. -->

**Every terminal output in lab-report.md was pasted from a real run, unedited:** yes


**I can explain both bugs and both fixes — which line, why it was wrong, which test proves the
fix — without the assistant:** yes

**Anything I accepted from the AI without fully understanding it:**
<!-- Name the file and the part. An honest entry here costs far less than a blank one that turns out to be untrue. -->
nope 

Signed: Ainakul Arnur
Date:11/08/2026
