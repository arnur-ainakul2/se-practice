# Lab report — Practice #02: The Prompt Is an Engineering Input

**Name:*Ainakul Arnur*
**Group:*Monday 16:00*
**Date:*09/19/2026*

> Fill in every section. **Do not delete or renumber the headings** — the grading pass reads them
> by number. If something did not happen, write "did not happen" and why; an empty section and a
> fabricated one are graded the same way.

---

## 1. The frozen experiment

| | |
| --- | --- |
| AI assistant |Claude.ai |
| Exact model name |Sonnet 5|
| Implementation language |Python|
| Date of the runs |9/19/2026|

**Non-Python students only** — paste your substituted Prompt B text here, so the substitution can
be checked:

```
(paste here, or write "n/a — used Python")  n/a
```

**Confirmations:**

- Each prompt was sent in a **fresh chat**: yes
- No follow-up questions were asked before Part 7: yes 
- Every output was saved **before** any editing: yes 

---

## 2. Prompt A — minimal

**Prompt sent** (should be exactly one sentence):

```
Write Python code to analyze student marks.
```

**Assumptions the AI made that I never gave it** — list them, one per line. A data format, a pass
threshold, a rounding rule, an input method, an invented feature all count.

1. In this prompt ai agent decide use dict or map (key(name)->value(marks)) type as a input. And it built function for analyze. 
2.Mark grading system is a little bit different than traditional.The pass threshold is 40 (PASS_MARK = 40), and you never specified it.
The grade bands are 90/80/70/60/50/40, with grades A+, A, B, C, D, E, F. This is an invented, non-traditional scale.
3.Every student has at least one mark. An empty list would crash with ZeroDivisionError, and so would an empty class.
4.The class average is the mean of the student averages, not of all marks pooled together.
5.Only one top student is reported. Ties are silently broken by dict order.
6.The language is Python, with no input validation, no file or user input, and no error handling.

**Questions it should have asked and did not:**

1.What is the pass mark, and what are the grade boundaries? The AI invented a pass threshold of 40 and the bands A+/A/B/C/D/E/F at 90/80/70/60/50/40. Without your answer, the grading logic could be wrong for your school or course, and Pass/Fail depends entirely on it.
2.What should happen with edge cases: a student with no marks, invalid marks (negative, over 100, not a number), or two students tied for top? The code would crash on an empty list and silently pick whichever tied student comes first.

**Is the function named `analyze_marks` with the required signature?** yes / no — if no, what is it
called:No.
No name or signature was required. The AI invented analyze_marks(students) itself.

**First impression before testing** (one sentence — you will compare this with section 6 later):

---The code looks clean and readable and probably works on the sample data, but it rests on many invented assumptions (pass mark 40, grade bands, extra stats) and has no protection against empty lists or invalid marks.

## 3. Prompt B — structured context

**Prompt sent** (paste it in full, including any substitutions):

```
You are a Python developer. Implement analyze_marks(marks, pass_mark=50). Return
average, highest, lowest, and pass_rate in a dictionary. Accept marks from 0 to 100;
raise ValueError for an empty list, non-numeric values, or out-of-range values. Use
no external libraries. Return code plus a short explanation.
```

**What B fixed compared to A:**

1.Input validation. B rejects empty lists, non-numeric values, bool, out-of-range marks (not 0-100) and NaN, and raises ValueError with a clear message. A crashed on empty lists (ZeroDivisionError) and accepted any garbage.
2.Configurable pass mark. B has pass_mark=50 as a parameter. A hardcoded PASS_MARK = 40.
3.Removed invented features. B has no grade bands (A+ to F), no top student, no pass/fail counts, no class stats and no printed report.
**What B still leaves open:**

1.Pass mark default. pass_mark=50 is still invented. It is now changeable, but nobody asked for 50.
2.Mark scale. The 0-100 range is hardcoded, so marks on another scale (e.g. 0-20 or 0-10) are rejected.
3.Rounding. Values are not rounded, so average can have many decimals (e.g. 64.33333333333333).
4.pass_mark is not validated. A negative, over-100, or non-numeric pass_mark is accepted silently.
5.Error handling style. It raises ValueError and stops at the first bad mark. It does not skip bad values or report all of them.

---

## 4. Prompt C — examples and tests

