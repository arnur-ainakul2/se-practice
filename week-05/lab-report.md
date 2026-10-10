# Week 05 — Lab report

**Name:*Ainakul Arnur*
**Group:*Monday 16:00*
**Date:*10/10/2026*

Fill in every section. **Do not delete, rename or renumber the headings** — the checker and the
grader find your answers by them. Add rows to any table; never remove its header.

---

## 1. Setup

| | |
| --- | --- |
| Assistant (tool) | Gemini |
| **Exact** model name | Gemini Flash 3.6 |
| Language and version | Python 3.14.7 |
| Path | A | 
| My Week 04 declaration for touching bookings | allowed |

<!-- If your Week 04 model said touching bookings are NOT allowed: AC4 now says they are.
     One sentence here on what that changes in your Week 04 diagrams. This is a finding, not a penalty. -->

---

## 2. Task 1 — the plan

**The assistant's plan, pasted unedited:**

```text
Here is the short implementation plan, ordering of checks, assumptions, and suggested boundary cases based strictly on your specification.Implementation Plan & Check OrderTo ensure efficiency and early exits, validation checks should be ordered from simple scalar inputs to iterable interval comparisons:Check AC3 (Room Status): Verify blocked is False.Check AC1 (Basic Time Constraints):Verify 0 <= start < end <= 1440.Verify start > now.Check AC2 (Duration Limit): Verify (end - start) <= 120.Check AC4 (Overlap Check): Iterate through existing bookings (b_start, b_end) and ensure no overlap occurs:Overlap occurs if start < b_end and end > b_start.If any existing interval overlaps, return False.Decision (AC5): If all checks pass without returning False, return True.AssumptionsInput Types: start, end, and now are integers; blocked is a Boolean; existing is an iterable (e.g., list or tuple) of (int, int) tuples.Pre-validated Entrants: Per the contract, now is strictly between 0 and 1439, and all tuples in existing are valid active bookings for the room on the same date.Immutability: Inputs are treated as read-only, ensuring no side effects or mutations to existing.Boundary Cases to TestBoundary ScenarioInputs / ContextExpected OutcomeReasonMinimum valid startstart = now + 1Depends on other ACsstart > now requirement (strict inequality).Same-time bookingstart = nowFalseViolates AC1 (start must be strictly greater than now).Maximum end timeend = 1440 (24:00)Valid if start >= 1320Tests upper limit boundary of AC1.Maximum durationend - start = 120ValidTests exact boundary of AC2.Exceeded durationend - start = 121FalseViolates AC2 limit.Zero/Negative durationstart >= endFalseViolates AC1 (start < end).Endpoint touching (Left)Proposed [100, 120), Existing [80, 100)TrueHalf-open interval [start, end) allows touching endpoints.Endpoint touching (Right)Proposed [100, 120), Existing [120, 140)TrueBoundary touches without overlapping.1-minute overlapProposed [100, 121), Existing [120, 140)FalseOverlaps by 1 minute (120).Enclosing intervalProposed [100, 200), Existing [110, 150)FalseProposed booking completely spans existing booking.Enclosed intervalProposed [110, 150), Existing [100, 200)FalseProposed booking is inside existing booking.Empty existing listexisting = []True (if AC1-AC3 pass)Verifies behavior when no active bookings exist.
```

**What the plan invented or changed.** One row for every rule in the plan that is not in the
contract or in AC1–AC5, or that says something different from them. If you found none, write one
row saying which lines of the plan you checked against which AC.

| # | What the plan said | What the contract or the AC says | What I did |
| --- | --- | --- | --- |
| 1 | Checks 1–5 in the plan strictly check `blocked`, `0 <= start < end <= 1440`, `start > now`, `(end - start) <= 120`, and interval overlap `start < b_end and end > b_start`. | Contract & AC1–AC5 require exact status, time range, max 120m duration, non-overlapping intervals, and keeping inputs unchanged. | Checked steps 1–5 against AC1–AC5; kept the entire plan as no extra business rules or invalid constraints were added. |

---

### Boundary cases the assistant suggested that I kept as tests

- **Minimum valid start:** `start = now + 1` (Verify strict inequality `start > now`).
- **Same-time booking:** `start = now` (Expected: `False`).
- **Maximum end time:** `end = 1440` (Expected: `True` if within limits).
- **Maximum duration boundary:** `end - start = 120` (Expected: `True`).
- **Exceeded duration:** `end - start = 121` (Expected: `False`).
- **Zero/Negative duration:** `start >= end` (Expected: `False`).
- **Endpoint touching (Left & Right):** Proposed `[100, 120)` with existing `[80, 100)` or `[120, 140)` (Expected: `True`).
- **1-minute overlap:** Proposed `[100, 121)` with existing `[120, 140)` (Expected: `False`).
- **Enclosing & Enclosed intervals:** Overlapping fully inside or surrounding an existing booking (Expected: `False`).
- **Empty existing list:** `existing = []` (Expected: `True` if AC1–AC3 hold).
---

