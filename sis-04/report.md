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
| `src/rooms.ts` | Defines the `Room` type and the fictional `ROOMS` catalog. Each room contains its own equipment, blocked status, and bookings. |
| `src/booking.ts` | Owns booking rules: `canBook()` checks AC1–AC5, `checkRoom()` selects the room and delegates to `canBook()`, and `isValidInterval()` shares the interval rule with the timeline UI. |
| `src/filter.ts` | Implements the pure `filterRooms()` function for capacity and all selected equipment. |
| `src/App.tsx` | Holds UI state and composes the page; imports the catalog, filter, and booking functions instead of defining room or availability rules. |
| `src/components/RoomSelector.tsx` | Presents matching rooms and their capacity, equipment, and blocked label. |
| `src/components/Timeline.tsx` | Draws the selected room's bookings and the requested interval. |
| `src/components/TimeInput.tsx`, `src/components/ResultBanner.tsx` | Render the time fields and the availability feedback. |

### 5.2 Design decisions

<!-- At least two. The alternative is what you could have done instead (often what the assistant
     proposed). The why names an AC, an F-rule, a test or a risk from 3.1. -->

| Decision | Alternative I did not take | Why |
| --- | --- | --- |
| Keep blocked rooms visible with a Blocked label. | Hide blocked rooms from the filtered list. | Showing them lets students see why a room cannot be reported available; `checkRoom()` still rejects them (F3), covered by the F3 test. |
| Store each room's bookings inside its catalog record. | Keep a separate global booking list keyed by room ID. | `checkRoom()` can pass the chosen room's own bookings directly to `canBook()`, reducing the chance of checking another room's schedule (F5). |
| Keep `filterRooms()` as a pure function in its own module. | Filter inside `App.tsx`. | The F1/F2 behavior is independently testable and the page stays focused on presentation. |

### 5.3 Duplication removed

<!-- One row per duplicated location that is gone. Count what you can point at, nothing else. -->

| Before (file / function, what was repeated) | After (where it lives now) |
| --- | --- |
| `src/utils/availability.ts`, `checkAvailability()` repeated interval, time, duration, blocked-room, and overlap checks already handled in `src/booking.ts`, `canBook()`. | Removed the duplicate module; `checkRoom()` delegates the availability decision to `canBook()`. |
| `src/App.tsx`, `onCheck()` called `canBook()` and `checkAvailability()` separately for the same request. | `src/App.tsx` now calls `checkRoom()` for one decision and displays feedback from that result. |
| `src/App.tsx` checked `startMin < endMin` when preparing the timeline interval, duplicating part of AC1. | The page calls `isValidInterval()` from `src/booking.ts`, which is also used by `canBook()`. |

## 6. Automated tests (Task 4)

### 6.1 Test plan

<!-- One row per required ID. A test may carry several IDs in its title,
     e.g. test('T06 B1 AC2: exactly 120 minutes is available', …) covers B1 and AC2. -->