**What I appended to Prompt B:**

```
I appended a worked example (analyze_marks([40, 60, 80], 50) gives average 60, highest 80, lowest 40, pass_rate 66.67), a list of required tests (one mark, decimals, custom pass_mark, empty list, text value, and marks below 0 or above 100), and a requirement to state any remaining assumptions before the code.
```

**Tests the AI wrote for itself** — how many, and which situations do they cover?

| Situation | Covered by the AI's tests? |
| --- | --- |
| one mark | Yes (test_one_mark_pass, test_one_mark_fail)|
| decimals | Yes (test_decimals)|
| custom pass_mark |Yes (test_custom_pass_mark) |
| empty list |Yes (test_empty_list) |
| text value |Yes (test_text_value) |
| below 0 / above 100 |Yes (test_below_zero, test_above_100) |

**Do the AI's own tests pass against the AI's own code?** yes / no
Yes

**Do they agree with the harness in section 6?** yes / no — if no, where do they disagree:
yes. The harness gives C 6/6 PASS, and the AI's own tests also pass, so there is no disagreement.

**Assumptions C stated explicitly before the code:**

---1.pass_rate is a percentage (0-100), rounded to 2 decimals, and a mark passes if it is >= pass_mark.
2.average is also rounded to 2 decimals (so 60 comes back as 60.0), while highest and lowest are returned as given.
3.bool is rejected as non-numeric (it is technically an int in Python), and NaN/inf are rejected as out of range.
4.pass_mark is validated the same way as marks (numeric, 0-100).
5.marks must be a list or tuple; anything else raises ValueError.

## 5. Prompt D — my combined prompt

**The complete prompt I wrote** (one message, sent to a fresh chat):

```
You are a Python developer. Implement analyze_marks(marks, pass_mark=50) using only the Python standard library (no external libraries).

INPUT
- marks: a list or tuple of numbers (int or float), each from 0 to 100 inclusive. Any other container type raises ValueError.
- pass_mark: a number from 0 to 100 inclusive, default 50. It is validated the same way as marks.
- All marks have equal weight. Do not add grades, student names, class statistics, printing, or any other feature I did not ask for.

RETURN
A dict with exactly these keys:
- "average": mean of marks, rounded to 2 decimals (so 60 is returned as 60.0)
- "highest": the largest mark, returned as given (not rounded)
- "lowest": the smallest mark, returned as given (not rounded)
- "pass_rate": percentage (0-100) of marks that are >= pass_mark, rounded to 2 decimals. A mark exactly equal to pass_mark counts as a pass.

VALIDATION (raise ValueError with a clear message naming the bad value)
- empty list or tuple
- non-numeric values, including strings such as "60" (do not convert them)
- bool values (True/False) are rejected as non-numeric
- NaN and inf are rejected
- values below 0 or above 100
- invalid pass_mark (non-numeric, bool, NaN, inf, or outside 0-100)
- Validate everything before computing anything. Stop at the first invalid value.

WORKED EXAMPLE
analyze_marks([40, 60, 80], 50) -> {"average": 60.0, "highest": 80, "lowest": 40, "pass_rate": 66.67}

TESTS (use unittest, and make them runnable with `python file.py`)
Include tests for: the worked example, one mark (pass and fail), decimals (e.g. [50.5, 49.5, 70.25]), custom pass_mark (e.g. 70 and 40), empty list, text value (e.g. "abc" and "60"), below 0, above 100, boundary values 0 and 100 accepted, bool and NaN rejected, invalid pass_mark, and a non-list input such as a string or dict.

OUTPUT FORMAT
1. First, a short list of any remaining assumptions you made that are not covered above.
2. Then one code block with the function and the tests.
3. Then a short explanation (5 sentences max).
```

**What I deliberately added that A, B and C did not have:**

1.Explicit resolutions for every ambiguity found in Parts 2-4. Equal weighting of marks, the default pass_mark=50, the 0-100 scale, pass_rate as a percentage rounded to 2 decimals, and "stop at the first invalid value" are all stated in the prompt instead of being left for the AI to guess.
2.Exact behavior for tricky inputs. Strings such as "60" must be rejected (not converted), bool and NaN/inf are rejected, pass_mark is validated like marks, and any non-list/tuple input (string, dict, generator, None) raises ValueError.
3.A ban on invented features and a fixed output format. No grades, names, class stats or printing; the answer must come as assumptions first, then one code block, then a short explanation (5 sentences max). C only asked for assumptions before the code.

