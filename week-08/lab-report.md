# Week 08 — Lab report

**Name:**Ainakul Arnur
**Group:**Monday 16:00
**Date:**11/18/2026

Fill in every section. **Do not delete, rename or renumber the headings.** The checker and the
grader find your answers by them. You can add rows to any table, but never remove its header.

---

## 1. Setup

| | |
| --- | --- |
| Assistant I debugged with (tool) |Gemini|
| Exact model (with its version, or `not displayed`) |Gemini 3.6 Flash|
| Where the skill was installed (ChatGPT / Claude web / Claude Code / prompt-only simulation) | |
| Where I ran the tests (Bolt terminal / my computer / Codespace) |my computer|
| Vitest version (the `RUN  v…` line of a run) |v5.1.0|
| Language of my booking module (`ts` or `js`) — the file I copied from `buggy/` | |

---

## 2. Task 1 — baseline, buggy code, failing tests

### 2.1 My Week 07 suite on my own code

The **real** output of your Week 07 suite, run in `week-08/app/` **before** you replace
anything. It should be green. If it is not, say why under the block.

```text
RUN  v5.1.0 C:/Users/ARnur/Desktop/Software Enginering/se-practice/week-08/app

 ✓ src/booking.test.ts (17 tests) 10ms
   ✓ canBook() (17)
     ✓ AC1: Interval validity, day limits, and future start times (5)
       ✓ T02: rejects if start time is equal to current 'now' (540-570) 2ms
       ✓ T03: rejects zero duration intervals (720-720) 0ms
       ✓ T04: rejects reversed intervals (750-720) 0ms
       ✓ T05: rejects intervals extending past the end of the day limit (1380-1441) 0ms
       ✓ X1: allows intervals ending exactly at the day boundary (1380-1440) 0ms
     ✓ AC2: Maximum duration limits (2)
       ✓ T06: allows a request of exactly 120 minutes (720-840) 0ms
       ✓ T07: rejects a request exceeding the 120-minute limit (720-841) 0ms
     ✓ AC3: Room block status (1)
       ✓ T13: rejects a valid interval if the room is blocked 0ms
     ✓ AC4: Overlapping with existing bookings (8)
       ✓ T01: allows booking that touches the end of an existing booking (660-720) 0ms
       ✓ T08: allows booking that touches the start of an existing booking (570-600) 1ms
       ✓ T09: rejects partial overlap ending inside an existing booking (630-690) 0ms
       ✓ T10: rejects booking that entirely contains an existing booking (570-690) 0ms
       ✓ T11: rejects booking that is entirely inside an existing booking (615-645) 0ms
       ✓ T12: rejects booking with identical interval to an existing booking (600-660) 0ms
       ✓ T14: allows booking when there are no existing bookings (630-690) 0ms
       ✓ X2: rejects booking that overlaps multiple existing bookings (650-710) 0ms
     ✓ AC5: Pure function constraints (1)
       ✓ AC5: leaves the existing booking data completely unchanged 2ms

 Test Files  1 passed (1)
      Tests  17 passed (17)
   Start at  20:16:05
   Duration  932ms (transform 67%, import 17%, tests 8%, worker 7%)

```

### 2.2 The same suite on the provided canBook

You copied the whole `canBook` function from `buggy/booking.ts` (or `.js`) over yours and changed
nothing else. This is the real output:

