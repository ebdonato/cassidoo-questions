/**
 * Zooms in on a 2D array by repeating each element k times both horizontally and vertically.
 * @template T - The type of elements in the array
 * @param arr - A 2D array to zoom in on
 * @param k - The zoom factor (must be >= 2). Each element will be repeated k times in both dimensions
 * @returns A new 2D array with each element repeated k times horizontally and vertically
 * @throws {Error} If k is less than 2
 * @example
 * zoom([[1, 2], [3, 4]], 2)
 * // Returns: [[1, 1, 2, 2], [1, 1, 2, 2], [3, 3, 4, 4], [3, 3, 4, 4]]
 */
export function zoom<T>(arr: T[][], k: number): T[][] {
  if (k < 2) throw new Error("k must be greater than or equal to 2");

  return arr.flatMap((row) =>
    Array.from({ length: k }, () => row.flatMap((item) => Array(k).fill(item))),
  );
}
