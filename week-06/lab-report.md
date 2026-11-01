# Week 06 — Lab report

**Name:**Ainakul Arnur
**Group:**Monday 16:00
**Date:**10/18/2026

Fill in every section. **Do not delete, rename or renumber the headings** — the checker and the
grader find your answers by them. Add rows to any table; never remove its header.

---

## 1. Setup

| | |
| --- | --- |
| Tool | Bolt.new |
| Exact model (as Bolt shows it, or `not displayed`) |GLM 5.3 Flash|
| Bolt project link (or `not shared`, and why) |https://bolt.new/?classId=b821ca27-77bc-49a8-8d38-127b962fe5c9&assignmentId=88814bc6-47f1-4ee7-9e88-e3d039bf07ea&submissionId=c4b91a45-6f7d-5498-e97c-5bff410e8200|
| Browser and version |Chrome 155.0.8059.84|
| If you could not use Bolt.new: the tool you used instead, and why | no |

---

## 2. Task 1 — define before generating

**Two predictions, written BEFORE you send the first prompt.** Where do you expect v1 to go wrong?
Fill the first three columns now; fill the last one after Task 3.

| # | What I expect to go wrong | AC it concerns | Was I right? (after Task 3) |
| --- | --- | --- | --- |
| 1 | Maybe , porting to mobile app will go wrong| 6 | |
| 2 | It might reject intervals where the start time exactly matches the end time of an existing booking (touching endpoints).| 4 | |

**The initial prompt exactly as I sent it** — the deck's prompt with AC1–AC6 pasted in place of
`[paste AC1–AC6]`, nothing else changed:

```text
Build a small responsive Smart Campus Room Availability Checker. Requirements: 
AC1: Accept a candidate interval only when 0 ≤ start < end ≤ 1440 and start is after the supplied current time.
AC2: Reject a booking longer than 120 minutes.
AC3: Reject the request when the selected room is blocked.
AC4: Reject any interval that overlaps an existing booking; touching endpoints are allowed.
AC5: Show a clear Available / Unavailable decision without changing the existing booking data.
AC6: The page remains usable at desktop and narrow/mobile width and gives understandable validation feedback. 
Use fictional sample data only. Keep the implementation simple and within one-page scope. Do not add authentication, backend services, analytics, or unrelated features. After building, briefly list the main files/components you created.
```

---

## 3. Task 2 — prototype v1

v1 export saved in `original/` and screenshot saved as `evidence/v1.png` **before** any cleanup
prompt: yes / no

**Bolt's list of the files/components it created, pasted unedited:**

```text
- `src/types.ts` — shared TypeScript types
- `src/data/sampleData.ts` — fictional rooms and bookings
- `src/utils/time.ts` — HH:MM ↔ minutes helpers
- `src/utils/availability.ts` — pure availability check logic (AC1–AC4)
- `src/components/RoomSelector.tsx` — room picker cards
- `src/components/TimeInput.tsx` — labeled time field with validation
- `src/components/Timeline.tsx` — 24h schedule visualization
- `src/components/ResultBanner.tsx` — Available/Unavailable decision display
- `src/App.tsx` — page composition and state
```

**What v1 does — one line per thing that works, or visibly does not:**
Displays a responsive UI with a room selector, time inputs, and a visual 24-hour timeline.

Includes functional "Check availability" logic that shows an Available/Unavailable banner.

Prevents actual modification of the existing sample booking data (read-only checks).

Has sample data pre-loaded, including a blocked room with a maintenance reason.
-

**Repair prompt** (only if the first build did not run — the deck allows one, then the result is
v1). Leave empty if you did not need it:

```text
```

---

## 4. Task 3 — the nine cases

Base for every case unless the row says otherwise: **current time 09:00**, room **not blocked**,
the room's **only booking 10:00–11:00**. The Expected column comes from AC1–AC6 — do not change it.
Write each result exactly as **Available**, **Unavailable** or **Not testable** (the page gives you
no way to set up the case). Save each final run as `evidence/final-T<n>.png`.

| # | Case | What you set up and request | Expected | AC | Result on v1 | Result on final | Final screenshot |
| --- | --- | --- | --- | --- | --- | --- | --- |
| T1 | Touching | 11:00–12:00 | Available | AC4 | Available  | Available | final-T1.png |
| T2 | Overlap | 10:30–11:30 | Unavailable | AC4 | Unavailable  | Unavailable | final-T2.png |
| T3 | Blocked | 11:00–12:00, room blocked | Unavailable | AC3 | Unavailable  |   Unavailable | final-T3.png |
| T4 | Exactly 2 hours | 12:00–14:00 | Available | AC2 | Available  | Available | final-T4.png |
| T5 | Over 2 hours | 12:00–14:01 | Unavailable | AC2 |  Unavailable  | Unavailable | final-T5.png |
| T6 | Starts now | 09:00–09:30 (current time 09:00) | Unavailable | AC1 |  Unavailable | Unavailable | final-T6.png |
| T7 | Reversed times | 12:00–11:00, and the page says why | Unavailable | AC1, AC6 | Unavailable | Unavailable | final-T7.png |
| T8 | Same check twice | T1, then T1 again without reloading | Available | AC5 | Available | Available | final-T8.png |
| T9 | Narrow screen | T1 at about 375 px wide | Available | AC6 | Available  | Available | final-T9.png |

