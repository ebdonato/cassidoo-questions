import { describe, expect, it } from "bun:test";
import { fireStationCoverage } from "./index";

describe("fireStationCoverage tests", () => {
  describe("question scenarios", () => {
    it("returns distances for a grid with two stations and buildings", () => {
      expect(
        fireStationCoverage([
          [2, 0, 1],
          [0, 2, 0],
          [1, 0, 2],
        ]),
      ).toEqual([
        [2, 1, 0],
        [1, 2, 1],
        [0, 1, 2],
      ]);
    });

    it("returns distances for stations placed at the corners", () => {
      expect(
        fireStationCoverage([
          [1, 0, 0, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [1, 0, 0, 1],
        ]),
      ).toEqual([
        [0, 1, 1, 0],
        [1, 2, 2, 1],
        [1, 2, 2, 1],
        [0, 1, 1, 0],
      ]);
    });
  });

  describe("additional scenarios", () => {
    it("returns zero for a grid containing only a fire station", () => {
      expect(fireStationCoverage([[1]])).toEqual([[0]]);
    });

    it("handles a grid with a single station in the center", () => {
      expect(
        fireStationCoverage([
          [0, 0, 0],
          [0, 1, 0],
          [0, 0, 2],
        ]),
      ).toEqual([
        [2, 1, 2],
        [1, 0, 1],
        [2, 1, 2],
      ]);
    });

    it("throws for an empty grid", () => {
      expect(() => fireStationCoverage([])).toThrow("Grid must not be empty");
      expect(() => fireStationCoverage([[]])).toThrow("Grid must not be empty");
    });

    it("throws for a non-rectangular grid", () => {
      expect(() =>
        fireStationCoverage([
          [1, 0],
          [0],
        ]),
      ).toThrow("Grid must be rectangular");
    });

    it("throws when there is no fire station", () => {
      expect(() =>
        fireStationCoverage([
          [0, 2],
          [2, 0],
        ]),
      ).toThrow("Grid must contain at least one fire station");
    });
  });
});
