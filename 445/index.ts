/**
 * Finds the maximum sum of a contiguous subarray in an array of numbers.
 * Implements Kadane's algorithm.
 * @param arr - The array of numbers to search
 * @returns The maximum sum of a contiguous subarray
 */
export function maxSubarraySum(arr: number[]): number {
  let cur = arr[0];

  return arr.reduce(
    (max, v, i) =>
      i === 0 ? max : ((cur = Math.max(v, cur + v)), Math.max(max, cur)),
    arr[0],
  );
}
