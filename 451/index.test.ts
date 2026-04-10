import { describe, expect, it } from "bun:test";
import { perrinCombinations } from "./index";

describe("perrinCombinations tests", () => {
  describe("question scenarios", () => {
    it("returns correct combinations for perrinCombinations(7, 12)", () => {
      expect(perrinCombinations(7, 12)).toEqual([
        [0, 2, 3, 7],
        [0, 5, 7],
        [2, 3, 7],
        [5, 7],
      ]);
    });

    it("returns correct combinations for perrinCombinations(6, 5)", () => {
      expect(perrinCombinations(6, 5)).toEqual([
        [0, 2, 3],
        [0, 5],
        [2, 3],
        [5],
      ]);
    });
  });

  describe("edge cases", () => {
    it("returns empty array when no combinations sum to k", () => {
      expect(perrinCombinations(3, 100)).toEqual([]);
    });

    it("returns combinations that include 0", () => {
      // Perrin(0..2) = [3, 0, 2], unique sorted = [0, 2, 3]
      expect(perrinCombinations(2, 0)).toEqual([[0]]);
    });

    it("returns single-element combinations", () => {
      // Perrin(0..2) = [3, 0, 2], unique sorted = [0, 2, 3]
      expect(perrinCombinations(2, 3)).toEqual([[0, 3], [3]]);
    });

    it("works with n = 0 (only P(0) = 3)", () => {
      expect(perrinCombinations(0, 3)).toEqual([[3]]);
      expect(perrinCombinations(0, 1)).toEqual([]);
    });

    it("works with n = 1 (P(0)=3, P(1)=0)", () => {
      expect(perrinCombinations(1, 3)).toEqual([[0, 3], [3]]);
    });
  });

  describe("larger inputs", () => {
    it("handles a larger n value", () => {
      // Perrin(0..10) = [3,0,2,3,2,5,5,7,10,12,17]
      // unique sorted = [0,2,3,5,7,10,12,17]
      // combinations summing to 10: [0,2,3,5], [0,3,7], [0,10], [2,3,5], [3,7], [10]
      expect(perrinCombinations(10, 10)).toEqual([
        [0, 2, 3, 5],
        [0, 3, 7],
        [0, 10],
        [2, 3, 5],
        [3, 7],
        [10],
      ]);
    });
  });

  describe("invalid input", () => {
    it("throws an error when n is negative", () => {
      expect(() => perrinCombinations(-1, 5)).toThrow(
        "n must be a non-negative integer",
      );
    });
  });
});
