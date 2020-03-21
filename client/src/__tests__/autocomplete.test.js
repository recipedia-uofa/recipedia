import * as R from "ramda";
import search, { score, match } from "models/autocomplete";

test("basic matches", () => {
  expect(match("pot", "potato")).toStrictEqual([[0, 2]]);
  expect(match("pot", "chipotle")).toStrictEqual([[3, 5]]);
  expect(match("pot", "potato chips")).toStrictEqual([[0, 2]]);
});

test("basic scores", () => {
  // Matched indices for "pot"
  expect(score("potato", [[0, 2]])).toBe(1 / 2);
  expect(score("chipotle", [[3, 5]])).toBe(3 / 32);
  expect(score("potato chips", [[0, 2]])).toBe(1 / 4);
});

const opts = {
  key: R.identity
};

const ingredients = ["chipotle", "potato", "potato chips", "sweet potato"];

test("empty search", () => {
  expect(search("", [], opts)).toStrictEqual([]);
});

test("returns strict substrings only", () => {
  const result = search("chip", ingredients, opts);
  expect(result).toStrictEqual(["chipotle", "potato chips"]);
});

test("orders matches", () => {
  const result = search("pot", ingredients, opts);
  expect(result).toStrictEqual([
    "potato",
    "potato chips",
    "chipotle",
    "sweet potato"
  ]);
});

test("handles bad regex", () => {
  expect(() => search("pot\\", ingredients, opts)).not.toThrow();
});