| ID | Test title (as in the file) | Input → expected |
| --- | --- | --- |
| AC1 | `AC1: rejects a request that starts before current time (510-540)`; `T02 AC1: rejects if start time is equal to current 'now' (540-570)`; `T03 AC1: rejects zero duration intervals (720-720)`; `T04 AC1: rejects reversed intervals (750-720)` | With now=540, past/equal starts and start ≥ end return false. |
| AC2 | `T06 AC2 B1: allows a request of exactly 120 minutes (720-840)`; `T07 AC2 B2: rejects a request exceeding the 120-minute limit (720-841)` | 120 minutes returns true; 121 minutes returns false. |
| AC3 | `T13 AC3: rejects a valid interval if the room is blocked` | Blocked=true with otherwise valid interval returns false. |
| AC4 | `T09 AC4 B4: rejects partial overlap ending inside an existing booking (630-690)`; `T01 AC4 B3: allows booking that touches the end of an existing booking (660-720)` | Overlap returns false; endpoint touch returns true. |
| AC5 | `AC5: leaves the existing booking data completely unchanged`; `AC5: checking availability does not modify room bookings` | Check `canBook()` and `checkRoom()` against cloned input data; booking data remains equal. |
| F1 | `F1 B5: includes a room whose capacity exactly matches attendees`; `F1 B6: excludes a room one seat below the attendee count` | Capacity 8 with 8 attendees is included; capacity 8 with 9 attendees is excluded. |
| F2 | `F2: requires every selected equipment item` | Selecting projector and whiteboard returns only the room containing both. |
| F3 | `F3: never reports a blocked room as available` | A blocked room checked through `checkRoom()` returns false. |
| F4 | `F4: returns an empty list when no room matches` | No room meeting 200 attendees and the equipment criteria returns an empty list. |
| F5 | `F5: uses the selected room's own bookings when switching rooms`; `F5: returns unavailable for an unknown room ID` | Same request is false for the room with an overlapping booking and true for the room with no bookings; unknown ID returns false. |
| B1 | `T06 AC2 B1: allows a request of exactly 120 minutes (720-840)` | 720–840 with now=540 returns true. |
| B2 | `T07 AC2 B2: rejects a request exceeding the 120-minute limit (720-841)` | 720–841 with now=540 returns false. |
| B3 | `T01 AC4 B3: allows booking that touches the end of an existing booking (660-720)` | Request starts at the existing booking's end; returns true. |
| B4 | `T09 AC4 B4: rejects partial overlap ending inside an existing booking (630-690)` | Request overlaps booking 600–660; returns false. |
| B5 | `F1 B5: includes a room whose capacity exactly matches attendees` | Room capacity 8 with 8 attendees is included. |
| B6 | `F1 B6: excludes a room one seat below the attendee count` | Room capacity 8 with 9 attendees is excluded. |
| INT | `INT: filters the catalog and checks a matching room's availability` | `filterRooms()` returns the qualifying fixture; `checkRoom()` on that result returns true for an available interval. |

### 6.2 Commands

<!-- The commands exactly as you typed them, from app/. -->

```text
npx vitest run
npm run typecheck
npm run build
npm run lint
```

### 6.3 Final run

<!-- The REAL output of the full run on your final code. Every test passes, and the number of
     tests equals what your test files hold (R2). -->

```text
PS C:\Users\ARnur\Desktop\software enginering\se-practice\sis-04\app> npx vitest run                                 

 RUN  v5.1.0 C:/Users/ARnur/Desktop/Software Enginering/se-practice/sis-04/app

 ✓ src/booking.test.ts (29 tests) 13ms
   ✓ canBook() (20)
     ✓ AC1: Interval validity, day limits, and future start times (6)
       ✓ AC1: rejects a request that starts before current time (510-540) 2ms
       ✓ T02 AC1: rejects if start time is equal to current 'now' (540-570) 0ms
       ✓ T03 AC1: rejects zero duration intervals (720-720) 0ms
       ✓ T04 AC1: rejects reversed intervals (750-720) 0ms
       ✓ T05 AC1: rejects intervals extending past the end of the day limit (1380-1441) 0ms
       ✓ X1 AC1: allows intervals ending exactly at the day boundary (1380-1440) 0ms
     ✓ AC2: Maximum duration limits (2)
       ✓ T06 AC2 B1: allows a request of exactly 120 minutes (720-840) 0ms
       ✓ T07 AC2 B2: rejects a request exceeding the 120-minute limit (720-841) 0ms
     ✓ AC3: Room block status (1)
       ✓ T13 AC3: rejects a valid interval if the room is blocked 0ms
     ✓ AC4: Overlapping with existing bookings (9)
       ✓ T01 AC4 B3: allows booking that touches the end of an existing booking (660-720) 0ms
       ✓ T08 AC4: allows booking that touches the start of an existing booking (570-600) 0ms
       ✓ T09 AC4 B4: rejects partial overlap ending inside an existing booking (630-690) 0ms
       ✓ T10 AC4: rejects booking that entirely contains an existing booking (570-690) 0ms
       ✓ T11 AC4: rejects booking that is entirely inside an existing booking (615-645) 0ms
       ✓ T12 AC4: rejects booking with identical interval to an existing booking (600-660) 0ms
       ✓ T14 AC4: allows booking when there are no existing bookings (630-690) 0ms
       ✓ X2 AC4: rejects booking that overlaps multiple existing bookings (650-710) 0ms
       ✓ BUG-A AC4: allows a request that touches existing bookings on both sides (630-690) 0ms
     ✓ AC5: Pure function constraints (2)
       ✓ AC5: leaves the existing booking data completely unchanged 1ms
       ✓ BUG-B: leaves bookings unchanged for an available request touching nothing (720-780) 0ms
   ✓ room catalog and filters (9)
     ✓ F1 B5: includes a room whose capacity exactly matches attendees 1ms
     ✓ F1 B6: excludes a room one seat below the attendee count 0ms
     ✓ F2: requires every selected equipment item 0ms
     ✓ F4: returns an empty list when no room matches 0ms
     ✓ F3: never reports a blocked room as available 0ms
     ✓ F5: uses the selected room's own bookings when switching rooms 0ms
     ✓ F5: returns unavailable for an unknown room ID 0ms
     ✓ AC5: checking availability does not modify room bookings 1ms
     ✓ INT: filters the catalog and checks a matching room's availability 0ms

 Test Files  1 passed (1)
      Tests  29 passed (29)
   Start at  22:01:25
   Duration  925ms (import 39%, transform 27%, tests 19%, worker 14%, environment 1%)
```

