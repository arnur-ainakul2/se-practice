import unittest
from booking import can_book


class BookingTests(unittest.TestCase):

    # --- 6 Table Cases ---

    def test_touching_end_is_allowed(self):
        result = can_book(660, 720, 540, False, [(600, 660)])
        self.assertIs(result, True)

    def test_partial_overlap_rejected(self):
        result = can_book(630, 690, 540, False, [(600, 660)])
        self.assertIs(result, False)

    def test_blocked_room_rejected(self):
        result = can_book(660, 720, 540, True, [(600, 660)])
        self.assertIs(result, False)

    def test_exactly_two_hours_allowed(self):
        result = can_book(720, 840, 540, False, [(600, 660)])
        self.assertIs(result, True)

    def test_over_two_hours_rejected(self):
        result = can_book(720, 841, 540, False, [(600, 660)])
        self.assertIs(result, False)

    def test_starts_now_rejected(self):
        result = can_book(540, 570, 540, False, [(600, 660)])
        self.assertIs(result, False)

    # --- Additional Boundary & Input Tests ---

    def test_zero_length_duration_rejected(self):
        result = can_book(660, 660, 540, False, [(600, 660)])
        self.assertIs(result, False)

    def test_reversed_times_rejected(self):
        result = can_book(720, 660, 540, False, [(600, 660)])
        self.assertIs(result, False)

    def test_day_bound_upper_limit_allowed(self):
        result = can_book(1320, 1440, 540, False, [(600, 660)])
        self.assertIs(result, True)

    def test_day_bound_exceeded_rejected(self):
        result = can_book(1380, 1441, 540, False, [(600, 660)])
        self.assertIs(result, False)

    def test_empty_existing_allowed(self):
        result = can_book(660, 720, 540, False, [])
        self.assertIs(result, True)

    def test_multiple_existing_overlap_rejected(self):
        existing = [(600, 660), (780, 840)]
        result = can_book(750, 810, 540, False, existing)
        self.assertIs(result, False)

    def test_existing_input_not_mutated(self):
        existing = [(600, 660), (720, 780)]
        existing_copy = list(existing)
        can_book(660, 720, 540, False, existing)
        self.assertEqual(existing, existing_copy)

    def test_enclosed_overlap_rejected(self):
        result = can_book(615, 645, 540, False, [(600, 660)])
        self.assertIs(result, False)

    def test_enclosing_overlap_spans_existing_rejected(self):
        result = can_book(570, 690, 540, False, [(600, 660)])
        self.assertIs(result, False)

    def test_existing_elements_not_mutated_during_checks(self):
        # Specific check for M10: verify tuple integrity and order after calls
        t1, t2 = (600, 660), (700, 760)
        existing = [t1, t2]
        can_book(630, 690, 540, False, existing)
        self.assertEqual(existing, [(600, 660), (700, 760)])
        self.assertIs(existing[0], t1)
        self.assertIs(existing[1], t2)


if __name__ == "__main__":
    unittest.main()