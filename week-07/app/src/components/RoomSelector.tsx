import { Lock, Users, MapPin } from "lucide-react";
import type { Room } from "@/types";

interface Props {
  rooms: Room[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function RoomSelector({ rooms, selectedId, onSelect }: Props) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {rooms.map((room) => {
        const active = room.id === selectedId;
        return (
          <button
            key={room.id}
            type="button"
            onClick={() => onSelect(room.id)}
            className={[
              "flex flex-col gap-1 rounded-xl border p-3 text-left transition-all",
              active
                ? "border-sky-500 bg-sky-50 ring-2 ring-sky-500/30"
                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
              room.blocked ? "opacity-90" : "",
            ].join(" ")}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-semibold text-slate-800">{room.name}</span>
              {room.blocked ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                  <Lock size={12} /> Blocked
                </span>
              ) : (
                <span
                  className={[
                    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                    active
                      ? "bg-sky-100 text-sky-700"
                      : "bg-emerald-50 text-emerald-600",
                  ].join(" ")}
                >
                  Open
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1">
                <MapPin size={12} /> {room.building}
              </span>
              <span className="inline-flex items-center gap-1">
                <Users size={12} /> {room.capacity} seats
              </span>
            </div>
            {room.blocked && room.blockedReason && (
              <p className="mt-1 text-xs text-amber-700">{room.blockedReason}</p>
            )}
          </button>
        );
      })}
    </div>
  );
}