## 7. Quality evaluation (Task 5)

<!-- Original = your baseline commit. Final = what you submit. "How I obtained it" says how you
     measured, so someone else could repeat it: "1.1 and 6.3 runs", "counted in 5.3",
     "git ls-files app/src". Do not invent a metric. Tests: write passed/total, e.g. 19/19. -->

| Measure | Original | Final | How I obtained it |
| --- | --- | --- | --- |
| Automated tests passed / total | 19/19 | 29/29 | Read the `Tests` lines in §1.1 (baseline) and §6.3 (final). |
| Duplicated logic locations removed | 0 | 3 | Count the three concrete locations listed in §5.3. |
| Code structure: modules and their responsibilities | 14 source files: `App.tsx` coordinates the page; `sampleData.ts` holds rooms and a separate global booking list; booking decisions are implemented in both `booking.ts` and `utils/availability.ts`; reusable UI components, types, and time helpers are also present. | 14 source files: responsibilities are separated across `rooms.ts`, `booking.ts`, `filter.ts`, `App.tsx`, reusable UI components, shared result types, and time helpers. | Count the baseline files with `git ls-tree -r --name-only 7f70152 -- sis-04/app/src`, the final files with `git ls-files sis-04/app/src`, and compare responsibilities with §5.1. Both lists contain 14 files. |
| Remaining limitation | Room and booking data are fictional and static. | The catalog and timetable are still fictional constants that must be edited in source to change; the app does not load live campus schedules. | Compare baseline `src/data/sampleData.ts` with final `src/rooms.ts`; the assignment also excludes live APIs and databases. |

## 8. AI evidence appendix

<!-- At least three exchanges, one ### 8.N block each: the analysis (Task 1), the plan, and at
     least one implementation, refactoring or test exchange. Copy the block for more.
     The prompt as you sent it; the output may be cut to the part you used, with "[…]" where
     you cut. Verified by: the test, run, file or check that confirmed it — not "it looked right". -->

### 8.1 Exchange 1

**Tool and model:** Codex (Codex 6 Luna)
**Date:** 2026-11-22
**Purpose:** Analyze the Week 08 baseline and identify maintainability risks before changing code.

**Prompt:**

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

**Output used:**

