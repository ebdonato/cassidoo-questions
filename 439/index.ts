type Bear = {
    name: string
    hunger: number
}

/**
 * Filters bears by hunger level and returns their names sorted alphabetically.
 *
 * @param bears - Array of Bear objects to filter
 * @returns Array of bear names that have hunger level greater than or equal to the average hunger level
 *
 * @example
 * const bears: Bear[] = [
 *   { name: "Grizzly", hunger: 8 },
 *   { name: "Panda", hunger: 6 },
 *   { name: "Polar", hunger: 10 }
 * ];
 * hungryBears(bears); // Returns ["Grizzly", "Polar"]
 */
export function hungryBears(bears: Bear[]): string[] {
    const avg = bears.reduce((acc, bear, index) => acc + (bear.hunger - acc) / (index + 1), 0)

    return bears
        .filter((bear) => bear.hunger > avg)
        .map((bear) => bear.name)
        .sort()
}
