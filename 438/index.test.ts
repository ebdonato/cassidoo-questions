import {describe, expect, it} from "bun:test"
import {maxScoreWithOneReset} from "./index"

describe("maxScoreWithOneReset", () => {
    describe("maxScoreWithOneReset", () => {
        it("passes through interview example", () => {
            expect(maxScoreWithOneReset([2, -1, 2, -5, 2, 2])).toBe(4)
            expect(maxScoreWithOneReset([4, -10, 3, 2, -1, 6])).toBe(10)
            expect(maxScoreWithOneReset([-50, -2, -3])).toBe(0)
        })

        it("handles empty array", () => {
            expect(maxScoreWithOneReset([])).toBe(0)
        })

        it("handles single element", () => {
            expect(maxScoreWithOneReset([5])).toBe(5)
            expect(maxScoreWithOneReset([-3])).toBe(0)
        })

        it("handles all positive numbers", () => {
            expect(maxScoreWithOneReset([1, 2, 3, 4])).toBe(10)
        })

        it("handles all negative numbers", () => {
            expect(maxScoreWithOneReset([-1, -2, -3, -4])).toBe(0)
        })

        it("handles zero values", () => {
            expect(maxScoreWithOneReset([0, 0, 0])).toBe(0)
            expect(maxScoreWithOneReset([0, 5, -2])).toBe(3)
        })

        it("handles mixed with reset benefit", () => {
            expect(maxScoreWithOneReset([5, -10, 3, 2])).toBe(5)
            expect(maxScoreWithOneReset([1, 2, -5, 3, 4])).toBe(7)
        })

        it("handles large positive values", () => {
            expect(maxScoreWithOneReset([100, -50, 75])).toBe(125)
        })

        it("throws error for non-integer values", () => {
            expect(() => maxScoreWithOneReset([1, 2, 3.5])).toThrow("All array values must be integers")
            expect(() => maxScoreWithOneReset([1, "2" as any, 3])).toThrow("All array values must be integers")
        })
    })
})
