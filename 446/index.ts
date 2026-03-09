/**
 * Finds the majority element in an array using the Boyer-Moore Voting Algorithm.
 * The majority element is the element that appears more than ⌊n / 2⌋ times.
 *
 * Supports arrays with elements of multiple/mixed types (union types) and
 * accepts an optional custom equality comparator for non-primitive types.
 *
 * @param arr The array to search.
 * @param equalityFn Custom equality function, defaults to strict equality (`===`).
 * @returns The majority element.
 */
export function majorityElement<T>(
  arr: T[],
  equalityFn: (a: T, b: T) => boolean = (a: T, b: T) => a === b,
): T {
  if (arr.length === 0) {
    throw new Error("Array must not be empty");
  }

  let m: T = arr[0];
  let count = 0;

  for (const v of arr) {
    if (count) {
      count += equalityFn(v, m) ? 1 : -1;
      continue;
    }

    m = v;
    count++;
  }

  return m;
}