**The ambiguity I found in the specification, and how I resolved it inside Prompt D:**

---
The specification did not say what pass_rate means, so it could be read as a fraction (0 to 1), as a percentage (0 to 100), or as a pass/fail decision based on the average, and it did not say whether a mark exactly equal to pass_mark passes or how many decimals to return. In Prompt D I resolved it by stating that pass_rate is the percentage (0-100) of marks that are >= pass_mark, rounded to 2 decimals, so a mark equal to pass_mark counts as a pass, and I added the worked example analyze_marks([40, 60, 80], 50) giving pass_rate 66.67 to make the format unambiguous.

## 6. Test results — the evidence

Six cases × four prompts. Verdicts are **PASS**, **FAIL** or **ERROR** only.

| # | Call | Required | A | B | C | D |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `analyze_marks([40, 60, 80], 50)` | avg 60 · high 80 · low 40 · rate 66.67 | ERROR | PASS | PASS | PASS |
| 2 | `analyze_marks([100], 50)` | avg 100 · high 100 · low 100 · rate 100 | ERROR | PASS | PASS | PASS |
| 3 | `analyze_marks([49.5, 50], 50)` | avg 49.75 · high 50 · low 49.5 · rate 50 | ERROR | PASS | PASS | PASS |
| 4 | `analyze_marks([], 50)` | raises ValueError | ERROR | PASS | PASS | PASS |
| 5 | `analyze_marks([40, "60"], 50)` | raises ValueError | ERROR | PASS | PASS | PASS |
| 6 | `analyze_marks([-1, 50, 101], 50)` | raises ValueError | ERROR | PASS | PASS | PASS |
| | **Totals** | | 0/6 | 6/6 | 6/6 | 6/6 |

**For every FAIL and ERROR above, one line: what was returned or raised instead.**

*For every FAIL and ERROR above, one line: what was returned or raised instead.**

| Prompt | Case | What actually happened |
| --- | --- | --- |
| A | 1 | Raised `TypeError: analyze_marks() takes 1 positional argument but 2 were given` instead of returning the required values |
| A | 2 | Raised `TypeError: analyze_marks() takes 1 positional argument but 2 were given` instead of returning the required values |
| A | 3 | Raised `TypeError: analyze_marks() takes 1 positional argument but 2 were given` instead of returning the required values |
| A | 4 | Raised `TypeError` instead of `ValueError`: analyze_marks() takes 1 positional argument but 2 were given |
| A | 5 | Raised `TypeError` instead of `ValueError`: analyze_marks() takes 1 positional argument but 2 were given |
| A | 6 | Raised `TypeError` instead of `ValueError`: analyze_marks() takes 1 positional argument but 2 were given |

### Pasted terminal output — all four runs

> This is the part that makes the table above count. Paste the **whole** output, unedited,
> including the header lines. A table with nothing behind it is not accepted.

**Prompt A**

```
========================================================================
analyze_marks harness — code/prompt_a.py
tolerance for numeric comparison: 0.01
========================================================================
SIGNATURE: ok
------------------------------------------------------------------------
case 1  ERROR  analyze_marks([40, 60, 80], 50)
          expect: average=60.0, highest=80, lowest=40, pass_rate=66.67
          got   : raised TypeError: analyze_marks() takes 1 positional argument but 2 were given
------------------------------------------------------------------------
case 2  ERROR  analyze_marks([100], 50)
          expect: average=100.0, highest=100, lowest=100, pass_rate=100.0
          got   : raised TypeError: analyze_marks() takes 1 positional argument but 2 were given
------------------------------------------------------------------------
case 3  ERROR  analyze_marks([49.5, 50], 50)
          expect: average=49.75, highest=50, lowest=49.5, pass_rate=50.0
          got   : raised TypeError: analyze_marks() takes 1 positional argument but 2 were given
------------------------------------------------------------------------
case 4  ERROR  analyze_marks([], 50)
          expect: ValueError
          got   : raised TypeError instead of ValueError: analyze_marks() takes 1 positional argument but 2 were given
------------------------------------------------------------------------
case 5  ERROR  analyze_marks([40, '60'], 50)
          expect: ValueError
          got   : raised TypeError instead of ValueError: analyze_marks() takes 1 positional argument but 2 were given
------------------------------------------------------------------------
case 6  ERROR  analyze_marks([-1, 50, 101], 50)
          expect: ValueError
          got   : raised TypeError instead of ValueError: analyze_marks() takes 1 positional argument but 2 were given
------------------------------------------------------------------------
RESULT  0 PASS · 0 FAIL · 6 ERROR   (code/prompt_a.py)
========================================================================
```

