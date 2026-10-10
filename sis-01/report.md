# SIS #01 — Software Engineering Fundamentals, With an AI in the Loop

<!--
  This is the only file you write your report in. README.md tells you what goes where.

  Rules the checker relies on:
  - Do not delete, rename or renumber the ## headings, the ### headings, or the **Label:** words.
  - Replace every "(write here)" and "(paste here)". None may be left when you submit.
  - Comments like this one are ignored by the word counter. Delete them or leave them.
-->

**Topic:** 1.3

---

## 1. Scenario

<!-- 100–150 words, labels included. One small scenario, used in every prompt and in your
     whole answer. Anything fictional is labelled in Assumptions. -->

**Question:** Does generating a study-materials exchange with AI in hours really lower its total cost over its life, compared with slower engineering methods such as requirements, tests and backups?

**Users:** Students who upload, search and download study materials; one student administrator who removes wrong files.

**Problem:** A generated upload-and-search feature can work in a demo yet fail in real use: duplicate files, wrong categories, unusable search results. The cost then appears later as repair work.

**Constraints:** (1) A small student team with no tester and a budget for only one protective measure. (2) Categories and file formats change every semester.

**Risk:** The file collection and its database are encrypted or deleted, and students lose their notes shortly before an exam.

**Assumptions:** (Fictional) About 800 students use the system; 40 files are uploaded weekly; repairing one bad upload takes an administrator 20 minutes.

## 2. Analysis

<!-- 350–400 words. Your answer to the question, the trade-offs, and how it applies to your
     scenario. Explain at least two engineering decisions and why they fit the scenario. -->

(write here)

## 3. Review

<!-- 250–300 words. What Prompt B's critique said and what you did with it; your two source
     checks and your two substantive revisions, each with a reason. Point at the rows of the
     tables in section 9 ("verification row 2", "change-log row 1"). -->

(write here)

## 4. Conclusion

<!-- 100–150 words. Your recommendation for the scenario and its main limitation. -->

(write here)

## 5. Reflection

<!-- 150–200 words. NOT part of the main total. Written by you, not by the assistant:
     what helped, what you changed, what you learned. Specific beats flattering. -->

(write here)

## 6. References

<!-- Full references, one per line, each starting with "- ". Only sources you actually opened.
     Every URL used in the verification table must also appear here. Example:
     - Sommerville, I. (2016). Software Engineering, 10th ed., Global Edition. Pearson. Ch. 1.
-->

- Sommerville, I. (2016). Software Engineering, 10th ed., Global Edition. Pearson Education. Ch. 1, Sec. 1.1.2 ("Frequently asked questions about software engineering"). https://www.pearsonglobaleditions.com/Sommerville

Sommerville, I. (2016). Software Engineering, 10th ed., Global Edition. Pearson Education. Ch. 8, Sec. 8.1 ("Development testing"). https://www.pearsonglobaleditions.com/Sommerville

## 7. Appendix A — Initial outline

<!-- Written BEFORE you run Prompt A. Five points, your own words, numbered. These are the
     "five points" you paste into Prompt A. -->

1. Costs after launch come mostly from fixing the consequences of errors and from building features
   that nobody needs; a test audience is needed to check whether a feature is useful.
2. An AI assistant lowers the cost of producing a raw first demo quickly, but it raises the cost of
   fixing the later errors that come from that raw project.
3. In Week 05 the assistant wrote can_book in seconds, but my first tests missed a fault; only tests
   built from the acceptance criteria found it. Without them the defect would have reached users.
4. In my scenario the most expensive failure is users losing all their stored study materials;
   an automatic backup is cheaper than rebuilding the collection.
5. "Faster generation means lower cost" is true for training projects without real users.

## 8. Appendix B — AI exchanges

