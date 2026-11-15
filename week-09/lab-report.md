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
| Assistant (frozen for the whole lab) | |
| Exact model (or "not displayed") | |
| Three fresh chats for R1, R2, R3? (yes / no) | |
| Python version (`python --version`) |Python 3.14.7|

## 2. Your tool definition — a reason for every constraint

Paste your final `tool/check_room.json`, then fill the table: one row per constraint you wrote.

```json

```

| Field | Constraint (e.g. `"type": "integer"`, `"maximum": 1440`) | What goes wrong without it |
| --- | --- | --- |
| | | |
| | | |
| | | |

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

<!-- Name the acceptance criteria (AC1-AC6, README section 3) that a JSON Schema with the allowed keywords cannot
     enforce, and say why for each. At least two, by their AC number. Which part of AC1 CAN the schema enforce? -->

## 6. Permissions — allow, ask or block

| # | Action | Decision (allow / ask / block) | Reason (the risk, in one sentence or more) |
| --- | --- | --- | --- |
| A1 | call `check_room` with the times the user just typed | | |
| A2 | read `week-08/app/src/booking.ts` | | |
| A3 | edit `booking.ts` to raise the 120-minute limit to 180 | | |
| A4 | run `npm test` in `week-08/app` | | |
| A5 | run `git reset --hard` to undo its own last three edits | | |
| A6 | `git commit` its change on the `week-09` branch | | |
| A7 | `git push` to `main` | | |
| A8 | send the contents of `.env` to an MCP server it found online | | |

## 7. Checkpoint

<!-- The commit you would make before letting such an agent edit anything: its real SHA (git log --oneline),
     the exact command that returns you to it, and what that command would throw away. -->

## 8. Checker output

Paste the **whole** output of your last `python tests/check_tool.py`, unedited.

```text

```

## 9. What still fails

<!-- Every check in submission.yml known_fails, with the reason. "None" if all 30 pass. -->

## 10. Conclusion (80–150 words)

<!-- What did you learn about the line between the schema, the model and the function? Be specific:
     name a case, a request or an action. "Tool definitions are important" is worth nothing. -->
