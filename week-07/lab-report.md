# Week 07 — Lab report

**Name:**Ainakul Arnur
**Group:**Monday 16:00
**Date:**11/06/2026

Fill in every section. **Do not delete, rename or renumber the headings.** The checker and the
grader find your answers by them. You can add rows to any table, but never remove its header.

---

## 1. Setup

| | |
| --- | --- |
| Project I continue (`week-06` = my Week 06 Bolt project, `starter` = the provided starter) |week-06|
| Bolt project link (or `not shared`, and why) |https://bolt.new/~/sb1-ryevsnes|
| Assistant that generated the tests (tool) |Gemini|
| Exact model (with its version, or `not displayed`) |Gemini 3.6 Flash|
| Where I ran the tests (Bolt terminal / my computer / Codespace) |my computer|
| Vitest version (the `RUN  v…` line of a run) |v5.1.0|
| Test command |npx vitest run|

---

## 2. Task 1 — baseline and the booking function

**Before editing:** where did the booking decision live in the project you started from?

| | |
| --- | --- |
| File and function (or "inside the page component") | `src/utils/availability.ts` — `checkAvailability` |
| Its inputs | `CheckInput`: `room`, `start`, `end`, `currentTime`, `existingBookings` |
| What it returned | A `CheckResult` object: decision (`available` / `unavailable`), reasons, room name, start and end |
| How the page used it | `App.tsx` passed the selected room, times in minutes, and bookings to `checkAvailability`; it saved the returned result with `setResult` for `ResultBanner` |

**What I changed to extract `canBook`.** Say which file it now lives in, what you moved, and why
the behaviour did not change. Also say which file of the page now calls it. 40 words or more.

<!-- Write below this line -->

I added `src/booking.ts` with `canBook({ start, end, now, blocked, bookings })` and moved the same interval validity, current-time, duration, blocked-room, and overlap conditions from `src/utils/availability.ts` into it. The overlap check still allows touching endpoints. `App.tsx` now passes the selected room's bookings and blocked state to `canBook`; the existing availability helper still supplies the explanatory messages shown by the page. I installed Vitest and added the test script. Vitest 5 requires Vite 6.4 or newer, so I updated Vite and its React plugin to compatible versions. The production build and TypeScript check pass. The browser UI check is still pending because this session could not safely select the current Chrome page.

---

## 3. Task 2 — the test plan

Default fixture: `now = 540`, `blocked = false`, `bookings = [{ start: 600, end: 660 }]`, fresh
for every test. **The Expected column comes from AC1–AC4, never from the code.** Write the
**reason** for each expected result **before** you send the generation prompt.

| ID | Candidate / changed input | Expected | AC | Reason (in your words) |
| --- | --- | --- | --- | --- |
| T01 | 660–720 (touching after) | true | AC4 | The existing booking ends at 660, exactly when this request starts, so they only touch. |
| T02 | 540–570 (starts now) | false | AC1 | The request starts at the current time, but AC1 requires a later start. |
| T03 | 720–720 (zero duration) | false | AC1 | Start and end are equal, so this interval has no positive duration. |
| T04 | 750–720 (reversed) | false | AC1 | The start is later than the end, so the interval is reversed. |
| T05 | 1380–1441 (past day end) | false | AC1 | The end is 1441, which is beyond the day's 1440-minute limit. |
| T06 | 720–840 (120 minutes) | true | AC2 | This request is exactly 120 minutes; AC2 rejects only longer requests. |
| T07 | 720–841 (121 minutes) | false | AC2 | This request lasts 121 minutes, exceeding the 120-minute limit. |
| T08 | 570–600 (touching before) | true | AC4 | The request ends at 600, exactly when the existing booking starts, so they only touch. |
| T09 | 630–690 (partial overlap) | false | AC4 | The intervals share the time from 630 to 660. |
| T10 | 570–690 (contains booking) | false | AC4 | The request covers the existing booking from 600 to 660. |
| T11 | 615–645 (inside booking) | false | AC4 | The whole request falls within the existing 600–660 booking. |
| T12 | 600–660 (identical interval) | false | AC4 | The requested interval is exactly the existing booking, so they overlap. |
| T13 | 660–720, blocked = true | false | AC3 | The selected room is blocked, so the request must be rejected. |
| T14 | 630–690, bookings = [] | true | AC4 | There are no existing bookings to overlap this otherwise valid request. |
| AC5 | an Available request — the bookings after the call equal the bookings before | true, data unchanged | AC5 | The request is available, and checking availability must leave the existing booking data unchanged. |
| X1 | 1380–1440 (ends at day boundary) | true | AC1 | 1440 is the allowed end-of-day limit, and the 60-minute request starts after now. |
| X2 | 650–710, bookings = [{ start: 600, end: 660 }, { start: 700, end: 760 }] | false | AC4 | The request overlaps both existing bookings, so it is unavailable. |