```text
PS C:\Users\ARnur\Desktop\Software Enginering\se-practice\week-08\app> npx vitest run

 RUN  v5.1.0 C:/Users/ARnur/Desktop/Software Enginering/se-practice/week-08/app

 ❯ src/booking.test.ts (17 tests | 3 failed) 15ms
   ❯ canBook() (17)
     ✓ AC1: Interval validity, day limits, and future start times (5)
       ✓ T02: rejects if start time is equal to current 'now' (540-570) 2ms
       ✓ T03: rejects zero duration intervals (720-720) 0ms
       ✓ T04: rejects reversed intervals (750-720) 0ms
       ✓ T05: rejects intervals extending past the end of the day limit (1380-1441) 0ms
       ✓ X1: allows intervals ending exactly at the day boundary (1380-1440) 0ms
     ✓ AC2: Maximum duration limits (2)
       ✓ T06: allows a request of exactly 120 minutes (720-840) 0ms
       ✓ T07: rejects a request exceeding the 120-minute limit (720-841) 0ms
     ✓ AC3: Room block status (1)
       ✓ T13: rejects a valid interval if the room is blocked 0ms
     ❯ AC4: Overlapping with existing bookings (8)
       × T01: allows booking that touches the end of an existing booking (660-720) 7ms
       × T08: allows booking that touches the start of an existing booking (570-600) 1ms
       ✓ T09: rejects partial overlap ending inside an existing booking (630-690) 0ms
       ✓ T10: rejects booking that entirely contains an existing booking (570-690) 0ms
       ✓ T11: rejects booking that is entirely inside an existing booking (615-645) 0ms
       ✓ T12: rejects booking with identical interval to an existing booking (600-660) 0ms
       ✓ T14: allows booking when there are no existing bookings (630-690) 0ms
       ✓ X2: rejects booking that overlaps multiple existing bookings (650-710) 0ms
     ❯ AC5: Pure function constraints (1)
       × AC5: leaves the existing booking data completely unchanged 1ms

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 3 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/booking.test.ts > canBook() > AC4: Overlapping with existing bookings > T01: allows booking that touches the end of an existing booking (660-720)
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:61:30
     59|     it("T01: allows booking that touches the end of an existing booking (660-720)", () => {
     60|       const input = { ...getBaseInput(), start: 660, end: 720 };
     61|       expect(canBook(input)).toBe(true);
       |                              ^
     62|     });
     63|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/3]⎯

 FAIL  src/booking.test.ts > canBook() > AC4: Overlapping with existing bookings > T08: allows booking that touches the start of an existing booking (570-600)
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:66:30
     64|     it("T08: allows booking that touches the start of an existing booking (570-600)", () => {
     65|       const input = { ...getBaseInput(), start: 570, end: 600 };
     66|       expect(canBook(input)).toBe(true);
       |                              ^
     67|     });
     68|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/3]⎯

 FAIL  src/booking.test.ts > canBook() > AC5: Pure function constraints > AC5: leaves the existing booking data completely unchanged
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:120:22
    118|       const result = canBook(input);
    119|
    120|       expect(result).toBe(true); // Sanity check that it's a valid Available request
       |                      ^
    121|       expect(input.bookings).toEqual(bookingsBefore);
    122|     });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/3]⎯


 Test Files  1 failed (1)
      Tests  3 failed | 14 passed (17)
   Start at  20:29:45
   Duration  949ms (transform 50%, import 26%, tests 15%, worker 9%)

```

### 2.3 One failing test per bug

Add the two regression tests from README Part 1, step 5: one named `BUG-A` and one named `BUG-B`.
Run them **on the buggy code**. Both must fail here. That is the evidence that each test can see
its bug.

```text
PS C:\Users\ARnur\Desktop\Software Enginering\se-practice\week-08\app> npx vitest run

 RUN  v5.1.0 C:/Users/ARnur/Desktop/Software Enginering/se-practice/week-08/app

 ❯ src/booking.test.ts (19 tests | 5 failed) 24ms
   ❯ canBook() (19)
     ❯ AC4: Overlapping with existing bookings (9)
       × T01: allows booking that touches the end of an existing booking (660-720) 9ms
       × T08: allows booking that touches the start of an existing booking (570-600) 1ms
       × BUG-A: allows a request that touches existing bookings on both sides (630-690) 1ms
     ❯ AC5: Pure function constraints (2)
       × AC5: leaves the existing booking data completely unchanged 2ms
       × BUG-B: leaves bookings unchanged for an available request touching nothing (720-780) 3ms

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 5 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/booking.test.ts > canBook() > AC4: Overlapping with existing bookings > T01: allows booking that touches the end of an existing booking (660-720)
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:61:30
     59|       const input = { ...getBaseInput(), start: 660, end: 720 };
     60|       expect(canBook(input)).toBe(true);
       |                              ^

 FAIL  src/booking.test.ts > canBook() > AC4: Overlapping with existing bookings > T08: allows booking that touches the start of an existing booking (570-600)
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:66:30
     64|       const input = { ...getBaseInput(), start: 570, end: 600 };
     65|       expect(canBook(input)).toBe(true);
       |                              ^

 FAIL  src/booking.test.ts > canBook() > AC4: Overlapping with existing bookings > BUG-A: allows a request that touches existing bookings on both sides (630-690)
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:117:30
    115|         ],
    116|       };
    117|       expect(canBook(input)).toBe(true);
       |                              ^

 FAIL  src/booking.test.ts > canBook() > AC5: Pure function constraints > AC5: leaves the existing booking data completely unchanged
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:133:22
    131|       const result = canBook(input);
    132|
    133|       expect(result).toBe(true); // Sanity check that it's a valid Available request
       |                      ^

 FAIL  src/booking.test.ts > canBook() > AC5: Pure function constraints > BUG-B: leaves bookings unchanged for an available request touching nothing (720-780)
AssertionError: expected [ { start: 600, end: 660 }, …(1) ] to deeply equal [ { start: 600, end: 660 } ]

- Expected
+ Received

  [
    {
      "end": 660,
      "start": 600,
    },
+   {
+     "end": 780,
+     "start": 720,
+   },
  ]

 ❯ src/booking.test.ts:142:30
    140|       expect(canBook(input)).toBe(true);
    141|       expect(input.bookings).toEqual(bookingsBefore);
       |                              ^

 Test Files  1 failed (1)
      Tests  5 failed | 14 passed (19)
   Start at  20:36:07
   Duration  1.44s (transform 50%, import 21%, tests 17%, worker 11%)
```

