import { describe, expect, it } from "bun:test";
import { shuffleLine } from "./index";

describe("shuffleLine", () => {
  it("passes through interview examples", () => {
    expect(shuffleLine(["Ada", "Ben", "Cam", "Diya", "Eli", "Fay"], 3)).toEqual(
      ["Ada", "Ben", "Diya", "Eli", "Cam", "Fay"],
    );
    expect(shuffleLine(["A", "B", "C", "D", "E"], 2)).toEqual([
      "A",
      "C",
      "E",
      "B",
      "D",
    ]);
    expect(shuffleLine(["Mo", "Noah", "Oli"], 1)).toEqual([
      "Mo",
      "Noah",
      "Oli",
    ]);
  });

  it("handles empty arrays", () => {
    expect(shuffleLine([], 3)).toEqual([]);
  });

  it("handles arrays smaller than n", () => {
    expect(shuffleLine(["Ada", "Ben"], 3)).toEqual(["Ada", "Ben"]);
  });

  it("handles n larger than the array length", () => {
    expect(shuffleLine(["A", "B", "C"], 10)).toEqual(["A", "B", "C"]);
  });

  it("handles different types of elements (generics)", () => {
    expect(shuffleLine([1, 2, 3, 4, 5], 2)).toEqual([1, 3, 5, 2, 4]);
    expect(shuffleLine([true, false, true, false], 2)).toEqual([
      true,
      true,
      false,
      false,
    ]);
    expect(
      shuffleLine([{ name: "A" }, { name: "B" }, { name: "C" }], 2),
    ).toEqual([{ name: "A" }, { name: "C" }, { name: "B" }]);
  });

  it("throws an error when n is less than 1", () => {
    expect(() => shuffleLine(["A", "B", "C"], 0)).toThrow(
      "n must be greater than or equal to 1",
    );
    expect(() => shuffleLine(["A", "B", "C"], -1)).toThrow(
      "n must be greater than or equal to 1",
    );
  });

  it("does not mutate the original array", () => {
    const input = ["Ada", "Ben", "Cam"];
    const result = shuffleLine(input, 2);
    expect(input).toEqual(["Ada", "Ben", "Cam"]);
    expect(result).not.toBe(input);
  });
});