X1 and X2 are **your own two cases**: a boundary or a state that T01–T14 do not reach. Fill all
five columns.

---

## 4. Task 3 — the generation prompt and the first suite

**The prompt exactly as I sent it.** Use the deck's prompt with `[our test framework]` replaced by
`Vitest`, followed by the case table from section 3:

````text
Generate tests for the existing booking function using Vitest. Use AC1–AC6 and the reviewed case table below.

Import the real function used by the page. Keep its code unchanged. Use fixed time and fresh fixtures. Assert exact decisions and unchanged booking data.

Return the test file, run command, and AC mapping. Flag unclear requirements. We will run the tests ourselves.

Case table:

| ID | Candidate / changed input | Expected | AC | Reason |
| --- | --- | --- | --- | --- |
| T01 | 660–720 (touching after) | true | AC4 | The existing booking ends at 660, exactly when this request starts, so they only touch. |
| T02 | 540–570 (starts now) | false | AC1 | The request starts at the current time, but AC1 requires a later start. |
| T03 | 720–720 (zero duration) | false | AC1 | Start and end are equal, so this interval has no positive duration. |
| T04 | 750–720 (reversed) | false | AC1 | The start is later than the end, so the interval is reversed. |
| T05 | 1380–1441 (past day end) | false | AC1 | The end is 1441, which is beyond the day's 1440-minute limit. |
| T06 | 720–840 (120 minutes) | true | AC2 | This request is exactly 120 minutes; AC2 rejects only longer requests. |
| T07 | 720–841 (121 minutes) | false | AC2 | This request lasts 121 minutes, exceeding the 120-minute limit. |
| T08 | 570–600 (touching before) | true | AC4 | The request ends at 600, exactly when the existing booking starts, so they only touch. |
| T09 | 630–690 (partial overlap) | false | AC4 | The intervals share the time from 630 to 660. |
| T10 | 570–690 (contains booking) | false | AC4 | The request covers the existing booking from 600 to 660. |
| T11 | 615–645 (inside booking) | false | AC4 | The whole request falls within the existing 600–660 booking. |
| T12 | 600–660 (identical interval) | false | AC4 | The requested interval is exactly the existing booking, so they overlap. |
| T13 | 660–720, blocked = true | false | AC3 | The selected room is blocked, so the request must be rejected. |
| T14 | 630–690, bookings = [] | true | AC4 | There are no existing bookings to overlap this otherwise valid request. |
| AC5 | An Available request; bookings after the call equal bookings before | true, data unchanged | AC5 | The request is available, and checking availability must leave the existing booking data unchanged. |
| X1 | 1380–1440 (ends at day boundary) | true | AC1 | 1440 is the allowed end-of-day limit, and the 60-minute request starts after now. |
| X2 | 650–710, bookings = [{ start: 600, end: 660 }, { start: 700, end: 760 }] | false | AC4 | The request overlaps both existing bookings, so it is unavailable. |

Current booking.ts code:

```ts
import { MAX_DURATION_MINUTES, MINUTES_PER_DAY } from "@/utils/time";

export interface CanBookInput {
  start: number;
  end: number;
  now: number;
  blocked: boolean;
  bookings: { start: number; end: number }[];
}

export function canBook({
  start,
  end,
  now,
  blocked,
  bookings,
}: CanBookInput): boolean {
  if (
    !Number.isFinite(start) ||
    !Number.isFinite(end) ||
    start < 0 ||
    end > MINUTES_PER_DAY ||
    start >= end
  ) {
    return false;
  }

  if (start <= now) return false;
  if (end - start > MAX_DURATION_MINUTES) return false;
  if (blocked) return false;

  const overlaps = bookings.filter(
    (booking) => start < booking.end && booking.start < end
  );
  return overlaps.length === 0;
}
```
````

