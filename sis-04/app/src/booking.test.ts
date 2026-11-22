import { describe, it, expect } from "vitest";
import { canBook, checkRoom, type CanBookInput } from "./booking";
import { filterRooms } from "./filter";
import type { Room } from "./rooms";

describe("canBook()", () => {
  // Fresh fixtures factory to prevent mutation bleed and guarantee independent tests
  const getBaseInput = (): Omit<CanBookInput, "start" | "end"> => ({
    now: 540, // Fixed time based on T02
    blocked: false,
    bookings: [{ start: 600, end: 660 }], // Default existing booking derived from T01, T08-T12
  });

  describe("AC1: Interval validity, day limits, and future start times", () => {
    it("AC1: rejects a request that starts before current time (510-540)", () => {
      const input = { ...getBaseInput(), start: 510, end: 540 };
      expect(canBook(input)).toBe(false);
    });

    it("T02 AC1: rejects if start time is equal to current 'now' (540-570)", () => {
      const input = { ...getBaseInput(), start: 540, end: 570 };
      expect(canBook(input)).toBe(false);
    });

    it("T03 AC1: rejects zero duration intervals (720-720)", () => {
      const input = { ...getBaseInput(), start: 720, end: 720 };
      expect(canBook(input)).toBe(false);
    });

    it("T04 AC1: rejects reversed intervals (750-720)", () => {
      const input = { ...getBaseInput(), start: 750, end: 720 };
      expect(canBook(input)).toBe(false);
    });

    it("T05 AC1: rejects intervals extending past the end of the day limit (1380-1441)", () => {
      const input = { ...getBaseInput(), start: 1380, end: 1441 };
      expect(canBook(input)).toBe(false);
    });

    it("X1 AC1: allows intervals ending exactly at the day boundary (1380-1440)", () => {
      const input = { ...getBaseInput(), start: 1380, end: 1440 };
      expect(canBook(input)).toBe(true);
    });
  });

  describe("AC2: Maximum duration limits", () => {
    it("T06 AC2 B1: allows a request of exactly 120 minutes (720-840)", () => {
      const input = { ...getBaseInput(), start: 720, end: 840 };
      expect(canBook(input)).toBe(true);
    });

    it("T07 AC2 B2: rejects a request exceeding the 120-minute limit (720-841)", () => {
      const input = { ...getBaseInput(), start: 720, end: 841 };
      expect(canBook(input)).toBe(false);
    });
  });

  describe("AC3: Room block status", () => {
    it("T13 AC3: rejects a valid interval if the room is blocked", () => {
      const input = { ...getBaseInput(), start: 660, end: 720, blocked: true };
      expect(canBook(input)).toBe(false);
    });
  });

  describe("AC4: Overlapping with existing bookings", () => {
    it("T01 AC4 B3: allows booking that touches the end of an existing booking (660-720)", () => {
      const input = { ...getBaseInput(), start: 660, end: 720 };
      expect(canBook(input)).toBe(true);
    });

    it("T08 AC4: allows booking that touches the start of an existing booking (570-600)", () => {
      const input = { ...getBaseInput(), start: 570, end: 600 };
      expect(canBook(input)).toBe(true);
    });

    it("T09 AC4 B4: rejects partial overlap ending inside an existing booking (630-690)", () => {
      const input = { ...getBaseInput(), start: 630, end: 690 };
      expect(canBook(input)).toBe(false);
    });

    it("T10 AC4: rejects booking that entirely contains an existing booking (570-690)", () => {
      const input = { ...getBaseInput(), start: 570, end: 690 };
      expect(canBook(input)).toBe(false);
    });

    it("T11 AC4: rejects booking that is entirely inside an existing booking (615-645)", () => {
      const input = { ...getBaseInput(), start: 615, end: 645 };
      expect(canBook(input)).toBe(false);
    });

    it("T12 AC4: rejects booking with identical interval to an existing booking (600-660)", () => {
      const input = { ...getBaseInput(), start: 600, end: 660 };
      expect(canBook(input)).toBe(false);
    });

    it("T14 AC4: allows booking when there are no existing bookings (630-690)", () => {
      const input = { ...getBaseInput(), start: 630, end: 690, bookings: [] };
      expect(canBook(input)).toBe(true);
    });

    it("X2 AC4: rejects booking that overlaps multiple existing bookings (650-710)", () => {
      const input = {
        ...getBaseInput(),
        start: 650,
        end: 710,
        bookings: [
          { start: 600, end: 660 },
          { start: 700, end: 760 },
        ],
      };
      expect(canBook(input)).toBe(false);
    });

    it("BUG-A AC4: allows a request that touches existing bookings on both sides (630-690)", () => {
      const input = {
        ...getBaseInput(),
        start: 630,
        end: 690,
        bookings: [
          { start: 600, end: 630 },
          { start: 690, end: 720 },
        ],
      };
      expect(canBook(input)).toBe(true);
    });
  });

  describe("AC5: Pure function constraints", () => {
    it("AC5: leaves the existing booking data completely unchanged", () => {
      const input = {
        ...getBaseInput(),
        start: 660,
        end: 720,
        bookings: [{ start: 600, end: 660 }],
      };
      const bookingsBefore = structuredClone(input.bookings);

      const result = canBook(input);

      expect(result).toBe(true); // Sanity check that it's a valid Available request
      expect(input.bookings).toEqual(bookingsBefore);
    });

    it("BUG-B: leaves bookings unchanged for an available request touching nothing (720-780)", () => {
      const input = { ...getBaseInput(), start: 720, end: 780 };
      const bookingsBefore = structuredClone(input.bookings);

      expect(canBook(input)).toBe(true);
      expect(input.bookings).toEqual(bookingsBefore);
    });
  });
});

