export type Room = {
  id: string;
  name: string;
  capacity: number;
  equipment: string[];
  blocked: boolean;
  bookings: { start: number; end: number }[];
  building?: string;
  blockedReason?: string;
};

export const ROOMS: Room[] = [
  {
    id: "r1",
    name: "Aurora Hall 101",
    building: "North Wing",
    capacity: 30,
    equipment: ["projector", "whiteboard", "video-conferencing"],
    blocked: false,
    bookings: [
      { start: 540, end: 600 },
      { start: 720, end: 780 },
    ],
  },
  {
    id: "r2",
    name: "Beacon Lab 2B",
    building: "East Wing",
    capacity: 18,
    equipment: ["whiteboard", "computers"],
    blocked: false,
    bookings: [
      { start: 600, end: 660 },
      { start: 1080, end: 1140 },
    ],
  },
  {
    id: "r3",
    name: "Cascade Seminar Room",
    building: "Central",
    capacity: 12,
    equipment: ["projector", "whiteboard"],
    blocked: true,
    blockedReason: "Maintenance until 18:00",
    bookings: [],
  },
  {
    id: "r4",
    name: "Driftwood Studio 4",
    building: "South Wing",
    capacity: 24,
    equipment: ["projector", "whiteboard", "video-conferencing"],
    blocked: false,
    bookings: [{ start: 810, end: 870 }],
  },
  {
    id: "r5",
    name: "Evergreen Auditorium",
    building: "Central",
    capacity: 120,
    equipment: ["projector", "microphone", "video-conferencing"],
    blocked: false,
    bookings: [{ start: 900, end: 1020 }],
  },
];
