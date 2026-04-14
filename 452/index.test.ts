import { describe, expect, it } from "bun:test";
import { validatePizza } from ".";

describe("validatePizza", () => {
  it("passes through interview examples", () => {
    const layers = ["dough", "sauce", "cheese", "pepperoni", "basil"];
    const rules1 = [
      ["sauce", "cheese"],
      ["cheese", "pepperoni"],
      ["dough", "basil"],
    ];
    const rules2 = [
      ["cheese", "pepperoni"],
      ["cheese", "sauce"], // "it's under the sauce"
    ];

    expect(validatePizza(layers, rules1)).toBe(true);
    expect(validatePizza(layers, rules2)).toEqual(["cheese", "sauce"]);
  });

  it("returns true when no rules are provided", () => {
    const layers = ["dough", "sauce"];
    expect(validatePizza(layers, [])).toBe(true);
  });

  it("returns true when rules are satisfied with reversed layers", () => {
    const layers = ["basil", "pepperoni", "cheese", "sauce", "dough"];
    const rules = [
      ["basil", "pepperoni"],
      ["pepperoni", "cheese"],
      ["cheese", "sauce"],
      ["sauce", "dough"],
    ];
    expect(validatePizza(layers, rules)).toBe(true);
  });

  it("returns the first violated rule if multiple are violated", () => {
    const layers = ["dough", "cheese", "sauce"];
    const rules = [
      ["cheese", "sauce"], // cheese before sauce (ok)
      ["sauce", "cheese"], // sauce before cheese (violated)
      ["dough", "cheese"], // dough before cheese (ok)
    ];
    expect(validatePizza(layers, rules)).toEqual(["sauce", "cheese"]);
  });

  it("throws an error if layers has less than 2 elements", () => {
    expect(() => validatePizza(["dough"], [["dough", "sauce"]])).toThrow(
      "Pizza must have at least 2 layers",
    );
    expect(() => validatePizza([], [["dough", "sauce"]])).toThrow(
      "Pizza must have at least 2 layers",
    );
  });

  it("returns true if rules reference only one layer", () => {
    const layers = ["dough", "sauce", "cheese"];
    const rules = [["cheese"]];
    expect(validatePizza(layers, rules)).toBe(true);
  });

  it("returns the rule if a referenced layer is missing (treated as -1 index)", () => {
    const layers = ["dough", "cheese"];
    const rules = [["sauce", "cheese"]];
    expect(validatePizza(layers, rules)).toEqual(["sauce", "cheese"]);
  });

  it("handles duplicate layers in pizza", () => {
    const layers = ["dough", "cheese", "sauce", "cheese"];
    const rules = [["cheese", "sauce"]];
    // First "cheese" is before "sauce", so rule is satisfied
    expect(validatePizza(layers, rules)).toBe(true);
  });

  it("returns true if all rules are satisfied with non-adjacent layers", () => {
    const layers = ["dough", "cheese", "basil", "pepperoni", "sauce"];
    const rules = [
      ["dough", "basil", "sauce"],
      ["cheese", "pepperoni"],
    ];
    expect(validatePizza(layers, rules)).toBe(true);
  });

  it("returns the violated rule when order is wrong for non-adjacent layers", () => {
    const layers = ["dough", "basil", "cheese", "pepperoni", "sauce"];
    const rules = [
      ["dough", "sauce", "basil"], // dough before sauce before basil (violated)
      ["cheese", "pepperoni"],
    ];
    expect(validatePizza(layers, rules)).toEqual(["dough", "sauce", "basil"]);
  });
});
