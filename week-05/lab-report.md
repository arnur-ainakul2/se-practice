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

Here is the short implementation plan, ordering of checks, assumptions, and suggested boundary cases based strictly on your specification.

Implementation Plan & Check Order
To ensure efficiency and early exits, validation checks should be ordered from simple scalar inputs to iterable interval comparisons:
1. Check AC3 (Room Status): Verify blocked is False.
2. Check AC1 (Basic Time Constraints):
  - Verify 0 <= start < end <= 1440.
  - Verify start > now.
3. Check AC2 (Duration Limit): Verify (end - start) <= 120.
4. Check AC4 (Overlap Check): Iterate through existing bookings (b_start, b_end) and ensure no overlap occurs:
  - Overlap occurs if start < b_end and end > b_start.
  - If any existing interval overlaps, return False.
5. Decision (AC5): If all checks pass without returning False, return True.

Assumptions
1. Input Types: start, end, and now are integers; blocked is a Boolean; existing is an iterable (e.g., list or tuple) of (int, int) tuples.
2. Pre-validated Entrants: Per the contract, now is strictly between 0 and 1439, and all tuples in existing are valid active bookings for the room on the same date.
3. Immutability: Inputs are treated as read-only, ensuring no side effects or mutations to existing.
```
### What the plan invented or changed

| # | What the plan said | What the contract or the AC says | What I did |
| --- | --- | --- | --- |
| 1 | Checks 1–5 in the plan check blocked, 0 <= start < end <= 1440, start > now, (end - start) <= 120, and interval overlap start < b_end and end > b_start. | Contract & AC1–AC5 require exact status, time range, max 120m duration, non-overlapping intervals, and keeping inputs unchanged. | Checked steps 1–5 against AC1–AC5; kept the entire plan as no extra business rules or invalid constraints were added. |

### Boundary cases the assistant suggested that I kept as tests

- Minimum valid start: start = now + 1
- Same-time booking: start = now
- Maximum end time: end = 1440
- Maximum duration boundary: end - start = 120
- Exceeded duration: end - start = 121
- Zero/Negative duration: start >= end
- Endpoint touching (Left & Right): Proposed [100, 120) with existing [80, 100) or [120, 140)
- 1-minute overlap: Proposed [100, 121) with existing [120, 140)
- Enclosing & Enclosed intervals: Overlapping fully inside or surrounding an existing booking
- Empty existing list: existing = []

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

| # | Test name | What it targets (AC / boundary / edge case) | Inputs | Expected |
| --- | --- | --- | --- | --- |
| 1 | `test_touching_end_is_allowed` | AC4 (touching endpoint boundary) | (660, 720, 540, False, [(600, 660)]) | `True` |
| 2 | `test_partial_overlap_rejected` | AC4 (partial interval overlap) | (630, 690, 540, False, [(600, 660)]) | `False` |
| 3 | `test_blocked_room_rejected` | AC3 (blocked room) | (660, 720, 540, True, [(600, 660)]) | `False` |
| 4 | `test_exactly_two_hours_allowed` | AC2 (max duration boundary - 120m) | (720, 840, 540, False, [(600, 660)]) | `True` |
| 5 | `test_over_two_hours_rejected` | AC2 (exceeded duration - 121m) | (720, 841, 540, False, [(600, 660)]) | `False` |
| 6 | `test_starts_now_rejected` | AC1 (start equals now) | (540, 570, 540, False, [(600, 660)]) | `False` |
| 7 | `test_zero_length_duration_rejected` | AC1 (zero duration start == end) | (660, 660, 540, False, [(600, 660)]) | `False` |
| 8 | `test_reversed_times_rejected` | AC1 (start > end) | (720, 660, 540, False, [(600, 660)]) | `False` |
| 9 | `test_day_bound_upper_limit_allowed` | AC1 (end == 1440 upper bound) | (1320, 1440, 540, False, [(600, 660)]) | `True` |
| 10 | `test_day_bound_exceeded_rejected` | AC1 (end > 1440) | (1380, 1441, 540, False, [(600, 660)]) | `False` |
| 11 | `test_empty_existing_allowed` | AC4 (empty existing list) | (660, 720, 540, False, []) | `True` |
| 12 | `test_multiple_existing_overlap_rejected` | AC4 (multiple existing bookings overlap) | (750, 810, 540, False, [(600, 660), (780, 840)]) | `False` |
| 13 | `test_existing_input_not_mutated` | AC5 (input list immutability) | (660, 720, 540, False, [(600, 660), (720, 780)]) | `True` |
| 14 | `test_enclosed_overlap_rejected` | AC4 (proposed inside existing) | (615, 645, 540, False, [(600, 660)]) | `False` |
| 15 | `test_enclosing_overlap_spans_existing_rejected` | AC4 (proposed spans existing) | (570, 690, 540, False, [(600, 660)]) | `False` |
| 16 | `test_existing_elements_not_mutated_during_checks` | AC5 (mutant M10 element identity check) | (630, 690, 540, False, [(600, 660), (700, 760)]) | `False` |
| 17 | `test_every_return_path_is_a_real_bool_and_input_untouched` | AC5 (subtests for all return paths & unsorted lists) | Multiple inputs & unsorted lists | `True`/`False` |
| 18 | `test_empty_list_stays_empty_after_an_accepted_booking` | AC5 (empty list non-mutation) | (660, 720, 540, False, []) | `True` |
---

## 5. Task 4 — debugging with evidence

One row per defect you found — in v1, in a later version, or in your own tests. If v1 passed everything, the row is the **new edge case you added**, with expected and actual equal, and the cause column says why no change was needed.

| # | Input (the full call) | Expected | Actual | Cause (quote the line) | Fix | Who proposed the fix |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `can_book(570, 690, 540, False, [(600, 660)])` | `False` | `False` | v1 passed: `if start < b_end and end > b_start:` correctly handles enclosing overlaps ($570 < 660$ and $690 > 600$). | No fix needed. | N/A |

**The debug prompt I sent, and the assistant's answer** (leave the block empty if you did not use it):

```text