**The assistant's answer: run command, AC mapping and any unclear requirements it flagged,
pasted unedited.** Its test file goes to `suites/first/` and is not pasted here:

````text
Here is the Vitest test suite, run command, and requirement mapping for the `canBook` function.

### Unclear Requirements Flag

**Missing AC6:** The prompt requests using AC1–AC6, but the provided case table and the codebase only mention AC1 through AC5. No test cases or rules were provided for AC6. The tests below cover all provided cases (AC1–AC5). Please clarify the acceptance criteria for AC6.

### Run Command

```bash
npx vitest run booking.test.ts

```

### Test File: `booking.test.ts`

```typescript
import { describe, it, expect } from "vitest";
import { canBook, type CanBookInput } from "./booking"; // Adjust path if necessary

describe("canBook()", () => {
  // Fresh fixtures factory to prevent mutation bleed and guarantee independent tests
  const getBaseInput = (): Omit<CanBookInput, "start" | "end"> => ({
    now: 540, // Fixed time based on T02
    blocked: false,
    bookings: [{ start: 600, end: 660 }], // Default existing booking derived from T01, T08-T12
  });

  describe("AC1: Interval validity, day limits, and future start times", () => {
    it("T02: rejects if start time is equal to current 'now' (540-570)", () => {
      const input = { ...getBaseInput(), start: 540, end: 570 };
      expect(canBook(input)).toBe(false);
    });

    it("T03: rejects zero duration intervals (720-720)", () => {
      const input = { ...getBaseInput(), start: 720, end: 720 };
      expect(canBook(input)).toBe(false);
    });

    it("T04: rejects reversed intervals (750-720)", () => {
      const input = { ...getBaseInput(), start: 750, end: 720 };
      expect(canBook(input)).toBe(false);
    });

    it("T05: rejects intervals extending past the end of the day limit (1380-1441)", () => {
      const input = { ...getBaseInput(), start: 1380, end: 1441 };
      expect(canBook(input)).toBe(false);
    });

    it("X1: allows intervals ending exactly at the day boundary (1380-1440)", () => {
      const input = { ...getBaseInput(), start: 1380, end: 1440 };
      expect(canBook(input)).toBe(true);
    });
  });

  describe("AC2: Maximum duration limits", () => {
    it("T06: allows a request of exactly 120 minutes (720-840)", () => {
      const input = { ...getBaseInput(), start: 720, end: 840 };
      expect(canBook(input)).toBe(true);
    });

    it("T07: rejects a request exceeding the 120-minute limit (720-841)", () => {
      const input = { ...getBaseInput(), start: 720, end: 841 };
      expect(canBook(input)).toBe(false);
    });
  });

  describe("AC3: Room block status", () => {
    it("T13: rejects a valid interval if the room is blocked", () => {
      const input = { ...getBaseInput(), start: 660, end: 720, blocked: true };
      expect(canBook(input)).toBe(false);
    });
  });

  describe("AC4: Overlapping with existing bookings", () => {
    it("T01: allows booking that touches the end of an existing booking (660-720)", () => {
      const input = { ...getBaseInput(), start: 660, end: 720 };
      expect(canBook(input)).toBe(true);
    });

    it("T08: allows booking that touches the start of an existing booking (570-600)", () => {
      const input = { ...getBaseInput(), start: 570, end: 600 };
      expect(canBook(input)).toBe(true);
    });

    it("T09: rejects partial overlap ending inside an existing booking (630-690)", () => {
      const input = { ...getBaseInput(), start: 630, end: 690 };
      expect(canBook(input)).toBe(false);
    });

    it("T10: rejects booking that entirely contains an existing booking (570-690)", () => {
      const input = { ...getBaseInput(), start: 570, end: 690 };
      expect(canBook(input)).toBe(false);
    });

    it("T11: rejects booking that is entirely inside an existing booking (615-645)", () => {
      const input = { ...getBaseInput(), start: 615, end: 645 };
      expect(canBook(input)).toBe(false);
    });

    it("T12: rejects booking with identical interval to an existing booking (600-660)", () => {
      const input = { ...getBaseInput(), start: 600, end: 660 };
      expect(canBook(input)).toBe(false);
    });

    it("T14: allows booking when there are no existing bookings (630-690)", () => {
      const input = { ...getBaseInput(), start: 630, end: 690, bookings: [] };
      expect(canBook(input)).toBe(true);
    });

    it("X2: rejects booking that overlaps multiple existing bookings (650-710)", () => {
      const input = {
        ...getBaseInput(),
        start: 650,
        end: 710,
        bookings: [
          { start: 600, end: 660 },
          { start: 700, end: 760 },
        ],
      };
      expect(canBook(input)).toBe(false);
    });
  });

  describe("AC5: Pure function constraints", () => {
    it("AC5: leaves the existing booking data completely unchanged", () => {
      const originalBookings = [{ start: 600, end: 660 }];
      // Create a fresh deep copy to detect potential inner object mutations
      const input = {
        ...getBaseInput(),
        start: 660,
        end: 720,
        bookings: [{ start: 600, end: 660 }],
      };

      const result = canBook(input);

      expect(result).toBe(true); // Sanity check that it's a valid Available request
      expect(input.bookings).toEqual(originalBookings);
      expect(input.bookings).not.toBe(originalBookings); // Ensures we are testing against mutation on our passed copy
    });
  });
});

```

