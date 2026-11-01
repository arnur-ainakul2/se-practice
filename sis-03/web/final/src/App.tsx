import { useMemo, useState } from "react";
import { Building2, Clock3, PlayCircle } from "lucide-react";
import type { CheckResult } from "@/types";
import { bookings as sampleBookings, rooms as sampleRooms } from "@/data/sampleData";
import { checkAvailability } from "@/utils/availability";
import {
  labelToMinutes,
  minutesToLabel,
  nowInMinutes,
} from "@/utils/time";
import RoomSelector from "@/components/RoomSelector";
import TimeInput from "@/components/TimeInput";
import ResultBanner from "@/components/ResultBanner";
import Timeline from "@/components/Timeline";

function App() {
  const [rooms] = useState(sampleRooms);
  const [bookings] = useState(sampleBookings);

  const [roomId, setRoomId] = useState(sampleRooms[0].id);
  const [currentLabel, setCurrentLabel] = useState(
    minutesToLabel(nowInMinutes())
  );
  const [startLabel, setStartLabel] = useState("14:00");
  const [endLabel, setEndLabel] = useState("15:00");
  const [result, setResult] = useState<CheckResult | null>(null);

  // Any form edit invalidates a previously shown verdict so the UI never shows
  // a stale Available/Unavailable decision next to freshly edited inputs.
  const clearStaleResult = () => setResult(null);

  const updateRoom = (id: string) => {
    setRoomId(id);
    clearStaleResult();
  };
  const updateCurrent = (v: string) => {
    setCurrentLabel(v);
    clearStaleResult();
  };
  const updateStart = (v: string) => {
    setStartLabel(v);
    clearStaleResult();
  };
  const updateEnd = (v: string) => {
    setEndLabel(v);
    clearStaleResult();
  };

  const room = useMemo(
    () => rooms.find((r) => r.id === roomId) ?? rooms[0],
    [rooms, roomId]
  );

  const currentMin = labelToMinutes(currentLabel) ?? -1;
  const startMin = labelToMinutes(startLabel);
  const endMin = labelToMinutes(endLabel);

  const startInvalid = startMin === null;
  const endInvalid = endMin === null;
  const currentInvalid = currentMin < 0;

  const onCheck = () => {
    if (startMin === null || endMin === null || currentMin < 0) {
      setResult({
        decision: "unavailable",
        reasons: ["One or more time fields are not valid HH:MM values."],
        roomName: room.name,
        start: startMin ?? 0,
        end: endMin ?? 0,
      });
      return;
    }
    setResult(
      checkAvailability({
        room,
        start: startMin,
        end: endMin,
        currentTime: currentMin,
        existingBookings: bookings,
      })
    );
  };

  const proposed =
    startMin !== null && endMin !== null && startMin < endMin
      ? {
          start: startMin,
          end: endMin,
          valid: result?.decision === "available",
        }
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sky-700">
            <Building2 size={22} />
            <span className="text-sm font-semibold uppercase tracking-wide">
              Smart Campus
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Room Availability Checker
          </h1>
          <p className="text-sm text-slate-600">
            Check whether a room is free for your requested time slot. No bookings
            are created — this tool is read-only.
          </p>
        </header>

        {/* Main card */}
        <section className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          {/* Current time */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-slate-700">
              <Clock3 size={16} className="text-slate-500" />
              <span className="text-sm font-medium">Current time</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <TimeInput
                label="Now (campus clock)"
                value={currentLabel}
                onChange={updateCurrent}
                invalid={currentInvalid}
                hint={currentInvalid ? "Enter a valid time like 13:45" : undefined}
              />
              <TimeInput
                label="Requested start"
                value={startLabel}
                onChange={updateStart}
                invalid={startInvalid}
                hint={startInvalid ? "Use HH:MM, 00:00–23:59" : undefined}
              />
              <TimeInput
                label="Requested end"
                value={endLabel}
                onChange={updateEnd}
                invalid={endInvalid}
                type="text"
                hint={
                  endInvalid
                    ? "Use HH:MM, must be after start (24:00 allowed)"
                    : "Up to 24:00; max 120 min"
                }
              />
            </div>
          </div>

          {/* Room selector */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-slate-700">
              Select a room
            </span>
            <RoomSelector
              rooms={rooms}
              selectedId={roomId}
              onSelect={updateRoom}
            />
          </div>

          {/* Timeline */}
          <Timeline room={room} bookings={bookings} proposed={proposed} />

          {/* Action */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={onCheck}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 font-semibold text-white shadow-sm transition-all hover:bg-sky-700 focus:ring-2 focus:ring-sky-500/40 active:scale-[0.99]"
            >
              <PlayCircle size={18} /> Check availability
            </button>

            <ResultBanner result={result} pending={!result} />
          </div>
        </section>

        <footer className="mt-6 text-center text-xs text-slate-400">
          Fictional sample data · Bookings are never modified by this tool.
        </footer>
      </div>
    </div>
  );
}

export default App;