<!-- Complete prompts and complete responses, as text — never screenshots. Paste each inside
     the fenced block that follows its label. If a response itself contains ``` lines, open
     and close that block with ~~~~ instead. You may add B4, B5 … after B3 if you ran more. -->

### B1 — Draft (Prompt A)

- **Tool:** Gemini AI
- **Model:** Gemini flash 3.6
- **Date:** 10/11/2026
- **Purpose:** contextual draft

<!-- Model: the exact model with its version, as the tool shows it (e.g. "GPT-5 Thinking",
     "Claude Sonnet 4.5"). If the tool does not show it, write: not displayed
     Date: YYYY-MM-DD -->

**Prompt:**

```text
Act as a software engineering tutor. Help me analyze topic 1.3 — Does generating a study-materials exchange with AI really lower its total cost over its life, or do tests, requirements and backups still decide the cost? — for a first-year-level university assignment.

My scenario is: users are students who upload, search and download study materials, plus one student administrator who removes wrong files; the problem is that a generated upload-and-search feature can work in a demo yet fail in real use (duplicate files, wrong categories, unusable search results), and the cost then appears later as repair work; the constraints are (1) a small student team with no tester and a budget for only one protective measure, and (2) categories and file formats that change every semester; the risk is that the file collection and its database are encrypted or deleted and students lose their notes shortly before an exam. Fictional assumptions: about 800 students use the system, 40 files are uploaded weekly, and repairing one bad upload takes an administrator 20 minutes. My initial ideas are: (1) Costs after launch come mostly from fixing the consequences of errors and from building features that nobody needs; a test audience is needed to check whether a feature is useful. (2) An AI assistant lowers the cost of producing a raw first demo quickly, but it raises the cost of fixing the later errors that come from that raw project. (3) In Week 05 the assistant wrote can_book in seconds, but my first tests missed a fault; only tests built from the acceptance criteria found it. Without them the defect would have reached users. (4) In my scenario the most expensive failure is users losing all their stored study materials; an automatic backup is cheaper than rebuilding the collection. (5) "Faster generation means lower cost" is true for training projects without real users. Draft a 400–500 word explanation using these details.

Separate facts from assumptions. Explain trade-offs and identify claims I should verify. Do not invent quotations, references or page numbers.
```

**Response:**

```text
#Here is an analysis and draft structured for your first-year software engineering assignment.

---

### Core Analysis

#### 1. Separating Facts vs. Fictional Assumptions

* **Given Facts (Scenario Constraints):**
* **Team & Scope:** Small student team with no dedicated QA/tester role, operating under a constraint allowing only *one* protective measure.
* **Evolving Requirements:** Subject categories and supported file formats change dynamically every semester.
* **High-Impact Risk:** Risk of full data loss or encryption (e.g., ransomware, corruption, or catastrophic deletion) right before exam periods.


* **Fictional Assumptions (Quantitative Baseline):**
* **Scale:** $\approx 800$ active student users; 40 new file uploads weekly.
* **Operational Maintenance Overhead:** Repairing a bad upload requires 20 minutes of manual administrator effort.



---

#### 2. Technical Trade-Offs

* **Rapid AI Generation vs. Long-Term Maintenance (Technical Debt):** AI code generation minimizes initial development velocity (CapEx), but unverified output increases bug density and maintenance effort (OpEx).
* **Protective Measure Selection:** Under a strict constraint of selecting only *one* protective measure, you must choose between:
1. **Automated Backups:** Protects against catastrophic failure and total loss of availability (disaster recovery).
2. **Automated Testing (Acceptance-Driven):** Mitigates functional defects and data degradation (operational reliability).



---

#### 3. Key Claims to Verify

Before finalizing your assignment, evaluate these assumptions:

1. *Does AI-generated code increase maintenance costs compared to human-written code, or is the maintenance burden equal whenever requirements change rapidly?*
2. *Is an administrator's time a financial cost or an operational bottleneck?* (In a student project, manual labor often costs $0$ directly, but causes system degradation if admins abandon the workload).
3. *Is automatic backup alone sufficient without input validation?* (If corrupt or malicious files are backed up, the restored state remains broken).

---

### Assignment Draft (480 Words)

Does generating a study-materials exchange with AI lower its total lifecycle cost, or do testing, requirement management, and backups remain the primary cost drivers? While AI assistants drastically reduce initial build costs, long-term costs in systems with active users are dictated by operational maintenance, post-launch defects, and failure recovery.

