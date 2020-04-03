// @flow
import * as R from "ramda";
import SearchToken from "models/SearchToken";
import keywords from "models/keywords";
import {
  inputTypes,
  validInputTypes,
  isDuplicateInput,
  isValidInput
} from "models/input";

import type { IngredientMap } from "models/ingredient";

const testTokens = [
  new SearchToken(keywords.NONE, "potato"),
  new SearchToken(keywords.NOT, "milk")
];

test("gets valid input types", () => {
  // No token case
  expect(validInputTypes([]).sort()).toStrictEqual(
    [inputTypes.INGREDIENT, inputTypes.KEYWORD].sort()
  );

  // last token is partial
  const lastTokenIsPartialNot = [...testTokens, new SearchToken(keywords.NOT)];
  expect(validInputTypes(lastTokenIsPartialNot)).toStrictEqual([
    inputTypes.INGREDIENT
  ]);

  const lastTokenIsPartialKey = [...testTokens, new SearchToken(keywords.KEY)];
  expect(validInputTypes(lastTokenIsPartialKey)).toStrictEqual([
    inputTypes.INGREDIENT
  ]);

  const lastTokenIsPartialDiet = [
    ...testTokens,
    new SearchToken(keywords.DIET)
  ];
  expect(validInputTypes(lastTokenIsPartialDiet)).toStrictEqual([
    inputTypes.DIET
  ]);

  const lastTokenIsFull = testTokens;
  expect(validInputTypes(lastTokenIsFull).sort()).toStrictEqual(
    [inputTypes.INGREDIENT, inputTypes.KEYWORD].sort()
  );
});

test("detects duplicates", () => {
  expect(isDuplicateInput("unique input", testTokens)[0]).toBeFalsy();
  expect(isDuplicateInput("potato", testTokens)[0]).toBeTruthy();
});

const validIngredients: IngredientMap = R.indexBy(R.identity, [
  "potato",
  "milk",
  "lettuce"
]);

test("detects invalid ingredient", () => {
  expect(isValidInput("lettuce", testTokens, validIngredients)[0]).toBeTruthy();
  expect(
    isValidInput("not lettuce", testTokens, validIngredients)[0]
  ).toBeFalsy();
});

test("accepts keywords", () => {
  expect(
    isValidInput(keywords.KEY, testTokens, validIngredients)[0]
  ).toBeTruthy();

  // Should be case insensitive
  expect(
    isValidInput(keywords.KEY.toLowerCase(), testTokens, validIngredients)[0]
  ).toBeTruthy();
});
