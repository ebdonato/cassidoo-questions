import { describe, expect, it } from "bun:test";
import { zoom } from "./index";

describe("zoom", () => {
  it("passes through interview example", () => {
    expect(
      zoom(
        [
          [1, 2],
          [3, 4],
        ],
        2,
      ),
    ).toEqual([
      [1, 1, 2, 2],
      [1, 1, 2, 2],
      [3, 3, 4, 4],
      [3, 3, 4, 4],
    ]);

    expect(zoom([[7, 8, 9]], 3)).toEqual([
      [7, 7, 7, 8, 8, 8, 9, 9, 9],
      [7, 7, 7, 8, 8, 8, 9, 9, 9],
      [7, 7, 7, 8, 8, 8, 9, 9, 9],
    ]);

    expect(zoom([[1], [2]], 3)).toEqual([
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [2, 2, 2],
      [2, 2, 2],
      [2, 2, 2],
    ]);
  });

  it("handles single element matrix", () => {
    expect(zoom([[5]], 2)).toEqual([
      [5, 5],
      [5, 5],
    ]);

    expect(zoom([[42]], 4)).toEqual([
      [42, 42, 42, 42],
      [42, 42, 42, 42],
      [42, 42, 42, 42],
      [42, 42, 42, 42],
    ]);
  });

  it("handles larger zoom factors", () => {
    expect(zoom([[1, 2]], 4)).toEqual([
      [1, 1, 1, 1, 2, 2, 2, 2],
      [1, 1, 1, 1, 2, 2, 2, 2],
      [1, 1, 1, 1, 2, 2, 2, 2],
      [1, 1, 1, 1, 2, 2, 2, 2],
    ]);
  });

  it("handles larger matrices", () => {
    const input = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    const result = zoom(input, 2);
    expect(result).toEqual([
      [1, 1, 2, 2, 3, 3],
      [1, 1, 2, 2, 3, 3],
      [4, 4, 5, 5, 6, 6],
      [4, 4, 5, 5, 6, 6],
      [7, 7, 8, 8, 9, 9],
      [7, 7, 8, 8, 9, 9],
    ]);
  });

  it("handles string matrices", () => {
    expect(zoom([["a", "b"]], 2)).toEqual([
      ["a", "a", "b", "b"],
      ["a", "a", "b", "b"],
    ]);
  });

  it("throws error when k is less than 2", () => {
    expect(() => zoom([[1, 2]], 1)).toThrow(
      "k must be greater than or equal to 2",
    );
    expect(() => zoom([[1, 2]], 0)).toThrow(
      "k must be greater than or equal to 2",
    );
    expect(() => zoom([[1, 2]], -1)).toThrow(
      "k must be greater than or equal to 2",
    );
  });

  it("handles rectangular matrices", () => {
    expect(zoom([[1, 2, 3, 4]], 2)).toEqual([
      [1, 1, 2, 2, 3, 3, 4, 4],
      [1, 1, 2, 2, 3, 3, 4, 4],
    ]);

    expect(zoom([[1], [2], [3]], 2)).toEqual([
      [1, 1],
      [1, 1],
      [2, 2],
      [2, 2],
      [3, 3],
      [3, 3],
    ]);
  });

  it("preserves element values correctly across different types", () => {
    expect(zoom([[null, undefined]], 2)).toEqual([
      [null, null, undefined, undefined],
      [null, null, undefined, undefined],
    ]);
  });
});