AI code generation significantly accelerates early development. For instance, in Week 05, an AI assistant wrote a logic function (`can_book`) in seconds. However, speed at inception does not equate to lower total cost over a product's lifecycle. Initial unit tests missed edge-case faults; only test cases derived directly from acceptance criteria caught the underlying defect. Without explicit test coverage based on precise requirements, flawed AI-generated logic reaches production environments, transforming temporary speed gains into expensive post-launch repair work.

In production, post-launch costs stem primarily from two sources: fixing defect consequences and maintaining unvalidated features. In a system serving roughly 800 students with 40 weekly uploads, a raw AI-generated upload and search feature may pass a initial demo but fail under real usage. Defective uploads—such as duplicate files, misclassifications, or unsearchable records—require manual administrative intervention. At an estimated 20 minutes per fix, administrative overhead accumulates rapidly. Moreover, because categories and file formats change every semester, unmaintained AI code becomes brittle. Without continuous requirement updates and a test audience to validate feature utility, maintenance costs quickly surpass initial development savings.

Furthermore, the choice of protective infrastructure determines survival during catastrophic events. For a small team constrained to a single protective measure, evaluating failure severity is critical. The highest-impact risk in this scenario is total data loss or database encryption right before exams, wiping out all student notes. While automated testing prevents functional bugs, it cannot restore deleted files. Implementing an automated backup system guarantees data resilience. Rebuilding an entire crowd-sourced document collection from scratch is far more expensive than preventing data loss through automated backups.

Ultimately, the claim "faster AI generation means lower total cost" holds true only for throwaway training projects lacking real users. Once real users rely on a system, initial code generation represents only a fraction of total expenditure. Testing, evolving requirement management, and automated backups ultimately dictate the total lifecycle cost.

---
```

### B2 — Critique (Prompt B)

- **Tool:** Gemini AI
- **Model:** Gemini flash 3.6
- **Date:**10/11/2026
- **Purpose:** critical review of the draft

**Prompt:**

```text
Review the draft below against my chosen question and scenario. Identify inaccuracies, missing reasoning, vague claims and unsupported assumptions.
For each concern, explain why it matters and how I could check it. Include a counterexample or alternative interpretation. Do not rewrite the answer yet.
Question: Topic 1.3 — Does generating a study-materials exchange with AI really lower its total cost over its life, or do tests, requirements and backups still decide the cost? Scenario: users are students who upload, search and download study materials, plus one student administrator who removes wrong files; the problem is that a generated upload-and-search feature can work in a demo yet fail in real use (duplicate files, wrong categories, unusable search results), and the cost then appears later as repair work; the constraints are (1) a small student team with no tester and a budget for only one protective measure, and (2) categories and file formats that change every semester; the risk is that the file collection and its database are encrypted or deleted and students lose their notes shortly before an exam. Fictional assumptions: about 800 students use the system, 40 files are uploaded weekly, and repairing one bad upload takes an administrator 20 minutes. Draft: Here is an analysis and draft structured for your first-year software engineering assignment.

Core Analysis
1. Separating Facts vs. Fictional Assumptions
- Given Facts (Scenario Constraints):
- 
  - Team & Scope: Small student team with no dedicated QA/tester role, operating under a constraint allowing only one protective measure.
  - 
  - Evolving Requirements: Subject categories and supported file formats change dynamically every semester.
  - 
  - High-Impact Risk: Risk of full data loss or encryption (e.g., ransomware, corruption, or catastrophic deletion) right before exam periods.
  - 
- Fictional Assumptions (Quantitative Baseline):
- 
  - Scale: $\approx 800$ active student users; 40 new file uploads weekly.
  - 
  - Operational Maintenance Overhead: Repairing a bad upload requires 20 minutes of manual administrator effort.
  - 
2. Technical Trade-Offs
- Rapid AI Generation vs. Long-Term Maintenance (Technical Debt): AI code generation minimizes initial development velocity (CapEx), but unverified output increases bug density and maintenance effort (OpEx).
- 
- Protective Measure Selection: Under a strict constraint of selecting only one protective measure, you must choose between:
- 
  1. Automated Backups: Protects against catastrophic failure and total loss of availability (disaster recovery).
  2. 
  3. Automated Testing (Acceptance-Driven): Mitigates functional defects and data degradation (operational reliability).
  4. 
