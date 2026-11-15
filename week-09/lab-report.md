# Week 09 — Lab Report: canBook as a Tool

Fill in every section. Do not delete or renumber the headings: the README and the checker point at
them. Replace every `<!-- comment -->` with your own text (comments are ignored by the checker).

**Name:**Ainakul Arnur
**Student ID:**24B031609
**GitHub:**arnur-ainakul2

---

## 1. Setup

| | |
| --- | --- |
| Assistant (frozen for the whole lab) | Gemini |
| Exact model (or "not displayed") |Gemini Hydrogen 4.0|
| Three fresh chats for R1, R2, R3? (yes / no) | yes  |
| Python version (`python --version`) |Python 3.14.7|

## 2. Your tool definition — a reason for every constraint

Paste your final `tool/check_room.json`, then fill the table: one row per constraint you wrote.

```json
{
  "name": "check_room",
  "description": "Checks whether a room is available for a requested time slot. This tool only checks availability and does not save or create a booking. All time values must be whole minutes since midnight in the range 0-1440 (for example, 600 is 10:00 and 1440 is 24:00).",
  "inputSchema": {
    "type": "object",
    "properties": {
      "start": { "type": "integer", "minimum": 0, "maximum": 1440, "description": "Requested booking start time in whole minutes since midnight (0-1440)." },
      "end": { "type": "integer", "minimum": 0, "maximum": 1440, "description": "Requested booking end time in whole minutes since midnight (0-1440)." },
      "now": { "type": "integer", "minimum": 0, "maximum": 1440, "description": "Current time in whole minutes since midnight (0-1440)." },
      "blocked": { "type": "boolean", "description": "Whether the room is currently blocked (true or false)." },
      "bookings": {
        "type": "array",
        "description": "List of existing bookings for the room, each with start and end in minutes since midnight (0-1440). May be empty.",
        "items": {
          "type": "object",
          "properties": {
            "start": { "type": "integer", "minimum": 0, "maximum": 1440, "description": "Existing booking start time in whole minutes since midnight (0-1440)." },
            "end": { "type": "integer", "minimum": 0, "maximum": 1440, "description": "Existing booking end time in whole minutes since midnight (0-1440)." }
          },
          "required": ["start", "end"],
          "additionalProperties": false
        }
      }
    },
    "required": ["start", "end", "now", "blocked", "bookings"],
    "additionalProperties": false
  }
}
```

| Field | Constraint (e.g. `"type": "integer"`, `"maximum": 1440`) | What goes wrong without it |
| --- | --- | --- |
| Tool name | `name: "check_room"` | The caller could use the wrong name or fail to find the availability check. |
| Description | Says the tool checks availability and does not save or create bookings; gives whole minutes since midnight and range 0–1440. | A model could guess the units or assume the tool creates a booking. |
| `inputSchema` | `type: "object"` | Calls with a non-object top-level shape would be accepted. |
| `inputSchema.properties` | Exactly `start`, `end`, `now`, `blocked`, and `bookings` | The tool could expose missing or unexpected arguments. |
| `inputSchema.required` | All five property names are required | A call missing information needed by `canBook` could reach the function. |
| Top-level object | `additionalProperties: false` | Extra arguments such as `room` could be accepted and misunderstood. |
| `start` | `type: "integer"` | Text or fractional start times could be accepted. |
| `start` | `minimum: 0` | A negative start time could be accepted. |
| `start` | `maximum: 1440` | A start time after the end of the day could be accepted. |
| `end` | `type: "integer"` | Text or fractional end times could be accepted. |
| `end` | `minimum: 0` | A negative end time could be accepted. |
| `end` | `maximum: 1440` | An end time after the end of the day could be accepted. |
| `now` | `type: "integer"` | Text or fractional current times could be accepted. |
| `now` | `minimum: 0` | A negative current time could be accepted. |
| `now` | `maximum: 1440` | A current time beyond the day could be accepted. |
| `blocked` | `type: "boolean"` | A value such as the string `"false"` could be mistaken for boolean false. |
| `bookings` | `type: "array"` | Bookings in a non-list shape, such as a single object, could be accepted. |
| `bookings.items` | `type: "object"` | A booking represented as a pair or another non-object value could be accepted. |
| Each booking | `properties` are `start` and `end`; both are in `required` | A booking missing either endpoint could be accepted. |
| Each booking | `additionalProperties: false` | Unexpected fields could be accepted inside a booking. |
| Each booking `start` | `type: "integer"`, `minimum: 0`, `maximum: 1440` | An existing booking could contain a non-whole or out-of-range start time. |
| Each booking `end` | `type: "integer"`, `minimum: 0`, `maximum: 1440` | An existing booking could contain a non-whole or out-of-range end time. |

