import { CheckCircle2, XCircle, Clock } from "lucide-react";
import type { CheckResult } from "@/types";
import { durationLabel, minutesToLabel } from "@/utils/time";

interface Props {
  result: CheckResult | null;
  pending: boolean;
}

export default function ResultBanner({ result, pending }: Props) {
  if (pending || !result) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-500">
        <Clock size={20} />
        <span className="text-sm">
          Pick a room and a time range, then run the availability check.
        </span>
      </div>
    );
  }

  const available = result.decision === "available";

  return (
    <div
      className={[
        "rounded-xl border p-4 transition-all",
        available
          ? "border-emerald-300 bg-emerald-50"
          : "border-rose-300 bg-rose-50",
      ].join(" ")}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        {available ? (
          <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={22} />
        ) : (
          <XCircle className="mt-0.5 shrink-0 text-rose-600" size={22} />
        )}
        <div className="flex flex-col gap-1">
          <p
            className={[
              "text-base font-semibold",
              available ? "text-emerald-800" : "text-rose-800",
            ].join(" ")}
          >
            {available ? "Available" : "Unavailable"} — {result.roomName}
          </p>
          <p className="text-sm text-slate-700">
            {minutesToLabel(result.start)} – {minutesToLabel(result.end)} ·{" "}
            {durationLabel(result.start, result.end)}
          </p>
          {result.reasons.length > 0 && (
            <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-rose-700">
              {result.reasons.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          )}
          {available && (
            <p className="text-xs text-emerald-700">
              No existing bookings were modified.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
