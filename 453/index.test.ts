import { describe, expect, it } from "bun:test";
import { maxPatternCopies } from "./index";

describe("maxPatternCopies", () => {
  it("passes the prompt examples", () => {
    expect(maxPatternCopies("abcabc???", "ac")).toBe(3);
    expect(maxPatternCopies("aab??", "aab")).toBe(1);
    expect(maxPatternCopies("??????", "abc")).toBe(2);
  });

  it("returns 0 when pattern is longer than source", () => {
    expect(maxPatternCopies("ab?", "abcd")).toBe(0);
  });

  it("uses wildcards to fill only missing letters", () => {
    expect(maxPatternCopies("aa??", "ab")).toBe(2);
  });

  it("handles repeated letters in pattern", () => {
    expect(maxPatternCopies("aaaa??", "aaa")).toBe(2);
  });

  it("returns 0 when no copy can be formed", () => {
    expect(maxPatternCopies("bbb", "aa")).toBe(0);
  });

  it("returns 0 for empty source with non-empty pattern", () => {
    expect(maxPatternCopies("", "a")).toBe(0);
  });

  it("throws when pattern is empty", () => {
    expect(() => maxPatternCopies("abc", "")).toThrow(
      "Pattern must not be empty",
    );
  });

  it("throws when source contains invalid symbols", () => {
    expect(() => maxPatternCopies("ab-?", "ab")).toThrow(
      "Source string contains invalid characters",
    );
    expect(() => maxPatternCopies("ab c?", "ab")).toThrow(
      "Source string contains invalid characters",
    );
  });

  it("accepts letters, digits, and wildcard in source string", () => {
    expect(maxPatternCopies("aA1?bB2??", "A1")).toBe(2);
  });
});
