import { describe, expect, it } from "bun:test";
import { minRepairs } from "./index";

describe("minRepairs", () => {
  it("passes the prompt examples", () => {
    const grid = [
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [1, 1, 0, 1],
      [0, 1, 1, 1],
    ];

    const newGrid = [
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [1, 1, 0, 1],
      [0, 0, 1, 1],
    ];

    expect(minRepairs(grid, 2)).toBe(2);
    expect(minRepairs(newGrid, 1)).toBe(3);
  });

  it("returns 0 when all regions are already within k", () => {
    expect(
      minRepairs(
        [
          [1, 0, 1],
          [1, 1, 1],
          [0, 1, 0],
        ],
        1,
      ),
    ).toBe(0);
  });

  it("handles a single large line region", () => {
    expect(minRepairs([[0, 0, 0, 0, 0]], 2)).toBe(1);
    expect(minRepairs([[0, 0, 0, 0, 0]], 1)).toBe(2);
  });

  it("handles multiple disconnected regions independently", () => {
    expect(
      minRepairs(
        [
          [0, 0, 1, 0],
          [0, 1, 1, 0],
          [1, 1, 1, 1],
          [0, 0, 0, 1],
        ],
        2,
      ),
    ).toBe(2);
  });

  it("returns 0 for empty grid", () => {
    expect(minRepairs([], 3)).toBe(0);
  });

  it("throws for invalid k", () => {
    expect(() => minRepairs([[0]], 0)).toThrow("k must be a positive integer");
    expect(() => minRepairs([[0]], -1)).toThrow("k must be a positive integer");
    expect(() => minRepairs([[0]], 1.5)).toThrow(
      "k must be a positive integer",
    );
  });

  it("throws for non-rectangular grids", () => {
    expect(() => minRepairs([[0, 1], [0]], 1)).toThrow(
      "grid must be rectangular",
    );
  });

  it("throws for non-binary cell values", () => {
    expect(() => minRepairs([[0, 2]], 1)).toThrow("grid values must be 0 or 1");
  });
});