---

## 6. Task 5 — the critique


```
Assistant's critique of code/booking.py (verbatim):
1. Issue 1: Missing runtime type validation for scalar inputs (start, end, now).
2. Issue 2: Iterating over existing assumes it is always a non-None iterable of (int, int) tuples without explicit defensive checks.
```

### What I decided

| # | Suggestion | accept / reject | Reason — cite the AC or the contract line | Suite after the change |
| --- | --- | --- | --- | --- |
| 1 | Add runtime type checking | reject | Contract Line: Assumptions state inputs are pre-validated. AC5 requires pure Boolean return. | 18/18 PASS |
| 2 | Add None check for existing | reject | Contract guarantees valid input types. Defensive checks violate AC5 pure Boolean requirement. | 18/18 PASS |


## 7. Change log — v1 to final

| # | What changed (the line, before → after) | Why | Evidence: the test or check that moved |
| --- | --- | --- | --- |
| 1 | No code changes made (`booking_v1.py` → `booking.py`) | Version v1 fully satisfies all acceptance criteria (AC1–AC5) and passes all unit and mutant tests without defect. | All 18 unit tests passed; F1–F10 checks passed on v1. |

---

## 8. Evidence — real output

### 8.1 My suite, final run

Paste the **complete** terminal output. For Python: everything `python -m unittest -v` printed.

