# User stories — Smart Campus study room booking

### US-01
**Story:** As a Student, I want to view which rooms are free and when, so that I can choose a time and room that fits my schedule.
**Priority:** High
**Assumption:** Availability is shown as a per-room timeline for the next 7 days; no login/auth details are shown beyond identifying the student's own view.

### US-02
**Story:** As a Student, I want to book a free room for a specific time slot, so that I have a guaranteed place to study without risking it being taken when I arrive.
**Priority:** High
**Assumption:** A booking request is accepted only if the room is unblocked (R4), the start time is in the future (R1), the slot does not overlap an existing booking under the half-open-interval rule (R3), and the duration is ≤ 2 hours, exactly 2 hours included (R2). If any condition fails, the system returns a specific rejection reason (blocked / overlap / duration / past start) rather than a generic error, so the student can immediately correct the request.

### US-03
**Story:** As a Student, I want to cancel a booking I made, so that I can release the room for others when my plans change.
**Priority:** Medium
**Assumption:** Only the student who created a booking can cancel it, and cancellation is only possible before the booking's start time; a booking already in progress or finished cannot be cancelled.

### US-04
**Story:** As a Student, I want to receive a confirmation whenever a booking is made or cancelled, so that I have a clear record of my current reservation status.
**Priority:** Medium
**Assumption:** Confirmation covers both the booking-created and booking-cancelled triggers, and is delivered inside the same web application (e.g. shown on screen / in an in-app history), not through any other external channel.

### US-05
**Story:** As an Administrator, I want to block a room that is out of service, so that students cannot reserve a room that isn't actually usable (R4).
**Priority:** High
**Assumption:** Blocking a room prevents new bookings from that point forward but does not automatically cancel bookings already made before the block was applied.

### US-06
**Story:** As an Administrator, I want to unblock a room once it is usable again, so that students can resume booking it without any manual workaround.
**Priority:** Medium
**Assumption:** Unblocking simply makes the room eligible for new bookings again; it has no retroactive effect on bookings made or refused while the room was blocked.

### US-07
**Story:** As an Administrator, I want to review how rooms were used over a chosen period, so that I can see which rooms are in high or low demand.
**Priority:** Medium
**Assumption:** The review aggregates completed, cancelled, and active bookings per room over the selected period; it only surfaces usage data and does not itself perform any blocking/unblocking action.