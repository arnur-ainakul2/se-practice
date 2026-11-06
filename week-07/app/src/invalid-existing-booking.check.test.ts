import { expect, it } from "vitest";
import { canBook } from "./booking";

it("checks the declared invalid existing booking assumption", () => {
  expect(
    canBook({
      start: 660,
      end: 720,
      now: 540,
      blocked: false,
      bookings: [{ start: 700, end: 650 }],
    })
  ).toBe(true);
});
