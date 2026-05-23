import { describe, expect, it } from "bun:test";
import { longestCoprimeSubsequence } from "./index";

describe("longestCoprimeSubsequence", () => {
  it("returns 1 for array with no coprime pairs", () => {
    expect(longestCoprimeSubsequence([6, 12, 4, 8])).toBe(1);
  });

  it("returns 4 for the example", () => {
    expect(longestCoprimeSubsequence([4, 3, 6, 9, 7, 2])).toBe(4);
  });

  it("returns 0 for empty array", () => {
    expect(longestCoprimeSubsequence([])).toBe(0);
  });

  it("returns 1 for single element", () => {
    expect(longestCoprimeSubsequence([5])).toBe(1);
  });

  it("returns 2 for two coprime", () => {
    expect(longestCoprimeSubsequence([4, 3])).toBe(2);
  });

  it("returns 1 for two not coprime", () => {
    expect(longestCoprimeSubsequence([4, 2])).toBe(1);
  });
});