### Acceptance Criteria Mapping

| Criteria | Covered Test IDs | Goal Checked |
| --- | --- | --- |
| **AC1** | T02, T03, T04, T05, X1 | Requires strictly positive duration, later start time than `now`, and an end time $\le$ `MINUTES_PER_DAY`. |
| **AC2** | T06, T07 | Rejects requests whose duration is greater than `MAX_DURATION_MINUTES`. |
| **AC3** | T13 | Ensures `blocked: true` results in an immediate rejection regardless of valid times. |
| **AC4** | T01, T08, T09, T10, T11, T12, T14, X2 | Validates that intervals strictly inside or spanning across existing bookings fail, but touching boundaries succeed. |
| **AC5** | AC5 | Pure function test asserting `bookings` array reference and internal properties are unmutated. |
| **AC6** | *None* | **Flagged above:** Missing from the case table and requirements. |
````

The first suite was saved to `suites/first/` **before** I changed anything in it: yes 

---

## 5. Task 4 — review of the first suite

Review it **before** you run it. Look at the imports, the expected values, isolation, duplicates
and skipped tests. Make one row per decision. At least **two** rows, and each one names the kind of
weakness (the deck's table: *no exception occurred* · *expected = current output* · *only valid
requests* · *mocked booking function*, or your own) and the AC that decides it.

| # | Test or part of the suite | What is weak or wrong | Decision: accept / revise / reject | AC or reason |
| --- | --- | --- | --- | --- |
| 1 | T01–T14, X1, X2 | The tests use exact boolean assertions, cover accepted and rejected cases, import the real `./booking` module, and create fresh fixtures with a fixed `now`. | accept | AC1–AC4 determine the expected decisions; there are no mocks, skipped tests, or shared mutable fixtures. |
| 2 | AC5 booking-data check | The expected array is constructed separately instead of copying `input.bookings` immediately before the call. Revise this in the final suite to snapshot the actual input bookings before calling `canBook`. | revise | AC5 requires comparing the bookings after an Available call with a copy taken before that call. Keep `suites/first/` unchanged. |
| 3 | Gemini's AC6 flag | The assistant says AC6 is missing from the requirements. That is not a unit-suite gap: AC6 is checked through the page's manual UI behavior. | reject | The README separates unit tests for `canBook` from manual UI checks; do the AC6 checks in Part 7. |

---

## 6. Task 5 — running, diagnosing, improving

### 6.1 The first run

The **real** terminal output of the first run of the first suite, pasted unedited. Include the
`RUN  v…` line and the `Tests` summary line. A build message or the assistant saying "tests pass"
is not a run.

