import { describe, expect, it } from "bun:test";
import { moveNums } from "./index";

describe("moveNums", () => {
  it("passes through interview example", () => {
    expect(moveNums([0, 2, 0, 3, 10], 0)).toEqual([2, 3, 10, 0, 0]);
  });

  it("handles no occurrences of n", () => {
    expect(moveNums([1, 2, 3, 4], 0)).toEqual([1, 2, 3, 4]);
  });

  it("handles all elements being n", () => {
    expect(moveNums([5, 5, 5], 5)).toEqual([5, 5, 5]);
  });

  it("handles empty array", () => {
    expect(moveNums([], 0)).toEqual([]);
  });

  it("handles single element equal to n", () => {
    expect(moveNums([3], 3)).toEqual([3]);
  });

  it("handles single element not equal to n", () => {
    expect(moveNums([1], 3)).toEqual([1]);
  });

  it("handles n at the end already", () => {
    expect(moveNums([1, 2, 3, 0, 0], 0)).toEqual([1, 2, 3, 0, 0]);
  });

  it("handles n at the beginning", () => {
    expect(moveNums([0, 0, 1, 2, 3], 0)).toEqual([1, 2, 3, 0, 0]);
  });

  it("preserves relative order of non-n elements", () => {
    expect(moveNums([4, 0, 1, 0, 3, 0, 2], 0)).toEqual([4, 1, 3, 2, 0, 0, 0]);
  });

  it("works with non-zero target value", () => {
    expect(moveNums([1, 3, 2, 3, 5, 3], 3)).toEqual([1, 2, 5, 3, 3, 3]);
  });

  it("works with negative numbers", () => {
    expect(moveNums([-1, 2, -1, 3], -1)).toEqual([2, 3, -1, -1]);
  });

  it("works with strings", () => {
    expect(moveNums(["a", "b", "a", "c"], "a")).toEqual(["b", "c", "a", "a"]);
  });
});