```text
PS C:\Users\ARnur\Desktop\software enginering\se-practice\week-05\code> python -m unittest -v test_booking.py      
test_blocked_room_rejected (test_booking.BookingTests.test_blocked_room_rejected) ... ok
test_day_bound_exceeded_rejected (test_booking.BookingTests.test_day_bound_exceeded_rejected) ... ok
test_day_bound_upper_limit_allowed (test_booking.BookingTests.test_day_bound_upper_limit_allowed) ... ok
test_empty_existing_allowed (test_booking.BookingTests.test_empty_existing_allowed) ... ok
test_empty_list_stays_empty_after_an_accepted_booking (test_booking.BookingTests.test_empty_list_stays_empty_after_an_accepted_booking) ... ok
test_enclosed_overlap_rejected (test_booking.BookingTests.test_enclosed_overlap_rejected) ... ok
test_enclosing_overlap_spans_existing_rejected (test_booking.BookingTests.test_enclosing_overlap_spans_existing_rejected) ... ok
test_every_return_path_is_a_real_bool_and_input_untouched (test_booking.BookingTests.test_every_return_path_is_a_real_bool_and_input_untouched) ... ok
test_exactly_two_hours_allowed (test_booking.BookingTests.test_exactly_two_hours_allowed) ... ok
test_existing_elements_not_mutated_during_checks (test_booking.BookingTests.test_existing_elements_not_mutated_during_checks) ... ok
test_existing_input_not_mutated (test_booking.BookingTests.test_existing_input_not_mutated) ... ok
test_multiple_existing_overlap_rejected (test_booking.BookingTests.test_multiple_existing_overlap_rejected) ... ok
test_over_two_hours_rejected (test_booking.BookingTests.test_over_two_hours_rejected) ... ok
test_partial_overlap_rejected (test_booking.BookingTests.test_partial_overlap_rejected) ... ok
test_reversed_times_rejected (test_booking.BookingTests.test_reversed_times_rejected) ... ok
test_starts_now_rejected (test_booking.BookingTests.test_starts_now_rejected) ... ok
test_touching_end_is_allowed (test_booking.BookingTests.test_touching_end_is_allowed) ... ok
test_zero_length_duration_rejected (test_booking.BookingTests.test_zero_length_duration_rejected) ... ok

----------------------------------------------------------------------
Ran 18 tests in 0.032s

OK
```

### 8.2 The checker, final run

Paste the **complete** output of `python tests/check_booking.py`. Paste it **last**: if you edit
this file afterwards, run the checker again and paste again.

