# Here's Python code to analyze student marks — it computes averages, highest/lowest scores, pass/fail counts, and grades:


def analyze_marks(students):
    """
    students: dict of {name: [marks]}
    Returns a summary dict per student plus class stats.
    """
    PASS_MARK = 40

    def grade(avg):
        if avg >= 90: return 'A+'
        elif avg >= 80: return 'A'
        elif avg >= 70: return 'B'
        elif avg >= 60: return 'C'
        elif avg >= 50: return 'D'
        elif avg >= PASS_MARK: return 'E'
        else: return 'F'

    results = {}
    class_averages = []

    for name, marks in students.items():
        total = sum(marks)
        avg = total / len(marks)
        highest = max(marks)
        lowest = min(marks)
        status = "Pass" if avg >= PASS_MARK else "Fail"

        results[name] = {
            "total": total,
            "average": round(avg, 2),
            "highest": highest,
            "lowest": lowest,
            "grade": grade(avg),
            "status": status
        }
        class_averages.append(avg)

    class_summary = {
        "class_average": round(sum(class_averages) / len(class_averages), 2),
        "top_student": max(results, key=lambda n: results[n]["average"]),
        "pass_count": sum(1 for r in results.values() if r["status"] == "Pass"),
        "fail_count": sum(1 for r in results.values() if r["status"] == "Fail"),
    }

    return results, class_summary


def print_report(results, class_summary):
    print(f"{'Name':<12}{'Total':<8}{'Avg':<8}{'High':<6}{'Low':<6}{'Grade':<7}{'Status':<7}")
    print("-" * 55)
    for name, r in results.items():
        print(f"{name:<12}{r['total']:<8}{r['average']:<8}{r['highest']:<6}{r['lowest']:<6}{r['grade']:<7}{r['status']:<7}")

    print("\nClass Summary")
    print("-" * 30)
    for k, v in class_summary.items():
        print(f"{k.replace('_', ' ').title()}: {v}")


# Example usage
if __name__ == "__main__":
    students = {
        "Alice": [85, 92, 78, 90],
        "Bob": [45, 39, 52, 48],
        "Charlie": [70, 65, 80, 75],
        "Diana": [95, 98, 91, 100],
    }

    results, class_summary = analyze_marks(students)
    print_report(results, class_summary)

# This handles any number of students and subjects — just adjust the students dictionary (name → list of marks). Want me to extend it to read marks from a CSV file, or add plotting (e.g. a bar chart of averages)?