import { describe, expect, it } from "bun:test";
import { maxSubarraySum } from "./index";

describe("maxSubarraySum", () => {
  describe("single element", () => {
    it("finds max subarray in mixed positive/negative array", () => {
      expect(maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toEqual(6);
    });

    it("handles a single positive element", () => {
      expect(maxSubarraySum([5])).toEqual(5);
    });

    it("returns the least negative value when all elements are negative", () => {
      expect(maxSubarraySum([-1, -2, -3, -4])).toEqual(-1);
    });

    it("sums the entire array when the max subarray spans it", () => {
      expect(maxSubarraySum([5, 4, -1, 7, 8])).toEqual(23);
    });
  });

  describe("additional scenarios", () => {
    // Single-element edge cases
    it("handles a single negative element", () => {
      expect(maxSubarraySum([-7])).toEqual(-7);
    });

    it("handles a single zero element", () => {
      expect(maxSubarraySum([0])).toEqual(0);
    });

    // Two-element arrays
    it("handles two positive elements", () => {
      expect(maxSubarraySum([3, 4])).toEqual(7);
    });

    it("handles two negative elements", () => {
      expect(maxSubarraySum([-3, -4])).toEqual(-3);
    });

    it("handles a positive followed by a negative where individual is larger", () => {
      expect(maxSubarraySum([10, -20])).toEqual(10);
    });

    // Zero interactions
    it("handles an array of all zeros", () => {
      expect(maxSubarraySum([0, 0, 0, 0])).toEqual(0);
    });

    it("handles zeros mixed with positives", () => {
      expect(maxSubarraySum([0, 3, 0, 5, 0])).toEqual(8);
    });

    // Subarray position: start, middle, end
    it("finds max subarray at the beginning", () => {
      expect(maxSubarraySum([10, 5, -20, 1, 2])).toEqual(15);
    });

    it("finds max subarray in the middle", () => {
      expect(maxSubarraySum([-5, -2, 10, 8, -1, -20, 3])).toEqual(18);
    });

    it("finds max subarray at the end", () => {
      expect(maxSubarraySum([-3, -5, -1, 4, 6, 2])).toEqual(12);
    });

    // Alternating signs
    it("handles alternating positive and negative values", () => {
      expect(maxSubarraySum([1, -1, 1, -1, 1])).toEqual(1);
    });

    it("handles alternating with a dominant positive cluster", () => {
      expect(maxSubarraySum([-1, 3, -1, 3, -1])).toEqual(5);
    });

    // Large values
    it("handles large numbers", () => {
      expect(maxSubarraySum([1_000_000, -1, 1_000_000])).toEqual(1_999_999);
    });

    // All positive elements
    it("returns the total sum when all elements are positive", () => {
      expect(maxSubarraySum([1, 2, 3, 4, 5])).toEqual(15);
    });
  });
});