**Prompt B**

```
========================================================================
analyze_marks harness — code/prompt_b.py
tolerance for numeric comparison: 0.01
========================================================================
SIGNATURE: ok
------------------------------------------------------------------------
case 1  PASS   analyze_marks([40, 60, 80], 50)
          expect: average=60.0, highest=80, lowest=40, pass_rate=66.67
          got   : average=60.0, highest=80, lowest=40, pass_rate=66.66666666666666
------------------------------------------------------------------------
case 2  PASS   analyze_marks([100], 50)
          expect: average=100.0, highest=100, lowest=100, pass_rate=100.0
          got   : average=100.0, highest=100, lowest=100, pass_rate=100.0
------------------------------------------------------------------------
case 3  PASS   analyze_marks([49.5, 50], 50)
          expect: average=49.75, highest=50, lowest=49.5, pass_rate=50.0
          got   : average=49.75, highest=50, lowest=49.5, pass_rate=50.0
------------------------------------------------------------------------
case 4  PASS   analyze_marks([], 50)
          expect: ValueError
          got   : raised ValueError: marks must be a non-empty list
------------------------------------------------------------------------
case 5  PASS   analyze_marks([40, '60'], 50)
          expect: ValueError
          got   : raised ValueError: non-numeric mark: '60'
------------------------------------------------------------------------
case 6  PASS   analyze_marks([-1, 50, 101], 50)
          expect: ValueError
          got   : raised ValueError: mark out of range (0-100): -1
------------------------------------------------------------------------
RESULT  6 PASS · 0 FAIL · 0 ERROR   (code/prompt_b.py)
========================================================================
```

**Prompt C**

```
========================================================================
analyze_marks harness — code/prompt_c.py
tolerance for numeric comparison: 0.01
========================================================================
SIGNATURE: ok
------------------------------------------------------------------------
case 1  PASS   analyze_marks([40, 60, 80], 50)
          expect: average=60.0, highest=80, lowest=40, pass_rate=66.67
          got   : average=60.0, highest=80, lowest=40, pass_rate=66.67
------------------------------------------------------------------------
case 2  PASS   analyze_marks([100], 50)
          expect: average=100.0, highest=100, lowest=100, pass_rate=100.0
          got   : average=100.0, highest=100, lowest=100, pass_rate=100.0
------------------------------------------------------------------------
case 3  PASS   analyze_marks([49.5, 50], 50)
          expect: average=49.75, highest=50, lowest=49.5, pass_rate=50.0
          got   : average=49.75, highest=50, lowest=49.5, pass_rate=50.0
------------------------------------------------------------------------
case 4  PASS   analyze_marks([], 50)
          expect: ValueError
          got   : raised ValueError: marks must not be empty
------------------------------------------------------------------------
case 5  PASS   analyze_marks([40, '60'], 50)
          expect: ValueError
          got   : raised ValueError: mark must be numeric, got '60'
------------------------------------------------------------------------
case 6  PASS   analyze_marks([-1, 50, 101], 50)
          expect: ValueError
          got   : raised ValueError: mark must be between 0 and 100, got -1
------------------------------------------------------------------------
RESULT  6 PASS · 0 FAIL · 0 ERROR   (code/prompt_c.py)
========================================================================
```

**Prompt D**

