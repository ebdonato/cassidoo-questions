import { describe, expect, it } from "bun:test";
import { nearestPerfectMonths } from "./index";

describe("nearestPerfectMonths", () => {
  describe("with Sunday as week start (default)", () => {
    it("passes through interview example", () => {
      expect(nearestPerfectMonths(2025)).toEqual({
        prev: "2015-02",
        next: "2026-02",
      });
      expect(nearestPerfectMonths(2026)).toEqual({
        prev: "2015-02",
        next: "2037-02",
      });
    });

    it("finds perfect months for years far in the past", () => {
      expect(nearestPerfectMonths(1990)).toEqual({
        prev: "1987-02",
        next: "1998-02",
      });
    });

    it("finds perfect months for years far in the future", () => {
      expect(nearestPerfectMonths(2050)).toEqual({
        prev: "2043-02",
        next: "2054-02",
      });
    });
  });

  describe("with Monday as week start", () => {
    it("finds perfect months when week starts on Monday", () => {
      // When weekStartDay is 1 (Monday), Feb 1st must be a Monday
      const result = nearestPerfectMonths(2025, 1);
      expect(result.prev).toMatch(/^\d{4}-02$/);
      expect(result.next).toMatch(/^\d{4}-02$/);
      // Verify the structure is correct
      expect(result).toHaveProperty("prev");
      expect(result).toHaveProperty("next");
    });

    it("finds different perfect months than Sunday-based weeks", () => {
      // Monday-based weeks should find different perfect months
      const sundayResult = nearestPerfectMonths(2025, 0);
      const mondayResult = nearestPerfectMonths(2025, 1);

      // These should generally be different (unless by coincidence)
      // Feb 2021 started on Monday, Feb 2027 starts on Monday
      expect(mondayResult).toEqual({
        prev: "2021-02",
        next: "2027-02",
      });

      // Confirm they're different from Sunday-based
      expect(mondayResult.prev).not.toEqual(sundayResult.prev);
      expect(mondayResult.next).not.toEqual(sundayResult.next);
    });

    it("handles year 2021 (Feb starts on Monday)", () => {
      // 2021: Feb 1st is Monday, not a leap year - perfect for Monday-based weeks
      const result = nearestPerfectMonths(2021, 1);
      expect(result.prev).toMatch(/^\d{4}-02$/);
      expect(result.next).toEqual("2027-02");
    });
  });

  describe("leap year handling (tests isLeap logic)", () => {
    it("skips regular leap years (divisible by 4)", () => {
      // 2024 is a leap year (divisible by 4), so it cannot be a perfect month
      // The function should skip 2024 when searching
      const result = nearestPerfectMonths(2023);
      // 2024 is leap year, so next should skip it
      expect(result.next).not.toEqual("2024-02");
    });

    it("skips year 2000 (leap year - divisible by 400)", () => {
      // 2000 is a leap year (divisible by 400), so it cannot be a perfect month
      const result = nearestPerfectMonths(2000);
      expect(result.prev).toEqual("1998-02");
      expect(result.next).toEqual("2009-02");
    });

    it("can find perfect months around century boundaries", () => {
      // 1900 is NOT a leap year (divisible by 100 but not 400)
      // 2100 is NOT a leap year (divisible by 100 but not 400)
      const result1900 = nearestPerfectMonths(1900);
      expect(result1900.prev).toMatch(/^\d{4}-02$/);
      expect(result1900.next).toMatch(/^\d{4}-02$/);
    });

    it("handles year 2004 (leap year)", () => {
      // 2004 is a leap year
      const result = nearestPerfectMonths(2004);
      // 2004 cannot be perfect, should find years around it
      expect(result.prev).not.toEqual("2004-02");
      expect(result.next).not.toEqual("2004-02");
    });
  });

  describe("bidirectional search (tests find with FORWARD/BACKWARD)", () => {
    it("prev searches backward from the input year", () => {
      const result = nearestPerfectMonths(2030);
      const prevYear = parseInt(result.prev.split("-")[0]);
      expect(prevYear).toBeLessThan(2030);
    });

    it("next searches forward from the input year", () => {
      const result = nearestPerfectMonths(2020);
      const nextYear = parseInt(result.next.split("-")[0]);
      expect(nextYear).toBeGreaterThan(2020);
    });

    it("both directions find valid perfect months", () => {
      // Test multiple years to ensure bidirectional search works
      const years = [1995, 2010, 2025, 2040];
      for (const year of years) {
        const result = nearestPerfectMonths(year);
        const prevYear = parseInt(result.prev.split("-")[0]);
        const nextYear = parseInt(result.next.split("-")[0]);

        expect(prevYear).toBeLessThan(year);
        expect(nextYear).toBeGreaterThan(year);
        expect(prevYear).toBeLessThan(nextYear);
      }
    });

    it("searches correctly when input is just before a perfect month year", () => {
      // 2026 is a perfect month (Sunday start), so 2025's next should be 2026
      const result = nearestPerfectMonths(2025);
      expect(result.next).toEqual("2026-02");
    });

    it("searches correctly when input is just after a perfect month year", () => {
      // 2015 is a perfect month (Sunday start), so 2016's prev should be 2015
      const result = nearestPerfectMonths(2016);
      expect(result.prev).toEqual("2015-02");
    });
  });

  describe("perfect February detection (tests isFebPerfect logic)", () => {
    it("identifies 2015 as a perfect month for Sunday start", () => {
      // Feb 1, 2015 was a Sunday, and 2015 is not a leap year
      const result = nearestPerfectMonths(2014);
      expect(result.next).toEqual("2015-02");
    });

    it("identifies 2026 as a perfect month for Sunday start", () => {
      // Feb 1, 2026 will be a Sunday, and 2026 is not a leap year
      const result = nearestPerfectMonths(2025);
      expect(result.next).toEqual("2026-02");
    });

    it("identifies 2021 as a perfect month for Monday start", () => {
      // Feb 1, 2021 was a Monday, and 2021 is not a leap year
      const result = nearestPerfectMonths(2020, 1);
      expect(result.next).toEqual("2021-02");
    });

    it("identifies 2027 as a perfect month for Monday start", () => {
      // Feb 1, 2027 will be a Monday, and 2027 is not a leap year
      const result = nearestPerfectMonths(2025, 1);
      expect(result.next).toEqual("2027-02");
    });

    it("does not identify leap years as perfect months", () => {
      // Even if Feb 1 starts on the right day, leap years have 29 days
      // 2024 is a leap year
      const result = nearestPerfectMonths(2024);
      expect(result.prev).not.toEqual("2024-02");
      expect(result.next).not.toEqual("2024-02");
    });
  });

  describe("output format and structure", () => {
    it("returns correctly formatted date strings", () => {
      const result = nearestPerfectMonths(2025);
      expect(result.prev).toMatch(/^\d{4}-02$/);
      expect(result.next).toMatch(/^\d{4}-02$/);
    });

    it("returns an object with prev and next properties", () => {
      const result = nearestPerfectMonths(2025);
      expect(result).toHaveProperty("prev");
      expect(result).toHaveProperty("next");
      expect(typeof result.prev).toBe("string");
      expect(typeof result.next).toBe("string");
    });

    it("always returns February (02) as the month", () => {
      const result = nearestPerfectMonths(2025);
      expect(result.prev.endsWith("-02")).toBe(true);
      expect(result.next.endsWith("-02")).toBe(true);
    });

    it("prev is always before next", () => {
      const result = nearestPerfectMonths(2025);
      const prevYear = parseInt(result.prev.split("-")[0]);
      const nextYear = parseInt(result.next.split("-")[0]);
      expect(prevYear).toBeLessThan(nextYear);
    });
  });

  describe("consistency across week start days", () => {
    it("Sunday and Monday week starts produce different results", () => {
      const sundayResult = nearestPerfectMonths(2025, 0);
      const mondayResult = nearestPerfectMonths(2025, 1);

      // Results should differ since Feb 1 on different days
      expect(sundayResult).not.toEqual(mondayResult);
    });

    it("explicit weekStartDay=0 matches default behavior", () => {
      const defaultResult = nearestPerfectMonths(2025);
      const explicitSundayResult = nearestPerfectMonths(2025, 0);

      expect(defaultResult).toEqual(explicitSundayResult);
    });
  });
});
