/** * Shuffles an array by moving every nth element to the end of the array.
 * @param {T[]} array - The array to be shuffled.
 * @param {number} n - The interval at which elements are moved to the end.
 * @returns {T[]} A new array with the elements shuffled.
 * @throws {Error} If n is less than 1.
 */
export function shuffleLine<T>(array: T[], n: number): T[] {
  if (n < 1) {
    throw new Error("n must be greater than or equal to 1");
  }

  const result = array.reduce(
    (acc, item, index) => {
      if (index % n !== n - 1) {
        acc.keep.push(item);
      } else {
        acc.move.push(item);
      }
      return acc;
    },
    { keep: [] as T[], move: [] as T[] },
  );
  return [...result.keep, ...result.move];
}
