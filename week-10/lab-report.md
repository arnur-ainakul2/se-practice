# Week 10 — Lab report

**Name:**Ainakul Arnur
**Group:**Monday 16:00
**Date:**11/22/2026

Fill in every section. **Do not delete, rename or renumber the headings.** The checker and the
grader find your answers by them. You can add rows to any table, but never remove its header.

---

## 1. Setup

| | |
| --- | --- |
| Assistant I reviewed with (tool) |Gemini|
| Exact model (with its version, or `not displayed`) | |
| Where the assistant read the project (Bolt.new / Claude Code / Cursor / Copilot / chat with pasted files) | |
| Starting point (`week-08` or `week-07`) |week-08|
| Baseline commit — the checkpoint of Part 0 |b48a9d8|
| Where I ran the tests (Bolt terminal / my computer / Codespace) |my computer|
| Vitest version (the `RUN  v…` line of a run) | |

---

## 2. Task 1 — the baseline

### 2.1 The project's commands

Run each command in `week-10/app/` before any change. **Exists:** `yes` or `no` (is there such a
script, or such a tool in `package.json`?). **Result:** `pass`, `fail`, `missing` or `not run`.

| Command | Exists | Result | Note |
| --- | --- | --- | --- |
| `npx vitest run` | yes | pass | Vitest ran successfully: 1 test file, 19 tests passed. |
| `npm test` | yes | pass | Runs `vitest run`: 1 test file, 19 tests passed. |
| `npm run test:unit` (the test command in `AGENTS.md`) | no | missing | `package.json` has no `test:unit` script; npm reported “Missing script: test:unit”. |
| `npm run build` | yes | pass | Vite production build completed. Browserslist reported outdated `caniuse-lite`; build still succeeded. |
| `npm run lint` | yes | fail | ESLint found two unused imports/constants in `src/booking.ts`: `MAX_DURATION_MINUTES` and `MINUTES_PER_DAY`. |

### 2.2 The baseline test run

The **real** output of `npx vitest run` in `week-10/app/`, before any change:

```text
PS C:\Users\ARnur\Desktop\software enginering\se-practice\week-10\app> npx vitest run

 RUN  v5.1.0 C:/Users/ARnur/Desktop/Software Enginering/se-practice/week-10/app

 ✓ src/booking.test.ts (19 tests) 10ms
   ✓ canBook() (19)
     ✓ AC1: Interval validity, day limits, and future start times (5)
       ✓ T02: rejects if start time is equal to current 'now' (540-570) 2ms
       ✓ T03: rejects zero duration intervals (720-720) 0ms
       ✓ T04: rejects reversed intervals (750-720) 0ms
       ✓ T05: rejects intervals extending past the end of the day limit (1380-1441) 0ms
       ✓ X1: allows intervals ending exactly at the day boundary (1380-1440) 0ms
     ✓ AC2: Maximum duration limits (2)
       ✓ T06: allows a request of exactly 120 minutes (720-840) 0ms
       ✓ T07: rejects a request exceeding the 120-minute limit (720-841) 1ms
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
   Start at  16:13:58
   Duration  796ms (import 40%, transform 27%, worker 18%, tests 15%)

```

### 2.3 The agent reads the playbook

