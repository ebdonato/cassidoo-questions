/**
 * Moves all occurrences of a value to the end of an array.
 * @template T - The type of elements in the array
 * @param {T[]} arr - The array to modify
 * @param {T} n - The value to move to the end
 * @returns {T[]} The modified array with all occurrences of n moved to the end
 */
export function moveNums<T = number>(arr: T[], n: T): T[] {
  let i = 0;
  let j = arr.length;

  while (i < j) {
    if (arr[i] === n) {
      arr.push(arr.splice(i, 1)[0]);
      j--;
    } else {
      i++;
    }
  }

  return arr;
}
