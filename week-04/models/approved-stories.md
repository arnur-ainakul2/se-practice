# Approved stories — Smart Campus study room booking

**Source of this set:** my Week 03 stories, revised after review (rule references renumbered to the Week 04 R1–R4; US-04 narrowed to the booking confirmation only).

## Scenario (from the Lesson 04 practice deck, slide 7)

Students view room availability, book a room, and cancel their own bookings. Administrators block
or unblock rooms and review usage.

- **R1** Future start, with duration greater than 0 and at most 2 hours.
- **R2** Active bookings for the same room cannot overlap.
- **R3** A blocked room cannot accept a new booking.
- **R4** A successful booking produces a confirmation.

## Approved stories

### US-01
**Story:** As a Student, I want to view which rooms are free and when, so that I can choose a time and room that fits my schedule.
**Priority:** High
**Rules:** —
**Assumption:** Availability is shown as a per-room timeline for the next 7 days.

### US-02
**Story:** As a Student, I want to book a free room for a specific time slot, so that I have a guaranteed place to study, and I get a confirmation when the booking succeeds.
**Priority:** High
**Rules:** R1, R2, R3, R4
**Assumption:** A booking is accepted only if the start is in the future and the duration is >0 and ≤ 2 hours, exactly 2 hours included (R1); the slot does not overlap an active booking in the same room (R2); and the room is not blocked (R3). Touching bookings (10:00–12:00 and 12:00–13:00) do NOT overlap (half-open interval). If a condition fails, the system returns a specific reason (blocked / overlap / duration / past start).

### US-03
**Story:** As a Student, I want to cancel a booking I made, so that I can release the room for others when my plans change.
**Priority:** Medium
**Rules:** R2
**Assumption:** Only the student who created the booking can cancel it, and only before its start time. A cancelled booking is no longer active, so its slot becomes free (R2).

### US-04
**Story:** As a Student, I want to receive a confirmation when my booking is made, so that I have a clear record of my reservation.
**Priority:** Medium
**Rules:** R4
**Assumption:** The confirmation is shown inside the web application only. No confirmation is produced for cancellations (out of scope).

### US-05
**Story:** As an Administrator, I want to block a room that is out of service, so that students cannot reserve a room that isn't actually usable.
**Priority:** High
**Rules:** R3
**Assumption:** Blocking prevents new bookings from that point forward and does NOT automatically cancel bookings already made before the block.

### US-06
**Story:** As an Administrator, I want to unblock a room once it is usable again, so that students can resume booking it.
**Priority:** Medium
**Rules:** R3
**Assumption:** Unblocking only makes the room eligible for new bookings again; it has no retroactive effect.

### US-07
**Story:** As an Administrator, I want to review how rooms were used over a chosen period, so that I can see which rooms are in high or low demand.
**Priority:** Medium
**Rules:** —
**Assumption:** The review aggregates completed, cancelled and active bookings per room over the period; it only shows data and does not block or unblock anything.

**Out of scope** (do not model): payments, equipment in rooms, recurring bookings, waiting lists,
notifications other than the booking confirmation, user registration.