```
========================================================================
analyze_marks harness — code/prompt_d.py
tolerance for numeric comparison: 0.01
========================================================================
SIGNATURE: ok
------------------------------------------------------------------------
case 1  PASS   analyze_marks([40, 60, 80], 50)
          expect: average=60.0, highest=80, lowest=40, pass_rate=66.67
          got   : average=60.0, highest=80, lowest=40, pass_rate=66.67
------------------------------------------------------------------------
case 2  PASS   analyze_marks([100], 50)
          expect: average=100.0, highest=100, lowest=100, pass_rate=100.0
          got   : average=100.0, highest=100, lowest=100, pass_rate=100.0
------------------------------------------------------------------------
case 3  PASS   analyze_marks([49.5, 50], 50)
          expect: average=49.75, highest=50, lowest=49.5, pass_rate=50.0
          got   : average=49.75, highest=50, lowest=49.5, pass_rate=50.0
------------------------------------------------------------------------
case 4  PASS   analyze_marks([], 50)
          expect: ValueError
          got   : raised ValueError: marks must not be empty
------------------------------------------------------------------------
case 5  PASS   analyze_marks([40, '60'], 50)
          expect: ValueError
          got   : raised ValueError: marks[1] must be a number, got str: '60'
------------------------------------------------------------------------
case 6  PASS   analyze_marks([-1, 50, 101], 50)
          expect: ValueError
          got   : raised ValueError: marks[0] must be between 0 and 100, got -1
------------------------------------------------------------------------
RESULT  6 PASS · 0 FAIL · 0 ERROR   (code/prompt_d.py)
========================================================================
```

---

## 7. Scoring

| Criterion | A | B | C | D |
| --- | --- | --- | --- | --- |
| Correctness (cases passed) | 0 (0/6) | 2 (6/6) | 2 (6/6) | 2 (6/6) |
| Requirement coverage | 0 | 2 | 2 | 2 |
| Verifiability (tests) | 0 | 0 | 2 | 2 |
| Assumptions stated | 0 | 1 | 2 | 2 |
| Noise (2 = none) | 0 | 2 | 2 | 2 |
| **Total / 10** | **0** | **7** | **10** | **10** |

**Prompt length, in words:** A 7 · B 44 · C 84 · D ≈324

**Words added per point gained** — B over A: 37 words / 7 points ≈ 5.3 · C over B: 40 words / 3 points ≈ 13.3 · D over C: 240 words / 0 points (no gain). The ratio shows that B's extra 37 words (signature, keys, validation rules) were the best value, because they took the score from 0 to 7. C's extra 40 words (example, test list, "state assumptions") bought 3 more points at a higher price per point, and D's extra 240 words bought no points because the rubric was already maxed out at 10.

---
---

## 8. Conclusion — 150–200 words

Answer in this order: (1) which prompt scored best, and whether it is the one you would actually
use at work; (2) which single addition bought the most correctness, naming the exact case that
changed verdict; (3) what was pure noise; (4) the ambiguity and your resolution.

Name test cases and real returned values. "More detailed prompts work better" scores zero.

```
(150–200 words)


Prompts C and D both scored 10/10, but I would use D at work. It returns the same correct values as C on all six cases (case 1 gives average 60.0, pass_rate 66.67), and it also fixes the details the rubric cannot see: errors name the index (`marks[1] must be a number, got str: '60'`) and non-list input is rejected. The single addition that bought the most correctness was B's signature and rules over A: every case changed from ERROR to PASS, because A raised `TypeError: analyze_marks() takes 1 positional argument but 2 were given` on all six calls, while B returned average 60.0 and raised ValueError on `[]`, `[40, "60"]` and `[-1, 50, 101]`. Pure noise was in A: grades A+ to F, a printed report, top student and pass/fail counts, none of which was requested. D's extra 240 words gained 0 points, because the rubric was capped at 10. The ambiguity was what `pass_rate` means: a fraction, a percentage or a pass/fail decision. I resolved it in D as the percentage of marks >= pass_mark, rounded to 2 decimals, so B's 66.66666666666666 became 66.67.

```

**Word count:**
190
---

## 9. Two questions for the debrief

Written before class, answered in class.

1. Prompt D gained 0 points over C because the rubric caps at 10. What rubric criterion would you add so that D's real improvements (error messages with the index, `math.fsum`, tests for non-list input and invalid `pass_mark`) are actually scored?
2. B scored 6/6 with only 44 words and no tests, yet C and D added tests and explicit assumptions. If the harness cases are the only thing that decides "correct", how do we know a passing prompt is safe on inputs the harness never sends, such as `[True]`, `[float("nan")]` or a tuple?