import {describe, expect, it} from "bun:test"
import {hungryBears} from "./index"

describe("hungryBears", () => {
    it("passes through interview example", () => {
        const bears = [
            {name: "Baloo", hunger: 6},
            {name: "Yogi", hunger: 9},
            {name: "Paddington", hunger: 4},
            {name: "Winnie", hunger: 10},
            {name: "Chicago", hunger: 20},
        ]
        // Average is 9.8, only Chicago (20) and Winnie (10) are > 9.8
        expect(hungryBears(bears)).toEqual(["Chicago", "Winnie"])
    })

    it("returns empty array for empty input", () => {
        expect(hungryBears([])).toEqual([])
    })

    it("returns single bear when only one is above average", () => {
        const bears = [
            {name: "Bear1", hunger: 5},
            {name: "Bear2", hunger: 15},
        ]
        // Average is 10, only Bear2 (15) is > 10
        expect(hungryBears(bears)).toEqual(["Bear2"])
    })

    it("returns empty array when all bears have same hunger level", () => {
        const bears = [
            {name: "Alpha", hunger: 5},
            {name: "Beta", hunger: 5},
            {name: "Gamma", hunger: 5},
        ]
        // All equal to average, none > average
        expect(hungryBears(bears)).toEqual([])
    })

    it("filters bears correctly with mixed values", () => {
        const bears = [
            {name: "Bear1", hunger: 1},
            {name: "Bear2", hunger: 2},
            {name: "Bear3", hunger: 3},
        ]
        // Average is 2, only Bear3 (3) is > 2
        expect(hungryBears(bears)).toEqual(["Bear3"])
    })

    it("returns single bear when one has very high hunger", () => {
        const bears = [
            {name: "Small", hunger: 1},
            {name: "Tiny", hunger: 2},
            {name: "Huge", hunger: 100},
        ]
        // Average is 34.33, only Huge (100) is > 34.33
        expect(hungryBears(bears)).toEqual(["Huge"])
    })

    it("sorts names alphabetically", () => {
        const bears = [
            {name: "Zoe", hunger: 10},
            {name: "Alice", hunger: 15},
            {name: "Mike", hunger: 12},
        ]
        // Average is 12.33, only Alice (15) is > 12.33
        expect(hungryBears(bears)).toEqual(["Alice"])
    })

    it("returns empty array for single bear at average", () => {
        const bears = [{name: "Solo", hunger: 5}]
        // Solo (5) is equal to average (5), not greater than
        expect(hungryBears(bears)).toEqual([])
    })

    it("handles bears with zero hunger", () => {
        const bears = [
            {name: "NoHunger", hunger: 0},
            {name: "SomeHunger", hunger: 10},
        ]
        // Average is 5, only SomeHunger (10) is > 5
        expect(hungryBears(bears)).toEqual(["SomeHunger"])
    })

    it("handles bears with decimal average", () => {
        const bears = [
            {name: "Bear1", hunger: 1},
            {name: "Bear2", hunger: 2},
            {name: "Bear3", hunger: 3},
            {name: "Bear4", hunger: 5},
        ]
        // Average is 2.75, Bear3 (3) and Bear4 (5) are > 2.75
        expect(hungryBears(bears)).toEqual(["Bear3", "Bear4"])
    })

    it("excludes bear exactly at average boundary", () => {
        const bears = [
            {name: "Below", hunger: 9},
            {name: "Exact", hunger: 10},
            {name: "Above", hunger: 11},
        ]
        // Average is 10, only Above (11) is > 10
        expect(hungryBears(bears)).toEqual(["Above"])
    })

    it("handles multiple bears above average", () => {
        const bears = [
            {name: "Low", hunger: 5},
            {name: "High1", hunger: 15},
            {name: "High2", hunger: 20},
            {name: "High3", hunger: 18},
        ]
        // Average is 14.5, High1 (15), High2 (20), High3 (18) are > 14.5
        expect(hungryBears(bears)).toEqual(["High1", "High2", "High3"])
    })
})
