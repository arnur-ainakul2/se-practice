import type { Room, Booking } from "@/types";

// This project intentionally models one fictional room.
export const rooms: Room[] = [
  {
    id: "r1",
    name: "Aurora Hall 101",
    building: "North Wing",
    capacity: 30,
    blocked: false,
  },
];

export const bookings: Booking[] = [
  { id: "b1", room_id: "r1", start: 540, end: 600, bookedBy: "Prof. Lin", purpose: "Calculus review" },
  { id: "b2", room_id: "r1", start: 720, end: 780, bookedBy: "Study Group A", purpose: "Capstone sync" },
];
