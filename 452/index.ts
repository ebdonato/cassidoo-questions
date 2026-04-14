/**
 * Validates a pizza based on a set of rules.
 * @param {string[]} layers - The layers of the pizza.
 * @param {string[][]} rules - The rules to validate the pizza against.
 * @returns {true | string[]} - Returns true if the pizza is valid, otherwise returns the first rule that is violated.
 * @throws {Error} - Throws an error if the pizza has less than 2 layers.
 */
export function validatePizza(
  layers: string[],
  rules: string[][],
): true | string[] {
  if (layers.length < 2) throw new Error("Pizza must have at least 2 layers");

  for (const rule of rules) {
    let previous = 0;

    for (const item of rule) {
      const current = layers.findIndex((layer) => layer === item);
      if (current < previous) return rule;
      previous = current;
    }
  }

  return true;
}
