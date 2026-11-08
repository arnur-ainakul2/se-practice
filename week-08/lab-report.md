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
| Assistant I debugged with (tool) |Claude Code|
| Exact model (with its version, or `not displayed`) |Claude Sonnet 5.5|
| Where the skill was installed (ChatGPT / Claude web / Claude Code / prompt-only simulation) |Claude Code|
| Where I ran the tests (Bolt terminal / my computer / Codespace) |my computer|
| Vitest version (the `RUN  v…` line of a run) |v5.1.0|
| Language of my booking module (`ts` or `js`) — the file I copied from `buggy/` |ts|

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
| The file is plain UTF-8 text, named exactly `SKILL.md` (not `SKILL.md.txt`) | yes |
| The first and the closing YAML delimiter are exactly three hyphens: `---` | yes |
| `name` is lowercase with hyphens, and `description` says WHEN to use it | yes |
| I read the whole file once: no passwords, API keys or private student data | yes |

**The contents of `skills/bug-detector.zip`.** Paste the listing (Windows: open the ZIP and copy
the paths; macOS/Linux: `unzip -l skills/bug-detector.zip`):

```text
C:\Users\ARnur\Desktop\Software Enginering\se-practice\week-08\skills\bug-detector.zip\bug-detector\SKILL.md
```

**Installation.** Where you uploaded it, what the upload said, and whether a new chat showed the
skill as enabled. If upload was not available, write `prompt-only simulation` and say why.
Screenshot of the result: `evidence/install.png`.

<!-- Write below this line -->
Uploaded `bug-detector.zip` directly to the Claude Skills interface (`Settings` -> `Skills` -> `bug-detector`)[cite: 1, 2]. The upload processed successfully without validation errors, correctly identifying `SKILL.md` inside the package[cite: 2]. The skill was enabled[cite: 1, 2] and confirmed active for new chats, displaying the complete 7-step debugging procedure[cite: 2].

Screenshot saved to: `evidence/install.png`

---

## 5. Task 4 — without the skill

A **fresh chat, with no skill enabled**. Paste exactly what you sent: the deck's question, then
the same input you will use in section 6 (AC1–AC6, the failing test output, the code of
`canBook`):

```text
Find the root cause of the failed room-booking test. Propose minimal patch and regression test. Do not edit code.

AC1 Reject start >= end and requests in the past.
AC2 Enforce the maximum allowed duration (120 minutes).
AC3 Reject a blocked room.
AC4 Reject overlaps; allow bookings that only touch at endpoints.
AC5 Return Available / Unavailable without changing booking data.
AC6 Preserve clear UI feedback on desktop and mobile.

Failing Test Output:
FAIL: T01: allows booking that touches the end of an existing booking (660-720)
AssertionError: expected false to be true

Code:
export function canBook({ start, end, now, blocked, bookings }: {
  start: number;
  end: number;
  now: number;
  blocked: boolean;
  bookings: { start: number; end: number }[];
}): boolean {
  if (!(0 <= start && start < end && end <= 1440)) return false;
  if (!(start > now)) return false;
  if (end - start > 120) return false;
  if (blocked) return false;
  for (const b of bookings) {
    if (start <= b.end && end >= b.start) return false;
  }
  // keep the room's list current with the slot that was just found free
  bookings.push({ start, end });
  return true;
}
```

**The assistant's answer, pasted unedited:**