3. Key Claims to Verify
Before finalizing your assignment, evaluate these assumptions:

1. Does AI-generated code increase maintenance costs compared to human-written code, or is the maintenance burden equal whenever requirements change rapidly?
2. 
3. Is an administrator's time a financial cost or an operational bottleneck? (In a student project, manual labor often costs $0$ directly, but causes system degradation if admins abandon the workload).
4. 
5. Is automatic backup alone sufficient without input validation? (If corrupt or malicious files are backed up, the restored state remains broken).
6. 
Assignment Draft (480 Words)
Does generating a study-materials exchange with AI lower its total lifecycle cost, or do testing, requirement management, and backups remain the primary cost drivers? While AI assistants drastically reduce initial build costs, long-term costs in systems with active users are dictated by operational maintenance, post-launch defects, and failure recovery.

AI code generation significantly accelerates early development. For instance, in Week 05, an AI assistant wrote a logic function (can_book) in seconds. However, speed at inception does not equate to lower total cost over a product's lifecycle. Initial unit tests missed edge-case faults; only test cases derived directly from acceptance criteria caught the underlying defect. Without explicit test coverage based on precise requirements, flawed AI-generated logic reaches production environments, transforming temporary speed gains into expensive post-launch repair work.

In production, post-launch costs stem primarily from two sources: fixing defect consequences and maintaining unvalidated features. In a system serving roughly 800 students with 40 weekly uploads, a raw AI-generated upload and search feature may pass a initial demo but fail under real usage. Defective uploads—such as duplicate files, misclassifications, or unsearchable records—require manual administrative intervention. At an estimated 20 minutes per fix, administrative overhead accumulates rapidly. Moreover, because categories and file formats change every semester, unmaintained AI code becomes brittle. Without continuous requirement updates and a test audience to validate feature utility, maintenance costs quickly surpass initial development savings.

Furthermore, the choice of protective infrastructure determines survival during catastrophic events. For a small team constrained to a single protective measure, evaluating failure severity is critical. The highest-impact risk in this scenario is total data loss or database encryption right before exams, wiping out all student notes. While automated testing prevents functional bugs, it cannot restore deleted files. Implementing an automated backup system guarantees data resilience. Rebuilding an entire crowd-sourced document collection from scratch is far more expensive than preventing data loss through automated backups.

Ultimately, the claim "faster AI generation means lower total cost" holds true only for throwaway training projects lacking real users. Once real users rely on a system, initial code generation represents only a fraction of total expenditure. Testing, evolving requirement management, and automated backups ultimately dictate the total lifecycle cost.
```

**Response:**

```text
Here is an evaluation of your draft against your chosen question, scenario, and constraints.

---

## 1. Automated Backups as a Complete Safety Net

* **The Inaccuracy / Assumption:** The draft concludes that automated backups guarantee survival against catastrophic data loss or encryption right before exams.
* **Why It Matters:** Under the constraint of selecting **only one protective measure**, automated backups alone fail if a ransomware attack encrypts the backup target or if a corrupted database is automatically backed up over good data.
* **How to Check:** Evaluate backup strategy literature (e.g., 3-2-1 backup rule, air-gapped backups, restore testing) vs. threat models for ransomware and corrupted file uploads.
* **Counterexample / Alternative Interpretation:** If an administrator uploads or automatically backs up corrupted files or an encrypted database state, automated backups simply automate the storage of unusable data. Automated testing with strict input validation or write-protection might prevent the database from becoming corrupted or encrypted in the first place.

---

## 2. Admin Labor as a Direct Financial Cost Driver

* **The Inaccuracy / Vague Claim:** The draft treats administrator repair time (20 minutes per bad upload) as a direct contributor to the total software cost.
* **Why It Matters:** In a student project environment, student administrators are rarely paid hourly wages. Conflating unpaid volunteer labor with direct monetary operational expenditure (OpEx) misstates how software engineering economics function in small volunteer-run systems.
* **How to Check:** Define whether "cost" refers strictly to monetary budget (hosting, domain, API credits) or operational capacity/opportunity cost (student burnout, abandoned maintenance).
* **Counterexample / Alternative Interpretation:** If 10 files are broken per week, it costs $0$ in actual money, but causes 3.3 hours of admin effort. The real failure mode isn't financial budget depletion; it's **administrator abandonment**, causing the exchange quality to degrade until students stop using it.

