// @flow
import * as R from "ramda";
import diets, { allDiets, getBlacklistedCategories } from "models/diets";

import type { Diet } from "models/diets";

test("each diet maps to blacklisted categories", () => {
  allDiets.map((d: Diet) => {
    const blackCategories = getBlacklistedCategories([d]);
    expect(blackCategories.length).toBeGreaterThan(0);
    expect(typeof blackCategories[0]).toBe("string");
  });
});

const isUnique = (arr: Array<any>): boolean => {
  return R.equals(arr, R.uniq(arr));
};

test("diet blacklists do not contain duplicates", () => {
  const overlappingDiets = [diets.VEGAN, diets.VEGETARIAN];
  const blackCategories = getBlacklistedCategories(overlappingDiets);
  expect(blackCategories).toStrictEqual(R.uniq(blackCategories));
});
