import { MAX_DURATION_MINUTES, MINUTES_PER_DAY } from "./time";

export interface BookingRange {
  start: number;
  end: number;
}

export interface AvailabilityRulesInput {
  start: number;
  end: number;
  currentTime: number;
  blocked: boolean;
  bookings: readonly BookingRange[];
}

export interface AvailabilityRulesResult {
  invalidInterval: boolean;
  invalidCurrentTime: boolean;
  startsInPast: boolean;
  durationExceeded: boolean;
  roomBlocked: boolean;
  overlapIndexes: number[];
}

/** Pure shared rule evaluation for availability decisions and explanations. */
export function evaluateAvailabilityRules({
  start,
  end,
  currentTime,
  blocked,
  bookings,
}: AvailabilityRulesInput): AvailabilityRulesResult {
  const invalidInterval =
    !Number.isFinite(start) ||
    !Number.isFinite(end) ||
    start < 0 ||
    start >= end ||
    end > MINUTES_PER_DAY;
  const invalidCurrentTime = !Number.isFinite(currentTime);

  return {
    invalidInterval,
    invalidCurrentTime,
    startsInPast:
      !invalidInterval && !invalidCurrentTime && start <= currentTime,
    durationExceeded: end - start > MAX_DURATION_MINUTES,
    roomBlocked: blocked,
    overlapIndexes: bookings.reduce<number[]>((indexes, booking, index) => {
      if (start < booking.end && booking.start < end) indexes.push(index);
      return indexes;
    }, []),
  };
}
