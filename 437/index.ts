/**
 * Replace each consecutive run of n with its length.
 * @param str - String that contains only digits.
 * @param n - number of consecutive digits to replace.
 * @returns The modified string with runs replaced by their lengths.
 * @example
 * ```ts
 * replaceRepeats('1234500362000440', 0); // "1234523623441"
 * replaceRepeats('000000000000', 0); // "12"
 * replaceRepeats('123456789', 1); // "123456789"
 * ```
 */
export function replaceRepeats(str: string, n: number): string {
    //test if str contains only digits
    if (!/^\d*$/.test(str)) {
        throw new Error("Input string must contain only digits (0-9).")
    }

    return str.replace(new RegExp(`(${n}+)+`, "g"), (match) => {
        return String(match.length)
    })
}
