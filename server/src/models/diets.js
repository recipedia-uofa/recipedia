// @flow
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

export default diets;