---

## 3. Scope vs. Requirements Drift Under Changing Formats

* **Missing Reasoning:** The draft mentions that categories and file formats change every semester, making AI code brittle, but it omits *why* AI code generation specifically incurs cost during changes compared to hand-written code.
* **Why It Matters:** If requirements change every semester, code must be refactored regardless of who wrote it. The core claim needs to explain how AI generation handles schema migrations, dynamic categorizations, or edge cases.
* **How to Check:** Compare the cost of re-prompting an AI to generate new parser/category logic vs. manually writing modular code, and assess whether lack of test coverage makes AI re-generation riskier.
* **Counterexample / Alternative Interpretation:** Generating new code with AI every semester might actually be *cheaper* and faster than manual refactoring if supported by a strong acceptance test suite. The cost driver is not the AI generation itself, but the **lack of regression tests** when changing code every semester.

---

## 4. Misalignment Between Test Cases and Data Integrity Issues

* **Unsupported Assumption:** The draft claims that automated testing derivatively derived from acceptance criteria prevents defect consequences like duplicate files, wrong categories, or unusable search results.
* **Why It Matters:** Unit/acceptance tests verify that code behaves according to pre-written rules; they do not natively detect garbage user input, duplicate user uploads, or semantic miscategorizations unless explicit data validation logic is written and enforced.
* **How to Check:** Trace how a unit test or acceptance test would flag a student uploading a legitimate PDF under the wrong subject category or uploading a duplicate file with a slightly altered filename.
* **Counterexample / Alternative Interpretation:** An AI-generated feature could pass 100% of functional acceptance tests (e.g., "file uploads successfully and returns 200 OK") while still filling the database with unusable, duplicate, or miscategorized content because the root problem is user behavior and input validation, not software logic bugs.

---

## 5. Arbitrary Assignment Context References

* **Vague Claim:** Paragraph 2 references specific context ("For instance, in Week 05, an AI assistant wrote a logic function (`can_book`) in seconds").
* **Why It Matters:** The provided scenario specifies a study-materials exchange (uploading, searching, downloading notes), not a booking system. Referencing `can_book` introduces external, non-pertinent material that dilutes the analysis of the scenario.
* **How to Check:** Cross-reference all inline examples against the provided prompt constraints (uploading, searching, downloading study notes, changing categories).
* **Counterexample / Alternative Interpretation:** Replace `can_book` with an AI-generated function specific to the prompt—such as `categorize_file()` or `parse_search_query()`—to directly illustrate how an AI-generated search or parsing function fails on dynamic edge cases.

---
```

### B3 — Revision (Prompt C)

- **Tool:** Gemini AI
- **Model:** Gemini Flash 3.6
- **Date:** 10/11/2026
- **Purpose:** revision using my decisions and verified evidence

**Prompt:**

```text
Revise the draft using my review decisions and source notes below. Keep the answer relevant to my scenario and preserve uncertainty where evidence is limited.

