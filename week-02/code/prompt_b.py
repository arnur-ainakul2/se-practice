def analyze_marks(marks, pass_mark=50):
    if not marks:
        raise ValueError("marks must be a non-empty list")

    for m in marks:
        if isinstance(m, bool) or not isinstance(m, (int, float)):
            raise ValueError(f"non-numeric mark: {m!r}")
        if not 0 <= m <= 100:  # also rejects NaN, since comparisons with NaN are False
            raise ValueError(f"mark out of range (0-100): {m!r}")

    passed = sum(1 for m in marks if m >= pass_mark)
    return {
        "average": sum(marks) / len(marks),
        "highest": max(marks),
        "lowest": min(marks),
        "pass_rate": passed / len(marks) * 100,  # percentage of marks >= pass_mark
    }

# Explanation

# Validation first: the function checks for an empty list, then checks every value before computing anything. It raises ValueError with a message naming the offending value.
# Non-numeric values: anything that isn't an int or float is rejected. bool is excluded explicitly, because True and False are technically integers in Python and would otherwise slip through as 1 and 0.
# Range check: 0 <= m <= 100 accepts the full 0 to 100 range inclusive. Because comparisons with NaN are always false, NaN is rejected too.
# Pass rate: this is the percentage of marks that are greater than or equal to pass_mark, so a mark exactly equal to the pass mark counts as a pass. If you'd prefer a fraction (0 to 1), drop the * 100.