## 3. The twelve calls — first run and final run

Your **first** run's S verdicts (before any fix), and your final ones. For every case that changed,
say what you changed.

| Case | First run | Final run | What you changed |
| --- | --- | --- | --- |
| S01 | PASS | PASS | Kept the required argument types so the valid R1-shaped call is accepted. |
| S02 | PASS | PASS | Kept `bookings` as an array; an empty array is valid. |
| S03 | FAIL | PASS | Added integer typing for `end` so a time string is refused. |
| S04 | FAIL | PASS | Made `now` required. |
| S05 | FAIL | PASS | Disallowed additional properties on the top-level object. |
| S06 | FAIL | PASS | Added integer typing and minimum 0 for `start`. |
| S07 | FAIL | PASS | Added maximum 1440 for `end`. |
| S08 | FAIL | PASS | Required both `start` and `end` in each booking object. |
| S09 | FAIL | PASS | Added boolean typing for `blocked`. |
| S10 | FAIL | PASS | Added integer typing for `start` so fractional values are refused. |
| S11 | PASS | PASS | Kept 1440 as the allowed maximum for `end`. |
| S12 | FAIL | PASS | Defined each booking as an object and disallowed extra properties. |

## 4. Function calling — what the model wrote

For each request, paste the model's reply exactly, then judge it against the request.

### R1

```text
{"name": "check_room", "arguments": {"start": 600, "end": 660, "now": 540, "blocked": false, "bookings": [{"start": 660, "end": 720}]}}
```

Match: yes. `start` 600 is 10:00, `end` 660 is 11:00, `now` 540 is 9:00, the room is not blocked, and the existing booking is 11:00–12:00 (660–720). The model converted each value correctly and included all required arguments.

### R2

```text
{"name": "check_room", "arguments": {"start": 840, "end": 990, "now": 810, "blocked": true, "bookings": []}}
```

Match: yes. `start` 840 is 14:00, `end` 990 is 16:30, and `now` 810 is 13:30; `blocked` is true and there are no bookings. The model made the requested tool call even though the room is blocked. The function decides availability and should return Unavailable.

### R3

```text
What exact start and end times do you want tomorrow, is the room currently blocked, and what are its existing bookings?
```

The model asked a question instead of calling the tool. “Tomorrow afternoon” and “a couple of hours” do not give exact start and end times, and the request also omits whether the room is blocked and its existing bookings. The model did not invent any values; it asked for the missing information needed to fill the required arguments.

## 5. What the schema cannot check

The schema can enforce the individual bounds and types in AC1: `start`, `end`, and `now` must be whole-number minutes from 0 through 1440. It cannot enforce `start < end` or that `start` is after `now`, because those rules compare the values of different fields. It also cannot enforce AC2: checking that the requested duration is at most 120 minutes requires subtracting `start` from `end`. AC3 is decision logic: when `blocked` is true, `canBook` must return Unavailable. AC4 requires comparing the requested interval with every existing booking to detect overlap while allowing touching endpoints. AC5 is about the tool's behavior: a schema cannot ensure that the implementation does not save or change a booking. AC6 concerns the page's feedback, which is outside the input schema and must be handled by the application.

## 6. Permissions — allow, ask or block

