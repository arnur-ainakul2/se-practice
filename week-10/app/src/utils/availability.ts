import type { Booking, CheckResult, Room } from "@/types";
import {
  minutesToLabel,
} from "./time";
import { evaluateAvailabilityRules } from "./availabilityRules";

export interface CheckInput {
  room: Room;
  start: number;
  end: number;
  currentTime: number;
  existingBookings: Booking[];
}

/**
 * Pure availability check. Does NOT mutate any booking data.
 * Touching endpoints are allowed: [a,b) and [b,c) do not overlap.
 */
export function checkAvailability(input: CheckInput): CheckResult {
  const { room, start, end, currentTime, existingBookings } = input;
  const reasons: string[] = [];
  const roomBookings = existingBookings.filter((b) => b.room_id === room.id);
  const rules = evaluateAvailabilityRules({
    start,
    end,
    currentTime,
    blocked: room.blocked,
    bookings: roomBookings,
  });

  // AC1: interval validity
  if (rules.invalidInterval) {
    reasons.push(
      "Interval must satisfy 0 ≤ start < end ≤ 1440 minutes (00:00–24:00)."
    );
  }
  if (rules.invalidCurrentTime) {
    reasons.push("Current time must be a finite minute value.");
  } else if (rules.startsInPast) {
    reasons.push(
      `Start time must be after the current time (${minutesToLabel(currentTime)}).`
    );
  }

  // AC2: duration cap
  if (rules.durationExceeded) {
    reasons.push(
      `Booking length is ${end - start} min, which exceeds the 120 minute limit.`
    );
  }

  // AC3: room blocked
  if (rules.roomBlocked) {
    reasons.push(
      `Room is blocked${room.blockedReason ? ` — ${room.blockedReason}` : ""}.`
    );
  }

  // AC4: overlap (touching endpoints allowed)
  if (rules.overlapIndexes.length > 0) {
    const first = roomBookings[rules.overlapIndexes[0]];
    reasons.push(
      `Overlaps existing booking ${minutesToLabel(first.start)}–${minutesToLabel(
        first.end
      )} by ${first.bookedBy}.`
    );
  }

  return {
    decision: reasons.length === 0 ? "available" : "unavailable",
    reasons,
    roomName: room.name,
    start,
    end,
  };
}
