// @flow
import SearchToken from "models/SearchToken";
import keywords from "models/keywords";
import diets from "models/diets";

import type { IngredientMap } from "models/ingredient";

const validIngredients: IngredientMap = {
  test: "test"
};

test("ingredient token", () => {
  const token = new SearchToken(keywords.NONE, "test");
  expect(token.isIngredient()).toBeTruthy();
  expect(token.isSimpleIngredient()).toBeTruthy();
  expect(token.isPartial()).toBeFalsy();
  expect(token.hasKeyword()).toBeFalsy();
  expect(token.isValid(validIngredients)).toBeTruthy();
});

test("full token", () => {
  const token = new SearchToken(keywords.KEY, "test");
  expect(token.isIngredient()).toBeTruthy();
  expect(token.isSimpleIngredient()).toBeFalsy();
  expect(token.isPartial()).toBeFalsy();
  expect(token.hasKeyword()).toBeTruthy();
  expect(token.isValid(validIngredients)).toBeTruthy();
});

test("partial token", () => {
  const token = new SearchToken(keywords.KEY);
  expect(token.isPartial()).toBeTruthy();
  expect(token.hasKeyword()).toBeTruthy();
  expect(token.isIngredient()).toBeFalsy();
  expect(token.isValid(validIngredients)).toBeTruthy();
});

test("valid tokens", () => {
  expect(
    new SearchToken(keywords.NONE, "test").isValid(validIngredients)
  ).toBeTruthy();
  expect(
    new SearchToken(keywords.KEY, "test").isValid(validIngredients)
  ).toBeTruthy();
  expect(
    new SearchToken(keywords.NOT, "test").isValid(validIngredients)
  ).toBeTruthy();
  expect(
    new SearchToken(keywords.DIET, diets.GLUTEN_FREE).isValid(validIngredients)
  ).toBeTruthy();
});

test("invalid tokens", () => {
  expect(new SearchToken(null, null).isValid(validIngredients)).toBeFalsy();
  expect(
    new SearchToken(keywords.NONE, "bad").isValid(validIngredients)
  ).toBeFalsy();
  expect(
    new SearchToken(keywords.KEY, "bad").isValid(validIngredients)
  ).toBeFalsy();
  expect(
    new SearchToken(keywords.NOT, "bad").isValid(validIngredients)
  ).toBeFalsy();
  expect(
    new SearchToken(keywords.DIET, "bad").isValid(validIngredients)
  ).toBeFalsy();
});

test("equality", () => {
  // Two tokens are the same if they have the same keyword and value
  const token1 = new SearchToken(keywords.NONE, "testEqual");
  const token2 = new SearchToken(keywords.NONE, "testEqual");
  const differentValue = new SearchToken(keywords.NONE, "testNotEqual");
  const differentKeyword = new SearchToken(keywords.NOT, "testEqual");
  const partial1 = new SearchToken(keywords.DIET);
  const partial2 = new SearchToken(keywords.DIET);
  const partialDifferentKey = new SearchToken(keywords.NOT);

  expect(token1.equals(token2)).toBeTruthy();
  expect(token2.equals(token1)).toBeTruthy(); // commutative
  expect(token1.equals(differentValue)).toBeFalsy();
  expect(token1.equals(differentKeyword)).toBeFalsy();

  expect(partial1.equals(partial2)).toBeTruthy();
  expect(partial1.equals(partialDifferentKey)).toBeFalsy();
});

test("encodes token", () => {
  const token = new SearchToken(keywords.KEY, "test");
  const encoded = token.encode();
  expect(encoded.length).toBeGreaterThan(0);
});

test("decode is reverse of encode", () => {
  const token = new SearchToken(keywords.KEY, "test");
  const decoded = SearchToken.decode(token.encode());

  expect(decoded).not.toBeNull();
  expect(Object.is(token, decoded)).toBeFalsy(); // We created a new object
  expect(token.equals(decoded)).toBeTruthy();
});

test("decodes partial tokens", () => {
  const partial = new SearchToken(keywords.NOT);
  const decoded = SearchToken.decode(partial.encode());

  expect(decoded).not.toBeNull();
  if (decoded) {
    expect(decoded.isPartial()).toBeTruthy();
  }
  expect(partial.equals(decoded)).toBeTruthy();
});

test("decoding invalid token returns null", () => {
  const badEncodedToken = "DIE_";
  expect(SearchToken.decode(badEncodedToken)).toBeNull();
});
