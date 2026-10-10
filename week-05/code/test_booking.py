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
        item1 = (600, 660)
        item2 = (700, 760)
        existing = [item1, item2]

        can_book(630, 690, 540, False, existing)

        self.assertEqual(existing, [(600, 660), (700, 760)])
        self.assertIs(existing[0], item1)
        self.assertIs(existing[1], item2)

    # --- AC5 (M10): every return path, unsorted inputs of several sizes ---

    @staticmethod
    def _unsorted_lists():
        # Deliberately NOT sorted. A hidden sort/reverse/pop/append inside
        # can_book changes one of these lists and the test notices.
        return [
            [(600, 660)],
            [(900, 960), (600, 660), (720, 780)],
            [(1100, 1160), (900, 960), (600, 660), (1300, 1360), (720, 780)],
        ]

    def test_every_return_path_is_a_real_bool_and_input_untouched(self):
        # (name, start, end, now, blocked, expected)
        scenarios = [
            ("accepted",     661,  719, 540, False, True),
            ("exactly_2h",   780,  900, 540, False, True),
            ("overlap",      630,  690, 540, False, False),
            ("blocked",      661,  719, 540, True,  False),
            ("starts_now",   540,  600, 540, False, False),
            ("in_the_past",  500,  560, 540, False, False),
            ("too_long",     960, 1081, 540, False, False),
            ("reversed",     720,  660, 540, False, False),
            ("zero_length",  700,  700, 540, False, False),
            ("beyond_day",  1380, 1441, 540, False, False),
        ]
        for name, start, end, now, blocked, expected in scenarios:
            for existing in self._unsorted_lists():
                with self.subTest(case=name, existing_size=len(existing)):
                    snapshot = list(existing)
                    result = can_book(start, end, now, blocked, existing)
                    self.assertIs(result, expected)
                    self.assertEqual(existing, snapshot)

    def test_empty_list_stays_empty_after_an_accepted_booking(self):
        existing = []
        result = can_book(660, 720, 540, False, existing)
        self.assertIs(result, True)
        self.assertEqual(existing, [])


if __name__ == "__main__":
    unittest.main()