import {describe, expect, it} from "bun:test"
import {bijectivelyMapping, konamiMapping} from "./index"

describe("bijectivelyMapping/konamiMapping", () => {
    describe("bijectivelyMapping", () => {
        it("creates a simple bijective mapping", () => {
            const result1 = bijectivelyMapping("abc", "xyz")
            expect(result1).toEqual({x: "a", y: "b", z: "c"})

            const result2 = bijectivelyMapping("abcac", "xyzxz")
            expect(result2).toEqual({x: "a", y: "b", z: "c"})

            const resultK = bijectivelyMapping("UUDDLRLRBA", "2233454590")
            expect(resultK).toEqual({"0": "A", "2": "U", "3": "D", "4": "L", "5": "R", "9": "B"})
        })

        it("throws error when source character maps to different targets", () => {
            expect(() => bijectivelyMapping("aba", "xyz")).toThrow("Mapping is not bijective")
            expect(() => bijectivelyMapping("aab", "xyz")).toThrow("Mapping is not bijective")
        })

        it("throws error when target is shorter than source unique characters", () => {
            expect(() => bijectivelyMapping("abcd", "xy")).toThrow(
                "Target string must be at least as long as source string"
            )
        })

        it("handles empty strings", () => {
            const result = bijectivelyMapping("", "")
            expect(result).toEqual({})
        })

        it("maps single character", () => {
            const result = bijectivelyMapping("a", "x")
            expect(result).toEqual({x: "a"})
        })
    })

    describe("konamiMapping", () => {
        it("passes through interview example 1", () => {
            expect(konamiMapping("xx2233454590yy11110")).toEqual({
                "0": "A",
                "2": "U",
                "3": "D",
                "4": "L",
                "5": "R",
                "9": "B",
            })

            expect(konamiMapping("sduwahoda22ii0d0dbn")).toEqual({"0": "L", "2": "U", i: "D", d: "R", b: "B", n: "A"})
        })

        it("throw when when no valid mapping exists", () => {
            expect(() => konamiMapping("abcdefghij")).toThrow()
        })

        it("finds mapping at the beginning of string", () => {
            const result = konamiMapping("2233454590xxxxx")
            expect(result).toBeTruthy()
            expect(result).toHaveProperty("2")
        })

        it("finds mapping at the end of string", () => {
            const result = konamiMapping("xxxxx2233454590")
            expect(result).toBeTruthy()
            expect(result).toHaveProperty("2")
        })

        it("throws when string shorter than 10 characters", () => {
            expect(() => konamiMapping("abcdefghi")).toThrow()
        })

        it("throws when empty string", () => {
            expect(() => konamiMapping("")).toThrow()
        })

        it("handles string with exactly 10 characters", () => {
            const result = konamiMapping("2233454590")
            expect(result).toBeTruthy()
        })

        it("throw when characters don't map bijectively", () => {
            expect(() => konamiMapping("aabbccddee")).toThrow()
        })
    })
})
