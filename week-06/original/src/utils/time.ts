export const MINUTES_PER_DAY = 1440;
export const MAX_DURATION_MINUTES = 120;

export function minutesToLabel(min: number): string {
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
