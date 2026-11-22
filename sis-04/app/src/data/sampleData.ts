import type { Room, Booking } from "@/types";

export const rooms: Room[] = [
  {
    id: "r1",
    name: "Aurora Hall 101",
    building: "North Wing",
    capacity: 30,
    blocked: false,
  },
  {
    id: "r2",
    name: "Beacon Lab 2B",
    building: "East Wing",
    capacity: 18,
    blocked: false,
  },
  {
    id: "r3",
    name: "Cascade Seminar Room",
    building: "Central",
    capacity: 12,
    blocked: true,
    blockedReason: "Maintenance — HVAC outage until 18:00",
  },
  {
    id: "r4",
    name: "Driftwood Studio 4",
    building: "South Wing",
    capacity: 24,
    blocked: false,
  },
  {
    id: "r5",
    name: "Evergreen Auditorium",
    building: "Central",
    capacity: 120,
    blocked: false,
  },
];

export const bookings: Booking[] = [
  { id: "b1", room_id: "r1", start: 540, end: 600, bookedBy: "Prof. Lin", purpose: "Calculus review" },
  { id: "b2", room_id: "r1", start: 720, end: 780, bookedBy: "Study Group A", purpose: "Capstone sync" },
  { id: "b3", room_id: "r2", start: 600, end: 660, bookedBy: "Robotics Club", purpose: "Build session" },
  { id: "b4", room_id: "r4", start: 810, end: 870, bookedBy: "Design Studio", purpose: "Critique" },
  { id: "b5", room_id: "r5", start: 900, end: 1020, bookedBy: "Admissions", purpose: "Open house briefing" },
  { id: "b6", room_id: "r2", start: 1080, end: 1140, bookedBy: "Prof. Okoye", purpose: "Office hours" },
];