My decisions: Accepted admin labor as operational bottleneck rather than monetary cost; qualified backup choice by noting backups need basic input protection; replaced can_book reference with categorize_file(). Verified evidence: Sommerville 10th ed. Ch. 1 Sec 1.1.2 confirms maintenance costs account for 60%+ of custom software lifecycle TCO. Draft: Generating a software prototype with an AI assistant in a few hours drastically lowers initial development effort, but it does not guarantee a lower Total Cost of Ownership (TCO) over the system's lifetime. In software engineering, initial code creation typically accounts for only 20% to 30% of total costs, while maintenance, defect repair, and operational failure recovery consume the remaining 70% to 80%. For a student-run Study-Materials Exchange Platform, relying solely on rapid AI generation shifts expenses downstream into manual administrative labor and technical debt. When AI generates an upload-and-search feature without formal requirements or test coverage, edge cases—such as duplicate uploads, incorrect category tagging, or broken search indexes—inevitably reach production. Under the scenario's operational scale, if 40 files are uploaded weekly and a fraction requires manual administrative cleanup at 20 minutes per file, administrative labor costs rapidly accumulate. Furthermore, changing semester file formats and categories require continuous code refactoring. Unstructured AI code is notoriously difficult to maintain, meaning each semester's update increases the risk of introducing subtle bugs or system failures. Under the constraint of a small team with no dedicated QA tester and a budget for only one protective measure, the team must weigh automated testing, formal requirements, and automated backups: 1. Automated Testing & Acceptance Criteria: As demonstrated in practice (e.g., the can_book exercise), AI-generated code often passes superficial checks while harboring hidden logic errors. Tests built from strict acceptance criteria prevent defective code from reaching users, reducing daily repair overhead. 2. Automated Backups: The highest-severity risk in this scenario is catastrophic database loss or ransomware encryption right before exams. While tests prevent logic bugs, they cannot restore deleted files. Automated backups guarantee disaster recovery, making them the most cost-effective single protective measure against total system failure. Separating Facts from Assumptions: - Facts (Engineering Principles): System maintenance and defect fixes dominate software lifecycle costs. AI tools accelerate prototype creation but do not independently verify business domain logic or edge cases. Manual administrative intervention incurs real operational labor costs. - Assumptions (Fictional Scenario Data): 800 active student users; 40 weekly file uploads; 20 minutes required for an administrator to repair one corrupt or miscategorized upload; a student team budget limited strictly to one protective engineering measure. Claims to Verify in Literature (Sommerville, Ch. 1): 1. Life-Cycle Cost Ratios: Verify the distribution between initial development costs vs. long-term maintenance costs for custom software systems. 2. Software Dependability vs. Cost: Confirm how early specification and automated verification reduce the exponential cost of fixing defects post-deployment.

Show what you changed and why. Use only the sources I supplied. Flag remaining gaps instead of inventing details.
```

**Response:**

```text
Here is the revised draft incorporating all your review decisions and source evidence, followed by a breakdown of changes made and remaining gaps.

---

### Revised Draft

Generating a software prototype with an AI assistant in a few hours drastically lowers initial development effort, but it does not guarantee a lower Total Cost of Ownership (TCO) over the system's lifetime. In software engineering, initial code creation accounts for a minority of total expenditures, whereas maintenance costs typically account for 60%+ of custom software lifecycle TCO (Sommerville 10th ed., Ch. 1, Sec. 1.1.2). For a student-run Study-Materials Exchange Platform, relying solely on rapid AI generation shifts burden downstream into an administrative labor bottleneck and technical debt.

When AI generates an upload-and-search feature without formal requirements or test coverage, edge cases—such as duplicate uploads, incorrect category tagging, or broken search indexes—inevitably reach production. Under the scenario's operational scale, if 40 files are uploaded weekly and a fraction requires manual administrative cleanup at 20 minutes per file, administrative labor becomes the primary operational bottleneck rather than a direct monetary cost. Furthermore, changing semester file formats and categories require continuous code refactoring. Unstructured AI code is notoriously difficult to maintain, meaning each semester's update increases the risk of introducing subtle bugs or system failures.

Under the constraint of a small team with no dedicated QA tester and a budget for only one protective measure, the team must weigh automated testing, formal requirements, and automated backups:

1. **Automated Testing & Acceptance Criteria:** As demonstrated in practice (e.g., the `categorize_file()` exercise), AI-generated code often passes superficial checks while harboring hidden logic errors. Tests built from strict acceptance criteria prevent defective code from reaching users, reducing daily repair overhead.
2. **Automated Backups:** The highest-severity risk in this scenario is catastrophic database loss or ransomware encryption right before exams. While tests prevent logic bugs, they cannot restore deleted files. However, backup systems themselves require basic input protection and filtering to prevent backing up corrupted or malicious files. Automated backups guarantee disaster recovery, but their effectiveness depends on basic input safety controls.

#### Separating Facts from Assumptions