```text
## Root cause

The overlap check uses inclusive comparisons:

if (start <= b.end && end >= b.start) return false;

Two half-open intervals `[start, end)` and `[b.start, b.end)` overlap only when `start < b.end && end > b.start`. With `<=` / `>=`, a request that merely touches an existing booking at an endpoint is treated as a collision. In T01, the new booking starts at 660 and an existing booking ends at 660 (or the new one ends at 720 where an existing one begins), so `660 <= 660` is true and `canBook` returns `false` where the test expects `true`. That violates **AC4**.

## Second defect (not caught by T01, but violates AC5)

bookings.push({ start, end });

`canBook` is meant to be a pure availability check ("Return Available / Unavailable without changing booking data"). It mutates the caller's `bookings` array on every success. Consequences:

- Calling `canBook` twice with the same arguments returns `true` then `false`, because the second call overlaps the booking the first call silently inserted.
- Any UI that checks availability on render, on input change, or on both desktop and mobile code paths would corrupt booking data and show flickering or wrong feedback (AC6).

The comment ("keep the room's list current") describes persistence, which belongs in a separate booking/commit step, not in the availability predicate.

## Minimal patch

   for (const b of bookings) {
-    if (start <= b.end && end >= b.start) return false;
+    if (start < b.end && end > b.start) return false;
   }
-  // keep the room's list current with the slot that was just found free
-  bookings.push({ start, end });
   return true;

Two changes: strict inequalities for overlap, and removal of the side effect. Nothing else in the function needs to change. The AC1 to AC3 checks are already correct (`start < end`, `start > now` rejects "now" and the past, `> 120` allows exactly 120, and `blocked` is rejected).

## Regression tests

const base = { now: 0, blocked: false };

test("T01: allows booking that touches the end of an existing booking (660-720)", () => {
  // existing 600-660, new 660-720 touches at 660
  expect(canBook({ ...base, start: 660, end: 720, bookings: [{ start: 600, end: 660 }] })).toBe(true);
});

test("T01b: allows booking that touches the start of an existing booking", () => {
  // existing 720-780, new 660-720 touches at 720
  expect(canBook({ ...base, start: 660, end: 720, bookings: [{ start: 720, end: 780 }] })).toBe(true);
});

test("AC4: still rejects real overlaps, including containment and identical slots", () => {
  const b = [{ start: 600, end: 700 }];
  expect(canBook({ ...base, start: 660, end: 720, bookings: b })).toBe(false); // partial overlap
  expect(canBook({ ...base, start: 610, end: 690, bookings: b })).toBe(false); // contained
  expect(canBook({ ...base, start: 550, end: 750, bookings: b })).toBe(false); // contains (note: >120 would also fail, so use a shorter span in practice)
  expect(canBook({ ...base, start: 600, end: 700, bookings: b })).toBe(false); // identical
});

test("AC5: does not mutate bookings and is idempotent", () => {
  const bookings = [{ start: 600, end: 660 }];
  const snapshot = JSON.parse(JSON.stringify(bookings));
  const args = { ...base, start: 660, end: 720, bookings };

  expect(canBook(args)).toBe(true);
  expect(canBook(args)).toBe(true); // would be false with the push() bug
  expect(bookings).toEqual(snapshot);
});

test("AC5: failed checks also leave bookings untouched", () => {
  const bookings = [{ start: 600, end: 700 }];
  canBook({ ...base, start: 650, end: 720, bookings });
  expect(bookings).toEqual([{ start: 600, end: 700 }]);
});
```

One note on the containment case: a request that fully contains a 100-minute booking would exceed 120 minutes and be rejected by AC2 for the wrong reason. To isolate the overlap logic, use a shorter existing booking (for example existing 620-660, new 600-700) when writing that assertion.

## Notes

- The AC5 test is the key guard against the second bug; T01 alone would pass after fixing only the comparison operators, and the mutation would remain.
- If the app needs to actually store a booking after a successful check, add a separate function (for example `addBooking`) that calls `canBook` and then pushes, so the predicate stays pure.
- AC6 (UI feedback on desktop and mobile) is not testable from this function; the fix helps it indirectly by making repeated availability checks stable.
````

---

## 6. Task 5 — with the skill

**Another fresh chat, with `bug-detector` enabled.** Send exactly the same input as in section 5.
Only the question changes, to the deck's skill question:

```text

Use the bug-detector skill to diagnose the failed room-booking test.

AC1 Reject start >= end and requests in the past.
AC2 Enforce the maximum allowed duration (120 minutes).
AC3 Reject a blocked room.
AC4 Reject overlaps; allow bookings that only touch at endpoints.
AC5 Return Available / Unavailable without changing booking data.
AC6 Preserve clear UI feedback on desktop and mobile.

Failing Test Output:
FAIL: T01: allows booking that touches the end of an existing booking (660-720)
AssertionError: expected false to be true

Code:
export function canBook({ start, end, now, blocked, bookings }: {
  start: number;
  end: number;
  now: number;
  blocked: boolean;
  bookings: { start: number; end: number }[];
}): boolean {
  if (!(0 <= start && start < end && end <= 1440)) return false;
  if (!(start > now)) return false;
  if (end - start > 120) return false;
  if (blocked) return false;
  for (const b of bookings) {
    if (start <= b.end && end >= b.start) return false;
  }
  // keep the room's list current with the slot that was just found free
  bookings.push({ start, end });
  return true;
}
```

**The assistant's answer, pasted unedited:**