```text
 RUN  v5.1.0 C:/Users/ARnur/Desktop/Software Enginering/se-practice/week-07/app

 ✓ src/booking.test.ts (17 tests) 9ms
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
       ✓ T08: allows booking that touches the start of an existing booking (570-600) 0ms
       ✓ T09: rejects partial overlap ending inside an existing booking (630-690) 0ms
       ✓ T10: rejects booking that entirely contains an existing booking (570-690) 0ms
       ✓ T11: rejects booking that is entirely inside an existing booking (615-645) 0ms
       ✓ T12: rejects booking with identical interval to an existing booking (600-660) 0ms
       ✓ T14: allows booking when there are no existing bookings (630-690) 0ms
       ✓ X2: rejects booking that overlaps multiple existing bookings (650-710) 0ms
     ✓ AC5: Pure function constraints (1)
       ✓ AC5: leaves the existing booking data completely unchanged 1ms

 Test Files  1 passed (1)
      Tests  17 passed (17)
   Start at  01:29:05
   Duration  911ms (transform 60%, import 21%, worker 10%, tests 8%)
```

**Each failure, diagnosed** (the deck's table: import/runner error · assertion mismatch · result
changing per run · no tests discovered). Write `none` in the first row if nothing failed.

| Failing test | Observed failure | First check | Test repair or implementation fix? | Action taken |
| --- | --- | --- | --- | --- |
| none | No failures; the first suite passed all 17 tests. | — | — | No setup or implementation fix was needed from this run. |

### 6.2 The improvement prompt

The deck's improvement prompt exactly as sent, followed by the actual output from 6.1. Then
paste the assistant's answer, unedited:

````text
Review this test suite against AC1–AC6 and our case table. Identify incorrect expectations, weak assertions, duplicated cases, and missing boundaries.

For each proposed change, explain the requirement and the defect it could detect. Improve the tests without changing correct expectations to match buggy behavior.

Use the actual failure output below. Separate test repairs from implementation fixes.

 RUN  v5.1.0 C:/Users/ARnur/Desktop/Software Enginering/se-practice/week-07/app


 Test Files  1 passed (1)
      Tests  17 passed (17)

Assistant review:

The first run passed all 17 tests, so it revealed no implementation defect and no incorrect expected value. Keep the implementation unchanged.

The suite imports the real `./booking` function, uses a fixed numeric `now`, creates a fresh fixture for each test, asserts exact boolean results, and contains separate named tests for T01–T14, AC5, X1, and X2. The touching, overlap, duration, blocked-room, and day-boundary cases match the plan. No mocks, skipped tests, focused tests, or table-driven tests were found.

Revise the AC5 assertion in the final copy: construct the Available input, make `const bookingsBefore = structuredClone(input.bookings)` immediately before calling `canBook(input)`, then compare `input.bookings` with `bookingsBefore`. The generated suite compares against a separately constructed array rather than a snapshot of the actual input. A direct snapshot checks that the call leaves the exact booking data unchanged, as AC5 requires. Keep the original suite in `suites/first/` untouched.

The AC6 flag is not a missing unit test. AC6 concerns visible page validation and mobile usability; those checks belong to the manual UI task. No extra `canBook` test is needed for AC6.
````

### 6.3 The final run

The **real** output of the final suite (`booking.test.*` beside your module), after every
change and after restoring the correct code from section 7. Every test must pass. If a real defect
is still open, leave its test failing and explain it in 9.1.

```text
 RUN  v5.1.0 C:/Users/ARnur/Desktop/Software Enginering/se-practice/week-07/app

 ✓ src/booking.test.ts (17 tests) 8ms
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
       ✓ T08: allows booking that touches the start of an existing booking (570-600) 0ms
       ✓ T09: rejects partial overlap ending inside an existing booking (630-690) 0ms
       ✓ T10: rejects booking that entirely contains an existing booking (570-690) 0ms
       ✓ T11: rejects booking that is entirely inside an existing booking (615-645) 0ms
       ✓ T12: rejects booking with identical interval to an existing booking (600-660) 0ms
       ✓ T14: allows booking when there are no existing bookings (630-690) 0ms
       ✓ X2: rejects booking that overlaps multiple existing bookings (650-710) 0ms
     ✓ AC5: Pure function constraints (1)
       ✓ AC5: leaves the existing booking data completely unchanged 1ms

 Test Files  1 passed (1)
      Tests  17 passed (17)
   Start at  01:27:13
   Duration  931ms (transform 66%, import 19%, worker 8%, tests 7%)

```