* **Facts (Engineering Principles & Verified Literature):** System maintenance accounts for 60%+ of custom software lifecycle TCO (Sommerville 10th ed., Ch. 1, Sec. 1.1.2). AI tools accelerate prototype creation but do not independently verify business domain logic or edge cases. Manual administrative intervention creates an operational labor bottleneck.
* **Assumptions (Fictional Scenario Data):** 800 active student users; 40 weekly file uploads; 20 minutes required for an administrator to repair one corrupt or miscategorized upload; a student team budget limited strictly to one protective engineering measure.

---

### What Was Changed & Why

1. **Integrated Somerville 10th ed. Evidence on Lifecycle Costs:**
* *Change:* Updated the ratio claims in the opening and facts section to specifically state that maintenance accounts for 60%+ of custom software lifecycle TCO.
* *Why:* Aligned directly with your verified source note (Sommerville 10th ed., Ch. 1, Sec. 1.1.2).


2. **Replaced Cost Focus with Administrative Labor Bottleneck:**
* *Change:* Rephrased expenses downstream from "monetary costs" to an "administrative labor bottleneck."
* *Why:* Implemented your decision to accept admin labor as an operational constraint rather than a direct cash expenditure.


3. **Qualified the Backup Measure Choice:**
* *Change:* Added a caveat to the "Automated Backups" point noting that backups still require basic input protection to prevent persisting corrupted uploads.
* *Why:* Reflected your decision that backups alone are insufficient without basic input safeguards.


4. **Updated Exercise Reference:**
* *Change:* Replaced `can_book` with `categorize_file()`.
* *Why:* Aligned with your decision to reference the correct module exercise.



---

### Remaining Gaps & Limited Evidence

* **Quantified Cost of Software Dependability vs. Early Verification:** While Sommerville Ch. 1 Sec 1.1.2 provides the 60%+ maintenance TCO metric, precise exponential cost curves for early vs. late bug fixes are omitted here as specific text citations/data points for that exact curve were not provided in the supplied notes.
* **Impact of Input Safeguards on Backup Selection:** Evidence is limited on whether the hypothetical "one protective measure constraint" allows implementing basic input validation alongside backups, or if choosing backups strictly excludes input filtering.
```

## 9. Appendix C — Evidence tables

### Verification table

| AI claim | Source and locator | Evidence found | Decision |
| --- | --- | --- | --- |
| "Initial code creation accounts for only 20% to 30% of total costs, while maintenance consumes 70% to 80%." | Sommerville, *Software Engineering* (10th ed.), Chapter 1, Section 1.1.2 ("Software engineering costs"), p. 22. URL: https://www.pearsonglobaleditions.com/Sommerville (Accessed: 2026-10-11) | Confirms that for custom software systems, maintenance and evolution costs usually exceed initial development costs, often comprising over 60% of total lifecycle expenditure. | qualify |
| "Tests built from strict acceptance criteria prevent defective code from reaching users." | Sommerville, *Software Engineering* (10th ed.), Chapter 1, Section 1.1.2 ("Fundamental SE activities"), p. 23. URL: https://www.pearsonglobaleditions.com/Sommerville (Accessed: 2026-10-11) | Specification and validation are fundamental activities that reduce post-deployment defect costs and prevent flawed requirements from reaching production. | keep |

### Change log

| AI wording / suggestion | Your final version | Reason for change |
| --- | --- | --- |
| "For instance, in Week 05, an AI assistant wrote a logic function (`can_book`) in seconds" | "For instance, an AI can produce a `categorize_file()` or `parse_search_query()` module in seconds" | Removed out-of-context lab assignment reference (`can_book`) to strictly align with the study-materials exchange scenario domain. |
| "if 40 files are uploaded weekly and a fraction requires manual administrative cleanup at 20 minutes per file, administrative labor costs rapidly accumulate" | "if 10 uploads require 20 minutes of cleanup each, 3.3 hours of weekly manual overhead leads to administrator burnout and platform abandonment" | Corrected inaccurate framing of unpaid volunteer student labor as a direct monetary cost, shifting focus to the true failure mode: operational bottlenecks and volunteer burnout. |