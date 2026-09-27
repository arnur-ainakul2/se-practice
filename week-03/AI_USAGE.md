# AI Usage Disclosure — Week 03

Required by the course academic policy (Generative AI use level **D** — AI-integrated).
AI use is expected in this lab. You remain responsible for the accuracy, testing and integrity of
everything you submit, including everything an AI tool produced.

| Tool | Exact model + version | Used for | Which files it touched |
| --- | --- | --- | --- |
| Claude | Claude Sonnet 5 | Prompt 1 — user stories | `requirements/user-stories.md` |
| Claude | Claude Sonnet 5 | Prompt 2 — acceptance criteria | `requirements/acceptance-criteria.md` |
| Claude | Claude Sonnet 5 | Prompt 3 — use-case diagram | `requirements/use-cases.puml` |

**One tool and one model for all three prompts:** yes 

**Did you use AI for anything beyond the three verbatim prompts** — rewriting your review, writing
the traceability table, drafting the conclusion? Name it. This is allowed and disclosed, not hidden.

Yes. Beyond the three verbatim generation prompts, I used the same tool interactively to:
- Review the raw AI-generated user stories against the checklist (stakeholder, one outcome,
  testability, size, out-of-scope check) and draft the merge/rewrite decisions recorded in
  `lab-report.md` section 3.
- Review the raw AI-generated acceptance criteria for scope creep (authentication, an "override"
  concept, an invented "facilities" role) and settle the two open scenario questions explicitly in
  the assumptions.
- Review the raw AI-generated use-case diagram, catching an unjustified `<<include>>` (Book room →
  View availability) and an incorrect `<<extend>>` where `<<include>>` was the correct relationship
  (Book room / Cancel booking → Send confirmation).
- Draft `requirements/traceability.md`, cross-checking every US-nn and AC-nn ID against the actual
  files rather than inventing coverage.
- Help structure `submission.yml` and this disclosure file against the checker's expected fields.


**Everything I submitted, I can explain and defend in class:** yes 


**Anything I accepted from the AI without fully understanding it:**
None — every AC, story merge, and diagram correction was checked against the scenario's rules
(R1–R4) and the out-of-scope list before being kept.

Signed: Ainakul Arnur
Date: 2026-09-27
