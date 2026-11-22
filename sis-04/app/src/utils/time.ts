export const MINUTES_PER_DAY = 1440;
export const MAX_DURATION_MINUTES = 120;

export function minutesToLabel(min: number): string {
  if (min === MINUTES_PER_DAY) return "24:00";
  const m = ((min % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return `${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

export function labelToMinutes(label: string): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(label.trim());
  if (!match) return null;
  const h = Number(match[1]);
  const mm = Number(match[2]);
  // Allow 24:00 as the end-of-day boundary (1440). Start/current use a native
  // <input type="time"> which cannot emit "24:00", so they can never reach here.
  if (h === 24 && mm === 0) return MINUTES_PER_DAY;
  if (h < 0 || h > 23 || mm < 0 || mm > 59) return null;
  return h * 60 + mm;
}

export function durationLabel(start: number, end: number): string {
  const total = end - start;
  const h = Math.floor(total / 60);
  const mm = total % 60;
  if (h === 0) return `${mm} min`;
  if (mm === 0) return `${h} h`;
  return `${h} h ${mm} min`;
}

export function nowInMinutes(): number {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}
