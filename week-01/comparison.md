# Week 01 — Manual vs AI: Comparison

**Name: Ainakul Arnur**
**Group: Software Engineering**
**Date: 09/13/2026**

---

## 1. Facts

| | Manual (Part 1) | Rocket (Part 2) |
| --- | --- | --- |
| Language / stack used | Python | Next.js, TypeScript, Tailwind CSS |
| Time to first version that ran | 14 min | 2 min |
| Time to all 4 test cases passing | 30 min | 10 min |
| Number of attempts / prompts needed | 6 | 4 (1 initial + 2 clarifying + 1 bugfix) |
| Lines of code you actually wrote | 33 lines | 0 lines |
| Did it handle invalid marks (case B)? | Yes | Yes (after follow-up prompt) |
| Did it handle an empty list (case D)? | Yes | Yes |
| Did it use the ≥ 50 pass threshold? | Yes | Yes |
| Output format matches the spec? | YES | YES |
| Can you explain every line of it? | YES | Partial (generated 12 React components) |

---

## 2. Test results

| Case | Input | Manual output | Rocket output | Spec says | Match? |
| --- | --- | --- | --- | --- | --- |
| A | `85, 23, 45, 90, 92` | 5 valid, Avg: 67.00, Max: 92, Min: 23, Pass: 60.0% | 5 valid, Avg: 67.00, Max: 92, Min: 23, Pass: 60.0% | avg 67.00 · high 92 · low 23 · pass 60.0% | YES |
| B | `88, 47, -5, 101, abc, 73, 50, , 100` | 5 valid, Avg: 71.60, Max: 100, Min: 47, Pass: 80.0% | 5 valid, Avg: 71.60, Max: 100, Min: 47, Pass: 80.0% | avg 71.60 · high 100 · low 47 · pass 80.0% | YES (after fix) |
| C | `10, 20, 30` | 3 valid, Avg: 20.00, Max: 30, Min: 10, Pass: 0.0% | 3 valid, Avg: 20.00, Max: 30, Min: 10, Pass: 0.0% | avg 20.00 · high 30 · low 10 · pass 0.0% | YES |
| D | `abc, , xyz` | "No valid marks entered." | Banner "2 invalid entries skipped" & Empty State UI | clear message, no crash | YES |

---

## 3. What the AI added that I never asked for

- **Modern Full-Stack Architecture:** Next.js with TypeScript and Tailwind CSS styling instead of a simple CLI script.
- **UI Data Visualizations & Extra Controls:** An interactive grade distribution bar chart (`DistributionChart.tsx`), stat cards, and an interactive pass threshold slider.

---

## 4. What the AI got wrong or silently skipped

- **Runtime Crash on Non-numeric Input:** In Case B, `computeDistribution` passed `NaN` (from `'abc'`) and `-1` (from `-5`) as array indices (`Math.floor(-5/10)`), causing a fatal `TypeError: Cannot read properties of undefined (reading 'count')`.
- **Silent Validation Bypass:** After suppressing the crash, it initially included `-5` and `101` in calculations, yielding an incorrect Average of `64.86` instead of `71.60`.

---

## 5. The defect I asked Rocket to fix

**Prompt I used:**
> "The app no longer crashes, but calculation logic for Case B is incorrect. Marks outside the range of 0 to 100 (such as -5 and 101) are being treated as valid marks. Please fix the validation logic: filter out all numbers strictly < 0 or > 100, and ensure only valid marks [0, 100] are used for stats and charts."

**Result:** Fixed completely.

**What this tells me:**
AI generators prioritize visual completion and generic logic over strict domain constraints and edge cases. Without explicit boundaries ($0 \le \text{mark} \le 100$), AI silently processes illegal data.

---

## 6. Reflection (200–300 words)

1. **Which parts of the work did the AI genuinely speed up?**  
   The AI dramatically accelerated boilerplate creation, UI scaffolding, and layout assembly. Generating a polished Next.js application with charts and responsive styling took under 2 minutes, saving hours of manual frontend setup.

2. **Where did the AI cost you time, or give you something that looked right but was not?**  
   It wasted time on hidden edge-case bugs. The app looked visually perfect on Case A, but failed on Case B—first crashing with a `TypeError` due to negative array indexing (`buckets[-1]`), then silently accepting `-5` and `101` as valid marks. Debugging these deceptive failures took additional prompt iterations.

3. **Which of these two artefacts would you be willing to put your name on, and why?**  
   I would put my name on the Manual Python code for core logic, because I fully understand every line and can guarantee its boundary checks. However, for a production web tool, I would sign off on the AI UI only after thoroughly auditing and rewriting its data parsing functions.

4. **What must a human engineer still be responsible for after this experiment?**  
   A human engineer remains strictly responsible for requirements engineering, rigorous test-case verification, edge-case safety, and ultimate code correctness. AI can draft components quickly, but only a human can ensure compliance with technical specifications and safety constraints.