```text
PS C:\Users\ARnur\Desktop\software enginering\se-practice\week-05> python tests/check_booking.py        
Week 05 - can_book: the function, your tests, the evidence   (Path A)

PASS   F1   the six cases from the task table           6 of 6 cases
PASS   F2   AC1 time order and day bounds               5 of 5 cases
PASS   F3   AC1 the start is in the future              5 of 5 cases
PASS   F4   AC2 at most 120 minutes                     3 of 3 cases
PASS   F5   AC3 a blocked room accepts nothing          2 of 2 cases
PASS   F6   AC4 every kind of overlap is rejected       5 of 5 cases
PASS   F7   AC4 touching endpoints are allowed          3 of 3 cases
PASS   F8   AC4 every existing booking is checked       4 of 4 cases
PASS   F9   AC5 the result is a real Boolean            3 of 3 cases
PASS   F10  AC5 the inputs are left unchanged           2 of 2 cases
PASS   O1   the assistant's first version is kept       v1 kept (22 lines)
PASS   S1   your suite has at least 11 tests            18 tests
PASS   S2   your suite is green on your own code        18 tests, OK
PASS   M1   your tests catch a fault in AC1             caught by test_every_return_path_is_a_real_bool_and_input_untouched, test_starts_now_rejected
PASS   M2   your tests catch a fault in AC1             caught by test_day_bound_exceeded_rejected, test_every_return_path_is_a_real_bool_and_input_untouched
PASS   M3   your tests catch a fault in AC1             caught by test_every_return_path_is_a_real_bool_and_input_untouched, test_zero_length_duration_rejected
PASS   M4   your tests catch a fault in AC2             caught by test_day_bound_upper_limit_allowed, test_every_return_path_is_a_real_bool_and_input_untouched, test_exactly_two_hours_allowed
PASS   M5   your tests catch a fault in AC3             caught by test_blocked_room_rejected, test_every_return_path_is_a_real_bool_and_input_untouched
PASS   M6   your tests catch a fault in AC4             caught by test_every_return_path_is_a_real_bool_and_input_untouched, test_touching_end_is_allowed
PASS   M7   your tests catch a fault in AC4             caught by test_every_return_path_is_a_real_bool_and_input_untouched, test_multiple_existing_overlap_rejected
PASS   M8   your tests catch a fault in AC4             caught by test_enclosing_overlap_spans_existing_rejected
PASS   M9   your tests catch a fault in AC5             caught by test_empty_list_stays_empty_after_an_accepted_booking, test_every_return_path_is_a_real_bool_and_input_untouched, test_existing_input_not_mutated
PASS   M10  your tests catch a fault in AC5             caught by test_every_return_path_is_a_real_bool_and_input_untouched
PASS   L1   report 1: tool, model and language          tool, model and language recorded
PASS   L2   report 2: the plan, and what you corrected  plan pasted, 1 row(s) on what you corrected or verified
PASS   L3   report 3: v1 mapped to AC1-AC4              5 conditions mapped, AC1-AC4 all present
PASS   L4   report 4: at least 11 of your tests listed  18 tests listed
PASS   L5   report 5: debugging evidence                1 row(s) of input / expected / actual
PASS   L6   report 6: the critique, each point judged   critique pasted, 2 points judged
PASS   L7   report 7: change log                        1 change-log row(s)
PASS   L8   report 8.1: real output of your suite       suite output pasted
PASS   L9   report 10: conclusion of 120-180 words      165 words
------------------------------------------------------------------------------
v1 (code/original/booking_v1.py): passes F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 - fails nothing - identical to your final: yes
SUMMARY pass=32 fail=0 error=0   (32 checks)
Behaviour and shape are clean. This says nothing about the quality of your review.
PS C:\Users\ARnur\Desktop\software enginering\se-practice\week-05> 
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
| none | All checks pass cleanly; no known failures. |

### 9.2 Outside the contract

The contract says times are integers. It does not say what `can_book` does when one is not — `600.5`, or the string `"600"`. What does **your** function do, and why is that the right call?

- **Behavior:** If a float like `600.5` is passed, standard Python numeric comparisons proceed naturally (e.g., `540 < 600.5`). If a non-numeric type like `"600"` or `None` is passed, Python raises a standard `TypeError` at runtime during comparison operations.
- **Justification:** This is the correct design call because the function contract explicitly states that inputs are pre-validated. Adding defensive type checks or custom exception handling would bloat the codebase without adding value, violate the minimal complexity principle, and potentially conflict with Acceptance Criterion 5 (AC5), which requires returning a pure Boolean (`True`/`False`) without side effects.

### 9.3 A bound that never decides

One of the bounds written in AC1 can never be the *only* reason a request is rejected. Which one, and why?

- **Bound:** `0 <= start` (or `start >= 0`).
- **Why:** In AC1, the condition requires both `start > now` and `0 <= start`. Since the contract guarantees `now` is a valid time of day ($0 \le now \le 1439$), any `start` time that satisfies `start > now` is strictly greater than $0$, and thus automatically satisfies `0 <= start`. Conversely, for `start` to violate `0 <= start` (i.e., `start < 0`), it would necessarily be less than or equal to `now` (since $now \ge 0$), meaning the `start > now` check would *always* fail first and trigger rejection regardless of the lower bound zero check.
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


In this laboratory practice, I verified and tested the `can_book` function for room booking validation. The half-open interval overlap check `start < b_end and end > b_start` works because an overlap occurs only when the proposed start time precedes an existing booking's end and the proposed end time extends past the existing start. Touching endpoints (e.g., `(660, 720)` against `[(600, 660)]`) are allowed through because `660 < 660` evaluates strictly to `False`, avoiding false overlap rejections.

The fault my test suite missed the longest was mutant check M10, which mutated list elements in place during execution. Like my existing immutability tests, it checked input preservation, but it differed by requiring object reference identity checks (`assertIs`) rather than simple list equality (`assertEqual`).

Ultimately, I had to decide to reject the AI critique's suggestion to add defensive type checks. While the assistant proposed raising exceptions for non-integer types, I decided against it because the contract guarantees pre-validated inputs and AC5 strictly mandates returning a pure Boolean.
