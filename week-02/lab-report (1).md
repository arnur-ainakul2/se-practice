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

- Each prompt was sent in a **fresh chat**: yes / no
- No follow-up questions were asked before Part 7: yes / no
- Every output was saved **before** any editing: yes / no

---

## 2. Prompt A — minimal

**Prompt sent** (should be exactly one sentence):

```
Here's Python code to analyze student marks — it computes averages, highest/lowest scores, pass/fail counts, and grades:

python
def analyze_marks(students):
    """
    students: dict of {name: [marks]}
    Returns a summary dict per student plus class stats.
    """
    PASS_MARK = 40

    def grade(avg):
        if avg >= 90: return 'A+'
        elif avg >= 80: return 'A'
        elif avg >= 70: return 'B'
        elif avg >= 60: return 'C'
        elif avg >= 50: return 'D'
        elif avg >= PASS_MARK: return 'E'
        else: return 'F'

    results = {}
    class_averages = []

    for name, marks in students.items():
        total = sum(marks)
        avg = total / len(marks)
        highest = max(marks)
        lowest = min(marks)
        status = "Pass" if avg >= PASS_MARK else "Fail"

        results[name] = {
            "total": total,
            "average": round(avg, 2),
            "highest": highest,
            "lowest": lowest,
            "grade": grade(avg),
            "status": status
        }
        class_averages.append(avg)

    class_summary = {
        "class_average": round(sum(class_averages) / len(class_averages), 2),
        "top_student": max(results, key=lambda n: results[n]["average"]),
        "pass_count": sum(1 for r in results.values() if r["status"] == "Pass"),
        "fail_count": sum(1 for r in results.values() if r["status"] == "Fail"),
    }

    return results, class_summary


def print_report(results, class_summary):
    print(f"{'Name':<12}{'Total':<8}{'Avg':<8}{'High':<6}{'Low':<6}{'Grade':<7}{'Status':<7}")
    print("-" * 55)
    for name, r in results.items():
        print(f"{name:<12}{r['total']:<8}{r['average']:<8}{r['highest']:<6}{r['lowest']:<6}{r['grade']:<7}{r['status']:<7}")

    print("\nClass Summary")
    print("-" * 30)
    for k, v in class_summary.items():
        print(f"{k.replace('_', ' ').title()}: {v}")


# Example usage
if __name__ == "__main__":
    students = {
        "Alice": [85, 92, 78, 90],
        "Bob": [45, 39, 52, 48],
        "Charlie": [70, 65, 80, 75],
        "Diana": [95, 98, 91, 100],
    }

    results, class_summary = analyze_marks(students)
    print_report(results, class_summary)

This handles any number of students and subjects — just adjust the students dictionary (name → list of marks). Want me to extend it to read marks from a CSV file, or add plotting (e.g. a bar chart of averages)?
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
def analyze_marks(marks, pass_mark=50):
    if not marks:
        raise ValueError("marks must be a non-empty list")

    for m in marks:
        if isinstance(m, bool) or not isinstance(m, (int, float)):
            raise ValueError(f"non-numeric mark: {m!r}")
        if not 0 <= m <= 100:  # also rejects NaN, since comparisons with NaN are False
            raise ValueError(f"mark out of range (0-100): {m!r}")

    passed = sum(1 for m in marks if m >= pass_mark)
    return {
        "average": sum(marks) / len(marks),
        "highest": max(marks),
        "lowest": min(marks),
        "pass_rate": passed / len(marks) * 100,  # percentage of marks >= pass_mark
    }

Explanation

Validation first: the function checks for an empty list, then checks every value before computing anything. It raises ValueError with a message naming the offending value.
Non-numeric values: anything that isn't an int or float is rejected. bool is excluded explicitly, because True and False are technically integers in Python and would otherwise slip through as 1 and 0.
Range check: 0 <= m <= 100 accepts the full 0 to 100 range inclusive. Because comparisons with NaN are always false, NaN is rejected too.
Pass rate: this is the percentage of marks that are greater than or equal to pass_mark, so a mark exactly equal to the pass mark counts as a pass. If you'd prefer a fraction (0 to 1), drop the * 100.

Example

python
analyze_marks([45, 60, 75, 50, 90])
# {'average': 64.0, 'highest': 90, 'lowest': 45, 'pass_rate': 80.0}
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
| 1 | `analyze_marks([40, 60, 80], 50)` | avg 60 · high 80 · low 40 · rate 66.67 | | | | |
| 2 | `analyze_marks([100], 50)` | avg 100 · high 100 · low 100 · rate 100 | | | | |
| 3 | `analyze_marks([49.5, 50], 50)` | avg 49.75 · high 50 · low 49.5 · rate 50 | | | | |
| 4 | `analyze_marks([], 50)` | raises ValueError | | | | |
| 5 | `analyze_marks([40, "60"], 50)` | raises ValueError | | | | |
| 6 | `analyze_marks([-1, 50, 101], 50)` | raises ValueError | | | | |
| | **Totals** | | /6 | /6 | /6 | /6 |

**For every FAIL and ERROR above, one line: what was returned or raised instead.**

| Prompt | Case | What actually happened |
| --- | --- | --- |
| | | |
| | | |
| | | |

### Pasted terminal output — all four runs

> This is the part that makes the table above count. Paste the **whole** output, unedited,
> including the header lines. A table with nothing behind it is not accepted.

**Prompt A**

```

```

**Prompt B**

```

```

**Prompt C**

```

```

**Prompt D**

```

```

---

## 7. Scoring

0–2 per criterion, using the rubric in `README.md` Part 7.

| Criterion | A | B | C | D |
| --- | --- | --- | --- | --- |
| Correctness (cases passed) | | | | |
| Requirement coverage | | | | |
| Verifiability (tests) | | | | |
| Assumptions stated | | | | |
| Noise (2 = none) | | | | |
| **Total / 10** | | | | |

**Prompt length, in words:** A ____ · B ____ · C ____ · D ____

**Words added per point gained** — B over A, C over B, D over C. One line on what that ratio says:

---

## 8. Conclusion — 150–200 words

Answer in this order: (1) which prompt scored best, and whether it is the one you would actually
use at work; (2) which single addition bought the most correctness, naming the exact case that
changed verdict; (3) what was pure noise; (4) the ambiguity and your resolution.

Name test cases and real returned values. "More detailed prompts work better" scores zero.

```
(150–200 words)



```

**Word count:**

---

## 9. Two questions for the debrief

Written before class, answered in class.

1.
2.
