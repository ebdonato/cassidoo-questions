import { describe, expect, it } from "bun:test"
import { toggleChar } from "./index"

describe("toggleChar", () => {
    it("passes through interview example", () => {
        expect(toggleChar("Hello, world!")).toBe("hELLO, WORLD!")
        expect(toggleChar("HeheHeheHEheheHeH")).toBe("hEHEhEHEheHEHEhEh")
        expect(toggleChar("This will be alternated", true)).toBe("ThIs WiLl Be AlTeRnAtEd")

    })

    it("handles an empty string", () => {
        expect(toggleChar("")).toBe("")
    })

    it("handles all uppercase characters", () => {
        expect(toggleChar("HELLO")).toBe("hello")
    })

    it("handles all lowercase characters", () => {
        expect(toggleChar("hello")).toBe("HELLO")
    })

    it("handles numbers and special characters", () => {
        expect(toggleChar("12345!@#$")).toBe("12345!@#$")
    })

    it("handles strings with mixed characters, spaces, and numbers", () => {
        expect(toggleChar("Hello 123 World!")).toBe("hELLO 123 wORLD!")
    })

    it("handles non-ASCII/Unicode letters with case matching", () => {
        expect(toggleChar("ÁéÍóÚñ")).toBe("áÉíÓúÑ")
    })

    describe("with alternate option enabled", () => {
        it("alternates casing for all lowercase strings", () => {
            expect(toggleChar("hello", true)).toBe("HeLlO")
        })

        it("alternates casing for all uppercase strings", () => {
            expect(toggleChar("HELLO", true)).toBe("HeLlO")
        })

        it("ignores case-insensitive characters while alternating case index", () => {
            expect(toggleChar("a1b2c", true)).toBe("A1B2C")
        })

        it("handles leading and trailing whitespace", () => {
            expect(toggleChar(" hello ", true)).toBe(" HeLlO ")
            expect(toggleChar("   a   ", true)).toBe("   A   ")
        })

        it("handles empty strings", () => {
            expect(toggleChar("", true)).toBe("")
        })

        it("handles non-ASCII/Unicode letters", () => {
            expect(toggleChar("áéíóúñ", true)).toBe("ÁéÍóÚñ")
        })
    })

    describe("with alternate option explicitly disabled", () => {
        it("swaps casing of each character normally", () => {
            expect(toggleChar("Hello, world!", false)).toBe("hELLO, WORLD!")
        })
    })
})
