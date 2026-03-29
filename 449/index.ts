export interface FuzzyMatch {
  position: number;
  errors: number;
}

/**
 * Performs a fuzzy string search using the Bitap algorithm.
 * Finds all positions in the text where the pattern matches
 * with at most k errors (insertions, deletions, or substitutions).
 *
 * The reported position is calculated as (endIndex - patternLength + 1),
 * which is the conventional start position for a Bitap match.
 *
 * @param text The text to search in.
 * @param pattern The pattern to search for.
 * @param k The maximum number of allowed errors.
 * @returns An array of matches with position and error count.
 */
export function fuzzySearch(
  text: string,
  pattern: string,
  k: number,
): FuzzyMatch[] {
  if (k < 0) {
    throw new Error("k must be non-negative");
  }

  const m = pattern.length;

  if (m === 0) {
    return [];
  }

  if (m > 32) {
    throw new Error("Pattern must be at most 32 characters");
  }

  // Build the pattern bitmask table.
  // For each character c, patternMask[c] has bit j set if pattern[j] === c.
  const patternMask: Record<string, number> = {};
  for (let j = 0; j < m; j++) {
    const c = pattern[j];
    if (patternMask[c] === undefined) {
      patternMask[c] = 0;
    }
    patternMask[c] |= 1 << j;
  }

  // The match bit: bit (m-1) indicates a full pattern match.
  const matchBit = 1 << (m - 1);

  // R[d] is the state bitvector for at most d errors.
  // Bit j is set if the first (j+1) characters of the pattern have been
  // matched (with at most d errors) ending at the current text position.
  const R = new Int32Array(k + 1);

  // Initialize: with d deletions we can skip up to d pattern characters,
  // so R[d] starts with the lowest d bits set.
  for (let d = 0; d <= k; d++) {
    R[d] = (1 << d) - 1;
  }

  // Collect the best (lowest) error count at each reported position.
  const bestAtPosition = new Map<number, number>();

  for (let i = 0; i < text.length; i++) {
    const charMask = patternMask[text[i]] ?? 0;

    // Update from highest error level down to 0.
    // We need the old values of R[d-1] before they are overwritten,
    // so we save the previous value as we go.
    let prevR = R[0];

    // Exact match update for d = 0.
    R[0] = ((R[0] << 1) | 1) & charMask;

    for (let d = 1; d <= k; d++) {
      const oldRd = R[d];

      // Shift-and with current character (normal match at error level d).
      const match = ((R[d] << 1) | 1) & charMask;
      // Substitution: previous state at d-1 errors, shifted (replace a char).
      const substitution = (prevR << 1) | 1;
      // Insertion in text: current state at d-1 errors (skip this text char).
      const insertion = prevR;
      // Deletion from pattern: new state at d-1 errors, shifted (skip pattern char).
      const deletion = (R[d - 1] << 1) | 1;

      R[d] = match | substitution | insertion | deletion;

      prevR = oldRd;
    }

    // Check for matches at each error level.
    for (let d = 0; d <= k; d++) {
      if (R[d] & matchBit) {
        // The Bitap reports end positions; the conventional start position
        // is endPos - m + 1. With deletions the actual text segment may be
        // shorter than m, so we clamp to 0.
        const position = Math.max(0, i - m + 1);
        const existing = bestAtPosition.get(position);
        if (existing === undefined || d < existing) {
          bestAtPosition.set(position, d);
        }
        break; // Lower d values checked first, so first hit is the best.
      }
    }
  }

  const results: FuzzyMatch[] = [];
  for (const [position, errors] of bestAtPosition) {
    results.push({ position, errors });
  }

  results.sort((a, b) => a.position - b.position || a.errors - b.errors);

  return results;
}
