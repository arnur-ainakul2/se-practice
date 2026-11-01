# AI Usage Disclosure — SIS #03

Required by the course academic policy (Generative AI use level **D — AI-integrated**).
You are responsible for the accuracy, testing and integrity of everything you submit,
including anything an AI tool produced.

| Tool | Exact model / plan | Used for | Which files it touched | Reused from |
| --- | --- | --- | --- | --- |
| Gemini | Gemini Flash 3.6 | the plan (stage A) | `report.md` §11 (exchange record) | week-05 |
| Gemini | Gemini Flash 3.6 | Python v1 (stage B) | `code/original/booking_v1.py`, `report.md` §11 | week-05 |
| Bolt.new | GLM 5.3 Flash | web prototype v1 (stage B) | `web/original/`, `report.md` §§4, 11 | week-06 |
| Codex (desktop) | not displayed | critique (stage C), report drafting and review | `report.md` §§2, 5–11, 13; `AI_USAGE.md` | this SIS |
| Bolt.new | GLM 5.3 Flash | repairs (stage D) | `web/final/src/App.tsx`, `src/components/TimeInput.tsx`, `src/utils/time.ts`; `report.md` §§7, 11 | week-06 |
| Codex (desktop) | not displayed | copied the existing final function and test suite into SIS-03; copied the Week 06 final export | `code/booking.py`, `code/test_booking.py`, `web/final/` | week-05 / week-06 |

**The assistant wrote, or helped write, my tests in `code/`:** yes

Gemini suggested edge-case categories in Week 05; I designed the test cases and reused that suite here. Expected values were checked against AC1–AC5, including the half-open interval rule and unchanged-input requirement, rather than copied from the function output.

**`code/original/` and `web/original/` hold the AI's first versions exactly as returned:** yes

**Every result in report.md section 5 was actually run or seen, not assumed:** yes

**Everything I submitted, I can explain and defend in class — including the overlap condition and what the agent did in section 9:** yes

**Anything I accepted from the AI without fully understanding it:**
Nope

Signed: Ainakul Arnur
Date: 2026-11-01