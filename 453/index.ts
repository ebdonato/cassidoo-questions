const WILDCARD = "?";

/**
 * Calculates the maximum number of times a pattern can be formed from a source string,
 * considering wildcards that can represent any character.
 *
 * @param s - The source string, which may contain wildcards represented by '?'.
 * @param pattern - The pattern string to form from the source.
 * @returns The maximum number of times the pattern can be formed.
 * @throws Will throw an error if the pattern is empty.
 */
export function maxPatternCopies(s: string, pattern: string): number {
  if (pattern.length === 0) {
    throw new Error("Pattern must not be empty");
  }

  if (!/^[a-zA-Z0-9?]*$/.test(s)) {
    throw new Error("Source string contains invalid characters");
  }

  const upperBound = Math.floor(s.length / pattern.length);
  if (upperBound === 0) return 0;

  let wildcards = 0;

  const patternCounts = new Map<string, number>();
  for (const char of pattern) {
    patternCounts.set(char, (patternCounts.get(char) ?? 0) + 1);
  }

  const sourceCounts = new Map<string, number>();
  for (const char of s) {
    if (char === WILDCARD) {
      wildcards += 1;
    } else if (patternCounts.has(char)) {
      sourceCounts.set(char, (sourceCounts.get(char) ?? 0) + 1);
    }
  }

  const reqsPerCopy: number[] = [];
  const avails: number[] = [];
  for (const [char, count] of patternCounts) {
    reqsPerCopy.push(count);
    avails.push(sourceCounts.get(char) ?? 0);
  }

  const uniqueCharsCount = reqsPerCopy.length;

  let low = 0;
  let high = upperBound;

  while (low < high) {
    const mid = low + Math.floor((high - low + 1) / 2);

    let neededWildcards = 0;
    let canBuild = true;

    for (let i = 0; i < uniqueCharsCount; i++) {
      const required = (reqsPerCopy[i] || 0) * mid;
      const available = avails[i] || 0;

      if (available < required) {
        neededWildcards += required - available;

        if (neededWildcards > wildcards) {
          canBuild = false;
          break;
        }
      }
    }

    if (canBuild) {
      low = mid;
    } else {
      high = mid - 1;
    }
  }

  return low;
}
