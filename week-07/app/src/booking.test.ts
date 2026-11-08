import { describe, it, expect } from "vitest";
import { canBook, type CanBookInput } from "./booking"; // Adjust path if necessary

describe("canBook()", () => {
  // Fresh fixtures factory to prevent mutation bleed and guarantee independent tests
  const getBaseInput = (): Omit<CanBookInput, "start" | "end"> => ({
    now: 540, // Fixed time based on T02
    blocked: false,
    bookings: [{ start: 600, end: 660 }], // Default existing booking derived from T01, T08-T12
  });

  describe("AC1: Interval validity, day limits, and future start times", () => {
    it("T02: rejects if start time is equal to current 'now' (540-570)", () => {
      const input = { ...getBaseInput(), start: 540, end: 570 };
      expect(canBook(input)).toBe(false);
    });

    it("T03: rejects zero duration intervals (720-720)", () => {
      const input = { ...getBaseInput(), start: 720, end: 720 };
      expect(canBook(input)).toBe(false);
    });

    it("T04: rejects reversed intervals (750-720)", () => {
      const input = { ...getBaseInput(), start: 750, end: 720 };
      expect(canBook(input)).toBe(false);
    });

    it("T05: rejects intervals extending past the end of the day limit (1380-1441)", () => {
      const input = { ...getBaseInput(), start: 1380, end: 1441 };
      expect(canBook(input)).toBe(false);
    });

    it("X1: allows intervals ending exactly at the day boundary (1380-1440)", () => {
      const input = { ...getBaseInput(), start: 1380, end: 1440 };
      expect(canBook(input)).toBe(true);
    });
  });

  describe("AC2: Maximum duration limits", () => {
    it("T06: allows a request of exactly 120 minutes (720-840)", () => {
      const input = { ...getBaseInput(), start: 720, end: 840 };
      expect(canBook(input)).toBe(true);
    });

    it("T07: rejects a request exceeding the 120-minute limit (720-841)", () => {
      const input = { ...getBaseInput(), start: 720, end: 841 };
      expect(canBook(input)).toBe(false);
    });
  });

  describe("AC3: Room block status", () => {
    it("T13: rejects a valid interval if the room is blocked", () => {
      const input = { ...getBaseInput(), start: 660, end: 720, blocked: true };
      expect(canBook(input)).toBe(false);
    });
  });

  describe("AC4: Overlapping with existing bookings", () => {
    it("T01: allows booking that touches the end of an existing booking (660-720)", () => {
      const input = { ...getBaseInput(), start: 660, end: 720 };
      expect(canBook(input)).toBe(true);
    });

    it("T08: allows booking that touches the start of an existing booking (570-600)", () => {
      const input = { ...getBaseInput(), start: 570, end: 600 };
      expect(canBook(input)).toBe(true);
    });

    it("T09: rejects partial overlap ending inside an existing booking (630-690)", () => {
      const input = { ...getBaseInput(), start: 630, end: 690 };
      expect(canBook(input)).toBe(false);
    });

    it("T10: rejects booking that entirely contains an existing booking (570-690)", () => {
      const input = { ...getBaseInput(), start: 570, end: 690 };
      expect(canBook(input)).toBe(false);
    });

    it("T11: rejects booking that is entirely inside an existing booking (615-645)", () => {
      const input = { ...getBaseInput(), start: 615, end: 645 };
      expect(canBook(input)).toBe(false);
    });

    it("T12: rejects booking with identical interval to an existing booking (600-660)", () => {
      const input = { ...getBaseInput(), start: 600, end: 660 };
      expect(canBook(input)).toBe(false);
    });

    it("T14: allows booking when there are no existing bookings (630-690)", () => {
      const input = { ...getBaseInput(), start: 630, end: 690, bookings: [] };
      expect(canBook(input)).toBe(true);
    });

    it("X2: rejects booking that overlaps multiple existing bookings (650-710)", () => {
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
  });
});
