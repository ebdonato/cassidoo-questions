/**
 * Generates the first `n + 1` Perrin numbers (indices 0 through n).
 *
 * The Perrin sequence is defined as:
 *   P(0) = 3, P(1) = 0, P(2) = 2
 *   P(n) = P(n-2) + P(n-3)  for n >= 3
 */
function generatePerrin(n: number): number[] {
  if (n < 0) return [];
  const seq = [3, 0, 2];
  if (n <= 2) return seq.slice(0, n + 1);

  for (let i = 3; i <= n; i++) {
    const secondPrevious = seq[i - 2];
    const thirdPrevious = seq[i - 3];

    if (secondPrevious === undefined || thirdPrevious === undefined) {
      throw new Error("Invalid Perrin sequence state");
    }

    seq.push(secondPrevious + thirdPrevious);
  }

  return seq;
}

/**
 * Backtracking helper function to find all combinations of unique numbers that sum to a target.
 *
 * @param unique - An array of unique numbers to choose from.
 * @param start - The current index in the `unique` array to consider.
 * @param remaining - The remaining sum needed to reach the target `k`.
 * @param path - The current combination being built.
 * @param results - The array to store valid combinations that sum to `k`.
 */
function backtrack(
  unique: number[],
  start: number,
  remaining: number,
  path: number[],
  results: number[][],
): void {
  if (remaining === 0 && path.length > 0) {
    results.push([...path]);
    return;
  }

  for (let i = start; i < unique.length; i++) {
    const value = unique[i];

    if (value === undefined) {
      continue;
    }

    if (value > remaining) break;

    path.push(value);
    backtrack(unique, i + 1, remaining - value, path, results);
    path.pop();
  }
}

/**
 * Returns all unique combinations of Perrin numbers (up to and including the
 * nth Perrin number) that sum to a target value `k`. Each Perrin number can
 * be used at most once. Combinations are sorted in ascending order.
 *
 * @param n - The index of the last Perrin number to include (0-based).
 * @param k - The target sum.
 * @returns An array of unique combinations that sum to `k`.
 *
 * @example
 * ```ts
 * perrinCombinations(7, 12);
 * // [[0,2,3,7],[0,5,7],[2,3,7],[5,7]]
 * ```
 */
export function perrinCombinations(n: number, k: number): number[][] {
  if (n < 0) {
    throw new Error("n must be a non-negative integer");
  }

  const perrin = generatePerrin(n);
  const unique = [...new Set(perrin)].sort((a, b) => a - b);
  const results: number[][] = [];

  backtrack(unique, 0, k, [], results);
  return results;
}
