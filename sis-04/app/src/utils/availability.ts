import type { Booking, CheckResult, Room } from "@/types";
import {
  MAX_DURATION_MINUTES,
  MINUTES_PER_DAY,
  minutesToLabel,
} from "./time";

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

  // AC1: interval validity
  if (
    !Number.isFinite(start) ||
    !Number.isFinite(end) ||
    start < 0 ||
    end > MINUTES_PER_DAY ||
    start >= end
  ) {
    reasons.push(
      "Interval must satisfy 0 ≤ start < end ≤ 1440 minutes (00:00–24:00)."
    );
  } else if (start <= currentTime) {
    reasons.push(
      `Start time must be after the current time (${minutesToLabel(currentTime)}).`
    );
  }

  // AC2: duration cap
  if (end - start > MAX_DURATION_MINUTES) {
    reasons.push(
      `Booking length is ${end - start} min, which exceeds the 120 minute limit.`
    );
  }

  // AC3: room blocked
  if (room.blocked) {
    reasons.push(
      `Room is blocked${room.blockedReason ? ` — ${room.blockedReason}` : ""}.`
    );
  }

  // AC4: overlap (touching endpoints allowed)
  const overlaps = existingBookings
    .filter((b) => b.room_id === room.id)
    .filter((b) => start < b.end && b.start < end);
  if (overlaps.length > 0) {
    const first = overlaps[0];
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
