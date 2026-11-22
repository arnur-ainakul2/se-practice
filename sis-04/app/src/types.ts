export type Decision = "available" | "unavailable" | "pending";

export interface CheckResult {
  decision: Exclude<Decision, "pending">;
  reasons: string[];
  roomName: string;
  start: number;
  end: number;
}
