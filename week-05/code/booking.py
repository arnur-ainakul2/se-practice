def can_book(start: int, end: int, now: int, blocked: bool, existing: list[tuple[int, int]]) -> bool:
    # AC3: The room is not blocked.
    if blocked:
        return False

    # AC1: 0 <= start < end <= 1440, and start > now.
    if not (0 <= start < end <= 1440 and start > now):
        return False

    # AC2: Duration is at most 120 minutes.
    if (end - start) > 120:
        return False

    # AC4: No overlap with an existing booking.
    # Intervals are half-open [start, end).
    # Overlap occurs if proposed start < existing end AND proposed end > existing start.
    for b_start, b_end in existing:
        if start < b_end and end > b_start:
            return False

    # AC5: Return True only when all AC1-AC4 conditions hold.
    return True