---

## 3. Defect log

One row per defect. At least **BUG-A and BUG-B**. "Suspected cause" is your hypothesis
**before** you ask any assistant: the line and why.

| Defect | Test ID | Input | Expected | Actual | Suspected cause (line and why) |
| --- | --- | --- | --- | --- | --- |
| BUG-A | T01, T08 | T01: request 660–720 with existing booking 600–660; T08: request 570–600 with existing booking 600–660 | `true` (both requests only touch the existing booking) | `false` (both) | Inferred after discussing the failures with an assistant: the overlap check `if (start <= b.end && end >= b.start) return false;` treats shared endpoints as overlap. The inclusive comparisons reject both touching intervals. |
| BUG-B | AC5 (not isolated by this run) | Request 660–720; existing booking 600–660 | Available (`true`) and bookings unchanged | `false`; the follow-up unchanged-array assertion is not reached | Inferred after discussing the failures with an assistant: the AC5 request touches the existing booking, so the overlap check above returns `false` before `bookings.push({ start, end })`. This run does not yet demonstrate array mutation; a non-overlapping Available request is needed to isolate BUG-B. |

---

## 4. Tasks 2–3 — the skill

**The checks from the deck, before you zip it.** Answer each one yes / no:

| Check | yes / no |
| --- | --- |
| The file is plain UTF-8 text, named exactly `SKILL.md` (not `SKILL.md.txt`) | yes / no |
| The first and the closing YAML delimiter are exactly three hyphens: `---` | yes / no |
| `name` is lowercase with hyphens, and `description` says WHEN to use it | yes / no |
| I read the whole file once: no passwords, API keys or private student data | yes / no |

**The contents of `skills/bug-detector.zip`.** Paste the listing (Windows: open the ZIP and copy
the paths; macOS/Linux: `unzip -l skills/bug-detector.zip`):

```text
(paste here)
```

**Installation.** Where you uploaded it, what the upload said, and whether a new chat showed the
skill as enabled. If upload was not available, write `prompt-only simulation` and say why.
Screenshot of the result: `evidence/install.png`.

<!-- Write below this line -->

---

## 5. Task 4 — without the skill

A **fresh chat, with no skill enabled**. Paste exactly what you sent: the deck's question, then
the same input you will use in section 6 (AC1–AC6, the failing test output, the code of
`canBook`):

```text
(paste here)
```

**The assistant's answer, pasted unedited:**

```text
(paste here)
```

---

## 6. Task 5 — with the skill

**Another fresh chat, with `bug-detector` enabled.** Send exactly the same input as in section 5.
Only the question changes, to the deck's skill question:

```text
(paste here)
```

**The assistant's answer, pasted unedited:**

```text
(paste here)
```

Did the environment show that the skill was invoked? yes / no / not shown

---

## 7. Comparison — judged against the actual code

Do not assume the skill did better. Judge both answers against the code and against what your
tests showed. Write a short verdict in each cell, and give a reason where they differ.

| Criterion | No skill | With skill |
| --- | --- | --- |
| Correct root cause | | |
| Reproducible test | | |
| Minimal proposed patch | | |
| Unsupported claims | | |
| Clarity of explanation | | |

**Which bugs did each answer find?** (BUG-A, BUG-B, both, neither)

-

---

## 8. Task 6 — repair and regression

Review the proposed patch yourself, then make **one minimal change per bug**, one commit each.
Rerun the test that was failing, then the full suite.

### 8.1 The BUG-A patch

The change as a diff (`git diff`, or the old and the new line), then the real run:

```text
(paste here)
```

### 8.2 The BUG-B patch and the final run

The change as a diff, then the real output of the **full** suite. Every test must pass.

```text
(paste here)
```

---

## 9. What still fails, and what AI-assisted debugging cannot do

### 9.1 Checks I am keeping as FAIL or ERROR

Use the same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check | Why it stays |
| --- | --- |
| | |

### 9.2 One limitation of AI-assisted debugging

<!-- Use something that actually happened in sections 5-8. 20 words or more. -->
-

---

## 10. Conclusion (80–150 words)

<!-- Answer both, in your own words, without the assistant (3-5 sentences, as the deck asks):
     (a) Did the skill help? Show it with one row of section 7.
     (b) What did your tests actually prove - and what did they not?
     Worthless: "The skill made the AI much better at debugging."
     Worth everything: "Both answers found BUG-A from the T01 failure. Only the skill answer
     separated BUG-B as a hypothesis instead of a fact, because step 4 told it to. BUG-B was only
     visible after the BUG-A patch: the AC5 test had been failing for the wrong reason." -->

<!-- Write your conclusion below this line -->
