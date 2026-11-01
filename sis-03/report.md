# SIS #03 — Report: Smart Campus Room Availability Checker

<!-- The ONLY file you write prose in. Keep every numbered heading (## 1. … ## 13.) and every
     ### sub-heading, and the **Label:** words — the checker finds your answers by them.
     Replace every "(write here)" and "(paste here)". Delete these <!-- --> comments if you like. -->

## 1. Setup and reuse

<!-- Model: the exact model with its version, as the tool shows it ("ChatGPT" is a tool, not a
     model). If the tool does not show it, write: not displayed
     Reuse: week-05 if code/original/booking_v1.py is your Week 05 v1, copied unedited;
     week-06 if web/original/ is your Week 06 v1 export; fresh if you generated it for this SIS. -->

| Item | Value |
| --- | --- |
| Coding assistant (tool) | (write here) |
| Coding assistant model | (write here) |
| Bolt.new model | (write here) |
| Bolt project link | (write here) |
| Language | (write here) |
| Path | (write here) |
| Python v1 from | (write here) |
| Web v1 from | (write here) |

## 2. Baseline — before any new AI exchange

<!-- Written by you, without AI, before the first exchange of this SIS. Commit and push it
     first (README §2). Reusing Week 05/06 work does not exempt you: this section is new. -->

### 2.1 Scope in my own words

**Scope:** This project is a responsive frontend for checking availability for one room. It uses fictional booking data and does not create bookings or use a backend, database, or login system.

### 2.2 The acceptance criteria in my own words

| AC | In my own words |
| --- | --- |
| AC1 | `start` and `end` are integer minutes after midnight. They must satisfy `0 ≤ start < end ≤ 1440`, and `start` must be strictly later than `now`. |
| AC2 | A requested booking can last up to 120 minutes, including exactly 120 minutes. |
| AC3 | If the selected room is blocked, every request must be rejected. |
| AC4 | A request must be rejected if it overlaps an existing booking. Slots that meet exactly at an endpoint do not overlap. |
| AC5 | The page must show a clear Available or Unavailable result. Checking availability must not change the existing bookings. |
| AC6 | The page must show understandable validation messages and remain usable on a narrow mobile screen. |
### 2.3 Likely failure points

| # | Failure point | AC | How I will check it |
| --- | --- | --- | --- |
| 1 | Treating bookings that meet at an endpoint as overlapping. | AC4 | Run T1 with a request starting exactly when the existing booking ends; it should be Available. |
| 2 | Accepting a start time that is equal to `now`, even though it must be strictly later. | AC1 | Run T6 with `start = now`; it should be Unavailable. |

### 2.4 The contract

`can_book(start, end, now, blocked, existing)`

| Parameter | Meaning | Type and allowed values |
| --- | --- | --- |
| `start` | Requested start time in minutes after midnight. | Integer; must satisfy `0 ≤ start`. |
| `end` | Requested end time in minutes after midnight. | Integer; must satisfy `start < end ≤ 1440`. |
| `now` | Current time in minutes after midnight. | Integer from 0 to 1439; `start` must be strictly greater than `now`. |
| `blocked` | Whether the selected room is blocked. | Boolean. If true, the function returns `False`. |
| `existing` | Existing bookings for the selected room. | Collection of `(start, end)` integer pairs; the function must not modify it. |
| returns | Whether the request satisfies AC1–AC4. | Boolean: `True` only when all four criteria hold; otherwise `False`. |

### 2.5 Initial assumptions and manual checks

**Assumptions:**

1. `now` is always an integer from 0 to 1439.
2. `existing` contains valid time pairs that do not overlap one another.

**Checked manually:**

- Resize the browser to a narrow mobile width and check that the page remains usable.
- Review the validation messages to make sure they clearly explain why a request is unavailable.
- Check that an availability check does not change the existing bookings.

## 3. Python v1 review

<!-- One row per conditional branch in code/original/booking_v1.py (your language's v1 on
     Path B). Quote the condition exactly. AC1-AC4 must all appear in the AC column. -->

| Branch in v1 (quoted) | AC | Satisfies it? | Why |
| --- | --- | --- | --- |
| `if blocked:` | AC3 | Yes | A blocked room causes an immediate `False` result, so requests for that room are rejected. |
| `if not (0 <= start < end <= 1440 and start > now):` | AC1 | Yes | This rejects times outside the allowed day range, non-positive or reversed intervals, and any start that is equal to or earlier than `now`. |
| `if (end - start) > 120:` | AC2 | Yes | This rejects durations longer than 120 minutes while allowing a duration of exactly 120 minutes. |
| `if start < b_end and end > b_start:` | AC4 | Yes | This detects an overlap between the requested interval and an existing interval. The strict comparisons allow intervals that meet exactly at an endpoint. |

## 4. Prototype v1 in Bolt.new

**Prompt as sent:**

~~~~text
Build a small responsive Smart Campus Room Availability Checker. Requirements: 
AC1: Accept a candidate interval only when 0 ≤ start < end ≤ 1440 and start is after the supplied current time.
AC2: Reject a booking longer than 120 minutes.
AC3: Reject the request when the selected room is blocked.
AC4: Reject any interval that overlaps an existing booking; touching endpoints are allowed.
AC5: Show a clear Available / Unavailable decision without changing the existing booking data.
AC6: The page remains usable at desktop and narrow/mobile width and gives understandable validation feedback. 
Use fictional sample data only. Keep the implementation simple and within one-page scope. Do not add authentication, backend services, analytics, or unrelated features. After building, briefly list the main files/components you created.
~~~~

<!-- Main generated files or components, with their path inside web/original/
     (for example src/App.tsx). At least two. -->

| Generated file or component | Path | Its role |
| --- | --- | --- |
| `App.tsx` | `src/App.tsx` | Composes the page, manages the selected room and time inputs, runs the availability check, and displays its result. |
| `availability.ts` | `src/utils/availability.ts` | Checks the requested interval against AC1–AC4 and returns an availability decision with reasons without changing booking data. |
| `TimeInput.tsx` | `src/components/TimeInput.tsx` | Renders a labeled time input and optional validation hint or invalid state. |

**What v1 does:**

- Shows a responsive page with a room selector, time inputs, and a visual 24-hour timeline.
- Checks availability and displays an Available or Unavailable result.
- Uses fictional sample bookings and does not modify the existing booking data.
- Includes sample rooms, including a blocked room with a maintenance reason.

## 5. Test cases — executed on both artifacts

<!-- Base for every case unless the row says otherwise: now = 540, blocked = False,
     existing = [(600, 660)]. Do not change the first four columns.
     Python columns: True, False or Error (it raised) — what the call actually returned.
       T11: the result of the SECOND call. T12: n/a.
       Path A: the checker runs both of your files on T1-T11 and compares (C2, C3).
     Page columns: Available, Unavailable or Not testable — what the page actually showed.
     Never write a result you did not observe. -->

| Case | Name | Input | Expected | Python v1 | Python final | Page v1 | Page final |
| --- | --- | --- | --- | --- | --- | --- | --- |
| T1 | Touching | 660–720 | Available | True | True | Available | Available |
| T2 | Overlap | 630–690 | Unavailable | False | False | Unavailable | Unavailable |
| T3 | Blocked | 660–720, blocked | Unavailable | False | False | Unavailable | Unavailable |
| T4 | Exactly 120 min | 720–840 | Available | True | True | Available | Available |
| T5 | 121 min | 720–841 | Unavailable | False | False | Unavailable | Unavailable |
| T6 | Starts now | 540–570 | Unavailable | False | False | Unavailable | Unavailable |
| T7 | Reversed | 720–660 | Unavailable | False | False | Unavailable | Unavailable |
| T8 | Ends at midnight | 1380–1440 | Available | True | True | Unavailable | Available |
| T9 | Past midnight | 1380–1441 | Unavailable | False | False | Unavailable | Unavailable |
| T10 | Second booking | 720–780, existing (600–660), (700–760) | Unavailable | False | False | Not testable | Not testable |
| T11 | Same check twice | 660–720, twice | Available | True | True | Available | Available |
| T12 | Narrow screen | T1 at ~375 px wide | Available | n/a | n/a | Available | Available |

## 6. Traceability

<!-- His table. Implementation / file: where the rule lives (booking.py line, a component).
     Test input: the case IDs from section 5. v1 / final actual: what those cases gave. -->

| AC | Implementation / file | Test input | Expected | v1 actual | Final actual |
| --- | --- | --- | --- | --- | --- |
| AC1 | `code/booking.py`; `web/original/src/utils/availability.ts`; `web/final/src/utils/availability.ts`, `time.ts`, `components/TimeInput.tsx` | T6–T9 | T6, T7, T9 Unavailable; T8 Available | Python: T6 False, T7 False, T8 True, T9 False; page: T6–T7 Unavailable, T8–T9 Unavailable | Python: same results; page: T6–T7 Unavailable, T8 Available, T9 Unavailable |
| AC2 | `code/booking.py`; `web/original/src/utils/availability.ts`; `web/final/src/utils/availability.ts` | T4–T5 | T4 Available; T5 Unavailable | Python: T4 True, T5 False; page: T4 Available, T5 Unavailable | Python: same results; page: T4 Available, T5 Unavailable |
| AC3 | `code/booking.py`; `web/original/src/utils/availability.ts`, `src/data/sampleData.ts`; `web/final/src/utils/availability.ts`, `src/data/sampleData.ts` | T3 | Unavailable | Python False; page Unavailable | Python False; page Unavailable |
| AC4 | `code/booking.py`; `web/original/src/utils/availability.ts`; `web/final/src/utils/availability.ts` | T1, T2, T10 | T1 Available; T2 and T10 Unavailable | Python: True, False, False; page: T1 Available, T2 Unavailable, T10 Not testable | Python: same results; page: T1 Available, T2 Unavailable, T10 Not testable |
| AC5 | `code/booking.py`; `web/original/src/App.tsx`, `src/utils/availability.ts`; `web/final/src/App.tsx`, `src/utils/availability.ts` | T11 | Available on both checks; existing bookings unchanged | Python: second call True; input unchanged. Page: Available on both checks | Python: second call True; input unchanged. Page: Available on both checks; booking data unchanged |
| AC6 | `web/original/src/components/TimeInput.tsx`, `ResultBanner.tsx`, `App.tsx`; `web/final/src/components/TimeInput.tsx`, `ResultBanner.tsx`, `App.tsx` | T7, T12 | T7 Unavailable with understandable feedback; T12 usable and Available | Python: T7 False, T12 n/a; page: T7 Unavailable, T12 Available | Python: T7 False, T12 n/a; page: T7 Unavailable, T12 Available at about 375 px |

## 7. Issue log

| # | Issue | Reproduction | Priority | Prompt / change | Retest result |
| --- | --- | --- | --- | --- | --- |
| 1 | The requested end time could not be set to 24:00. | AC1 permits an end time of 1440 minutes. In v1, try to enter an interval ending at 24:00; the native time input stops at 23:59, so this valid boundary cannot be entered. | Medium | Prompt: “In the current prototype, trying to enter a request that ends at 24:00 produces no valid input, but AC1 requires an end time up to 1440 minutes (24:00). Make the smallest change that fixes this behavior. Preserve the other acceptance criteria. Explain which file/component you changed and why.” Change: updated `src/components/TimeInput.tsx`, `src/utils/time.ts`, and `src/App.tsx` so the requested end accepts and displays 24:00 as 1440. | Week 06 retest: entered an interval ending at 24:00 and reran T1–T9; the reported results passed. I will add the SIS final screenshot as `evidence/after-1.png`. |
| 2 | The previous availability result remained visible after changing the request. | Run a check, then change the selected room or a time without checking again. In v1, the old result remains beside the changed inputs, which can be misleading under AC5–AC6. | Low | Prompt: “Review only the request form and result feedback for confusing UI feedback when a user changes the selected room or requested times after running a check. Suggest one small cleanup. Do not add features or redesign the whole application. Implement it only if it preserves AC1–AC6.” Change: updated `src/App.tsx` so changing the room, current time, start, or end clears the previous result. | Week 06 retest: changed the room and time after a check; the stale result cleared. Reran T1–T9; the reported results passed. |

**Before / after:** `evidence/before-1.png` → `evidence/after-1.png` show issue 1: the v1 time input stops at 23:59, while the final version accepts 24:00. `evidence/before-2.png` → `evidence/after-2.png` show issue 2: the old availability result remained visible after changing the room or time; the final version clears the stale result.
## 8. Critique decisions

<!-- The AI's review against AC1-AC6 (stage C), claim by claim. At least three rows.
     How I verified it: the case, test or run that confirmed or refuted the claim.
     Decision: accept, reject or modify. At least one reject or modify — the reflection asks for it. -->

| # | AI claim or recommendation | How I verified it | Decision | Reason (AC or case) |
| --- | --- | --- | --- | --- |
| 1 | (write here) | (write here) | (write here) | (write here) |
| 2 | (write here) | (write here) | (write here) | (write here) |
| 3 | (write here) | (write here) | (write here) | (write here) |

## 9. Coding-agent analysis

### 9.1 The loop

<!-- One real pass through the loop from this assignment — with your assistant or with Bolt. -->

| Step | What happened in this assignment |
| --- | --- |
| User goal | (write here) |
| Model / plan | (write here) |
| Tool call | (write here) |
| Observation | (write here) |
| Next step | (write here) |
| Human review | (write here) |

### 9.2 Context, tools and permissions

<!-- At least three rows. Last column: Observed (you saw it happen) or Assumed (you infer it
     about the internals). Use both at least once. -->

| Tool | Context it used | Tools or permissions | Observed or assumed |
| --- | --- | --- | --- |
| (write here) | `App.tsx` | `src/App.tsx` | Composes the page, manages the selected room and time inputs, runs the availability check, and displays its result. |
| `availability.ts` | `src/utils/availability.ts` | Checks the requested interval against AC1–AC4 and returns an availability decision with reasons without changing booking data. |
| `TimeInput.tsx` | `src/components/TimeInput.tsx` | Renders a labeled time input and optional validation hint or invalid state. | (write here) |
| (write here) | (write here) | (write here) | (write here) |

### 9.3 Checkpoint and dependability

**Safety checkpoint:** (write here)

**Reliability, security, responsibility:** (write here)

## 10. Reflection

<!-- 100-200 words, in your own words, no AI. Compare AI-assisted coding (the Python part) with
     vibe coding (the Bolt part); one example each of a reliability, an availability/usability and
     a security risk; why review, tool permissions and tests stay human responsibilities; one AI
     recommendation you rejected or modified, and why; what you would improve next without
     expanding the scope. -->

(write here)

## 11. Appendix A — AI exchanges

<!-- At least four. Complete prompts and complete responses, as text — never screenshots. Paste
     each inside the ~~~~ block that follows its label.
     Stage: Plan, Generate, Critique or Repair (the brief's A-D) — at least one of each.
     Source: this SIS, week-05 or week-06. Reused exchanges keep their original date.
     The Generate exchange for Python must contain your v1 exactly as it is in code/original/.
     Add B5, B6 … if you ran more. -->

### B1

- **Tool:** (write here)
- **Model:** (write here)
- **Date:** (write here)
- **Stage:** (write here)
- **Source:** (write here)

**Prompt:**

~~~~text
(paste here)
~~~~

**Response:**

~~~~text
(paste here)
~~~~

### B2

- **Tool:** (write here)
- **Model:** (write here)
- **Date:** (write here)
- **Stage:** (write here)
- **Source:** (write here)

**Prompt:**

~~~~text
(paste here)
~~~~

**Response:**

~~~~text
(paste here)
~~~~

### B3

- **Tool:** (write here)
- **Model:** (write here)
- **Date:** (write here)
- **Stage:** (write here)
- **Source:** (write here)

**Prompt:**

~~~~text
(paste here)
~~~~

**Response:**

~~~~text
(paste here)
~~~~

### B4

- **Tool:** (write here)
- **Model:** (write here)
- **Date:** (write here)
- **Stage:** (write here)
- **Source:** (write here)

**Prompt:**

~~~~text
(paste here)
~~~~

**Response:**

~~~~text
(paste here)
~~~~

## 12. Appendix B — Test output

### 12.1 Your suite

<!-- The complete terminal output of your final suite. Path A: python -m unittest -v, run inside
     code/ — the part ending in "Ran N tests" and OK or FAILED. -->

~~~~text
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
~~~~

### 12.2 Path B only — three faults you planted

<!-- Path A: leave this table as it is. Path B: three rows — the line you broke, the AC it
     breaks, the test that failed. -->

| # | Line you broke | AC | Test that failed |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |

## 13. Remaining limitations and known fails

<!-- One row per check ID in submission.yml known_fails, and any limitation you know of.
     If the checker is clean and you know of none, one row that says so. -->

| Check ID or limitation | Why it stays | What I would do next |
| --- | --- | --- |
| (write here) | (write here) | (write here) |