---

## 7. Task 6 — deliberate defects

You need a reviewed, passing suite first. Then introduce **one** defect at a time in your booking
module, leave the tests unchanged, run, record, and **restore** the code. A syntax or import
error does not count as detection.

| Trial | Intentional change | Detected / Survived | Failing test ID(s) | If it survived: why, and what you added |
| --- | --- | --- | --- | --- |
| M1 | Reject duration >= 120 instead of > 120 | Detected | T06 | — |
| M2 | Treat touching endpoints as an overlap | Detected | T01, T08, AC5 | — |
| M3 | Remove the blocked-room rejection | Detected | T13 | — |

**The run of each mutant, pasted unedited.** Paste the `Tests` summary line and the failing test
names at least:

M1 run:

```text
 RUN  v5.1.0 C:/Users/ARnur/Desktop/Software Enginering/se-practice/week-07/app

 ❯ src/booking.test.ts (17 tests | 1 failed) 16ms
   ❯ canBook() (17)
     ❯ AC2: Maximum duration limits (2)
       × T06: allows a request of exactly 120 minutes (720-840) 8ms

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/booking.test.ts > canBook() > AC2: Maximum duration limits > T06: allows a request of exactly 120 minutes (720-840)
AssertionError: expected false to be true // Object.is equality

 ❯ src/booking.test.ts:42:30
     40|     it("T06: allows a request of exactly 120 minutes (720-840)", () =>…
     41|       const input = { ...getBaseInput(), start: 720, end: 840 };
     42|       expect(canBook(input)).toBe(true);
       |                              ^
     43|     });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


 Test Files  1 failed (1)
      Tests  1 failed | 16 passed (17)
```

M2 run:

```text
 RUN  v5.1.0 C:/Users/ARnur/Desktop/Software Enginering/se-practice/week-07/app

 ❯ src/booking.test.ts (17 tests | 3 failed) 22ms
   ❯ canBook() (17)
     ❯ AC4: Overlapping with existing bookings (8)
       × T01: allows booking that touches the end of an existing booking (660-720) 9ms
       × T08: allows booking that touches the start of an existing booking (570-600) 1ms
     ❯ AC5: Pure function constraints (1)
       × AC5: leaves the existing booking data completely unchanged 3ms

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 3 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/booking.test.ts > canBook() > AC4: Overlapping with existing bookings > T01: allows booking that touches the end of an existing booking (660-720)
AssertionError: expected false to be true // Object.is equality
 ❯ src/booking.test.ts:61:30

 FAIL  src/booking.test.ts > canBook() > AC4: Overlapping with existing bookings > T08: allows booking that touches the start of an existing booking (570-600)
AssertionError: expected false to be true // Object.is equality
 ❯ src/booking.test.ts:66:30

 FAIL  src/booking.test.ts > canBook() > AC5: Pure function constraints > AC5: leaves the existing booking data completely unchanged
AssertionError: expected false to be true // Object.is equality
 ❯ src/booking.test.ts:120:22

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/3]⎯


 Test Files  1 failed (1)
      Tests  3 failed | 14 passed (17)
```

M3 run:

```text
 RUN  v5.1.0 C:/Users/ARnur/Desktop/Software Enginering/se-practice/week-07/app

 ❯ src/booking.test.ts (17 tests | 1 failed) 21ms
   ❯ canBook() (17)
     ❯ AC3: Room block status (1)
       × T13: rejects a valid interval if the room is blocked 9ms

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/booking.test.ts > canBook() > AC3: Room block status > T13: rejects a valid interval if the room is blocked
AssertionError: expected true to be false // Object.is equality
 ❯ src/booking.test.ts:54:30

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


 Test Files  1 failed (1)
      Tests  1 failed | 16 passed (17)
```

All three changes reverted, and the full suite run again (section 6.3): yes

---

## 8. Task 7 — manual UI checks

Use `now = 09:00` and an existing `10:00–11:00` booking. Do them in the page in a browser. Save a
screenshot of each as `evidence/ui-1.png` … `evidence/ui-5.png`. Take **ui-4 at phone width**
(about 375 px, portrait).

