function countVowels(word: string): number {
    const matches = word.toLowerCase().match(/[aeiou]/gi)
    return matches ? matches.length : 0
}

/**
 * Flips words in a string that have the same number of vowels as the first word.
 * @param str - The input string to process
 * @returns A new string where words matching the vowel count of the first word are reversed
 * @example
 * flippedy("hello world") // "hello dlrow" (both have 2 vowels)
 * flippedy("aei bcd") // "aei bcd" (first word has 3 vowels, no match)
 */
export function flippedy(str: string): string {
    const [first, ...rest] = str.split(" ")
    const firstQtyVowels = countVowels(first)

    if (firstQtyVowels === 0) {
        return str
    }

    const flipped = rest.map((word) =>
        countVowels(word) === firstQtyVowels ? word.split("").reverse().join("") : word
    )

    return [first, ...flipped].join(" ")
}