```text
## Observed evidence

I reviewed the working copy at `sis-04/app/src`. The SIS #04 brief confirms that this is the Week 08 starting point and calls for a catalog, filters, separated modules, and tests. Current code has five fictional rooms, but the `Room` type and every room record lack an equipment list.

## Maintainability risks

| Priority | Risk | Evidence and impact |
| --- | --- | --- |
| **High** | Availability rules are split across two checks. | In [App.tsx](/C:/Users/ARnur/Desktop/software%20enginering/se-practice/sis-04/app/src/App.tsx:63), `onCheck` calls `canBook()` for the decision and `checkAvailability()` for the reasons, then combines their outputs. [availability.ts](/C:/Users/ARnur/Desktop/software%20enginering/se-practice/sis-04/app/src/utils/availability.ts:24) repeats interval, future-time, blocked-room, and overlap rules. If one check changes without the other, the displayed decision and reasons can disagree. |
| **High** | Room requirements are not represented in the data model. | [types.ts](/C:/Users/ARnur/Desktop/software%20enginering/se-practice/sis-04/app/src/types.ts:10) defines `Room` without `equipment`; [sampleData.ts](/C:/Users/ARnur/Desktop/software%20enginering/se-practice/sis-04/app/src/data/sampleData.ts:3) has five rooms with capacity and blocked status, but no equipment. Capacity/equipment matching has no existing domain-level implementation. |
| **High** | Booking data is supplied in two shapes to the checks. | In [App.tsx](/C:/Users/ARnur/Desktop/software%20enginering/se-practice/sis-04/app/src/App.tsx:74), `canBook` receives bookings filtered by selected room and reduced to intervals; `checkAvailability` receives all bookings at line 83 and filters them internally. The current room scoping agrees, but keeping two paths in sync creates room for F5 regressions. |
| **Medium** | Filter, result invalidation, and room-selection behavior will add more responsibilities to `App`. | `App` already owns catalog state, selected room, three time inputs, validation, two check calls, and rendering. `updateRoom` clears the previous result at lines 33–36, which supports F5’s stale-result requirement. Adding attendee/equipment inputs and empty-state handling here without clear boundaries could make the page harder to change safely. |
| **Medium** | The current result model cannot distinguish a filter-empty catalog from an unavailable booking request. | [CheckResult](/C:/Users/ARnur/Desktop/software%20enginering/se-practice/sis-04/app/src/types.ts:19) describes only pending/available/unavailable, while [RoomSelector.tsx](/C:/Users/ARnur/Desktop/software%20enginering/se-practice/sis-04/app/src/components/RoomSelector.tsx:10) renders every provided room and has no empty-state branch. This is a design gap to address for F4, not evidence of a current runtime bug. |
| **Low** | Rule and UI changes may lack matching automated coverage. | [booking.test.ts](/C:/Users/ARnur/Desktop/software%20enginering/se-practice/sis-04/app/src/booking.test.ts:4) covers `canBook()` and AC1–AC5, but contains no filter, equipment, empty-state, or room-switching tests. The report records 19 passing baseline tests; I did not run them as part of this review. |

## Hypotheses to verify during implementation

- **Hypothesis:** The page may keep showing the old selected room if filtering removes it. `App` falls back to `rooms[0]` when the selected ID is missing ([App.tsx](/C:/Users/ARnur/Desktop/software%20enginering/se-practice/sis-04/app/src/App.tsx:50)), but there is no filtered catalog yet, so this behavior has not been exercised.
- **Hypothesis:** The availability explanation can omit or misstate a failed rule if `canBook` and `checkAvailability` diverge. They currently encode similar rules, but no test asserts their decisions remain aligned.

## Prioritized small-step plan

1. **Add equipment to the room type and fictional data.** Give every room an equipment list, preserving the existing IDs, capacities, and blocked status. This makes F2’s inputs explicit and keeps the catalog self-contained.
2. **Add a small pure `filterRooms` function.** Pass rooms, attendee count, and selected equipment; keep a room only if its capacity is sufficient and it includes every required item. Add focused tests for capacity equality, multiple required items, and no requirements.
3. **Define filtered-room selection and empty-state behavior.** In the page, derive the filtered catalog, show an explicit no-match message for an empty result, and ensure selection always refers to a visible room. Avoid silently treating an unrelated fallback room as the filtered selection.
4. **Unify the booking result path.** Move toward one domain-level check that receives the catalog, selected room ID, request, and relevant booking data, then returns both decision and reasons. This is the key F3/F5 safeguard; retain the current interval and endpoint semantics.
5. **Connect the UI in small pieces.** Add attendee and equipment controls, pass the filtered rooms to `RoomSelector`, and retain result invalidation when relevant inputs change. Keep the room’s displayed timeline and availability check tied to that room’s bookings.
6. **Add integration-focused tests.** Cover all F1–F5 cases, especially blocked-room rejection, empty results, and switching between rooms with different bookings. Preserve the existing AC1–AC5 boundary tests.
7. **Review responsive feedback after wiring the UI.** Confirm the filter controls, empty state, result reasons, and room selection remain readable and usable at narrow widths, supporting AC6.

This plan preserves the existing booking rules and makes each change small enough to review independently. I made no code changes.
```

