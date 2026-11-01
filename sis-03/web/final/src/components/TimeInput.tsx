interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  invalid?: boolean;
  /** "time" uses a native time picker (00:00–23:59). "text" allows typing 24:00. */
  type?: "time" | "text";
}

export default function TimeInput({
  label,
  value,
  onChange,
  hint,
  invalid,
  type = "time",
}: Props) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        type={type}
        inputMode={type === "text" ? "numeric" : undefined}
        placeholder={type === "text" ? "HH:MM" : undefined}
        pattern={type === "text" ? "^([01]?\\d|2[0-4]):[0-5]\\d$" : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={[
          "rounded-lg border bg-white px-3 py-2 text-slate-800 outline-none transition-all",
          "focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500",
          invalid
            ? "border-rose-400 bg-rose-50"
            : "border-slate-300",
        ].join(" ")}
      />
      {hint && (
        <span
          className={[
            "text-xs",
            invalid ? "text-rose-600" : "text-slate-500",
          ].join(" ")}
        >
          {hint}
        </span>
      )}
    </label>
  );
}
