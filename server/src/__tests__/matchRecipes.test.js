// @flow
import * as R from "ramda";

import keywords from "models/keywords";
import diets from "models/diets";
import SearchToken from "models/SearchToken";
import { matchQuery } from "../matchRecipes";
import { checkBrackets, checkVars } from "./helpers";

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
  checkVars(basicQuery);
});

test("key match query feasible", () => {
  const keyIngredientQuery = matchQuery(
    [...keyIngredients, ...basicIngredients],
    defaultOpts
  );
  expect(keyIngredientQuery.includes("keyMatched")).toBeTruthy();
  checkBrackets(keyIngredientQuery);
  checkVars(keyIngredientQuery);
});

test("blacklist match query feasible", () => {
  const blacklistQuery = matchQuery(
    [...basicIngredients, ...blacklists],
    defaultOpts
  );
  expect(blacklistQuery.includes("blackMatched")).toBeTruthy();
  checkBrackets(blacklistQuery);
  checkVars(blacklistQuery);
});

test("diet match query feasible", () => {
  const dietQuery = matchQuery(
    [...basicIngredients, ...dietRestrictions],
    defaultOpts
  );
  expect(dietQuery.includes("dietRestrictions")).toBeTruthy();
  checkBrackets(dietQuery);
  checkVars(dietQuery);
});

test("full match query feasible", () => {
  const fullQuery = matchQuery(
    [...basicIngredients, ...keyIngredients, ...blacklists, ...dietRestrictions],
    defaultOpts
  );
  checkBrackets(fullQuery);
  checkVars(fullQuery);
});
