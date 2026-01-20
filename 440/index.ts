/**
 * Creates a bijective (one-to-one) mapping between characters in a source string and a target string.
 *
 * @param source - The source string whose characters will be mapped.
 * @param target - The target string whose characters will be mapped to.
 * @returns A record object where keys are characters from the source string and values are corresponding characters from the target string.
 * @throws {Error} If the target string is shorter than the source string.
 * @throws {Error} If a character in the source string would map to different characters in the target string (not bijective).
 */
export function bijectivelyMapping(source: string, target: string): Record<string, string> {
    if (target.length < source.length) {
        throw new Error("Target string must be at least as long as source string")
    }

    const mapping = source.split("").reduce(
        (acc, char, index) => {
            if (acc[char] && acc[char] !== target[index]) {
                throw new Error("Mapping is not bijective")
            }

            acc[char] = target[index]
            return acc
        },
        {} as Record<string, string>
    )

    return Object.fromEntries(Object.entries(mapping).map(([key, value]) => [value, key]))
}

const KONAMI_CODE = "UUDDLRLRBA"

/**
 * Finds a bijective mapping between the Konami code and a substring of the input string.
 *
 * Searches through the input string to find a substring of the same length as the Konami code
 * that can be bijectively mapped to it. Returns the first valid mapping found.
 *
 * @param str - The string to search through for a valid Konami code mapping
 * @returns A record object representing the bijective mapping between Konami code characters and substring characters
 * @throws {Error} If no valid bijective mapping is found in the input string
 */
export function konamiMapping(str: string): Record<string, string> {
    if (str.length < KONAMI_CODE.length) {
        throw new Error("Target string must be at least as long as source string")
    }

    for (let i = 0; i <= str.length - KONAMI_CODE.length; i++) {
        const substring = str.slice(i, i + KONAMI_CODE.length)
        try {
            const mapping = bijectivelyMapping(KONAMI_CODE, substring)
            return mapping
        } catch {
            // Ignore errors and continue searching
        }
    }
    throw new Error("No valid mapping found")
}
