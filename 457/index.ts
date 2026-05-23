/**
 * receives a string and swaps the case of each letter
 * @param message string to swap the case of each letter
 * @param alternate if true, swaps the case of each letter in an alternating pattern
 * @returns string with the case of each letter swapped
 */
export function toggleChar(message: string, alternate?: boolean): string {
    if (alternate) {
        const spacesAt = message.matchAll(/\s/g).toArray().map(m => m.index)

        const result = message.replace(/\s/g, "").split("")
            .map((char, index) => index % 2 === 0 ? char.toUpperCase() : char.toLowerCase())

        spacesAt.forEach((index) => {
            result.splice(index, 0, " ")
        })

        return result.join("")
    }

    return message.split("")
        .map(char => char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase())
        .join("")
}
