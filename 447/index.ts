/**
 * Calculates the number of swaps required to make a string alternating.
 * @param startChar The starting character.
 * @param targetChar The target character.
 * @param input The input string.
 * @returns The number of swaps required to make the string alternating.
 */
export function getSwaps(
  startChar: string,
  targetChar: string,
  input: string,
): number {
  let swaps = 0;
  let encountered = 0;

  if (startChar.length > 1 || targetChar.length > 1) {
    throw new Error("startChar or targetChar must be one char long");
  }

  for (let i = 0; i < input.length; i++) {
    if (input[i] === targetChar) {
      const targetIndex =
        startChar === targetChar ? encountered * 2 : encountered * 2 + 1;

      swaps += Math.abs(i - targetIndex);
      encountered++;
    }
  }

  return swaps;
}

/**
 * Calculates the minimum number of swaps required to make a string alternating.
 * @param input The input string.
 * @returns The minimum number of swaps required to make the string alternating.
 */
export function minSwapsToAlternate(input: string): number {
  const artefacts = input.split("").reduce(
    (acc, i) => {
      acc[i] = (acc[i] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const keys = Object.keys(artefacts);
  const [countCharOne, countCharTwo] = Object.values(artefacts);

  if (keys.length != 2) {
    throw new Error("Input must have 2 distinct characters");
  }

  const [charOne, charTwo] = keys;

  if (Math.abs(countCharOne - countCharTwo) > 1) {
    return -1;
  }

  if (countCharOne > countCharTwo) {
    return getSwaps(charOne, charTwo, input);
  } else if (countCharTwo > countCharOne) {
    return getSwaps(charTwo, charOne, input);
  } else {
    return Math.min(
      getSwaps(charOne, charTwo, input),
      getSwaps(charTwo, charOne, input),
    );
  }
}
