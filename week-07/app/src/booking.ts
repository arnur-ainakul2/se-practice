import { MAX_DURATION_MINUTES, MINUTES_PER_DAY } from "@/utils/time";

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
  if (
    !Number.isFinite(start) ||
    !Number.isFinite(end) ||
    start < 0 ||
    end > MINUTES_PER_DAY ||
    start >= end
  ) {
    return false;
  }

  if (start <= now) return false;
  if (end - start > MAX_DURATION_MINUTES) return false;
  if (blocked) return false;

  const overlaps = bookings.filter(
    (booking) => start < booking.end && booking.start < end
  );
  return overlaps.length === 0;
}