**Problems found:** The recommendation to replace the two checks with one function returning both a decision and reasons needed modification: the assignment requires boolean `canBook()` and `checkRoom()` signatures, and `checkRoom()` must call `canBook()`.
**Changes made:** Recorded the observed risks and prioritized plan in report §§3.1–3.3 before changing `app/src`; later implemented the required catalog, filter, and selected-room check.
**Verified by:** Baseline files and functions named above; checker results L2–L4 passed after the analysis and plan were recorded.

### 8.2 Exchange 2

**Tool and model:** Codex (Codex 6 Luna)
**Date:** 2026-11-22
**Purpose:** Plan the refactoring and diagrams before making the refactoring changes.

**Prompt:**

```text
 ## 8. Task 3 — refactoring → `report.md` §5 + `diagrams/`

Do not edit any files yet—let's plan Task 3 step by step first.

Inspect the current repository state and outline a safe, sequential plan to complete Task 3:
1. Verify that Task 2 (catalog and filters) is cleanly committed before starting the refactoring stage.
2. Separate room data (`rooms`), booking/availability rules (`booking`), filtering logic (`filter`), and UI presentation (`App` and components) so the UI holds no room data and repeats no validation rules of its own (A5).
3. Identify and remove any remaining duplicated validation or rendering logic (such as legacy availability checks or inline interval checks in the UI) while keeping all AC1–AC5 tests green after every step.
4. Create `diagrams/before.puml` (based on the starting baseline commit) and `diagrams/after.puml` (final refactored structure) as PlantUML component diagrams—one box per module or component, one arrow per import, explicitly naming `rooms`, `booking`, `filter`, and the UI.
5. Prepare the design decision justifications (§5.2) and the diff-backed table of removed duplications (§5.3) for `report.md`.
```

**Output used:**

```text
We will tackle Task 3 after the catalog and filters are committed: the assignment requires saving each change as a separate commit, so the refactoring should follow the Task 2 commit.

## Plan

1. Verify that the catalog and filtering stage is committed. If not, commit it first so that refactoring remains a separate step.
2. Create `diagrams/before.puml` based on the initial Week 08 commit rather than the current code, showing how `App`, data, rules, utilities, and components originally depended on one another.
3. Remove the remaining duplicated availability check. `App` already uses `checkRoom()`, but `utils/availability.ts` still contains the legacy independent rule implementation. I will inspect its imports and, if the module is no longer needed, delete it along with any obsolete types while keeping AC1–AC5 verified by the tests.
4. Remove the `start < end` check from `App`'s display logic if it still duplicates the rule in `canBook()`. I will find a way to preserve accurate timeline rendering so the UI does not evaluate availability rules on its own.
[…]
```

**Problems found:** `utils/availability.ts` still contained an unused second implementation of the booking rules, and the UI separately checked interval ordering for the timeline.
**Changes made:** Removed the duplicate availability module, added shared `isValidInterval()` in `booking.ts`, updated the timeline labels for narrow screens, created `after.puml`, and filled report §5.
**Verified by:** `npx vitest run` reported 28/28 after refactoring; typecheck, build, and lint passed. Checker D1–D2 and L6 passed.

### 8.3 Exchange 3

**Tool and model:** Codex (Codex 6 Luna)
**Date:** 2026-11-22
**Purpose:** Audit automated-test coverage, add any missing boundary test, document commands, and record the real final test run.

**Prompt:**

