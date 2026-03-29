import { describe, expect, it } from "bun:test";
import { fuzzySearch } from "./index";

describe("fuzzySearch", () => {
  describe("question scenarios", () => {
    it("finds an exact match for 'cat' in 'the cat sat on the mat'", () => {
      expect(fuzzySearch("the cat sat on the mat", "cat", 0)).toEqual([
        { position: 4, errors: 0 },
      ]);
    });

    it("returns no matches for 'cool' in 'cassidoo' with k=1", () => {
      expect(fuzzySearch("cassidoo", "cool", 1)).toEqual([]);
    });

    it("finds fuzzy matches for 'cool' in 'cassidoo' with k=3", () => {
      const result = fuzzySearch("cassidoo", "cool", 3);
      // The Bitap reports these approximate start positions:
      // - position 0 (endPos 3): "cass" vs "cool" = 3 substitutions
      // - position 3 (endPos 6): match ending at first 'o' with 3 errors
      // - position 4 (endPos 7): match ending at second 'o' with 2 errors
      expect(result).toContainEqual({ position: 3, errors: 3 });
      expect(result).toContainEqual({ position: 4, errors: 2 });
    });
  });

  describe("exact matching (k=0)", () => {
    it("finds a single exact substring match", () => {
      expect(fuzzySearch("abcdef", "bcd", 0)).toEqual([
        { position: 1, errors: 0 },
      ]);
    });

    it("finds exact match at the end of the text", () => {
      expect(fuzzySearch("hello world", "world", 0)).toEqual([
        { position: 6, errors: 0 },
      ]);
    });

    it("finds exact match at the start of the text", () => {
      expect(fuzzySearch("hello world", "hello", 0)).toEqual([
        { position: 0, errors: 0 },
      ]);
    });

    it("finds all occurrences of a single character", () => {
      expect(fuzzySearch("aaaa", "a", 0)).toEqual([
        { position: 0, errors: 0 },
        { position: 1, errors: 0 },
        { position: 2, errors: 0 },
        { position: 3, errors: 0 },
      ]);
    });

    it("finds multiple exact matches", () => {
      expect(fuzzySearch("abcabc", "abc", 0)).toEqual([
        { position: 0, errors: 0 },
        { position: 3, errors: 0 },
      ]);
    });

    it("returns no matches when pattern is absent", () => {
      expect(fuzzySearch("abcdef", "xyz", 0)).toEqual([]);
    });
  });

  describe("fuzzy matching (k>0)", () => {
    it("finds a match with one substitution", () => {
      // "bcd" vs "bce": d→e is 1 substitution, reported at position 1
      const result = fuzzySearch("abcdef", "bce", 1);
      expect(result).toContainEqual({ position: 1, errors: 1 });
    });

    it("finds a match with one deletion in the pattern", () => {
      // Pattern "abcd" matches text "abd" with 1 deletion (skip 'c')
      const result = fuzzySearch("abd", "abcd", 1);
      expect(result).toContainEqual({ position: 0, errors: 1 });
    });

    it("reports the lowest error count when multiple levels match", () => {
      // "cat" exactly at position 4, and also matches with 1 error at same spot
      const result = fuzzySearch("the cat sat on the mat", "cat", 1);
      const exactMatch = result.find((m) => m.position === 4);
      expect(exactMatch).toEqual({ position: 4, errors: 0 });
    });

    it("matches 'mat' in 'the cat sat on the mat' with k=1", () => {
      const result = fuzzySearch("the cat sat on the mat", "mat", 1);
      expect(result).toContainEqual({ position: 19, errors: 0 });
    });

    it("finds nearby fuzzy matches for 'sat' with k=1", () => {
      const result = fuzzySearch("the cat sat on the mat", "sat", 1);
      // Exact match at position 8
      expect(result).toContainEqual({ position: 8, errors: 0 });
    });
  });

  describe("edge cases", () => {
    it("returns empty array for an empty pattern", () => {
      expect(fuzzySearch("abc", "", 2)).toEqual([]);
    });

    it("returns empty array for an empty text", () => {
      expect(fuzzySearch("", "abc", 1)).toEqual([]);
    });

    it("returns empty array for both empty", () => {
      expect(fuzzySearch("", "", 0)).toEqual([]);
    });

    it("handles pattern equal to text with zero errors", () => {
      expect(fuzzySearch("hello", "hello", 0)).toEqual([
        { position: 0, errors: 0 },
      ]);
    });

    it("handles single character pattern and text", () => {
      expect(fuzzySearch("a", "a", 0)).toEqual([
        { position: 0, errors: 0 },
      ]);
    });

    it("handles single character mismatch with k=1", () => {
      const result = fuzzySearch("a", "b", 1);
      expect(result).toContainEqual({ position: 0, errors: 1 });
    });

    it("returns matches when k equals pattern length", () => {
      const result = fuzzySearch("abc", "xyz", 3);
      expect(result.length).toBeGreaterThan(0);
      // Every match should have errors <= k
      for (const match of result) {
        expect(match.errors).toBeLessThanOrEqual(3);
      }
    });
  });

  describe("input validation", () => {
    it("throws when k is negative", () => {
      expect(() => fuzzySearch("abc", "a", -1)).toThrow(
        "k must be non-negative",
      );
    });

    it("throws when pattern exceeds 32 characters", () => {
      const longPattern = "a".repeat(33);
      expect(() => fuzzySearch("abc", longPattern, 0)).toThrow(
        "Pattern must be at most 32 characters",
      );
    });

    it("accepts a pattern of exactly 32 characters", () => {
      const pattern32 = "a".repeat(32);
      const text = "a".repeat(64);
      const result = fuzzySearch(text, pattern32, 0);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
