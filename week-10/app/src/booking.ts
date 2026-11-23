import { evaluateAvailabilityRules } from "@/utils/availabilityRules";

export interface CanBookInput {
  start: number;
  end: number;
  now: number;
  blocked: boolean;
  bookings: { start: number; end: number }[];
}

export function canBook({
  start,
  end,
  now,
  blocked,
  bookings,
}: CanBookInput): boolean {
  const rules = evaluateAvailabilityRules({
    start,
    end,
    currentTime: now,
    blocked,
    bookings,
  });

  return (
    !rules.invalidInterval &&
    !rules.invalidCurrentTime &&
    !rules.startsInPast &&
    !rules.durationExceeded &&
    !rules.roomBlocked &&
    rules.overlapIndexes.length === 0
  );
}