```text
 ## 9. Task 4 — automated tests → `report.md` §6

Implement Task 4 by updating the Vitest test suite, creating `app/README.md`, and filling out §6 in `report.md` according to these exact requirements:

1. **Test coverage & IDs:** Keep the existing Week 07/08 suite and ensure there are at least 10 executable Vitest tests in `app/` next to the modules they test. Every required ID must appear as a standalone word in a `test(...)` title (one test may carry multiple IDs, e.g., `test('T06 B1 AC2: exactly 120 minutes (720-840) is available', () => { … })`):
   - `AC1–AC5`: regression tests verifying all five original booking rules still hold.
   - `F1–F5`: at least one test per new rule (`F1`, `F2`, and `F4` must call `filterRooms`; `F3` and `F5` must call `checkRoom` or render the page).
   - `B1` & `B2`: duration boundaries — 120 minutes returns `true`, 121 minutes returns `false` (`canBook` or `checkRoom`).
   - `B3` & `B4`: booking boundaries — touching an existing booking returns `true`, overlapping returns `false` (`canBook` or `checkRoom`).
   - `B5` & `B6`: capacity boundaries — capacity equal to attendees includes the room, capacity one below excludes it (`filterRooms`).
   - `INT`: integration check calling `filterRooms` and then `checkRoom` on a returned room (or a rendered UI test).

2. **Test rules:** Import from `vitest` and the real `./booking` and `./filter` modules with no mocks. Do not use `.skip`, `.only`, `.todo`, or `test.each`. Define a fixed room fixture array inside the test file instead of importing `ROOMS` from the app, and derive expected outcomes from the §5 specification rather than the implementation's output.

3. **Documentation & report:**
   - Create `app/README.md` with setup, dev server, and test commands (`npm install`, `npm run dev`, `npx vitest run`).
   - Run the full suite and record the commands executed in `report.md` §6.2 and the complete real terminal output in §6.3.
```

**Output used:**

```text
Task 4 is complete. The response identified the concrete remaining gap—AC1 needed a test for a start time strictly earlier than `now`—and reported adding that regression case. It also recorded the supporting documentation work: `app/README.md` now gives the install, development, and test commands, and report §6 documents the test plan and final run.
The verification reported in the reply was 29/29 Vitest tests passing, with typecheck, build, and lint passing as well. These details are summarized in English here; the short Russian paragraph above is the original response excerpt.
```

**Problems found:** AC1 did not have a separate strict-past test, and `app/README.md` plus report §6 were incomplete.
**Changes made:** Added the strict-past AC1 test; documented the test IDs and expected results; added setup/run/test commands to the app README; recorded the final Vitest output.
**Verified by:** `npx vitest run` reported 29/29; `npm run typecheck`, `npm run build`, and `npm run lint` passed. The checker passed S1–S7, A8, R2, and L7.

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

At the start I gave the assistant the Week 08 codebase map, AC1-AC6, F1-F5 and the project constraints, and asked it to analyze the code and write a step-by-step plan before touching any files. The plan gave me an order I could actually follow: add `equipment` to the room data, build and test filtering, and only then connect the filtered rooms to room selection and availability.

The analysis was right about two things: the availability logic was duplicated between `canBook()` and `checkAvailability()`, and the room model had no `equipment` field. One suggestion I had to push back on. The assistant wanted to replace `canBook()` and `checkRoom()` with a single function returning a decision plus reasons. It's a tidy idea, but the brief requires both to stay boolean, with `checkRoom()` calling `canBook()`, so I kept them as they were. The price is that the UI can't explain why a room is unavailable. It shows one generic message, "The room is blocked or unavailable for this time range," along with the selected room and time.

Not everything went smoothly. The SIS checker reported only one complete AI exchange, even though I had more. It was reading the numbered headings inside my fenced prompts as report headings. Adding a leading space to those lines fixed the parsing, and the checker passed.

I used the tests to check each rule on its own. AC2 covers the 120- and 121-minute boundaries, AC4 covers endpoint touching and overlap, F1/B5/B6 cover capacity, and F5 checks that switching rooms uses the selected room's bookings. Besides all 29 tests, I ran typecheck, build, lint and the SIS checker.

Next time I'll compare the assistant's suggestions with the required signatures right away, and I'll save prompts and outputs as I go instead of piecing them together later.
