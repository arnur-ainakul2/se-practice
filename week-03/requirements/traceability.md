# Traceability — use cases → stories → criteria

One row per use case. All six rows stay, even the ones with nothing behind them: an empty cell is a
finding you report, not a failure you hide. Use real IDs, comma-separated; write `none` where there
is nothing.

| Use case | Stories (US-nn) | Criteria (AC-nn) | Gap? |
| --- | --- | --- | --- |
| UC-01 View availability | US-01 | none | Yes — no AC written |
| UC-02 Book room | US-02 | AC-01, AC-02, AC-03 | No |
| UC-03 Cancel booking | US-03 | AC-07, AC-08, AC-09 | No |
| UC-04 Block or unblock room | US-05, US-06 | AC-04, AC-05, AC-06 | Yes — partial (US-06 unblock has no AC) |
| UC-05 Review usage | US-07 | none | Yes — no AC written |
| UC-06 Send confirmation | US-04 | none | Yes — no AC written |

**Stories that belong to no use case:** none (all seven stories map to exactly one use case; UC-04
maps to two stories, US-05 and US-06, but every story maps back to a use case)

**What the gaps tell you:** Acceptance criteria were only written for the three stories selected in
Part 3 (US-02, US-03, and the block half of US-05), so UC-01, UC-05, UC-06, and the unblock half of
UC-04 have stories but no tested behavior yet — a real coverage gap to close before implementation,
not something to paper over with invented criteria.