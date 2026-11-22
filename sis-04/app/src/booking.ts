import { MAX_DURATION_MINUTES, MINUTES_PER_DAY } from "@/utils/time";
import type { Room } from "./rooms";

export interface CanBookInput {
  start: number;
  end: number;
  now: number;
  blocked: boolean;
  bookings: { start: number; end: number }[];
}

export function isValidInterval(start: number, end: number): boolean {
  return 0 <= start && start < end && end <= MINUTES_PER_DAY;
}

export function canBook({ start, end, now, blocked, bookings }: {
  start: number;
  end: number;
  now: number;
  blocked: boolean;
  bookings: { start: number; end: number }[];
}): boolean {
  if (!isValidInterval(start, end)) return false;
  if (!(start > now)) return false;
  if (end - start > MAX_DURATION_MINUTES) return false;
  if (blocked) return false;
  for (const b of bookings) {
    if (start < b.end && end > b.start) return false;
  }
  return true;
}

export function checkRoom(
  rooms: Room[],
  roomId: string,
  request: { start: number; end: number; now: number }
): boolean {
  const room = rooms.find((candidate) => candidate.id === roomId);
  if (!room) return false;

  return canBook({
    ...request,
    blocked: room.blocked,
    bookings: room.bookings,
  });
}
