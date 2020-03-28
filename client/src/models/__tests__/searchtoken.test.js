// @flow
import SearchToken from "models/SearchToken";
import keywords from "models/keywords";

test("ingredient token", () => {
  const token = new SearchToken(keywords.NONE, "test");
  expect(token.isIngredient()).toBeTruthy();
  expect(token.isSimpleIngredient()).toBeTruthy();
  expect(token.isPartial()).toBeFalsy();
  expect(token.hasKeyword()).toBeFalsy();
});

test("full token", () => {
  const token = new SearchToken(keywords.KEY, "test");
  expect(token.isIngredient()).toBeTruthy();
  expect(token.isSimpleIngredient()).toBeFalsy();
  expect(token.isPartial()).toBeFalsy();
  expect(token.hasKeyword()).toBeTruthy();
});

test("partial token", () => {
  const token = new SearchToken(keywords.KEY);
  expect(token.isPartial()).toBeTruthy();
  expect(token.hasKeyword()).toBeTruthy();
  expect(token.isIngredient()).toBeFalsy();
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

  expect(Object.is(token, decoded)).toBeFalsy(); // We created a new object
  expect(token.equals(decoded)).toBeTruthy();
});