| # | Action | Decision (allow / ask / block) | Reason (the risk, in one sentence or more) |
| --- | --- | --- | --- |
| A1 | call `check_room` with the times the user just typed | allow | Calling `check_room` is a read-only check (AC5) that does not modify repository files, git history, or booking state. |
| A2 | read `week-08/app/src/booking.ts` | allow | Reading this source file is non-destructive; the agent should still avoid exposing any secrets it encounters. |
| A3 | edit `booking.ts` to raise the 120-minute limit to 180 | block | Allowing an agent to rewrite a core business rule (AC2) to satisfy one request risks breaking the specification and acceptance tests. |
| A4 | run `npm test` in `week-08/app` | allow | Running the local test suite is a safe verification action that checks code without changing source files or repository history. |
| A5 | run `git reset --hard` to undo its own last three edits | ask | `git reset --hard` is destructive and could erase uncommitted developer edits along with the agent's changes, so the affected files must be reviewed first. |
| A6 | `git commit` its change on the `week-09` branch | ask | A commit records changes in branch history, so a human should inspect the diff first to catch unreviewed or broken changes. |
| A7 | `git push` to `main` | block | Pushing directly to `main` bypasses branch review and risks publishing broken or unverified changes to the primary branch. |
| A8 | send the contents of `.env` to an MCP server it found online | block | Sending `.env` to an unverified external server could expose API keys, tokens, and other private credentials. |

## 7. Checkpoint

Checkpoint: `c175a66` — `chore(week-09): checkpoint before agent edits`. To return to it, run `git reset --hard c175a66`. This discards tracked changes made after the checkpoint, including uncommitted edits, and removes later commits from the current branch. Untracked files are not removed by this command.

## 8. Checker output

Paste the **whole** output of your last `python tests/check_tool.py`, unedited.

```text
PS C:\Users\ARnur\Desktop\Software Enginering\se-practice\week-09> python tests/check_tool.py
PASS  D1    tool/check_room.json exists and is valid JSON
PASS  D2    has name, description and inputSchema
PASS  D3    name is exactly "check_room"
PASS  D4    description: 25+ words, says minutes, 1440, and that it does not save
PASS  D5    inputSchema: an object with exactly the five fields, all required
PASS  D6    inputSchema uses only the keywords listed in README section 5
PASS  S01   the R1 call, valid -> accept
PASS  S02   no existing bookings: bookings = [] -> accept
PASS  S03   end as a string: "11:00" -> refuse
PASS  S04   now missing -> refuse
PASS  S05   an extra field: "room": "204" -> refuse
PASS  S06   start below the day: -30 -> refuse
PASS  S07   end beyond the day: 1500 -> refuse
PASS  S08   a booking with no end: {start: 660} -> refuse
PASS  S09   blocked as a string: "false" -> refuse
PASS  S10   start not a whole minute: 600.5 -> refuse
PASS  S11   end at the end of the day: 1440 -> accept
PASS  S12   a booking as a pair: [660, 720] -> refuse
PASS  F1    calls\r1.json: a call to check_room
PASS  F2    calls\r1.json: arguments valid against your schema
PASS  F3    calls\r1.json: arguments equal the expected ones (README section 5, Part 2)
PASS  F4    calls\r2.json: a call to check_room
PASS  F5    calls\r2.json: arguments valid against your schema
PASS  F6    calls\r2.json: arguments equal the expected ones (README section 5, Part 2)
PASS  F7    calls/r3: exactly one of r3.json (it called) or r3.txt (it asked), not empty
PASS  L1    section 5 names at least two acceptance criteria (AC1-AC6) the schema cannot check
PASS  L2    section 6: A1-A8 each have allow / ask / block and a reason of 5+ words
PASS  L3    section 7 names the checkpoint commit (a SHA)
PASS  L4    section 10: a conclusion of 80-150 words
PASS  L5    AI_USAGE.md filled in (a tool row, and signed)

SUMMARY: 30 PASS · 0 FAIL · 0 ERROR  (of 30 checks)
```

## 9. What still fails

<!-- Every check in submission.yml known_fails, with the reason. "None" if all 30 pass. -->

## 10. Conclusion (80–150 words)

I learned that the schema, the model, and the function each have a different job. The schema checks whether the call has the right shape. For example, S03 showed why `end` needs to be an integer: a value like `"11:00"` should be refused before the function runs. But a schema cannot decide if a room is actually available. In R2, Gemini correctly sent a call even though the room was blocked; `canBook` should make that decision and return Unavailable. For R3, the model asked for exact times and booking details instead of guessing. I also learned that an agent needs limits: reading code or running tests is low risk, while changing a rule or sending `.env` outside the project needs to be blocked or reviewed.
