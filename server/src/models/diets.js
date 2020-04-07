// @flow
import * as R from "ramda";
import { constantCase } from "constant-case";
import categories, { toCategory } from "models/category";

import type { Category } from "models/category";

const diets = {
  VEGETARIAN: "vegetarian",
  VEGAN: "vegan",
  GLUTEN_FREE: "gluten free",
  LACTOSE_FREE: "lactose free",
  PESCATARIAN: "pescatarian"
};

export type Diet = $Values<typeof diets>;

// $FlowFixMe
export const allDiets: Array<Diet> = Object.values(diets);

export const isValidDiet = (str: ?string): boolean => {
  return !!str && constantCase(str) in diets;
};

export const toDiet = (str: string): Diet => {
  return diets[constantCase(str)].toLowerCase();
};

const getDietBlacklists = (diet: Diet): Array<Category> => {
  switch (diet) {
    case diets.VEGETARIAN:
      return [categories.MEATS, categories.FISH, categories.SEAFOOD];
    case diets.VEGAN:
      return [
        categories.MEATS,
        categories.FISH,
        categories.SEAFOOD,
        categories.DAIRY
      ];
    case diets.GLUTEN_FREE:
      return [categories.BAKING_AND_GRAINS];
    case diets.LACTOSE_FREE:
      return [categories.DAIRY];
    case diets.PESCATARIAN:
      return [categories.MEATS];
    default:
      return [];
  }
};

export const getBlacklistedCategories: (
  Array<Diet>
) => Array<Category> = R.pipe(
  R.map(getDietBlacklists),
  R.flatten,
  R.uniq,
  R.map(toCategory)
);

export default diets;