```text
## Bug diagnosis

**Reproduction (smallest deterministic input)**

canBook({ start: 660, end: 720, now: 0, blocked: false,
          bookings: [{ start: 600, end: 660 }] })
// expected: true, actual: false

Trace: the range check passes (0 ≤ 660 < 720 ≤ 1440), the past check passes (660 > 0), and the duration is 60, so it passes. In the loop, `660 <= 660` and `720 >= 600` are both true, so it returns `false`. The mirror case (new 540-600 against an existing 600-660) fails the same way.

| Defect | Evidence | Root cause | Fix | Test |
|---|---|---|---|---|
| **D1 (confirmed): touching bookings are rejected as overlaps** (violates AC4) | The failing test T01 matches the trace above: `expected false to be true`. | The overlap check uses inclusive comparisons (`<=` and `>=`), so ranges that share only an endpoint count as overlapping. | Use strict comparisons: `if (start < b.end && end > b.start) return false;` | T01 above, plus the mirror case. Both should return `true`. |
| **D2 (confirmed by code reading, not hit by T01): `canBook` mutates booking data** (violates AC5) | The line `bookings.push({ start, end })` runs on every successful check. | A check function (should return Available / Unavailable) also writes to the caller's array. Calling it twice with the same slot would make the second call return `false`. | Delete the `push`. Booking creation belongs in a separate function. | Call `canBook` twice with the same valid input and the same `bookings` array. Both calls should return `true`, and `bookings.length` should be unchanged. |

**Hypotheses (not confirmed)**
- **H1 (AC1):** `start > now` rejects a request that starts exactly at `now`. Whether "in the past" includes the current minute is not specified in the criteria, so confirm the intended rule before changing it.
- **H2 (AC6):** The UI feedback criterion can't be assessed from this function. No UI code was provided.

**Verified as correct:** the `start < end` and range check (AC1), the 120-minute limit (AC2), and the `blocked` check (AC3).

**Suggested minimal fix (not applied)**

for (const b of bookings) {
  if (start < b.end && end > b.start) return false;
}
return true; // no push
```

**Regression tests to add**
1. Touch at end (existing 600-660, new 660-720) → `true`
2. Touch at start (existing 600-660, new 540-600) → `true`
3. One-minute overlap (existing 600-660, new 659-720) → `false`
4. Idempotence: the same valid call twice → `true` both times, and `bookings` is unchanged

One caveat: the test input for T01 wasn't shown, so I inferred the existing booking from the test name. If it differs, D1 still holds for any pair that shares an endpoint.
````

Did the environment show that the skill was invoked? yes 

---

## 7. Comparison — judged against the actual code

Do not assume the skill did better. Judge both answers against the code and against what your
tests showed. Write a short verdict in each cell, and give a reason where they differ.

| Criterion | No skill | With skill |
| --- | --- | --- |
| Correct root cause | Correctly identifies the inclusive endpoint comparisons as BUG-A and `bookings.push` as BUG-B. | Correctly identifies the same two defects; it labels BUG-A confirmed by T01 and BUG-B visible in code but not exercised by T01. |
| Reproducible test | Gives concrete BUG-A cases. Its AC5/idempotence test uses a touching request (660–720 vs. 600–660), so BUG-A returns false before BUG-B can be observed. | Gives a deterministic T01 reproduction. The BUG-B idempotence suggestion does not specify a non-touching input; if it uses the touching T01 case, BUG-A hides BUG-B. It should use an available non-touching request and compare the array to a pre-call copy. |
| Minimal proposed patch | Correct and minimal: make overlap comparisons strict and remove the push. | Correct and minimal: make overlap comparisons strict and remove the push. |
| Unsupported claims | Speculates that UI checks may corrupt data or cause flickering; that behavior is not shown by the supplied test or function. | Raises an AC1 `start === now` hypothesis despite the existing T02 test expecting rejection; AC6 cannot be assessed from this function alone, which the answer acknowledges. |
| Clarity of explanation | Clear and detailed, though the proposed AC5 test does not isolate the mutation bug. | Clearly separates the T01 evidence from BUG-B found by code reading; the suggested BUG-B test needs a specific non-touching input. |

**Which bugs did each answer find?** (BUG-A, BUG-B, both, neither)

- No skill: both BUG-A and BUG-B (BUG-B identified from the `push` line, but its proposed test does not isolate it).
- With skill: both BUG-A and BUG-B (BUG-A supported by T01; BUG-B identified from code, but its proposed test needs a non-touching request to prove mutation).

---

## 8. Task 6 — repair and regression

Review the proposed patch yourself, then make **one minimal change per bug**, one commit each.
Rerun the test that was failing, then the full suite.

### 8.1 The BUG-A patch

The change as a diff (`git diff`, or the old and the new line), then the real run:

```text
- if (start <= b.end && end >= b.start) return false;
+ if (start < b.end && end > b.start) return false;

 RUN  v5.1.0 C:/Users/ARnur/Desktop/Software Enginering/se-practice/week-08/app

 ✓ src/booking.test.ts (19 tests | 18 skipped) 5ms
   ✓ canBook() (19)
     ↓ AC1: Interval validity, day limits, and future start times (5)
       ↓ T02: rejects if start time is equal to current 'now' (540-570)
       ↓ T03: rejects zero duration intervals (720-720)
       ↓ T04: rejects reversed intervals (750-720)
       ↓ T05: rejects intervals extending past the end of the day limit (1380-1441)
       ↓ X1: allows intervals ending exactly at the day boundary (1380-1440)
     ↓ AC2: Maximum duration limits (2)
       ↓ T06: allows a request of exactly 120 minutes (720-840)
       ↓ T07: rejects a request exceeding the 120-minute limit (720-841)
     ↓ AC3: Room block status (1)
       ↓ T13: rejects a valid interval if the room is blocked
     ✓ AC4: Overlapping with existing bookings (9)
       ↓ T01: allows booking that touches the end of an existing booking (660-720)
       ↓ T08: allows booking that touches the start of an existing booking (570-600)
       ↓ T09: rejects partial overlap ending inside an existing booking (630-690)
       ↓ T10: rejects booking that entirely contains an existing booking (570-690)
       ↓ T11: rejects booking that is entirely inside an existing booking (615-645)
       ↓ T12: rejects booking with identical interval to an existing booking (600-660)
       ↓ T14: allows booking when there are no existing bookings (630-690)
       ↓ X2: rejects booking that overlaps multiple existing bookings (650-710)
       ✓ BUG-A: allows a request that touches existing bookings on both sides (630-690) 2ms
     ↓ AC5: Pure function constraints (2)
       ↓ AC5: leaves the existing booking data completely unchanged
       ↓ BUG-B: leaves bookings unchanged for an available request touching nothing (720-780)

 Test Files  1 passed (1)
      Tests  1 passed | 18 skipped (19)
   Start at  22:09:35
   Duration  1.04s (transform 59%, import 23%, worker 13%, tests 5%)
```

### 8.2 The BUG-B patch and the final run

The change as a diff, then the real output of the **full** suite. Every test must pass.

```text
-  // keep the room's list current with the slot that was just found free
-  bookings.push({ start, end });
   return true;
    RUN  v5.1.0 C:/Users/ARnur/Desktop/Software Enginering/se-practice/week-08/app

 ✓ src/booking.test.ts (19 tests) 10ms
   ✓ canBook() (19)
     ✓ AC1: Interval validity, day limits, and future start times (5)
       ✓ T02: rejects if start time is equal to current 'now' (540-570) 3ms
       ✓ T03: rejects zero duration intervals (720-720) 0ms
       ✓ T04: rejects reversed intervals (750-720) 0ms
       ✓ T05: rejects intervals extending past the end of the day limit (1380-1441) 0ms
       ✓ X1: allows intervals ending exactly at the day boundary (1380-1440) 0ms
     ✓ AC2: Maximum duration limits (2)
       ✓ T06: allows a request of exactly 120 minutes (720-840) 0ms
       ✓ T07: rejects a request exceeding the 120-minute limit (720-841) 0ms
     ✓ AC3: Room block status (1)
       ✓ T13: rejects a valid interval if the room is blocked 0ms
     ✓ AC4: Overlapping with existing bookings (9)
       ✓ T01: allows booking that touches the end of an existing booking (660-720) 0ms
       ✓ T08: allows booking that touches the start of an existing booking (570-600) 0ms
       ✓ T09: rejects partial overlap ending inside an existing booking (630-690) 0ms
       ✓ T10: rejects booking that entirely contains an existing booking (570-690) 0ms
       ✓ T11: rejects booking that is entirely inside an existing booking (615-645) 0ms
       ✓ T12: rejects booking with identical interval to an existing booking (600-660) 0ms
       ✓ T14: allows booking when there are no existing bookings (630-690) 0ms
       ✓ X2: rejects booking that overlaps multiple existing bookings (650-710) 0ms
       ✓ BUG-A: allows a request that touches existing bookings on both sides (630-690) 0ms
     ✓ AC5: Pure function constraints (2)
       ✓ AC5: leaves the existing booking data completely unchanged 1ms
       ✓ BUG-B: leaves bookings unchanged for an available request touching nothing (720-780) 0ms

 Test Files  1 passed (1)
      Tests  19 passed (19)
   Start at  22:13:51
   Duration  861ms (transform 55%, import 22%, worker 12%, tests 10%)

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
- Both assistant answers noticed the array mutation, but their proposed AC5 checks used or left unspecified a touching interval, so BUG-A could reject the request before the test reached the mutation.

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
Both answers correctly identified the inclusive overlap comparisons as the cause of T01 failing under AC4. The skill-assisted answer stated more explicitly that BUG-B was found by reading the code, not proved by T01, but the unassisted answer also said the mutation was not caught by T01. So the skill made that distinction clearer; it did not uniquely find the second bug. The tests on the buggy implementation showed that touching intervals were rejected and that a successful available check changed the bookings array. After the two minimal fixes, all 19 tests passed. Those tests verify the covered booking cases and array immutability, but they do not establish behavior under concurrent requests or fully verify desktop and mobile UI feedback under AC6.
