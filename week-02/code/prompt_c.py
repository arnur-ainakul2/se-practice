import math
import unittest


def _validate_number(value, name):
    """Return value if it is a real, finite number in [0, 100], else raise ValueError."""
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        raise ValueError(f"{name} must be numeric, got {value!r}")
    if math.isnan(value) or not (0 <= value <= 100):
        raise ValueError(f"{name} must be between 0 and 100, got {value!r}")
    return value


def analyze_marks(marks, pass_mark=50):
    """
    Analyze a list of marks (each 0-100).

    Returns a dict with:
      average   - mean of marks, rounded to 2 decimals
      highest   - largest mark
      lowest    - smallest mark
      pass_rate - percentage of marks >= pass_mark, rounded to 2 decimals

    Raises ValueError for an empty list, non-numeric values, or values outside 0-100.
    """
    if not isinstance(marks, (list, tuple)):
        raise ValueError("marks must be a list or tuple")
    if len(marks) == 0:
        raise ValueError("marks must not be empty")

    _validate_number(pass_mark, "pass_mark")
    for m in marks:
        _validate_number(m, "mark")

    passed = sum(1 for m in marks if m >= pass_mark)
    return {
        "average": round(sum(marks) / len(marks), 2),
        "highest": max(marks),
        "lowest": min(marks),
        "pass_rate": round(passed / len(marks) * 100, 2),
    }


class TestAnalyzeMarks(unittest.TestCase):
    def test_example(self):
        self.assertEqual(
            analyze_marks([40, 60, 80], 50),
            {"average": 60.0, "highest": 80, "lowest": 40, "pass_rate": 66.67},
        )

    def test_one_mark_pass(self):
        self.assertEqual(
            analyze_marks([75]),
            {"average": 75.0, "highest": 75, "lowest": 75, "pass_rate": 100.0},
        )

    def test_one_mark_fail(self):
        self.assertEqual(analyze_marks([20])["pass_rate"], 0.0)

    def test_decimals(self):
        result = analyze_marks([50.5, 49.5, 70.25])
        self.assertEqual(result["average"], 56.75)
        self.assertEqual(result["highest"], 70.25)
        self.assertEqual(result["lowest"], 49.5)
        self.assertEqual(result["pass_rate"], 66.67)

    def test_custom_pass_mark(self):
        self.assertEqual(analyze_marks([40, 60, 80], 70)["pass_rate"], 33.33)
        self.assertEqual(analyze_marks([40, 60, 80], 40)["pass_rate"], 100.0)

    def test_boundaries_accepted(self):
        result = analyze_marks([0, 100])
        self.assertEqual(result["lowest"], 0)
        self.assertEqual(result["highest"], 100)

    def test_empty_list(self):
        with self.assertRaises(ValueError):
            analyze_marks([])

    def test_text_value(self):
        with self.assertRaises(ValueError):
            analyze_marks([50, "abc", 70])
        with self.assertRaises(ValueError):
            analyze_marks([50, "60"])

    def test_below_zero(self):
        with self.assertRaises(ValueError):
            analyze_marks([50, -1])

    def test_above_100(self):
        with self.assertRaises(ValueError):
            analyze_marks([50, 100.5])

    def test_bool_and_nan_rejected(self):
        with self.assertRaises(ValueError):
            analyze_marks([True, 50])
        with self.assertRaises(ValueError):
            analyze_marks([float("nan"), 50])

    def test_invalid_pass_mark(self):
        with self.assertRaises(ValueError):
            analyze_marks([50], pass_mark=101)


if __name__ == "__main__":
    unittest.main()