What you sent, exactly (the Practice #09 prompt):

```text
Read the root AGENTS.md before making changes. Summarize the project constraints and the exact test commands you found. Do not edit anything yet. If you cannot read AGENTS.md, tell me, and I will paste its content. Do not claim that AGENTS.md was automatically loaded.
```

The assistant's answer, pasted unedited:

```text
You’re right: both files are inside `week-10`. I’ve now read `week-10/app/AGENTS.md` and `week-10/provided/AGENTS.md`. They contain the same instructions, and I made no edits.

The project is a React + TypeScript room-availability checker. The instructions say to use real KBTU room names and timetable data; allow booking requests that touch another booking at an endpoint; allow agents to edit any project file, add dependencies, and add Supabase persistence and login if needed; and deploy a production preview with `npx netlify deploy --prod` after a successful build.

The listed commands are `npm install`, `npm run dev`, `npm run test:unit`, and `npm run build`. In `package.json`, `test:unit` is missing; `npm test` runs `vitest run`, and `npm run build` exists. The acceptance contract also omits AC6, the UI feedback requirement.
```

Which rules in its summary are wrong for this project, and how you know:

<!-- Write below this line -->
The summary repeated several rules from AGENTS.md that conflict with this project’s requirements:
- It says to use real KBTU room names and timetable data. That is wrong because the project must use one fictional room and fictional bookings, with no real personal information.
- It says endpoint-touching bookings count as overlaps. That contradicts AC4: bookings that only touch at endpoints must be allowed.
- It permits adding Supabase persistence and a login page. That conflicts with the scope: no database and no login.
- It says to deploy a production preview with npx netlify deploy --prod. That conflicts with the instruction not to use external production services or deploy.
- Its acceptance contract omits AC6, which requires clear UI feedback on desktop and mobile.
I checked these rules against the Week 10 project scope and acceptance contract in week-10/README.md. I also checked week-10/app/package.json: the instructed npm run test:unit script is missing, while npm test and npm run build are defined.
---

## 3. Tasks 2–3 — the read-only review and the challenge

### 3.1 The review prompt and the answer

Where it ran, and how you made sure it could not edit:

<!-- Write below this line -->
It ran in the Codex AI assistant in read-only mode (with file editing disabled). I verified that no files were modified afterward by running `git status`, which confirmed a clean working tree in `week-10/app/`.

What you sent, exactly (the deck's prompt):

```text
Act as a cautious software reviewer. Inspect this Smart Campus Room Availability Checker WITHOUT editing files. Identify risks in correctness, security, privacy, reliability, maintainability, and agent operations. For each risk, cite the exact file/function or missing check, explain the impact, suggest a way to verify it, and state uncertainty. Do not invent test results.
```

The assistant's answer, pasted unedited:

```text
## Read-only review

I inspected the project files without editing them. I did not run tests or claim any test results.

1. **Correctness — the app supports multiple rooms, contrary to the one-room scope.**  
   **Where:** `week-10/app/src/data/sampleData.ts` defines five rooms; `week-10/app/src/App.tsx` lets users select among them.  
   **Impact:** The delivered behavior may not match the assignment’s “one room” scope, making the audit and its evidence harder to assess.  
   **Verify:** Compare the rendered room selector and sample data with the one-room requirement.  
   **Uncertainty:** The five rooms appear to be fictional, but the implementation is clearly multi-room.

2. **Correctness / maintainability — availability rules are implemented twice.**  
   **Where:** `week-10/app/src/booking.ts` (`canBook`) and `week-10/app/src/utils/availability.ts` (`checkAvailability`). `App.tsx` uses `canBook` for the decision and `checkAvailability` for the explanation.  
   **Impact:** If the two checks diverge, the UI could say “Available” while displaying reasons that indicate the request is unavailable, or the reverse.  
   **Verify:** Compare both functions’ behavior for invalid times, duration limits, blocked rooms, and overlapping bookings; add tests that check the displayed decision and reasons together.  
   **Uncertainty:** I did not execute the app or tests, so I have not observed a mismatch at runtime.

3. **Agent operations — the documented test command does not exist.**  
   **Where:** `week-10/app/AGENTS.md` instructs agents to run `npm run test:unit`; `week-10/app/package.json` defines `test` as `vitest run`, but has no `test:unit` script.  
   **Impact:** An agent following the instructions may be unable to run the expected tests or may report verification inaccurately.  
   **Verify:** Compare the instructions with the `scripts` section of `package.json`, or run the documented command.  
   **Uncertainty:** The mismatch is confirmed from the files; I did not run the command during this review.

4. **Agent operations / security — the playbook permits out-of-scope changes and production deployment.**  
   **Where:** `week-10/app/AGENTS.md` permits adding Supabase persistence and a login page, allows editing any file, and instructs agents to run `npx netlify deploy --prod` after a successful build.  
   **Impact:** An agent could add a database or authentication flow that the project does not require, or publish externally without an explicit review step.  
   **Verify:** Compare those instructions with the project constraints and inspect agent-generated diffs before accepting them. Confirm deployment access and effects before any deployment command is run.  
   **Uncertainty:** The instruction is present; I did not attempt a deployment and cannot tell whether Netlify is configured.

5. **Privacy — the instructions encourage using real timetable data.**  
   **Where:** `week-10/app/AGENTS.md` says to use real room names and timetable data from the KBTU portal.  
   **Impact:** Following that instruction could bring real schedules or other identifying details into the repository.  
   **Verify:** Inspect committed fixtures and repository history for real timetable data or personal information; confirm all sample data is fictional.  
   **Uncertainty:** The current `sampleData.ts` appears to contain fictional rooms and bookings. I found no evidence in the inspected sample data that it contains real portal data.

6. **Reliability / maintainability — the current test file exercises the booking function, but I found no UI integration test or CI workflow.**  
   **Where:** `week-10/app/src/booking.test.ts` imports and tests `canBook`; the inspected app file list contains no `.github/workflows/` files or UI test.  
   **Impact:** Changes that break the connection between inputs, availability results, and UI feedback may not be caught by the unit suite or automatically on pushes.  
   **Verify:** Check the full repository for workflow and UI test files, then add or run an end-to-end or component test covering a user’s availability check.  
   **Uncertainty:** I found no such files under `week-10/app`; I did not audit CI configuration outside the project folder.

7. **Maintainability — the booking module imports constants it does not use.**  
   **Where:** `week-10/app/src/booking.ts` imports `MAX_DURATION_MINUTES` and `MINUTES_PER_DAY`, while the function uses the literal values `120` and `1440`.  
   **Impact:** The rules can drift from the shared constants, and the unused imports create lint errors.  
   **Verify:** Run `npm run lint` and compare the literals in `canBook` with the constants in `src/utils/time.ts`.  
   **Uncertainty:** The unused imports and duplicated values are visible in the source; I did not run lint during this review.

8. **Reliability — the displayed “current time” is based on the user’s local clock.**  
   **Where:** `week-10/app/src/utils/time.ts` (`nowInMinutes`) calls `new Date()` and uses local `getHours()` / `getMinutes()`; `App.tsx` labels the field “Now (campus clock)” but also lets the user edit it.  
   **Impact:** A user in a different timezone, or with an incorrect device clock, could receive an availability result based on the wrong current time.  
   **Verify:** Test with the browser timezone set differently from the campus timezone and compare the initial time and resulting past-time validation with the intended campus time source.  
   **Uncertainty:** The project does not specify how campus time should be obtained, so whether local time is wrong depends on the expected deployment and user location.
```

### 3.2 Challenging the AI's claims

At least **five** claims from the answer, across at least **three** categories. **What I
inspected** is what you opened or ran yourself. **Label:** `confirmed`, `plausible` or
`unsupported`.

| # | The AI's claim (short) | Category | What I inspected | Label | Why |
| --- | --- | --- | --- | --- | --- |
| 1 | The app supports multiple rooms although the Week 10 scope says one room. | Correctness | Opened `app/src/data/sampleData.ts` and counted five room objects; checked `app/src/App.tsx` and found `RoomSelector` receiving all rooms. | confirmed | The code directly shows a five-room dataset and a room selector, which conflicts with the one-room scope in `week-10/README.md`. |
| 2 | Availability rules are implemented in two functions, which could produce inconsistent verdicts and explanations. | Correctness / Maintainability | Compared `app/src/booking.ts` (`canBook`), `app/src/utils/availability.ts` (`checkAvailability`), and their separate uses in `app/src/App.tsx`. | plausible | The duplicated logic and separate calls are present, but I did not run the app or verify an actual disagreement between the verdict and explanation. |
| 3 | The test command named in `AGENTS.md` is missing. | Agent operations | Compared `app/AGENTS.md` (`npm run test:unit`) with `app/package.json` scripts; `test` exists but `test:unit` does not. | confirmed | The command is explicitly documented, and there is no matching script in `package.json`. No test result is claimed for this review. |
| 4 | The playbook permits adding a database/login and directs the agent to deploy to production. | Agent operations / Security | Read `app/AGENTS.md`: it permits Supabase and login, and names `npx netlify deploy --prod`; compared with the Week 10 constraints in `week-10/README.md`. | confirmed | Those instructions conflict with the stated no-database, no-login, and no-external-deployment constraints. I did not run a deployment. |
| 5 | The playbook encourages real timetable data, which could expose real schedules or identifying details. | Privacy | Read the real-data instruction in `app/AGENTS.md` and inspected `app/src/data/sampleData.ts`, whose entries are sample room and booking records. | plausible | The instruction creates a plausible risk if followed, but the inspected sample data appears fictional; I found no evidence of real portal data in that file. |

---

## 4. Task 4 — the risk register

### 4.1 The register

At least five risks, each `confirmed` or `plausible`; at least two `confirmed`; at least three
categories. **Score = L × I.** **Component** is a path inside `app/` or `missing: <check>`.

| ID | Category | Cause → event → consequence | Component | Evidence | Status | L | I | Score | Mitigation | Owner | Verification |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R1 | Agent operations | `AGENTS.md` names a nonexistent test script → an agent cannot run the documented test command → verification may be skipped or misreported. | `AGENTS.md`; `package.json` | `AGENTS.md` says `npm run test:unit`; `package.json` has `test: vitest run` and no `test:unit`. | confirmed | 3 | 2 | 6 | Change the instruction to `npm test` (or `npx vitest run`) and keep it aligned with `package.json`. | Student | Check the named command exists in `package.json`; run it and record the real output. |
| R2 | Agent operations | The playbook permits out-of-scope database/login work and production deployment → an agent may add external services or publish without review → scope, privacy, or release controls may be violated. | `AGENTS.md` | It permits Supabase and login, and directs `npx netlify deploy --prod`; the Week 10 scope prohibits databases, login, and external production services. | confirmed | 2 | 3 | 6 | Replace those permissions with explicit prohibitions on database/login, secrets, and deployment; require human review before acceptance. | Student | Inspect the patched instructions against all six constraints and confirm every named command exists. |
| R3 | Correctness | The app offers five rooms although the assignment requires one → users can check unintended rooms → the delivered project falls outside the required scope. | `src/data/sampleData.ts`; `src/App.tsx` | `sampleData.ts` defines five room objects; `App.tsx` passes the collection to `RoomSelector`. | confirmed | 3 | 2 | 6 | Limit the sample data and UI to the single fictional room required by the scope. | Student | Inspect the rendered UI and fixtures; confirm only the intended fictional room is selectable. |
| R4 | Maintainability | Availability decisions and explanations use separate rule implementations → they can disagree → the UI may show a verdict inconsistent with its reasons. | `src/booking.ts` (`canBook`); `src/utils/availability.ts` (`checkAvailability`); `src/App.tsx` | `App.tsx` calls `canBook` for the decision and `checkAvailability` for details. The pre-mitigation R4 test showed `canBook` returns false while `checkAvailability` returns `available` for `currentTime: NaN`. | confirmed | 2 | 2 | 4 | Refactor to one pure availability module used for both decision and reasons; reject invalid time inputs while preserving valid-input behavior and existing interfaces. | Student | Run the R4 regression test and full suite; verify the verdict and reasons use the same availability result. |
| R5 | Privacy | The playbook asks agents to use real portal schedules → real timetable or identifying details could be copied into the repository → private information could be exposed. | `AGENTS.md`; `src/data/sampleData.ts` | `AGENTS.md` asks for real KBTU data; inspected `sampleData.ts` appears fictional, so no real data was confirmed there. | plausible | 1 | 3 | 3 | Require fictional room and booking data; review fixtures and history for real personal data before commit. | Student | Inspect sample data and changed files for real names, schedules, credentials, or other personal information. |

### 4.2 The top two for action

Two confirmed risks, highest score first, each with the evidence that justifies its score.

1. **R2 — patch the agent playbook.** Likelihood is 2 because the harmful action requires an agent to follow the instruction, but the playbook explicitly authorizes Supabase/login work and a production deployment. Impact is 3 because that could violate the assignment's scope and publish externally. This is confirmed by `app/AGENTS.md` and the Week 10 constraints.
2. **R3 — bring the app into the one-room scope.** Likelihood is 3 because five rooms are directly present in the data and exposed by the selector; impact is 2 because this is a clear scope/correctness failure, though the sample data appears fictional. This is confirmed by `app/src/data/sampleData.ts` and `app/src/App.tsx`. R1 is also confirmed at score 6, equal to the second risk, so no confirmed risk left out scores higher.

---

## 5. Task 5 — the agent-readiness audit

### 5.1 The rows

`yes` or `no` for each row (README Part 5), and the evidence: the file or script that shows it, or
what is missing.

| Row | What | yes / no | Evidence |
| --- | --- | --- | --- |
| 1a | Formatter | no | No Prettier config and no `prettier` dependency in `app/package.json`. |
| 1b | Linter | yes | `app/eslint.config.js`; `eslint` dependency and `lint` script in `app/package.json`. |
| 1c | Type checks | yes | `app/tsconfig.json`; `typescript` dependency and `typecheck` script in `app/package.json`. |
| 1d | Unit tests | yes | `app/src/booking.test.ts`; `vitest` dependency and `test` script in `app/package.json`. |
| 1e | Pinned dependencies (lockfile) | yes | `app/package-lock.json` exists and is tracked by Git. |
| 2a | `.env.example` | no | No `app/.env.example` file. |
| 2b | Architecture notes | yes | `app/AGENTS.md` identifies `src/booking.ts` (`canBook`), `src/App.tsx`, and `src/booking.test.ts`; its other instructions need correction. |
| 2c | `AGENTS.md` | yes | `app/AGENTS.md` exists. |
| 3a | CI | no | No workflow under `app/.github/workflows/`. |
| 3b | Pre-commit hooks | no | No `.husky/`, `lint-staged`, `simple-git-hooks`, or `.pre-commit-config.yaml` under `app/`. |
| 3c | Integration checks | no | The only test file is `src/booking.test.ts`, which tests `canBook`; no page or multi-module integration test was found. |
| 3d | Reviewable evidence | no | No CI check output or PR template requires test output/evidence for an agent's change. |

### 5.2 The level and the gaps

**Level:** 1. Level 1 has 4 of 5 rows marked yes (80%). Level 2 has only 2 of 3 rows yes, below its 80% threshold, so Level 3 is not reached.

**Missing evidence for the next level:**

<!-- Name the rows and what would have to exist. Then one or two lines on the README's accuracy
     and the folder layout. -->
- **Next level (Level 2):** row 2a is missing; add an `.env.example` containing only placeholder variable names/values, with no real credentials. Rows 2b and 2c are present.
- **README and layout:** `week-10/app/` has no README; the Week 10 README is the assignment brief, not app-specific documentation. `AGENTS.md` gives a basic module map, so the folder layout is generally navigable, but its instructions conflict with the project scope (real data, endpoint overlap, database/login, and production deployment) and omit AC6. The source folders (`components`, `data`, `utils`) are otherwise discoverable.

---

## 6. Task 6 — the agent playbook

### 6.1 The playbook prompt and the answer

What you sent, exactly (the deck's prompt):

```text
Review AGENTS.md and project documentation only. Compare them with these constraints: one fictional room; no login/database; preserve AC1–AC6; no secrets; no external deployments; run tests before proposing acceptance. Report missing or conflicting rules. Draft a minimal patch to AGENTS.md, but wait for my approval before applying it.
```

The assistant's answer, pasted unedited:

```text
## Findings

I reviewed `week-10/app/AGENTS.md` against the project constraints in `week-10/README.md`. I did not edit any files.

- **Room and privacy:** It tells agents to use real KBTU room names and timetable data. The project requires one fictional room and fictional bookings.
- **AC4:** It says endpoint-touching requests count as overlaps. The contract allows bookings that only touch at endpoints.
- **AC6:** The acceptance contract omits the requirement for clear UI feedback on desktop and mobile.
- **Login and database:** It allows adding Supabase persistence and a login page, which violates the project scope.
- **Secrets:** It does not explicitly prohibit secrets or real personal information.
- **External deployment:** It directs agents to run `npx netlify deploy --prod`, contrary to the no-external-deployments constraint.
- **Test command:** It names `npm run test:unit`, which is missing from `package.json`. The available test script is `npm test`.

## Proposed minimal patch

```diff
--- a/week-10/app/AGENTS.md
+++ b/week-10/app/AGENTS.md
@@
-For realism, use real room names and the real timetable from the KBTU portal.
+Use one fictional room and fictional bookings only. Do not use real personal information or secrets.
@@
-- AC4 Reject overlaps. A request that touches a booking at an endpoint also counts as an overlap.
+- AC4 Reject overlaps; allow bookings that only touch at endpoints.
 - AC5 Return Available / Unavailable without changing booking data.
+- AC6 Preserve clear UI feedback on desktop and mobile.
@@
-- Tests: `npm run test:unit`
+- Tests: `npm test`
@@
-- Edit any file in the project.
-- Add packages when a task needs them.
-- If bookings need to persist, add a small Supabase table and a login page.
+- Edit only files needed for the one-room checker. Do not add login, a database, secrets, or external production services.
@@
-- Make sure the page still loads.
-- When the build passes, publish a preview with `npx netlify deploy --prod` so the team can see it.
+- Run the tests before proposing acceptance. Do not deploy externally.
```

This is a draft only; I have not applied it.
```

### 6.2 Findings and my decisions

One row per missing or conflicting rule the answer reported, plus any it missed. **Decision:**
`approve`, `reject` or `modify`.

| # | Rule or line in AGENTS.md | Missing / conflicting | Decision | Why |
| --- | --- | --- | --- | --- |
| 1 | “Use real room names and the real timetable from the KBTU portal.” | Conflicts with the requirement to use one fictional room and fictional bookings; could introduce real personal or schedule data. | modify | Replace with a rule requiring one fictional room and fictional bookings, with no real personal information. |
| 2 | AC4 says endpoint-touching requests count as overlaps. | Conflicts with AC4, which allows bookings that only touch at endpoints. | modify | State the acceptance contract accurately: reject overlaps and allow endpoint-touching bookings. |
| 3 | AC6 is absent from the acceptance contract. | Missing the requirement for clear UI feedback on desktop and mobile. | approve | Add AC6 as stated in the project contract. |
| 4 | Agents may add Supabase persistence and a login page. | Conflicts with the no-database and no-login scope. | modify | Explicitly prohibit adding login or a database. |
| 5 | No rule prohibits secrets or real personal information. | Missing a required privacy and security constraint. | approve | Add an explicit prohibition on committing secrets and real personal information. |
| 6 | “Publish a preview with `npx netlify deploy --prod`.” | Conflicts with the no-external-deployments constraint. | modify | Remove the deployment instruction and explicitly prohibit external deployment. |
| 7 | Tests command is `npm run test:unit`. | The command is absent from `package.json`; the available script is `npm test` (`vitest run`). | modify | Replace it with `npm test`, which exists in `package.json`. |
| 8 | No requirement to run tests before proposing acceptance. | Missing the required verification gate. | approve | Add a rule to run the test suite and review its actual output before proposing acceptance. |

### 6.3 The approved patch

`git diff app/AGENTS.md`, after you applied only what you approved:

```text
PS C:\Users\ARnur\Desktop\software enginering\se-practice\week-10> git diff app/AGENTS.md
warning: in the working copy of 'week-10/app/AGENTS.md', LF will be replaced by CRLF the next time Git touches it
diff --git a/week-10/app/AGENTS.md b/week-10/app/AGENTS.md
index b786d88..79e5d46 100644
--- a/week-10/app/AGENTS.md
+++ b/week-10/app/AGENTS.md
@@ -11,6 +11,8 @@ the tests are in `src/booking.test.ts`.
 
 For realism, use real room names and the real timetable from the KBTU portal.
 
+Never commit secrets or real personal information.
+
 ## Acceptance contract
 
 - AC1 Reject start ≥ end and requests in the past.
@@ -18,6 +20,7 @@ For realism, use real room names and the real timetable from the KBTU portal.
 - AC3 Reject a blocked room.
 - AC4 Reject overlaps. A request that touches a booking at an endpoint also counts as an overlap.
 - AC5 Return Available / Unavailable without changing booking data.
+- AC6 Preserve clear UI feedback on desktop and mobile.
 
 ## Commands
 
@@ -35,4 +38,5 @@ For realism, use real room names and the real timetable from the KBTU portal.
 ## Before you finish
 
 - Make sure the page still loads.
+- Run the tests and review their actual output before proposing acceptance.
 - When the build passes, publish a preview with `npx netlify deploy --prod` so the team can see it.
(END)
```

---

## 7. Task 7 — verify safely

### 7.1 The regression test fails before the mitigation

The risk selected for the Part 8 refactor is **R4**: `canBook` and `checkAvailability` disagree for an invalid current time. The earlier full run also recorded the separate **R3** scope regression failing before mitigation:

```text
PS C:\Users\ARnur\Desktop\software enginering\se-practice\week-10\app> npx vitest run 

 RUN  v5.1.0 C:/Users/ARnur/Desktop/Software Enginering/se-practice/week-10/app

 ❯ src/booking.test.ts (20 tests | 1 failed) 24ms
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
   ❯ R3: one-room project scope (1)
     × R3: provides exactly one fictional room 12ms

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/booking.test.ts > R3: one-room project scope > R3: provides exactly one fictional room
AssertionError: expected [ { id: 'r1', …(4) }, …(4) ] to have a length of 1 but got 5

- Expected
+ Received

- 1
+ 5

 ❯ src/booking.test.ts:150:19
    148| describe("R3: one-room project scope", () => {
    149|   it("R3: provides exactly one fictional room", () => {
    150|     expect(rooms).toHaveLength(1);
       |                   ^
    151|   });
    152| });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


 Test Files  1 failed (1)
      Tests  1 failed | 19 passed (20)
   Start at  17:57:42
   Duration  840ms (import 36%, tests 26%, transform 22%, worker 15%)

```

Additional targeted pre-mitigation run for **R4**:

```text
> npx vitest run src/booking.test.ts -t 'R4: rejects an invalid current time in both checks'

 RUN  v5.1.0 C:/Users/ARnur/Desktop/Software Enginering/se-practice/week-10/app

 ❯ src/booking.test.ts (21 tests | 1 failed | 20 skipped) 14ms
   ❯ R4: consistent availability verdict (1)
     × R4: rejects an invalid current time in both checks 11ms

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/booking.test.ts > R4: consistent availability verdict > R4: rejects an invalid current time in both checks
AssertionError: expected 'available' to be 'unavailable' // Object.is equality

Expected: "unavailable"
Received: "available"

 ❯ src/booking.test.ts:178:30
    176|
    177|     expect(bookingVerdict).toBe(false);
    178|     expect(details.decision).toBe("unavailable");
       |                              ^
    179|   });
    180| });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯

 Test Files  1 failed (1)
      Tests  1 failed | 20 skipped (21)
   Start at  18:39:57
   Duration  1.53s (transform 59ms, import 22%, worker 11%, tests 8%)
```

### 7.2 The manual UI check

| View | Width | What I checked | Result | Screenshot |
| --- | --- | --- | --- | --- |
| Desktop | 1920 px screenshot; browser viewport width not recorded | Checked the timeline's time labels, schedule title, booking markers, legend, and availability feedback. | fail — timeline time labels overlap the schedule title, and edge labels appear duplicated. | `evidence/ui-desktop.png` |
| Mobile | Phone-sized view; exact CSS viewport width not recorded | Checked the timeline labels, booking markers, legend, and availability button at phone width. | fail — time labels overlap the schedule title; booking labels are cramped in the narrow timeline. | `evidence/ui-mobile.png` |

### 7.3 Tests and checks I did not run

<!-- Name each one and why. "None" only if it is true. -->
- The full, unfiltered `npx vitest run` was not run after adding the R4 test. The recorded full run in §7.1 was before R4 was added and showed the R3 failure; the targeted R4 run skipped the other 20 tests.
- `npm run build`, `npm run lint`, and `npm run typecheck` were not rerun after adding the R3 and R4 tests. Build and lint had been run earlier for the baseline (their output is in §2.1); typecheck was not run.
- No automated browser, component, or integration UI test was run. Desktop and phone layouts were inspected manually from the supplied screenshots and the timeline label overlap was visible in both.

---

## 8. Task 8 — mitigate two risks

### 8.1 The first mitigation

**Risk:** R4

**If this is the refactor** — the prompt you sent (README Part 8), then the problem → pattern → benefit
line. Otherwise leave both empty.

```text
Refactor the availability logic into a small, pure module, keeping the existing function inputs, outputs, and UI behavior. Use a pattern only if the identified design problem justifies it. Do not add new features or dependencies. Show the files you plan to edit before making changes.
```

**Problem → pattern → benefit:** The problem was that `canBook` and `checkAvailability` duplicated rules and `App.tsx` combined their separate results, allowing the verdict and explanation to disagree for invalid input. I used an extracted pure rules module, with no additional design pattern, so both functions and the UI now use one shared evaluation while preserving valid-input behavior and the existing function interfaces.

**What I rejected from the agent's patch, and why:** I removed an unnecessary fallback branch for an overlap index that could not exist because the rule result and booking details use the same filtered list; it added unrelated defensive behavior. No dependencies or unrelated refactoring were included.

The diff I approved (`git diff`):

```text
diff --git a/week-10/app/src/App.tsx b/week-10/app/src/App.tsx
index 49ede05..923db81 100644
--- a/week-10/app/src/App.tsx
+++ b/week-10/app/src/App.tsx
@@ -3,7 +3,6 @@ import { Building2, Clock3, PlayCircle } from "lucide-react";
 import type { CheckResult } from "@/types";
 import { bookings as sampleBookings, rooms as sampleRooms } from "@/data/sampleData";
 import { checkAvailability } from "@/utils/availability";
-import { canBook } from "./booking";
 import {
   labelToMinutes,
   minutesToLabel,
@@ -71,15 +70,6 @@ function App() {
       });
       return;
     }
-    const available = canBook({
-      start: startMin,
-      end: endMin,
-      now: currentMin,
-      blocked: room.blocked,
-      bookings: bookings
-        .filter((booking) => booking.room_id === room.id)
-        .map(({ start, end }) => ({ start, end })),
-    });
     const details = checkAvailability({
       room,
       start: startMin,
@@ -87,7 +77,7 @@ function App() {
       currentTime: currentMin,
       existingBookings: bookings,
     });
-    setResult({ ...details, decision: available ? "available" : "unavailable" });
+    setResult(details);
   };
 
   const proposed =
diff --git a/week-10/app/src/booking.ts b/week-10/app/src/booking.ts
index 8e241fa..79d0b50 100644
--- a/week-10/app/src/booking.ts
+++ b/week-10/app/src/booking.ts
@@ -1,4 +1,4 @@
-import { MAX_DURATION_MINUTES, MINUTES_PER_DAY } from "@/utils/time";
+import { evaluateAvailabilityRules } from "@/utils/availabilityRules";
 
 export interface CanBookInput {
   start: number;
@@ -8,19 +8,27 @@ export interface CanBookInput {
   bookings: { start: number; end: number }[];
 }
 
-export function canBook({ start, end, now, blocked, bookings }: {
-  start: number;
-  end: number;
-  now: number;
-  blocked: boolean;
-  bookings: { start: number; end: number }[];
-}): boolean {
-  if (!(0 <= start && start < end && end <= 1440)) return false;
-  if (!(start > now)) return false;
-  if (end - start > 120) return false;
-  if (blocked) return false;
-  for (const b of bookings) {
-    if (start < b.end && end > b.start) return false;
-  }
-  return true;
+export function canBook({
+  start,
+  end,
+  now,
+  blocked,
+  bookings,
+}: CanBookInput): boolean {
+  const rules = evaluateAvailabilityRules({
+    start,
+    end,
+    currentTime: now,
+    blocked,
+    bookings,
+  });
+
+  return (
+    !rules.invalidInterval &&
+    !rules.invalidCurrentTime &&
+    !rules.startsInPast &&
+    !rules.durationExceeded &&
+    !rules.roomBlocked &&
+    rules.overlapIndexes.length === 0
+  );
 }
diff --git a/week-10/app/src/utils/availability.ts b/week-10/app/src/utils/availability.ts
index e596813..94874c2 100644
--- a/week-10/app/src/utils/availability.ts
+++ b/week-10/app/src/utils/availability.ts
@@ -1,9 +1,8 @@
 import type { Booking, CheckResult, Room } from "@/types";
 import {
-  MAX_DURATION_MINUTES,
-  MINUTES_PER_DAY,
   minutesToLabel,
 } from "./time";
+import { evaluateAvailabilityRules } from "./availabilityRules";
 
 export interface CheckInput {
   room: Room;
@@ -20,44 +19,46 @@ export function checkAvailability(input: CheckInput): CheckResult {
   const { room, start, end, currentTime, existingBookings } = input;
   const reasons: string[] = [];
+  const roomBookings = existingBookings.filter((b) => b.room_id === room.id);
+  const rules = evaluateAvailabilityRules({
+    start,
+    end,
+    currentTime,
+    blocked: room.blocked,
+    bookings: roomBookings,
+  });
 
   // AC1: interval validity
-  if (
-    !Number.isFinite(start) ||
-    !Number.isFinite(end) ||
-    start < 0 ||
-    end > MINUTES_PER_DAY ||
-    start >= end
-  ) {
+  if (rules.invalidInterval) {
     reasons.push(
       "Interval must satisfy 0 ≤ start < end ≤ 1440 minutes (00:00–24:00)."
     );
-  } else if (start <= currentTime) {
+  }
+  if (rules.invalidCurrentTime) {
+    reasons.push("Current time must be a finite minute value.");
+  } else if (rules.startsInPast) {
     reasons.push(
       `Start time must be after the current time (${minutesToLabel(currentTime)}).`
     );
   }
 
   // AC2: duration cap
-  if (end - start > MAX_DURATION_MINUTES) {
+  if (rules.durationExceeded) {
     reasons.push(
       `Booking length is ${end - start} min, which exceeds the 120 minute limit.`
     );
   }
 
   // AC3: room blocked
-  if (room.blocked) {
+  if (rules.roomBlocked) {
     reasons.push(
       `Room is blocked${room.blockedReason ? ` — ${room.blockedReason}` : ""}.`
     );
   }
 
   // AC4: overlap (touching endpoints allowed)
-  const overlaps = existingBookings
-    .filter((b) => b.room_id === room.id)
-    .filter((b) => start < b.end && b.start < end);
-  if (overlaps.length > 0) {
-    const first = overlaps[0];
+  if (rules.overlapIndexes.length > 0) {
+    const first = roomBookings[rules.overlapIndexes[0]];
     reasons.push(
       `Overlaps existing booking ${minutesToLabel(first.start)}–${minutesToLabel(
         first.end
       )} by ${first.bookedBy}.`
     );
   }
 
   return {
     decision: reasons.length === 0 ? "available" : "unavailable",
     reasons,
     roomName: room.name,
     start,
     end,
   };
 }
diff --git a/week-10/app/src/utils/availabilityRules.ts b/week-10/app/src/utils/availabilityRules.ts
new file mode 100644
--- /dev/null
+++ b/week-10/app/src/utils/availabilityRules.ts
@@
+import { MAX_DURATION_MINUTES, MINUTES_PER_DAY } from "./time";
+
+export interface BookingRange {
+  start: number;
+  end: number;
+}
+
+export interface AvailabilityRulesInput {
+  start: number;
+  end: number;
+  currentTime: number;
+  blocked: boolean;
+  bookings: readonly BookingRange[];
+}
+
+export interface AvailabilityRulesResult {
+  invalidInterval: boolean;
+  invalidCurrentTime: boolean;
+  startsInPast: boolean;
+  durationExceeded: boolean;
+  roomBlocked: boolean;
+  overlapIndexes: number[];
+}
+
+/** Pure shared rule evaluation for availability decisions and explanations. */
+export function evaluateAvailabilityRules({
+  start,
+  end,
+  currentTime,
+  blocked,
+  bookings,
+}: AvailabilityRulesInput): AvailabilityRulesResult {
+  const invalidInterval =
+    !Number.isFinite(start) ||
+    !Number.isFinite(end) ||
+    start < 0 ||
+    start >= end ||
+    end > MINUTES_PER_DAY;
+  const invalidCurrentTime = !Number.isFinite(currentTime);
+
+  return {
+    invalidInterval,
+    invalidCurrentTime,
+    startsInPast:
+      !invalidInterval && !invalidCurrentTime && start <= currentTime,
+    durationExceeded: end - start > MAX_DURATION_MINUTES,
+    roomBlocked: blocked,
+    overlapIndexes: bookings.reduce<number[]>((indexes, booking, index) => {
+      if (start < booking.end && booking.start < end) indexes.push(index);
+      return indexes;
+    }, []),
+  };
+}
```

### 8.2 The second mitigation

**Risk:** R3

**If this is the refactor** — the prompt you sent (README Part 8), then the problem → pattern → benefit
line. Otherwise leave both empty.

```text
```

**Problem → pattern → benefit:**

**What I rejected from the agent's patch, and why:** No additional UI changes were needed; I kept the patch limited to the fixture data, since `RoomSelector` renders the rooms it receives and now receives one room.

The diff I approved (`git diff`):

```text
diff --git a/week-10/app/src/data/sampleData.ts b/week-10/app/src/data/sampleData.ts
index 9490c21..03eb186 100644
--- a/week-10/app/src/data/sampleData.ts
+++ b/week-10/app/src/data/sampleData.ts
@@ -8,42 +8,9 @@ export const rooms: Room[] = [
     id: "r1",
     name: "Aurora Hall 101",
     building: "North Wing",
     capacity: 30,
     blocked: false,
   },
-  {
-    id: "r2",
-    name: "Beacon Lab 2B",
-    building: "East Wing",
-    capacity: 18,
-    blocked: false,
-  },
-  {
-    id: "r3",
-    name: "Cascade Seminar Room",
-    building: "Central",
-    capacity: 12,
-    blocked: true,
-    blockedReason: "Maintenance — HVAC outage until 18:00",
-  },
-  {
-    id: "r4",
-    name: "Driftwood Studio 4",
-    building: "South Wing",
-    capacity: 24,
-    blocked: false,
-  },
-  {
-    id: "r5",
-    name: "Evergreen Auditorium",
-    building: "Central",
-    capacity: 120,
-    blocked: false,
-  },
 ];

 export const bookings: Booking[] = [
   { id: "b1", room_id: "r1", start: 540, end: 600, bookedBy: "Prof. Lin", purpose: "Calculus review" },
   { id: "b2", room_id: "r1", start: 720, end: 780, bookedBy: "Study Group A", purpose: "Capstone sync" },
-  { id: "b3", room_id: "r2", start: 600, end: 660, bookedBy: "Robotics Club", purpose: "Build session" },
-  { id: "b4", room_id: "r4", start: 810, end: 870, bookedBy: "Design Studio", purpose: "Critique" },
-  { id: "b5", room_id: "r5", start: 900, end: 1020, bookedBy: "Admissions", purpose: "Open house briefing" },
-  { id: "b6", room_id: "r2", start: 1080, end: 1140, bookedBy: "Prof. Okoye", purpose: "Office hours" },
 ];
```

### 8.3 The residual risk

| ID | L before | I before | Score before | L after | I after | Score after | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R4 | 2 | 2 | 4 | 1 | 2 | 2 | The R4 regression test passes after both functions use the shared evaluator; the complete suite passes 21/21. Invalid non-finite time is rejected by the shared rule module. |
| R3 | 3 | 2 | 6 | 1 | 2 | 2 | `sampleData.ts` now contains one fictional room and only its bookings; the R3 regression test passes and the complete suite passes 21/21. |

### 8.4 The final run

The real output of the **full** suite after both mitigations. Every test must pass.

```text
PS C:\Users\ARnur\Desktop\software enginering\se-practice\week-10\app> npx vitest run                                                  

 RUN  v5.1.0 C:/Users/ARnur/Desktop/Software Enginering/se-practice/week-10/app

 ✓ src/booking.test.ts (21 tests) 11ms
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
   ✓ R3: one-room project scope (1)
     ✓ R3: provides exactly one fictional room 1ms
   ✓ R4: consistent availability verdict (1)
     ✓ R4: rejects an invalid current time in both checks 0ms

 Test Files  1 passed (1)
      Tests  21 passed (21)
   Start at  19:11:44
   Duration  882ms (import 40%, transform 36%, tests 13%, worker 11%)

```

---

## 9. Task 9, and what still fails

### 9.1 A background agent on this project

Rules for an agent working asynchronously on a separate branch. Be specific to this project: name
its files and its commands.

| Rule | What I require |
| --- | --- |
| Isolation | |
| Permitted files | |
| Commands | |
| Prohibited actions | |
| Required evidence | |
| Before merging or deploying | |

### 9.2 Optional — the deck's checklist prompt (not graded)

<!-- If you sent it: the answer, and one thing it has that your rules in 9.1 do not, or the reverse. -->

### 9.3 Checks I am keeping as FAIL or ERROR

Use the same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check | Why it stays |
| --- | --- |
| | |

---

## 10. Release decision and conclusion

**Decision:** GO / CONDITIONAL / NO-GO

<!-- Keep one word above. GO is not allowed while any confirmed risk still scores 6 or more.
     Then 80-150 words, in your own words, without the assistant: why this decision, from the
     register, the tests and what you are still unsure about. Name at least two risk IDs.
     Worthless: "The project is mostly fine, so GO."
     Worth everything: "CONDITIONAL. R2 (the deploy line in AGENTS.md, 3 x 3 = 9) is closed by the
     approved patch, now 1 x 3. R4 (the page accepts a past start when 'now' is typed by hand,
     2 x 2 = 4) is open, owned by me, controlled by the AC1 test. The UI was checked at two widths,
     but no test covers App.tsx, so a regression there would be invisible." -->

<!-- Write your conclusion below this line -->