---

## 5. Issue log — cleanup targets

One row per issue you chose to act on (or deliberately not act on). At least **two**: one
functional and one usability or code-quality issue when you have them. If v1 passed every case,
log a justified cleanup that preserves behaviour. Save a screenshot of each as
`evidence/issue-<n>.png`.

| # | Issue | Evidence: steps → expected → observed | Priority | Decision |
| --- | --- | --- | --- | --- |
| 1 |The page cannot accept an end time of 24:00 |Enter a request that ends at 24:00 → AC1 allows an end time up to 1440 minutes → the time input only accepts times up to 23:59, so this valid boundary case cannot be entered |  Medium  | Fix  |
| 2 |The displayed result can become outdated after changing the request |Run an availability check, then change the requested time or room without checking again → the result should be cleared or clearly marked as outdated → the previous Available/Unavailable result remains visible | Low | Fix |

---

## 6. Task 4 — cleanup with focused prompts

One issue per prompt. Paste every prompt **as sent** (every `[bracketed field]` and `AC#` filled
in) and Bolt's answer, unedited.

**Functional fix prompt, as sent, and Bolt's answer:**

```text
In the current prototype, trying to enter a request that ends at 24:00 produces no valid input, but AC1 requires an end time up to 1440 minutes (24:00). Make the smallest change that fixes this behavior. Preserve the other acceptance criteria. Explain which file/component you changed and why.

Bolt's answer:
626f6c742d63632d6167656e74The problem: HTML's `<input type="time">` only accepts 00:00–23:59, so 24:00 can't be typed. I'll let the end field use a plain text input and teach the parser to accept "24:00" → 1440, while keeping start/current as time inputs (so they can't be 24:00).I'll add a `type` prop to `TimeInput` so only the end field can accept free text (enabling "24:00"), while start/current stay as native time pickers that physically can't produce "24:00". The parser will accept "24:00" → 1440.Now `minutesToLabel` wraps modulo 1440, which would turn 1440 into "00:00" — that's fine for display of the end boundary in the banner/timeline (it shows "00:00" at the right edge). But the ResultBanner shows `minutesToLabel(result.end)` which for 1440 would show "00:00" — misleading. Let me check and fix the display so 1440 shows as "24:00".I'll fix `minutesToLabel` to render 1440 as "24:00" instead of wrapping.Build passes.

## Summary

You can now type **24:00** in the "Requested end" field, and it will be accepted as 1440 minutes, validated against all acceptance criteria, and displayed as "24:00" in the result banner.

### What changed and why

- **`src/components/TimeInput.tsx`** — added an optional `type` prop (defaults to `"time"`). The end field now uses `type="text"` with a numeric input mode and an `HH:MM` pattern that includes 24:00, because the native `<input type="time">` picker physically cannot emit "24:00" (it caps at 23:59). Start and current time keep the native time picker, so they can never produce 24:00.
- **`src/utils/time.ts`** — `labelToMinutes` now accepts the literal "24:00" and returns `1440`; any other hour stays capped at 23. `minutesToLabel` now renders `1440` as "24:00" instead of wrapping it to "00:00", so the result banner and timeline show the end-of-day boundary correctly.
- **`src/App.tsx`** — the "Requested end" field passes `type="text"` and an updated hint, while the start and current-time fields are unchanged and therefore still cannot be 24:00.

AC1–AC6 are preserved: the 120-minute cap (AC2), blocked-room check (AC3), overlap check with touching endpoints allowed (AC4), read-only Available/Unavailable decision (AC5), and responsive layout with validation feedback (AC6) all still apply to the new 24:00 end value.
```

**Cleanup prompt, as sent, and Bolt's answer:**

```text
Review only the request form and result feedback for confusing UI feedback when a user changes the selected room or requested times after running a check. Suggest one small cleanup. Do not add features or redesign the whole application. Implement it only if it preserves AC1–AC6.

Bolt's answer:
626f6c742d63632d6167656e74The confusing bit: after you run a check, the **Available / Unavailable** banner and the timeline's proposed-interval color stay frozen on the old verdict even after you change the room or times. A stale decision next to freshly edited inputs reads as contradictory feedback.

Small cleanup: clear the stale result whenever any form input changes, so the banner returns to its neutral "pick a room and time" state until the user runs the check again. This touches only display timing — it doesn't alter AC1–AC6 validation logic.I'll wrap the setters so any form change clears the stale result, and do the same for room selection.Build passes.

## Summary

The confusing feedback: after running a check, the **Available / Unavailable** banner and the timeline's proposed-interval color stayed frozen on the old verdict even after you changed the room or times — so a stale decision sat next to freshly edited inputs.

The cleanup: any change to the room, current time, start, or end now clears the previous verdict, returning the banner to its neutral "pick a room and time" state until you run the check again. I made the change only in `src/App.tsx` by routing the existing setters through small wrappers that clear the result; no validation logic, acceptance criteria, or visual layout was touched. AC1–AC6 are fully preserved.
```

