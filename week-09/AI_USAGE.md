# AI Usage Disclosure — Week 09

Required by the course academic policy (Generative AI use level **D — AI-integrated**).
You are responsible for the accuracy, testing and integrity of everything you submit,
including anything an AI tool produced.

| Tool | Exact model / plan | Used for | Which files it touched |
| --- | --- | --- | --- |
| Gemini | Gemini hydrogen | Part 2 - generating the calls for R1, R2, and R3 | `calls/` (replies saved by me, unedited)|
| Gemini | Gemini hydrogen | Part 1 - converted my ideas and constraints into the JSON definition | `tool/check_room.json` |

**I wrote `tool/check_room.json` myself:** no
The ideas and constraints were mine; Gemini converted them into JSON. I checked the result with `python tests/check_tool.py`.

**I used an AI to explain a JSON Schema keyword or a check:** yes
AI explained how `type`, `minimum`, and `maximum` validate individual values, and why the schema cannot compare `start` with `end` to enforce `start < end`.

**Every reply in `calls/` and in lab-report.md section 4 is exactly what the model returned:** yes 

**Every terminal output in lab-report.md was pasted from a real run, unedited:** yes 

**Anything I accepted from the AI without fully understanding it:**
<!-- Name the file and the part. An honest entry here costs far less than a blank one that turns out to be untrue. -->
nope 

Signed: Ainakul Arnur
Date: 11/15/2026