const testRooms: Room[] = [
  {
    id: "north-lab",
    name: "North Lab",
    capacity: 20,
    equipment: ["projector", "whiteboard"],
    blocked: false,
    bookings: [{ start: 600, end: 660 }],
  },
  {
    id: "study-room",
    name: "Study Room",
    capacity: 8,
    equipment: ["whiteboard"],
    blocked: false,
    bookings: [],
  },
  {
    id: "closed-lab",
    name: "Closed Lab",
    capacity: 12,
    equipment: ["projector"],
    blocked: true,
    bookings: [],
  },
];

describe("room catalog and filters", () => {
  it("F1 B5: includes a room whose capacity exactly matches attendees", () => {
    const matches = filterRooms(testRooms, { attendees: 8, equipment: [] });
    expect(matches.map((room) => room.id)).toContain("study-room");
  });

  it("F1 B6: excludes a room one seat below the attendee count", () => {
    const matches = filterRooms(testRooms, { attendees: 9, equipment: [] });
    expect(matches.map((room) => room.id)).not.toContain("study-room");
  });

  it("F2: requires every selected equipment item", () => {
    const matches = filterRooms(testRooms, {
      attendees: 1,
      equipment: ["projector", "whiteboard"],
    });
    expect(matches.map((room) => room.id)).toEqual(["north-lab"]);
  });

  it("F4: returns an empty list when no room matches", () => {
    const matches = filterRooms(testRooms, {
      attendees: 200,
      equipment: ["projector", "whiteboard"],
    });
    expect(matches).toEqual([]);
  });

  it("F3: never reports a blocked room as available", () => {
    expect(
      checkRoom(testRooms, "closed-lab", { start: 700, end: 760, now: 500 })
    ).toBe(false);
  });

  it("F5: uses the selected room's own bookings when switching rooms", () => {
    const request = { start: 620, end: 680, now: 500 };
    expect(checkRoom(testRooms, "north-lab", request)).toBe(false);
    expect(checkRoom(testRooms, "study-room", request)).toBe(true);
  });

  it("F5: returns unavailable for an unknown room ID", () => {
    expect(checkRoom(testRooms, "missing-room", { start: 700, end: 760, now: 500 })).toBe(false);
  });

  it("AC5: checking availability does not modify room bookings", () => {
    const original = structuredClone(testRooms);
    expect(checkRoom(testRooms, "north-lab", { start: 700, end: 760, now: 500 })).toBe(true);
    expect(testRooms).toEqual(original);
  });

  it("INT: filters the catalog and checks a matching room's availability", () => {
    const matches = filterRooms(testRooms, {
      attendees: 10,
      equipment: ["projector", "whiteboard"],
    });
    expect(matches.map((room) => room.id)).toEqual(["north-lab"]);
    expect(checkRoom(matches, matches[0].id, { start: 700, end: 760, now: 500 })).toBe(true);
  });
});
