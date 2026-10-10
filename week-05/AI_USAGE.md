# AI Usage Disclosure — Week 05

Required by the course academic policy (Generative AI use level **D — AI-integrated**).
You are responsible for the accuracy, testing and integrity of everything you submit,
including anything an AI tool produced.

| Tool | Exact model / plan | Used for | Which files it touched |
| --- | --- | --- | --- |
| Gemini | Gemini Flash 3.6 | the plan (Task 1) | `lab-report.md` |
| Gemini | Gemini Flash 3.6 | the first version, v1 (Task 2) | `code/original/booking_v1.py`, `code/booking.py` |
| Gemini | Gemini Flash 3.6 | code review critique (Task 5) | `lab-report.md` |

**The assistant wrote, or helped write, my tests in `code/`:** yes
<!-- Either answer is allowed. If "yes": say which tests, and how you checked that their EXPECTED
     values come from AC1–AC5 and not from what the generated code happens to return. -->
The assistant suggested edge-case categories (boundary times, interval touching, input immutability). I independently designed the 16 test cases in `code/test_booking.py` and manually verified that all expected `True`/`False` return values were strictly derived from the AC1–AC5 specifications (e.g., verifying half-open interval rules $[start, end)$ for AC4 independently of code execution).

**`code/original/` holds the assistant's first answer exactly as returned:** yes

**Everything I submitted, I can explain and defend in class — including the overlap condition:** yes

**Anything I accepted from the AI without fully understanding it:**
none

Signed: Ainakul Arnur
Date:10/10/2026
