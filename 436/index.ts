/**
 * Checks if the elements in the array alternate based on the specified sequence size.
 * @param arr - The array to check.
 * @param sequenceSize - The size of the alternating sequence. Default is 2.
 * @returns True if the array elements alternate according to the sequence size, false otherwise.
 * @example
 * ```ts
 * checkAlternating([1, 2, 1, 2]); // true
 * checkAlternating([1, 2, 3, 1, 2, 3], 3); // true
 * checkAlternating([1, 2, 1, 3]); // false
 * ```
 */
export function checkAlternating(arr: unknown[], sequenceSize = 2): boolean {
    if (arr.length < sequenceSize) return true
    return arr.every((num, i) => num === arr[i % sequenceSize])
}
