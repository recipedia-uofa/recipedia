// @flow
import * as R from "ramda";

import { matchQueryBasic, matchQueryWithKeyIngredients } from "../matchRecipes";

const isBracketMatch = (b1: string, b2: string): boolean => {
  const bsorted = [b1, b2].sort().join("");
  return bsorted === "{}" || bsorted === "()";
};

const checkBrackets = (query: string): boolean => {
  // Get only the brackets
  const queryBrackets = query.replace(/[^\{\}\(\)]/g, "");

  // Check that the first and last brackets are curly braces
  expect(queryBrackets.length).toBeGreaterThanOrEqual(2);
  const firstAndLastBrackets =
    queryBrackets[0] + queryBrackets[queryBrackets.length - 1];
  expect(firstAndLastBrackets).toBe("{}");

  let bracketsMatch = true;
  const bracketStack = [];
  for (const b of queryBrackets) {
    if ("{(".includes(b)) {
      bracketStack.push(b);
    } else if ("})".includes(b)) {
      if (!isBracketMatch(b, bracketStack.pop())) {
        bracketsMatch = false;
        break;
      }
    }
  }

  expect(bracketsMatch && R.isEmpty(bracketStack)).toBeTruthy();
};

const defaultOpts = { limit: 50 };
const keyIngredients = ["carrot", "onion"];
const ingredients = [...keyIngredients, "potato", "leek", "olive oil"];

test("basic query brackets ok", () => {
  const basicQuery = matchQueryBasic(ingredients, defaultOpts);
  checkBrackets(basicQuery);
});

test("key query brackets ok", () => {
  const keyIngredientQuery = matchQueryWithKeyIngredients(
    ingredients,
    keyIngredients,
    defaultOpts
  );
  checkBrackets(keyIngredientQuery);
});