## 3. Task 2 — the first version (v1), read before it was run

v1 is saved as `code/original/booking_v1.py`, exactly as the assistant returned it: yes

**AC map.** One row per condition in v1. Quote the line.

| # | Line in v1 | AC it implements | Correct as written? If not, why |
| --- | --- | --- | --- |
| 1 | `if blocked:` | AC3 | Yes. Returns `False` immediately if the room is flagged as blocked. |
| 2 | `if not (0 <= start < end <= 1440 and start > now):` | AC1 | Yes. Correctly enforces lower/upper bounds, non-zero positive duration, and `start > now`. |
| 3 | `if (end - start) > 120:` | AC2 | Yes. Correctly restricts maximum booking duration to 120 minutes (2 hours). |
| 4 | `for b_start, b_end in existing:`<br>`if start < b_end and end > b_start:` | AC4 | Yes. Accurately detects overlaps for half-open intervals `[start, end)` while allowing touching endpoints. |
| 5 | `return True` | AC5 | Yes. Executes only after all checks pass and leaves `existing` unmodified. |

**Anything in v1 that no AC asks for** (extra validation, a buffer between bookings, logging, saving the booking, a different return type):

- None. The assistant adhered strictly to the supplied acceptance criteria without adding extra buffers, logging, input mutations, or unrequested validation logic.
---

## 4. Task 3 — my tests

Base input for every row unless the row says otherwise: `now=540, blocked=False, existing=[(600, 660)]`.

| # | Test name | Request (start, end) | What differs from the base input | Expected | AC | Result on v1 | Result on final |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | | | | | | | |
| 2 | | | | | | | |
| 3 | | | | | | | |
| 4 | | | | | | | |
| 5 | | | | | | | |
| 6 | | | | | | | |
| 7 | | | | | | | |
| 8 | | | | | | | |
| 9 | | | | | | | |
| 10 | | | | | | | |
| 11 | | | | | | | |

---

## 5. Task 4 — debugging with evidence

One row per defect you found — in v1, in a later version, or in your own tests. If v1 passed
everything, the row is the **new edge case you added**, with expected and actual equal, and the
cause column says why no change was needed.

| # | Input (the full call) | Expected | Actual | Cause (quote the line) | Fix | Who proposed the fix |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | | | | | | |

**The debug prompt I sent, and the assistant's answer** (leave the block empty if you did not use it):

```text
```

---

## 6. Task 5 — the critique

**The assistant's critique, pasted unedited:**

```text
(paste here)
```

| # | Suggestion | accept / reject | Reason — cite the AC or the contract line | Suite after the change |
| --- | --- | --- | --- | --- |
| 1 | | accept / reject | | |
| 2 | | accept / reject | | |

---

## 7. Change log — v1 to final

| # | What changed (the line, before → after) | Why | Evidence: the test or check that moved |
| --- | --- | --- | --- |
| 1 | | | |

---

## 8. Evidence — real output

### 8.1 My suite, final run

Paste the **complete** terminal output. For Python: everything `python -m unittest -v` printed.

```text
(paste here)
```

### 8.2 The checker, final run

Paste the **complete** output of `python tests/check_booking.py`. Paste it **last**: if you edit
this file afterwards, run the checker again and paste again.

```text
(paste here)
```

### 8.3 Path B only — three faults I planted myself

Break your own function on purpose, one line at a time, run your suite, restore the line.

| # | Line I changed (before → after) | AC it breaks | Test that failed |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |

The three failing runs (Path A students leave this block empty):

```text
```

---

## 9. What still fails, and what the contract does not say

### 9.1 Checks I am keeping as FAIL or ERROR

The same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check | Why it stays |
| --- | --- |
| | |

### 9.2 Outside the contract

The contract says times are integers. It does not say what `can_book` does when one is not —
`600.5`, or the string `"600"`. What does **your** function do, and why is that the right call?

-

### 9.3 A bound that never decides

One of the bounds written in AC1 can never be the *only* reason a request is rejected. Which one,
and why?

-

---

## 10. Conclusion (120–180 words)

<!-- Answer all three, in your own words, without the assistant:
     (a) Explain the overlap condition in your final code — why those two comparisons, and why
         they let touching bookings through.
     (b) Which fault did your tests miss the longest, and what did the missing test have in common
         with the ones you already had?
     (c) What did you have to decide that neither the contract nor the assistant decided for you?
     Worthless: "the AI made a mistake and I fixed it."
     Worth everything: "F7 failed on can_book(570, 600, ...): v1 compared with <= on the start
     side, so a booking that ends exactly when another begins was rejected." -->

<!-- Write your conclusion below this line -->
