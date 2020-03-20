// @flow
import * as R from "ramda";

import keywords from "models/keywords";
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

const defaultOpts = { limit: 50 };
const keyIngredients = R.map(toKeyToken, ["carrot", "onion"]);
const blacklists = R.map(toBlackToken, ["flour"]);
const basicIngredients = R.map(toToken, ["potato", "leek", "olive oil"]);

test("basic match query brackets ok", () => {
  const basicQuery = matchQuery(basicIngredients, defaultOpts);
  checkBrackets(basicQuery);
});

test("key match query brackets ok", () => {
  const keyIngredientQuery = matchQuery(
    [...keyIngredients, ...basicIngredients],
    defaultOpts
  );
  expect(keyIngredientQuery.includes("keyMatched")).toBeTruthy();
  checkBrackets(keyIngredientQuery);
});

test("blacklist match query brackets ok", () => {
  const blacklistQuery = matchQuery(
    [...basicIngredients, ...blacklists],
    defaultOpts
  );
  expect(blacklistQuery.includes("blackMatched")).toBeTruthy();
  checkBrackets(blacklistQuery);
});