Add further blocks for further prompts.

**Every change or suggestion Bolt made, judged.** Accepting is a decision; so is rejecting. Cite
the AC (or the scope) that justifies it.

| # | What Bolt changed or suggested | accept / reject | Reason — cite the AC or the scope | Retest: which cases, result |
| --- | --- | --- | --- | --- |
| 1 | Updated the requested end-time field to accept 24:00; updated the time parser to convert it to 1440 minutes and the formatter to display it as 24:00. Start and current-time fields remain native time inputs.| accept  |AC1 allows an end time up to 1440 minutes. Keeping the change limited to the requested end field preserves the intended input for start and current time.|Tested an interval ending at 24:00 and reran T1–T9. All tests passed; everything works as expected |
| 2 | Clear the previous availability result whenever the room, current time, requested start, or requested end changes.| accept  |AC5 requires a clear availability decision, and AC6 requires understandable feedback. Clearing an outdated result prevents it from appearing to describe the edited request.|Changed the room and time inputs after running a check, then reran T1–T9. The stale result cleared as expected; all tests passed. |

---

## 7. Change log — v1 to final

Two to four concrete changes, each one retested.

| # | Issue | Decision | Change (file or component) | Result after retest |
| --- | --- | --- | --- | --- |
| 1 |The requested end time could not be set to 24:00.|Fix|Updated TimeInput.tsx, time.ts, and App.tsx to allow 24:00 for the requested end time, convert it to 1440 minutes, and display it correctly.|Tested an interval ending at 24:00 and reran T1–T9. All worked as expected.|
| 2 |The previous availability result remained visible after changing the request.|Fix|Updated App.tsx to clear the result whenever the room or a time input changes.|Tested changing the room and times after a check, then reran T1–T9. All worked as expected.|

---

## 8. One generated component, in my own words

Pick one file or component Bolt generated that matters for AC1–AC5 — the one that decides
availability is the best choice. Name its path in backticks, then explain in your own words, without
the assistant, what it does and how it decides. 60 words or more.

**File:** `src/utils/availability.ts`

<!-- Write your explanation below this line -->
The checkAvailability function receives the selected room, the requested start and end times, the current time, and the existing bookings. It checks whether the interval is valid and starts after the current time. It also rejects requests longer than 120 minutes and requests for blocked rooms. Then it checks whether the requested interval overlaps a booking in the selected room. If any check fails, it adds a reason and returns “unavailable”; otherwise, it returns “available.” The function only checks the data and does not modify bookings.
---

## 9. What still fails, and what the criteria do not say

### 9.1 Checks I am keeping as FAIL or ERROR

The same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check | Why it stays |
| --- | --- |
| P3 | The checker finds `@supabase/supabase-js` in `prototype/package.json` and flags it as a backend/database dependency. I am keeping this FAIL because the dependency is present in the final prototype's package manifest, even though the app does not use it. |
### 9.2 The end of the day

AC1 allows `end ≤ 1440` — a booking may end at 24:00. Can a user of your final page ask for
23:00–24:00? How — and if not, why is that acceptable or not? (This is the value you declare in
`submission.yml` under `assumptions.end_of_day`.)

-Yes. The final page allows the user to enter 24:00 as the requested end time. The time parser converts it to 1440 minutes, and the result displays it as 24:00. The start time and current time remain regular time inputs. In submission.yml, I would declare typed-24:00.

### 9.3 Which "now"?

AC1 says "after the supplied current time". What did **v1** use as the current time, and what did
that mean for testing case T6?

-In v1, the current time was initialized from the computer's local clock. The page also had an editable current-time field, so I could set it to 09:00 for T6. With the current time set to 09:00, a request starting at 09:00 should be unavailable because AC1 requires the start time to be after the current time.

---

## 10. Conclusion (120–180 words)

<!-- Answer all three, in your own words, without the assistant:
     (a) Which of your two predictions in section 2 was right, and what did v1 actually get wrong?
     (b) Which AI suggestion did you reject, or would have been wrong to accept, and why?
     (c) What is the difference between "the prototype looks finished" and "the prototype meets
         AC1-AC6" - shown with one case from section 4?
     Worthless: "Bolt made some mistakes and I fixed them."
     Worth everything: "T8 failed on v1: the Check button also added the booking to the list, so
     checking 11:00-12:00 a second time said Unavailable. AC5 says the check must not change the
     booking data." -->

<!-- Write your conclusion below this line -->
My first prediction was that the mobile layout might fail, but v1 remained usable at a narrow screen width. My second prediction was that touching endpoints might be rejected; that was also incorrect because T1 passed. The actual cleanup issues I addressed were that the end-time field could not accept 24:00, and an old result remained visible after changing the inputs. I would reject a suggestion to add a “Book” button or save bookings. The task is a read-only availability checker, and AC5 requires checking availability without changing existing booking data. A prototype can look finished while still failing an acceptance criterion. For example, a polished time field is not enough if it cannot represent the valid 24:00 end boundary allowed by AC1. After the cleanup, I tested entering 24:00 and checked the nine cases again; the results were as expected.