// @flow
import * as R from "ramda";

import keywords from "models/keywords";
import diets from "models/diets";
import SearchToken from "models/SearchToken";
import { matchQuery } from "../matchRecipes";

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

const toToken = (i: string) => {
  return new SearchToken(keywords.NONE, i);
};

const toBlackToken = (i: string) => {
  return new SearchToken(keywords.NOT, i);
};

const toKeyToken = (i: string) => {
  return new SearchToken(keywords.KEY, i);
};

const toDietToken = (i: string) => {
  return new SearchToken(keywords.DIET, i);
}

const defaultOpts = { limit: 50 };
const keyIngredients = R.map(toKeyToken, ["carrot", "onion"]);
const blacklists = R.map(toBlackToken, ["flour"]);
const dietRestrictions = R.map(toDietToken, [diets.VEGETARIAN, diets.GLUTEN_FREE]);
const basicIngredients = R.map(toToken, ["potato", "leek", "olive oil"]);

test("basic match query feasible", () => {
  const basicQuery = matchQuery(basicIngredients, defaultOpts);
  checkBrackets(basicQuery);
});

test("key match query feasible", () => {
  const keyIngredientQuery = matchQuery(
    [...keyIngredients, ...basicIngredients],
    defaultOpts
  );
  expect(keyIngredientQuery.includes("keyMatched")).toBeTruthy();
  checkBrackets(keyIngredientQuery);
});

test("blacklist match query feasible", () => {
  const blacklistQuery = matchQuery(
    [...basicIngredients, ...blacklists],
    defaultOpts
  );
  expect(blacklistQuery.includes("blackMatched")).toBeTruthy();
  checkBrackets(blacklistQuery);
});

test("diet match query feasible", () => {
  const dietQuery = matchQuery(
    [...basicIngredients, ...dietRestrictions],
    defaultOpts
  );
  expect(dietQuery.includes("dietRestrictions")).toBeTruthy();
  checkBrackets(dietQuery);
});

test("full match query feasible", () => {
  const fullQuery = matchQuery(
    [...basicIngredients, ...keyIngredients, ...blacklists, ...dietRestrictions],
    defaultOpts
  );
  console.log(fullQuery);
  checkBrackets(fullQuery);
});
