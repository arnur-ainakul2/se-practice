# SIS #04 — Report: Evolving the Smart Campus Room Availability Checker

<!-- The ONLY file you write prose in. Keep every numbered heading (## 1. … ## 10.), every
     ### sub-heading and every **Label:** word — the checker finds your answers by them.
     Replace every "(write here)" and "(paste here)". Delete these <!-- --> comments if you like. -->

## 1. Setup and starting point

<!-- Model: the exact model with its version, as the tool shows it ("ChatGPT" is a tool, not a
     model). If the tool does not show it, write: not displayed
     Starting point: week-08 | week-07 | sis-03 | starter   (README section 3)
     Baseline commit: the commit that brings your starting point into sis-04/app/ UNCHANGED —
     git rev-parse --short HEAD right after that commit. It is your "initial version". -->

| Item | Value |
| --- | --- |
| Assistant (tool) | Codex |
| Assistant model | Codex 6 Luna |
| Starting point | week-08 |
| Baseline commit | 7f70152 |
| Language (ts or js) | ts |
| Vitest version | v5.1.0 |
| Where I ran the tests | my computer |

### 1.1 Baseline run

<!-- Before you change anything: run the tests of your starting point inside app/ and paste the
     REAL output. No tests yet (starter, sis-03)? Paste the run anyway: Vitest prints
     "No test files found". That is your honest "original" number, 0/0. -->

```text
PS C:\Users\ARnur\Desktop\software enginering\se-practice\sis-04\app> npx vitest run

 RUN  v5.1.0 C:/Users/ARnur/Desktop/Software Enginering/se-practice/sis-04/app

 ✓ src/booking.test.ts (19 tests) 9ms
   ✓ canBook() (19)
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
   Start at  20:05:41
   Duration  819ms (transform 62%, import 20%, worker 10%, tests 7%)

```

## 2. Context for the assistant

### 2.1 Repository map

<!-- The concise map you gave the assistant: the files that matter and one line each on what
     they do. A tree is fine:  src/App.tsx — the page, holds the rooms and the form … -->

```text
app/src/App.tsx — Main page: holds selected room and time inputs, runs canBook/checkAvailability, and renders the room selector, timeline, and result.
app/src/booking.ts — canBook() applies the core interval, future-time, 120-minute, blocked-room, and overlap rules.
app/src/utils/availability.ts — checkAvailability() builds an Available/Unavailable result and explanatory reasons using a room and its bookings.
app/src/utils/time.ts — Time constants and helpers for parsing, formatting, and calculating time values.
app/src/data/sampleData.ts — Fictional room catalog and bookings; bookings refer to rooms by room_id. Rooms currently have no equipment field.
app/src/types.ts — Shared TypeScript definitions for Room, Booking, and CheckResult.
app/src/components/RoomSelector.tsx — Displays the room choices, including building, capacity, and blocked status.
app/src/components/TimeInput.tsx — Reusable labeled time input with validation hints.
app/src/components/Timeline.tsx — Displays the selected room’s existing bookings and proposed interval.
app/src/components/ResultBanner.tsx — Displays the pending prompt or availability decision and its reasons.
app/src/booking.test.ts — Vitest tests for canBook(), including AC1–AC5 and boundary cases.
app/src/main.tsx — React entry point; mounts App and imports the global stylesheet.
app/src/index.css — Global styles and Tailwind directives.
app/package.json — Project scripts and dependencies, including Vite, React, TypeScript, and Vitest.
app/index.html — Vite HTML entry point containing the root element for the React app.
app/vite.config.ts, app/tsconfig*.json, app/tailwind.config.js, app/postcss.config.js, app/eslint.config.js — Build, TypeScript, styling, and lint configuration.
```

### 2.2 The context message as sent

<!-- The whole first message of your analysis chat: the map, AC1–AC6, F1–F5 and the constraints
     (no login, payments, live APIs or database; fictional data only). Unedited. -->

```text
I’m working on SIS #04, evolving my Week 08 Smart Campus Room Availability Checker. Please analyze the current code and suggest maintainability risks with specific file/function references, then give me a prioritized plan of small, safe steps. Do not write or change any code yet, and do not propose a full rewrite.

Repository map:
- app/src/App.tsx — Main page: holds selected room and time inputs, runs canBook/checkAvailability, and renders the room selector, timeline, and result.
- app/src/booking.ts — canBook() applies the core interval, future-time, 120-minute, blocked-room, and overlap rules.
- app/src/utils/availability.ts — checkAvailability() builds an Available/Unavailable result and explanatory reasons using a room and its bookings.
- app/src/utils/time.ts — Time constants and helpers for parsing, formatting, and calculating time values.
- app/src/data/sampleData.ts — Fictional room catalog and bookings; bookings refer to rooms by room_id. Rooms currently have no equipment field.
- app/src/types.ts — Shared TypeScript definitions for Room, Booking, and CheckResult.
- app/src/components/RoomSelector.tsx — Displays the room choices, including building, capacity, and blocked status.
- app/src/components/TimeInput.tsx — Reusable labeled time input with validation hints.
- app/src/components/Timeline.tsx — Displays the selected room’s existing bookings and proposed interval.
- app/src/components/ResultBanner.tsx — Displays the pending prompt or availability decision and its reasons.
- app/src/booking.test.ts — Vitest tests for canBook(), including AC1–AC5 and boundary cases.
- app/src/main.tsx — React entry point; mounts App and imports the global stylesheet.
- app/src/index.css — Global styles and Tailwind directives.
- app/package.json — Project scripts and dependencies, including Vite, React, TypeScript, and Vitest.
- app/index.html — Vite HTML entry point containing the root element for the React app.
- app/vite.config.ts, app/tsconfig*.json, app/tailwind.config.js, app/postcss.config.js, app/eslint.config.js — Build, TypeScript, styling, and lint configuration.

Acceptance criteria to preserve:
AC1 Reject start ≥ end and requests in the past.
AC2 Enforce the maximum allowed duration (120 minutes).
AC3 Reject a blocked room.
AC4 Reject overlaps; allow bookings that only touch at endpoints.
AC5 Return Available / Unavailable without changing booking data.
AC6 Clear, responsive feedback on desktop and mobile.

New requirements:
F1 Capacity filter: room capacity must be greater than or equal to the requested attendees.
F2 Equipment filter: the room must contain ALL selected required items.
F3 A blocked room cannot be reported as available.
F4 Show a clear empty state when no rooms match.
F5 Changing the selected room must refresh the availability result appropriately. The availability check must use the selected room’s own bookings.

Constraints:
Use fictional room and booking data only. No login, payments, live APIs, or database. The project uses TypeScript and React. The assignment requires a catalog of at least four rooms, with each room having an ID, name, capacity, equipment list, blocked status, and its own bookings. Please identify risks based on the mapped starting code, distinguish observed evidence from hypotheses, and propose small steps in priority order. Do not provide implementation code yet.
```

## 3. Codebase analysis (Task 1)

### 3.1 Maintainability risks

<!-- At least three, found in YOUR starting code. "Where" names a file or a function(),
     e.g. src/App.tsx, check(). Evidence is what you saw, not what the assistant said.
     Priority: High / Medium / Low. -->

| # | Risk | Where (file / function) | Evidence | Priority |
| --- | --- | --- | --- | --- |
| 1 | The availability decision and its explanation are computed by separate functions, so their rules can diverge. | `src/App.tsx`, `onCheck()`; `src/utils/availability.ts`, `checkAvailability()` | `onCheck()` calls `canBook()` for the decision and `checkAvailability()` for the reasons. `checkAvailability()` independently checks interval validity, time, duration, blocked status, and overlaps. | High |
| 2 | The room model does not yet represent required equipment, so the new equipment filter has no data to use. | `src/types.ts`, `Room`; `src/data/sampleData.ts`, `rooms` | `Room` has no `equipment` property, and none of the five sample room records supplies an equipment list. | High |
| 3 | The selected room's bookings are prepared in two different ways, which creates a risk that the decision and explanation use different booking sets. | `src/App.tsx`, `onCheck()` | `canBook()` receives bookings filtered by `room_id` and mapped to `{ start, end }`; `checkAvailability()` receives the full `bookings` array and filters it internally. | High |
| 4 | Adding filter controls and empty-state behavior could make the page component harder to maintain. | `src/App.tsx`, `App()` | `App()` already owns room and time state, input validation, result invalidation, both availability calls, and composition of the selector, timeline, and result. | Medium |
| 5 | The existing automated suite does not cover the new catalog filtering and room-switching requirements. | `src/booking.test.ts` | The file tests `canBook()` rules and boundaries; it has no tests for capacity, equipment, an empty filtered list, or checking different rooms. | Medium |

### 3.2 Improvement plan — before editing

<!-- Numbered, in the order you will do it, smallest safe step first. Written BEFORE you change
     code: the commit that adds this section comes before the commit that changes app/src. -->

1. Add test cases for the new filtering and selected-room behavior, using fixed room fixtures and expected results derived from F1–F5; keep the existing AC1–AC5 tests as regression coverage.
2. Add `equipment` to the `Room` type and give every fictional room an equipment list without changing its existing ID, capacity, or blocked status.
3. Implement the pure `filterRooms()` function and test capacity ≥ attendees, inclusion of all selected equipment, and no matches.
4. Implement the required `checkRoom(rooms, roomId, request)` in `src/booking.ts`; make it call `canBook()` with only the selected room's own blocked status and bookings, and return false for an unknown ID.
5. Connect the filtered catalog and attendee/equipment controls in the UI. Show a clear empty state, keep the selected ID valid when filters change, and clear a stale result when relevant inputs change.
6. Remove the duplicate availability decision path in `App`: use the required booking functions as the source of the decision and keep any explanation consistent with that result. Preserve the timeline and result components where practical.
7. Run the full Vitest suite after each step, then verify the UI at desktop and narrow phone widths and capture the required evidence screenshots.

### 3.3 One AI suggestion I rejected or modified

| Suggestion (as the assistant made it) | Decision | Why — with the AC, F-rule, test or file behind it |
| --- | --- | --- |
| The suggestion to replace the two availability calls with one domain-level check returning both a decision and reasons. | Modified | The brief fixes `canBook()` and `checkRoom()` as boolean checks, and `checkRoom()` must call `canBook()`. I will keep those required signatures and make `canBook()` the single source for the booking decision; any UI explanation must agree with that result rather than independently reimplementing AC1–AC5. |

## 4. Feature extension (Task 2)

### 4.1 What I added

<!-- Short: the catalog (how many rooms, which equipment), how the filter is chosen on the page,
     what the empty state says, what happens to an old result when the room changes. -->

The catalog contains five fictional rooms with capacities from 12 to 120 seats. Their equipment includes projectors, whiteboards, computers, microphones, and video-conferencing equipment; bookings are stored on each room. The page filters by attendee count and selected equipment, requiring every selected item. It shows “No rooms match these requirements” when the filter is empty. Blocked rooms remain visible with a Blocked label. Changing the room or any filter/time input clears the previous result. `checkRoom()` checks the selected room's own blocked status and bookings.

### 4.2 Demonstration

<!-- One row per screenshot in evidence/. Say what is on it: the filter values, the rooms shown,
     the room selected, the times entered and the result. -->

| Screenshot | What it shows |
| --- | --- |
| `evidence/filter-match.png` | Capture: attendees = 20, projector and whiteboard selected; show only Aurora Hall 101 and Driftwood Studio 4. |
| `evidence/filter-empty.png` | Capture: attendees = 200 and projector selected; show no room cards and the empty-state message. |
| `evidence/switch-a.png` | Capture: current time 09:00, 10:00–11:00 selected for Aurora Hall 101; show Available. |
| `evidence/switch-b.png` | Capture: same current/start/end times as switch-a.png, but Beacon Lab 2B selected; show Unavailable. |
| `evidence/narrow.png` | Capture the page at phone width in portrait orientation, with the filters and room cards readable. |

## 5. Refactoring (Task 3)

<!-- The diagrams are diagrams/before.puml and diagrams/after.puml (README section 8). -->

### 5.1 Module responsibilities after

| Module or component | Responsibility |
| --- | --- |
| `src/rooms.ts` | (write here) |
| `src/booking.ts` | (write here) |
| `src/filter.ts` | (write here) |
| (write here) | (write here) |

### 5.2 Design decisions

<!-- At least two. The alternative is what you could have done instead (often what the assistant
     proposed). The why names an AC, an F-rule, a test or a risk from 3.1. -->

| Decision | Alternative I did not take | Why |
| --- | --- | --- |
| (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) |

### 5.3 Duplication removed

<!-- One row per duplicated location that is gone. Count what you can point at, nothing else. -->

| Before (file / function, what was repeated) | After (where it lives now) |
| --- | --- |
| (write here) | (write here) |

## 6. Automated tests (Task 4)

### 6.1 Test plan

<!-- One row per required ID. A test may carry several IDs in its title,
     e.g. test('T06 B1 AC2: exactly 120 minutes is available', …) covers B1 and AC2. -->

| ID | Test title (as in the file) | Input → expected |
| --- | --- | --- |
| AC1 | (write here) | (write here) |
| AC2 | (write here) | (write here) |
| AC3 | (write here) | (write here) |
| AC4 | (write here) | (write here) |
| AC5 | (write here) | (write here) |
| F1 | (write here) | (write here) |
| F2 | (write here) | (write here) |
| F3 | (write here) | (write here) |
| F4 | (write here) | (write here) |
| F5 | (write here) | (write here) |
| B1 | (write here) | (write here) |
| B2 | (write here) | (write here) |
| B3 | (write here) | (write here) |
| B4 | (write here) | (write here) |
| B5 | (write here) | (write here) |
| B6 | (write here) | (write here) |
| INT | (write here) | (write here) |

### 6.2 Commands

<!-- The commands exactly as you typed them, from app/. -->

```text
(paste here)
```

### 6.3 Final run

<!-- The REAL output of the full run on your final code. Every test passes, and the number of
     tests equals what your test files hold (R2). -->

```text
(paste here)
```

## 7. Quality evaluation (Task 5)

<!-- Original = your baseline commit. Final = what you submit. "How I obtained it" says how you
     measured, so someone else could repeat it: "1.1 and 6.3 runs", "counted in 5.3",
     "git ls-files app/src". Do not invent a metric. Tests: write passed/total, e.g. 19/19. -->

| Measure | Original | Final | How I obtained it |
| --- | --- | --- | --- |
| Automated tests passed / total | (write here) | (write here) | (write here) |
| Duplicated logic locations removed | (write here) | (write here) | (write here) |
| Code structure: modules and their responsibilities | (write here) | (write here) | (write here) |
| Remaining limitation | (write here) | (write here) | (write here) |

## 8. AI evidence appendix

<!-- At least three exchanges, one ### 8.N block each: the analysis (Task 1), the plan, and at
     least one implementation, refactoring or test exchange. Copy the block for more.
     The prompt as you sent it; the output may be cut to the part you used, with "[…]" where
     you cut. Verified by: the test, run, file or check that confirmed it — not "it looked right". -->

### 8.1 Exchange 1

**Tool and model:** (write here)
**Date:** (write here)
**Purpose:** (write here)

**Prompt:**

```text
(paste here)
```

**Output used:**

```text
(paste here)
```

**Problems found:** (write here)
**Changes made:** (write here)
**Verified by:** (write here)

### 8.2 Exchange 2

**Tool and model:** (write here)
**Date:** (write here)
**Purpose:** (write here)

**Prompt:**

```text
(paste here)
```

**Output used:**

```text
(paste here)
```

**Problems found:** (write here)
**Changes made:** (write here)
**Verified by:** (write here)

### 8.3 Exchange 3

**Tool and model:** (write here)
**Date:** (write here)
**Purpose:** (write here)

**Prompt:**

```text
(paste here)
```

**Output used:**

```text
(paste here)
```

**Problems found:** (write here)
**Changes made:** (write here)
**Verified by:** (write here)

## 9. Checker results and known fails

<!-- Every check still FAIL or ERROR in your last run of python tests/check_sis.py, and why.
     The same IDs go in submission.yml known_fails. None left? Write: none. -->

| Check | Why it still fails |
| --- | --- |
| (write here) | (write here) |

## 10. AI reflection (Task 6)

<!-- 200–300 words, your own words, no assistant. Answer all five:
     What context did you provide the AI assistant? Which generated suggestions were useful or
     incorrect? What did you personally verify? How did tests influence your engineering
     decisions? What would you improve next? -->

(write here)
