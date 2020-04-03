// @flow
import { constantCase } from "constant-case";

const diets = {
  VEGETARIAN: "vegetarian",
  VEGAN: "vegan",
  GLUTEN_FREE: "gluten free"
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

export default diets;
