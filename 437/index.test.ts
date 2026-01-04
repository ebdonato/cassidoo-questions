import {describe, expect, it} from "bun:test"
import {replaceRepeats} from "./index"

describe("replaceRepeats", () => {
    describe("replaceRepeats", () => {
        it("passes through interview example", () => {
            expect(replaceRepeats("1234500362000440", 0)).toBe("1234523623441")
            expect(replaceRepeats("000000000000", 0)).toBe("12")
            expect(replaceRepeats("123456789", 1)).toBe("123456789")
        })

        it("handles single digit", () => {
            expect(replaceRepeats("5", 5)).toBe("1")
            expect(replaceRepeats("0", 0)).toBe("1")
            expect(replaceRepeats("0", 2)).toBe("0")
        })

        it("handles empty string", () => {
            expect(replaceRepeats("", 0)).toBe("")
        })

        it("handles string starting with 0", () => {
            expect(replaceRepeats("00000123456", 0)).toBe("5123456")
            expect(replaceRepeats("00000123456", 3)).toBe("00000121456")
        })

        it("handles string with no matches", () => {
            expect(replaceRepeats("123456", 7)).toBe("123456")
        })

        it("handles all consecutive same digits", () => {
            expect(replaceRepeats("1111111", 1)).toBe("7")
            expect(replaceRepeats("2222", 2)).toBe("4")
        })

        it("handles multiple consecutive runs", () => {
            expect(replaceRepeats("11223344", 1)).toBe("2223344")
            expect(replaceRepeats("11223344", 2)).toBe("1123344")
        })

        it("throws error for non-digit characters", () => {
            expect(() => replaceRepeats("123a456", 1)).toThrow()
            expect(() => replaceRepeats("12 34", 1)).toThrow()
            expect(() => replaceRepeats("12.34", 1)).toThrow()
        })
    })
})
