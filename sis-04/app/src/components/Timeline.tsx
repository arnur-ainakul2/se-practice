import type { Booking, Room } from "@/types";
import { minutesToLabel } from "@/utils/time";

interface Props {
  room: Room;
  bookings: Booking[];
  proposed?: { start: number; end: number; valid: boolean } | null;
}

export default function Timeline({ room, bookings, proposed }: Props) {
  const roomBookings = bookings.filter((b) => b.room_id === room.id);

  const marker = (label: string, leftPct: number, cls: string, key: string) => (
    <div
      key={key}
      className={`absolute top-0 h-full rounded-md ${cls}`}
      style={{ left: `${leftPct}%`, width: 0.5, minWidth: 1 }}
      title={label}
    >
      <span className="absolute -top-5 -translate-x-1/2 whitespace-nowrap text-[10px] text-slate-400">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>00:00</span>
        <span className="font-medium text-slate-700">
          Today's schedule — {room.name}
        </span>
        <span>24:00</span>
      </div>

      <div className="relative h-10 w-full overflow-visible rounded-lg border border-slate-200 bg-slate-50">
        {/* hour ticks */}
        {Array.from({ length: 25 }).map((_, h) =>
          marker(
            h % 6 === 0 ? `${String(h).padStart(2, "0")}:00` : "",
            (h / 24) * 100,
            "bg-slate-200",
            `tick-${h}`
          )
        )}

        {/* existing bookings */}
        {roomBookings.map((b) => {
          const left = (b.start / 1440) * 100;
          const width = ((b.end - b.start) / 1440) * 100;
          return (
            <div
              key={b.id}
              className="absolute top-1 flex h-8 items-center justify-center overflow-hidden rounded-md bg-sky-500/90 px-1 text-[10px] font-medium text-white"
              style={{ left: `${left}%`, width: `${width}%` }}
              title={`${minutesToLabel(b.start)}–${minutesToLabel(b.end)} · ${b.bookedBy}`}
            >
              {minutesToLabel(b.start)}
            </div>
          );
        })}

        {/* proposed interval */}
        {proposed && (
          <div
            className={[
              "absolute bottom-0 h-2 rounded-full",
              proposed.valid ? "bg-emerald-500" : "bg-rose-500",
            ].join(" ")}
            style={{
              left: `${(proposed.start / 1440) * 100}%`,
              width: `${((proposed.end - proposed.start) / 1440) * 100}%`,
            }}
            title="Proposed interval"
          />
        )}
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-2 w-3 rounded-sm bg-sky-500/90" /> Existing booking
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-2 w-3 rounded-full bg-emerald-500" /> Proposed (available)
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-2 w-3 rounded-full bg-rose-500" /> Proposed (blocked)
        </span>
      </div>
    </div>
  );
}
