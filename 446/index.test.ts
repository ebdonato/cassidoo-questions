import { describe, expect, it } from "bun:test";
import { majorityElement } from "./index";

describe("majorityElement", () => {
  describe("question scenarios", () => {
    it("returns the majority element when it exists", () => {
      expect(majorityElement([2, 2, 1, 1, 2, 2, 1, 2, 2])).toBe(2);
      expect(majorityElement([3, 3, 4, 2, 3, 3, 1])).toBe(3);
    });

    it("throws an error when the array is empty", () => {
      expect(() => majorityElement([])).toThrow("Array must not be empty");
    });
  });

  describe("additional scenarios", () => {
    it("returns the element when array has a single element", () => {
      expect(majorityElement([42])).toBe(42);
    });

    it("returns the majority element in a two-element array with duplicates", () => {
      expect(majorityElement([7, 7])).toBe(7);
    });

    it("returns the majority element when it appears at the end", () => {
      expect(majorityElement([1, 2, 2, 2])).toBe(2);
    });

    it("returns the majority element when it appears at the start", () => {
      expect(majorityElement([5, 5, 5, 1, 2])).toBe(5);
    });

    it("returns the majority element when all elements are the same", () => {
      expect(majorityElement([9, 9, 9, 9, 9])).toBe(9);
    });

    it("returns the majority element in a large array", () => {
      const arr = Array(1001).fill(1).concat(Array(999).fill(2));
      expect(majorityElement(arr)).toBe(1);
    });

    it("returns the majority element when majority is interleaved with others", () => {
      expect(majorityElement([1, 2, 1, 3, 1, 4, 1])).toBe(1);
    });

    it("works with string elements", () => {
      expect(majorityElement(["a", "b", "a", "a"])).toBe("a");
    });

    it("works with negative numbers", () => {
      expect(majorityElement([-1, -1, -1, 2, 3])).toBe(-1);
    });

    it("returns the majority element when it barely exceeds n/2", () => {
      // 3 appears 3 times out of 5 → more than ⌊5/2⌋ = 2
      expect(majorityElement([3, 1, 3, 2, 3])).toBe(3);
    });

    it("returns the correct majority when candidate changes during voting", () => {
      // Forces the Boyer-Moore candidate to change: starts with 4, drops, then 6 takes over
      expect(majorityElement([4, 5, 6, 6, 6])).toBe(6);
    });

    it("works with boolean elements", () => {
      expect(majorityElement([true, false, true, true])).toBe(true);
    });

    it("works with null elements as majority", () => {
      expect(majorityElement([null, null, null, 1, 2])).toBe(null);
    });

    it("works with undefined elements as majority", () => {
      expect(majorityElement([undefined, undefined, undefined, 1, 2])).toBe(
        undefined,
      );
    });

    it("works with a mix of nullish and non-nullish elements", () => {
      expect(majorityElement([null, undefined, null, null])).toBe(null);
    });
  });

  describe("mixed-type arrays", () => {
    it("works with a mix of numbers and strings", () => {
      expect(majorityElement([1, "a", 1, "b", 1])).toBe(1);
    });

    it("works with a mix of strings and numbers where string is majority", () => {
      expect(majorityElement(["x", 1, "x", 2, "x"])).toBe("x");
    });

    it("works with a mix of booleans and numbers", () => {
      expect(majorityElement([true, 0, true, 1, true])).toBe(true);
    });

    it("works with a mix of null, undefined, and primitives", () => {
      expect(majorityElement([null, undefined, null, 1, null])).toBe(null);
    });

    it("distinguishes between 0 and false", () => {
      expect(majorityElement([0, false, 0, 0, false])).toBe(0);
    });

    it("distinguishes between '' and false", () => {
      expect(majorityElement(["", false, "", "", false])).toBe("");
    });

    it("distinguishes between null and undefined", () => {
      expect(
        majorityElement([undefined, null, undefined, undefined, null]),
      ).toBe(undefined);
    });

    it("distinguishes between 0 and null", () => {
      expect(majorityElement([0, null, 0, 0, null])).toBe(0);
    });
  });

  describe("custom equality comparator", () => {
    it("uses custom equals for object comparison", () => {
      const a = { id: 1 };
      const b = { id: 2 };
      const c = { id: 1 };
      const d = { id: 1 };
      const result = majorityElement([a, b, c, d], (x, y) => x.id === y.id);
      expect(result.id).toBe(1);
    });

    it("uses custom equals for case-insensitive string comparison", () => {
      const result = majorityElement(
        ["Foo", "foo", "FOO", "bar", "foo"],
        (a, b) => a.toLowerCase() === b.toLowerCase(),
      );
      expect(result.toLowerCase()).toBe("foo");
    });

    it("uses custom equals for array elements compared by value", () => {
      const result = majorityElement(
        [
          [1, 2],
          [3, 4],
          [1, 2],
          [1, 2],
        ],
        (a, b) => a.length === b.length && a.every((v, i) => v === b[i]),
      );
      expect(result).toEqual([1, 2]);
    });

    it("uses custom equals with nested objects", () => {
      const items = [
        { name: "alice", age: 30 },
        { name: "bob", age: 25 },
        { name: "alice", age: 31 },
        { name: "alice", age: 32 },
      ];
      const result = majorityElement(items, (a, b) => a.name === b.name);
      expect(result.name).toBe("alice");
    });

    it("falls back to strict equality when no custom equals is provided", () => {
      const obj = { id: 1 };
      // Same reference used multiple times → majority by ===
      expect(majorityElement([obj, obj, obj, { id: 1 }, { id: 2 }])).toBe(obj);
    });
  });
});
