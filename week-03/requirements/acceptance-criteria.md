# Acceptance criteria — three selected stories

Assumptions first, then the criteria. Each block names the story it belongs to. 3 to 5 criteria per
story, every one in Given / When / Then form, and every set covers a validation or error case — not
three happy paths.

---

## Assumptions

These must settle the two questions the scenario leaves open. Either answer is accepted; no answer
is not.

- **Overlap:** a booking that ends exactly when another begins is **not allowed** (allowed / not allowed) under R3, because bookings are treated as half-open intervals `[start, end)` — a booking ending at 14:00 does not conflict with one starting at 14:00, so back-to-back bookings are allowed and this does not count as an overlap.
- **Duration:** a booking of exactly two hours is **allowed** (allowed / not allowed) under R2, because "at most two hours" is read as an inclusive upper bound; only durations strictly greater than two hours are rejected.
- Cancelling a booking only removes that booking; it has no effect on the room's blocked state.
- Only the student who created a booking may cancel it, and only before its stored start time.

---

## US-02 — Book a room

### AC-01
- **Given** a room is unblocked and has no existing booking that overlaps the requested time range
- **When** a student submits a booking with a future start time and a duration of at most two hours
- **Then** the booking is created and confirmed for that room and time range

### AC-02
- **Given** a student is submitting a booking request
- **When** the submitted start time is not in the future (now or earlier)
- **Then** the booking is rejected with a reason stating the start time must be in the future

### AC-03
- **Given** a room already has a booking whose time range intersects the requested time range
- **When** a student submits a new booking for that room over the same range
- **Then** the booking is rejected with a reason stating the room is already booked for that period

---

## US-05 — Block a room

### AC-04
- **Given** a room is currently unblocked
- **When** an administrator blocks the room for a given time range
- **Then** the room is marked blocked for that range and no new bookings can be created for it

### AC-05
- **Given** an administrator is creating a block
- **When** the submitted start time for the block is in the past
- **Then** the block is rejected with a reason stating the start time must be in the future

### AC-06
- **Given** a room has an active block for a given time range
- **When** a student attempts to book that room for a time range overlapping the block
- **Then** the booking attempt is rejected with a reason stating the room is blocked

---

## US-03 — Cancel a booking

### AC-07
- **Given** a student has a confirmed booking that has not yet started
- **When** that student requests to cancel it
- **Then** the booking is cancelled and the room becomes available again for that time range

### AC-08
- **Given** a booking belongs to a different student
- **When** the requesting student attempts to cancel it
- **Then** the cancellation is rejected with a reason stating the booking does not belong to them, and the booking remains unchanged

### AC-09
- **Given** a booking's start time is at or before the current time
- **When** the owning student attempts to cancel it
- **Then** the cancellation is rejected with a reason stating that in-progress or past bookings cannot be cancelled