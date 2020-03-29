// @flow
import type { Category } from "models/category";
import categories from "models/category";

const diets = {
  VEGETARIAN: "VEGETARIAN",
  VEGAN: "VEGAN",
  GLUTEN_FREE: "GLUTEN_FREE"
};

export type Diet = $Keys<typeof diets>;

export const isValidDiet = (str: string): boolean => {
  return str.toUpperCase() in diets;
};

export const toDiet = (str: string): Diet => {
  return diets[str.toUpperCase()].toLowerCase();
};

export const getBlacklistedCategories = (diet: Diet): Array<Category> => {
  switch (diet) {
    case diets.VEGETARIAN:
      return [categories.MEATS, categories.FISH];
    case diets.VEGAN:
      return [categories.MEATS, categories.FISH, categories.DAIRY];
    case diets.GLUTEN_FREE:
      return [categories.BAKING_AND_GRAINS];
    default:
      return [];
  }
};

export default diets;
