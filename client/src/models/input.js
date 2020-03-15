// @flow
import * as R from "ramda";
import { isValidKeyword } from "models/keywords";
import { isValidDiet } from "models/diets";
import SearchToken from "models/SearchToken";

import type { Ingredient, IngredientMap } from "models/ingredient";
import type { Diet } from "models/diets";
import type { Keyword } from "models/keywords";

export const inputTypes = {
  KEYWORD: "KEYWORD",
  INGREDIENT: "INGREDIENT",
  DIET: "DIET"
};

export type InputType = $Keys<typeof inputTypes>;

export type Input = {
  type: InputType,
  value: Keyword | Ingredient | Diet
};

export const validInputTypes = (
  currentTokens: Array<SearchToken>
): Array<InputType> => {
  if (R.isEmpty(currentTokens)) {
    return [inputTypes.KEYWORD, inputTypes.INGREDIENT];
  }

  const lastToken = currentTokens[currentTokens.length - 1];
  if (lastToken.isPartial()) {
    if (lastToken.isDiet()) {
      return [inputTypes.DIET];
    } else {
      return [inputTypes.INGREDIENT];
    }
  } else {
    return [inputTypes.KEYWORD, inputTypes.INGREDIENT];
  }
};

const INVALID_INGREDIENT_MESSAGE = "Entered an invalid ingredient";
const INVALID_DIET_MESSAGE = "Entered an invalid diet";
const INVALID_KEY_OR_INGREDIENT_MESSAGE =
  "Entered an invalid keyword or ingredient";

// Returns if the ingredient is valid, and the appropriate error message IF
// it is invalid
// NOTE: Is it possible to store the tokens in a dictionary for faster speed up?
export const isValidInput = (
  input: string,
  currentTokens: Array<SearchToken>,
  validIngredients: IngredientMap
): [boolean, string] => {

  const isValidIngredient = (i: string) => i in validIngredients;

  const isValidKeyOrIngredient: string => boolean = R.anyPass([
    isValidIngredient,
    isValidKeyword
  ]);

  if (R.isEmpty(currentTokens)) {
    return [isValidKeyOrIngredient(input), INVALID_KEY_OR_INGREDIENT_MESSAGE];
  }

  const lastToken = currentTokens[currentTokens.length - 1];

  if (lastToken.isPartial()) {
    if (lastToken.isDiet()) {
      return [isValidDiet(input), INVALID_DIET_MESSAGE];
    } else {
      return [isValidIngredient(input), INVALID_INGREDIENT_MESSAGE];
    }
  } else {
    return [isValidKeyOrIngredient(input), INVALID_KEY_OR_INGREDIENT_MESSAGE];
  }
};

export const isDuplicateInput = (
  input: string,
  currentTokens: Array<SearchToken>
): [boolean, string] => {

  const isNotDuplicateValue = (tokens: Array<SearchToken>, value: string) => R.isEmpty(
    R.filter(t => (t.value != null) && (t.value.toUpperCase() == value.toUpperCase()), tokens)
  );

  return [!isNotDuplicateValue(currentTokens, input), `Ingredient '${input.toUpperCase()}' already entered`];
};