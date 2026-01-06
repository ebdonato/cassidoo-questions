/**
 * Given an array of integers, this function calculates the maximum score obtainable
 * by summing elements from the end of the array to the beginning, allowing for one reset.
 * A reset means that you can start summing from the end again after reaching any point.
 *
 * @param {number[]} arr - The input array of integers.
 * @returns {number} The maximum score obtainable with one reset.
 */
export function maxScoreWithOneReset(arr: number[]): number {
    if (arr.some((val) => !Number.isInteger(val))) {
        throw new Error("All array values must be integers")
    }

    let maxScore = 0

    for (let i = 0, currentScore = 0, reversed = arr.toReversed(); i < reversed.length; i++) {
        currentScore += reversed[i]
        maxScore = Math.max(maxScore, currentScore)
    }

    return maxScore
}
