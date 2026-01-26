import {describe, expect, it} from "bun:test"
import {flippedy} from "./index"

describe("flippedy", () => {
    it("passes through interview example 1", () => {
        expect(flippedy("cat and mice")).toBe("cat dna mice")
        expect(flippedy("banana healthy")).toBe("banana healthy")
    })
    it("handles single words", () => {
        expect(flippedy("hello")).toBe("hello")
        expect(flippedy("a")).toBe("a")
    })

    it("preserves case", () => {
        expect(flippedy("Cat Dog")).toBe("Cat goD")
        expect(flippedy("HELLO WORLD")).toBe("HELLO WORLD")
    })

    it("handles multiple spaces and punctuation", () => {
        expect(flippedy("hello, world!")).toBe("hello, world!")
        expect(flippedy("hell, world!")).toBe("hell, !dlrow")
        expect(flippedy("test  case")).toBe("test  case")
    })

    it("handles empty strings and edge cases", () => {
        expect(flippedy("")).toBe("")
        expect(flippedy(" ")).toBe(" ")
    })
})
