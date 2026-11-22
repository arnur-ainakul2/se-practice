export interface Booking {
  id: string;
  room_id: string;
  start: number; // minutes since midnight
  end: number; // minutes since midnight
  bookedBy: string;
  purpose: string;
}

export interface Room {
  id: string;
  name: string;
  building: string;
  capacity: number;
  blocked: boolean;
  blockedReason?: string;
}

export type Decision = "available" | "unavailable" | "pending";

export interface CheckResult {
  decision: Exclude<Decision, "pending">;
  reasons: string[];
  roomName: string;
  start: number;
  end: number;
}
