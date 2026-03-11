import { describe, expect, it } from "bun:test";
import { getSwaps, minSwapsToAlternate } from "./index";

describe("minSwapsToAlternate tests", () => {
  describe("minSwapsToAlternate", () => {
    describe("question scenarios", () => {
      it("returns the majority element when it exists", () => {
        expect(minSwapsToAlternate("aabb")).toBe(1);
        expect(minSwapsToAlternate("aaab")).toBe(-1);
        expect(minSwapsToAlternate("aaaabbbb")).toBe(6);
      });
    });

    describe("additional scenarios", () => {
      it("throws an error if the input does not have exactly 2 distinct characters", () => {
        expect(() => minSwapsToAlternate("aaaa")).toThrow(
          "Input must have 2 distinct characters",
        );
        expect(() => minSwapsToAlternate("abc")).toThrow(
          "Input must have 2 distinct characters",
        );
      });

      it("returns proper swap count when one character appears more times", () => {
        expect(minSwapsToAlternate("aaabb")).toBe(3);
      });

      it("returns the minimum swaps for an even-length string with equal counts", () => {
        expect(minSwapsToAlternate("bbaa")).toBe(1);
        expect(minSwapsToAlternate("abab")).toBe(0);
        expect(minSwapsToAlternate("baba")).toBe(0);
      });
    });
  });

  describe("getSwaps", () => {
    it("throws an error if startChar or targetChar is longer than 1 char", () => {
      expect(() => getSwaps("aa", "b", "ab")).toThrow(
        "startChar or targetChar must be one char long",
      );
      expect(() => getSwaps("a", "bb", "ab")).toThrow(
        "startChar or targetChar must be one char long",
      );
      expect(() => getSwaps("aa", "bb", "ab")).toThrow(
        "startChar or targetChar must be one char long",
      );
    });

    it("returns correct swap count with valid characters", () => {
      expect(getSwaps("a", "b", "abab")).toBe(0);
      expect(getSwaps("b", "a", "baba")).toBe(0);
    });
  });
});
