# AI Usage Disclosure — Week 07

Required by the course academic policy (Generative AI use level **D — AI-integrated**).
You are responsible for the accuracy, testing and integrity of everything you submit,
including anything an AI tool produced.

| Tool | Exact model / plan | Used for | Which files it touched |
| --- | --- | --- | --- |
| Gemini | Gemini 3.6 Flash | Generated the first test suite (Task 3) | `suites/first/booking.test.ts` |
| Codex (OpenAI) | GPT-6 | Reviewed the first suite, answered the improvement prompt, revised AC5, drafted §§9.2–10, and filled the declaration | `lab-report.md`, `app/src/booking.test.ts`, `submission.yml` |
| Codex (OpenAI) | GPT-6 | Drafted case reasons and first-suite review decisions | `lab-report.md` |
| Codex (OpenAI) | GPT-6 | Helped record observations for manual UI checks from the screenshots | `lab-report.md` |

**I used an assistant to extract `canBook` (Task 1), or to fix a defect in it:** yes
<!-- Codex (OpenAI), GPT-6: extracted the decision into app/src/booking.ts and connected App.tsx. The predicates were preserved; production build/typecheck passed and the user confirmed the browser behavior. -->

**I used another assistant as well (to explain a failure, to draft text in lab-report.md, …):** yes
<!-- Codex (OpenAI), GPT-6: drafted reasons in §3, review decisions in §5, improvement review in §6.2, UI observations in §8, comparison and assumption in §9, and conclusion in §10. -->

**`suites/first/` holds the assistant's first test file exactly as it generated it:** yes

**Every terminal output in lab-report.md was pasted from a real run, unedited:** yes

**I can explain every test in my final suite — its input, its expected result and the AC behind
it — without the assistant:** yes 

**Anything I accepted from the AI without fully understanding it:** None identified; I checked the test inputs and expectations against the acceptance criteria.
<!-- Name the file and the part. An honest entry here costs far less than a blank one that turns out to be untrue. -->
nope

Signed: Ainakul Arnur
Date: 2026-11-06
