import math
import unittest


def _check_number(value, name):
    """Raise ValueError unless value is a finite int/float in [0, 100]."""
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        raise ValueError(
            f"{name} must be a number, got {type(value).__name__}: {value!r}"
        )
    if isinstance(value, float) and not math.isfinite(value):
        raise ValueError(f"{name} must be finite, got {value!r}")
    if not 0 <= value <= 100:
        raise ValueError(f"{name} must be between 0 and 100, got {value!r}")


def analyze_marks(marks, pass_mark=50):
    if not isinstance(marks, (list, tuple)):
        raise ValueError(
            f"marks must be a list or tuple, got {type(marks).__name__}: {marks!r}"
        )
    if len(marks) == 0:
        raise ValueError("marks must not be empty")
    for i, mark in enumerate(marks):
        _check_number(mark, f"marks[{i}]")
    _check_number(pass_mark, "pass_mark")

    count = len(marks)
    passed = sum(1 for m in marks if m >= pass_mark)
    return {
        "average": round(math.fsum(marks) / count, 2),
        "highest": max(marks),
        "lowest": min(marks),
        "pass_rate": round(passed * 100 / count, 2),
    }


class TestAnalyzeMarks(unittest.TestCase):
    def test_worked_example(self):
        result = analyze_marks([40, 60, 80], 50)
        self.assertEqual(
            result,
            {"average": 60.0, "highest": 80, "lowest": 40, "pass_rate": 66.67},
        )
        self.assertEqual(set(result), {"average", "highest", "lowest", "pass_rate"})
        self.assertIsInstance(result["average"], float)
        self.assertIsInstance(result["highest"], int)

    def test_default_pass_mark_and_tuple(self):
        self.assertEqual(analyze_marks((40, 60, 80))["pass_rate"], 66.67)

    def test_single_mark_pass(self):
        self.assertEqual(
            analyze_marks([75]),
            {"average": 75.0, "highest": 75, "lowest": 75, "pass_rate": 100.0},
        )

    def test_single_mark_fail(self):
        self.assertEqual(
            analyze_marks([30]),
            {"average": 30.0, "highest": 30, "lowest": 30, "pass_rate": 0.0},
        )

    def test_mark_equal_to_pass_mark_passes(self):
        self.assertEqual(analyze_marks([50, 49], 50)["pass_rate"], 50.0)

    def test_decimals(self):
        result = analyze_marks([50.5, 49.5, 70.25])
        self.assertEqual(result["average"], 56.75)
        self.assertEqual(result["highest"], 70.25)
        self.assertEqual(result["lowest"], 49.5)
        self.assertEqual(result["pass_rate"], 66.67)

    def test_custom_pass_mark_70(self):
        self.assertEqual(analyze_marks([40, 60, 80], 70)["pass_rate"], 33.33)

    def test_custom_pass_mark_40(self):
        self.assertEqual(analyze_marks([40, 60, 80], 40)["pass_rate"], 100.0)

    def test_empty_list_and_tuple(self):
        with self.assertRaisesRegex(ValueError, "empty"):
            analyze_marks([])
        with self.assertRaises(ValueError):
            analyze_marks(())

    def test_text_values(self):
        with self.assertRaisesRegex(ValueError, "'abc'"):
            analyze_marks([50, "abc"])
        with self.assertRaisesRegex(ValueError, "'60'"):
            analyze_marks(["60"])

    def test_below_zero(self):
        with self.assertRaisesRegex(ValueError, "-1"):
            analyze_marks([50, -1])

    def test_above_100(self):
        with self.assertRaisesRegex(ValueError, "100.5"):
            analyze_marks([100.5])

    def test_boundaries_accepted(self):
        self.assertEqual(
            analyze_marks([0, 100]),
            {"average": 50.0, "highest": 100, "lowest": 0, "pass_rate": 50.0},
        )
        self.assertEqual(analyze_marks([50], 0)["pass_rate"], 100.0)
        self.assertEqual(analyze_marks([100], 100)["pass_rate"], 100.0)

    def test_bool_rejected(self):
        with self.assertRaisesRegex(ValueError, "True"):
            analyze_marks([True])
        with self.assertRaises(ValueError):
            analyze_marks([50, False])

    def test_nan_and_inf_rejected(self):
        with self.assertRaisesRegex(ValueError, "nan"):
            analyze_marks([50, float("nan")])
        with self.assertRaisesRegex(ValueError, "inf"):
            analyze_marks([float("inf")])
        with self.assertRaises(ValueError):
            analyze_marks([float("-inf")])

    def test_invalid_pass_mark(self):
        for bad in ("50", True, float("nan"), float("inf"), -1, 101, None):
            with self.subTest(pass_mark=bad):
                with self.assertRaises(ValueError):
                    analyze_marks([50], bad)

    def test_non_list_input(self):
        for bad in ("60", {"a": 60}, {60}, None, 60, (x for x in [60])):
            with self.subTest(marks=bad):
                with self.assertRaises(ValueError):
                    analyze_marks(bad)


if __name__ == "__main__":
    unittest.main()