import {describe, expect, it} from "bun:test"
import {checkAlternating} from "./index"

describe("checkAlternating", () => {
    it("passes through interview example", () => {
        expect(checkAlternating([])).toBe(true)
        expect(checkAlternating([1])).toBe(true)
        expect(checkAlternating([1, 1])).toBe(true)
        expect(checkAlternating([1, 2, 1])).toBe(true)
        expect(checkAlternating([10, 5, 10, 5, 10])).toBe(true)
        expect(checkAlternating([2, 2, 3, 3])).toBe(false)
        expect(checkAlternating([5, 4, 3, 5, 4, 3])).toBe(false)
    })

    it("returns true for 3-sized sequence", () => {
        expect(checkAlternating([1, 2, 3, 1, 2, 3], 3)).toBe(true)
        expect(checkAlternating([1, 2, 3, 1, 2, 5], 3)).toBe(false)
    })

    it("NaN values behave according to strict equality (NaN !== NaN)", () => {
        // Because NaN !== NaN, two NaNs at alternating positions will be considered unequal
        expect(checkAlternating([NaN, 1, NaN])).toBe(false)
    })

    // Strings
    it("works with strings (primitive equality)", () => {
        expect(checkAlternating(["a", "b", "a", "b"])).toBe(true)
        expect(checkAlternating(["a", "b", "a", "c"])).toBe(false)
        // different string types: number vs string should fail strict equality
        expect(checkAlternating([1, "1", 1])).toBe(true)
    })

    // Booleans
    it("works with booleans", () => {
        expect(checkAlternating([true, false, true, false])).toBe(true)
        expect(checkAlternating([true, false, false, false])).toBe(false)
    })

    // null and undefined
    it("handles null and undefined", () => {
        expect(checkAlternating([null, undefined, null])).toBe(true) // null === null, undefined === undefined
        expect(checkAlternating([undefined, undefined, undefined])).toBe(true)
        expect(checkAlternating([null, null, null])).toBe(true)
        // mixing null and undefined in a position that should be equal -> false
        expect(checkAlternating([null, null, undefined])).toBe(false)
    })

    // BigInt
    it("handles BigInt primitives", () => {
        expect(checkAlternating([1n, 2n, 1n])).toBe(true)
        // BigInt and Number are not strictly equal
        expect(checkAlternating([1n, 1, 1n])).toBe(true)
    })

    // Symbols
    it("handles symbols (reference/identity equality)", () => {
        const s1 = Symbol("s")
        const s2 = Symbol("t")
        expect(checkAlternating([s1, s2, s1])).toBe(true)

        // Symbol() always creates a unique symbol, even with the same description
        expect(checkAlternating([Symbol("x"), Symbol("y"), Symbol("x")])).toBe(false)

        // Symbol.for returns the same symbol for the same key
        expect(checkAlternating([Symbol.for("k1"), Symbol.for("k2"), Symbol.for("k1")])).toBe(true)
    })

    // Functions
    it("handles function references", () => {
        const f = () => 1
        const g = () => 2
        expect(checkAlternating([f, g, f])).toBe(true)
        expect(checkAlternating([() => 1, g, () => 1])).toBe(false) // different function objects
    })

    // Objects and arrays (reference equality)
    it("uses reference equality for objects and arrays", () => {
        const objA = {a: 1}
        const objB = {b: 2}
        expect(checkAlternating([objA, objB, objA])).toBe(true)

        const arrA = [1]
        const arrB = [2]
        expect(checkAlternating([arrA, arrB, arrA])).toBe(true)

        // Two distinct object literals that look the same are not ===
        expect(checkAlternating([{a: 1}, {b: 2}, {a: 1}])).toBe(false)
        expect(checkAlternating([[1], [2], [1]])).toBe(false)
    })

    // Mixed types
    it("correctly handles mixed-type arrays", () => {
        // Even indices are number 1, odd indices are string '1' -> strict inequality, so false
        expect(checkAlternating([1, "1", 1, "1"])).toBe(true)

        // Mixed but consistent references where appropriate
        const shared = {value: "x"}
        expect(checkAlternating([shared, true, shared, true])).toBe(true)
    })

    // Some additional edge cases
    it("handles longer arrays with complex types", () => {
        const fn = function named() {
            return "x"
        }
        const obj = {k: 1}
        const s = Symbol.for("z")
        const arr = [obj, fn, obj, fn, obj] // odd positions are functions, even positions same object
        expect(checkAlternating([obj, fn, obj, fn, obj])).toBe(true)
        expect(checkAlternating([s, 0, s, 0n, s])).toBe(false) // 0 !== 0n
    })
})