| # | Action | Expected observation | AC | What I observed | Pass / Fail / Not testable |
| --- | --- | --- | --- | --- | --- |
| U1 | Check 11:00–12:00, unblocked | Available, with the fixed sample booking | AC5 | Beacon Lab 2B showed Available for 11:00–12:00; the 10:00 booking remained visible. | Pass |
| U2 | Enable blocked, then check again | Unavailable replaces the earlier result | AC3, AC5 | Cascade Seminar Room showed Unavailable with its maintenance reason for 11:00–12:00. | Pass |
| U3 | Clear a required input and submit | Understandable validation feedback | AC6 | With Requested start empty, the field was highlighted and the page showed a clear HH:MM validation message. | Pass |
| U4 | Use a narrow (phone) width | Controls and result remain usable | AC6 | At phone width, the room choices, check button, and result remained visible and usable. | Pass |
| U5 | Repeat the checks on the same data | Existing bookings remain unchanged | AC5 | Rechecking Beacon Lab 2B showed Available for 11:00–12:00; the 10:00 booking remained visible and the page said no bookings were modified. | Pass |

---

## 9. Comparison and what still fails

### 9.1 Checks I am keeping as FAIL or ERROR

Use the same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check | Why it stays |
| --- | --- |
| none | All reported checks passed. |

### 9.2 Original and improved suites

| Measure | First suite | Improved suite |
| --- | --- | --- |
| Executed / passed / failed | 17 / 17 / 0 | 17 / 17 / 0 |
| Requirements with meaningful tests (AC IDs and gaps) | AC1–AC5 have planned cases; AC6 is manual. No non-finite time case. | AC1–AC5 have planned cases; AC6 is manual. No non-finite time case. |
| Selected mutants detected | Not mutation-tested separately. | 3/3: M1 by T06; M2 by T01 and T08 (also AC5); M3 by T13. |
| Accepted / revised / rejected tests | Accepted T01–T14, X1 and X2; revised AC5; rejected the claim that AC6 needs a unit test. | Same cases retained; AC5 now snapshots the actual input before the call. |
| Remaining limitations | No test for NaN inputs; AC5 compares against a separately constructed array. | No test for NaN inputs; ACs do not specify behavior for invalid existing bookings. |

### 9.3 What no AC decides

Call your function with `bookings = [{ start: 700, end: 650 }]` (a reversed existing booking)
and a request of 660–720. What does it return? Does any AC say what it should return? (This is
the value you declare in `submission.yml` under `assumptions.invalid_existing_booking`.)

With `now = 540` and `blocked = false`, `canBook` returns `true`. The candidate interval is valid, starts after now, lasts 60 minutes, and is not blocked. The overlap expression evaluates false for the reversed existing interval (`660 < 650` is false), so the function treats it as non-overlapping. No AC specifies how invalid existing bookings should be handled.

---

## 10. Conclusion (120–180 words)

<!-- Answer all three in your own words, without the assistant:
     (a) Which mistake in the FIRST suite would have let a wrong canBook pass, and how did you find it?
     (b) What does your final green run prove, and what does it NOT prove? Use a mutant or a UI check.
     (c) One testing limitation that remains.
     Worthless: "The AI wrote good tests and they all passed."
     Worth everything: "The first suite expected T06 (exactly 120 minutes) to be rejected. That
     contradicts AC2, and it failed on a correct canBook. If I had changed the code to make it
     pass, M1 would have become the real behaviour." -->

The first suite left a boundary uncovered: it never tried a non-finite start or end. AC1 requires an interval within numeric day limits, so a faulty `canBook` that returned true for `NaN` could still pass those tests. I noticed this by comparing the cases with AC1. The first run passed 17/17; after revising AC5 to snapshot the actual bookings before the call, the final run also passed 17/17. That confirms the tested decisions and that this Available call preserves its fixture. The mutant runs add evidence: M1 failed T06, M2 failed T01 and T08, and M3 failed T13. The green run does not prove every possible input or page layout is correct; the manual screenshots are separate evidence. One limitation remains: invalid existing bookings are not defined by any AC. With `{start:700,end:650}`, the function returns true for 660–720, and the tests record that behavior without deciding whether it is desirable.
