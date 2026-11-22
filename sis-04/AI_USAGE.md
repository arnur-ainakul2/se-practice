# AI Usage Disclosure — SIS #04

Required by the course academic policy (Generative AI use level **D — AI-integrated**).
You are responsible for the accuracy, testing and integrity of everything you submit,
including anything an AI tool produced.

| Tool | Exact model / plan | Date | Used for | Which files it touched |
| --- | --- | --- | --- | --- |
| Codex desktop | Codex 6 Luna (plan not displayed) | 2026-11-22 | codebase analysis (Task 1) | `sis-04/report.md` §§2–3 |
| Codex desktop | Codex 6 Luna (plan not displayed) | 2026-11-22 | improvement plan | `sis-04/report.md` §§3.2–3.3 |
| Codex desktop | Codex 6 Luna (plan not displayed) | 2026-11-22 | feature extension (Task 2) | `sis-04/app/src/App.tsx`, `booking.ts`, `booking.test.ts`, `components/RoomSelector.tsx`, `components/Timeline.tsx`, `data/sampleData.ts`, `filter.ts`, `rooms.ts`, `types.ts`, `utils/availability.ts` |
| Codex desktop | Codex 6 Luna (plan not displayed) | 2026-11-22 | refactoring (Task 3) | `sis-04/app/src/App.tsx`, `booking.ts`, `components/Timeline.tsx`, `types.ts`, removed `utils/availability.ts`; `sis-04/diagrams/after.puml`; `sis-04/report.md` §5 |
| Codex desktop | Codex 6 Luna (plan not displayed) | 2026-11-22 | tests (Task 4) | `sis-04/app/src/booking.test.ts`, `sis-04/app/README.md`, `sis-04/report.md` §6 |

<!-- Delete rows you did not use the assistant for; add rows for anything else. The optional
     extension (an existing skill or a read-only MCP server) goes here too, with its permissions. -->

**The assistant wrote, or helped write, tests in `app/`:** yes
<!-- Either answer is allowed. If "yes": which tests, and how you checked that their EXPECTED values
     come from AC1–AC5 and F1–F5, not from what the code happens to return. -->
The expected results were checked against the acceptance criteria and feature rules: for example, a 120-minute request is accepted and 121 minutes is rejected (AC2/B1/B2); endpoint-touching bookings are allowed and overlapping bookings are rejected (AC4/B3/B4); capacity equal to the attendee count is included and one seat below is excluded (F1/B5/B6). The room-switching test uses fixed room fixtures with different bookings and asserts the expected boolean for each room. Expected values are written explicitly in the tests; they are not obtained by calling the implementation to generate expectations.

**Every run pasted in report.md was produced by my code on my machine (or Codespace), unedited:** yes 

**Every number in report.md section 7 was measured the way its row says:** yes 

**I shared no credentials, keys or private data with any tool:** yes 

**Everything I submitted, I can explain and defend in class — including filterRooms, checkRoom and
why each module exists:** yes 

**Anything I accepted from the AI without fully understanding it:**
<!-- Name the file and the line. An honest entry here costs far less than a blank one that turns out to be untrue. -->
nope 

Signed: Ainakul Arnur
Date: 11/22/2026
