// @flow
import * as R from "ramda";

import type { Ingredient } from "models/ingredient";
import type { Recipe } from "models/recipe";

const MAX_SUGGESTIONS = 10;

type IngredientScores = {
  [key: Ingredient]: number
};

const extractSortedSuggestions: IngredientScores => Array<Ingredient> = R.pipe(
  R.toPairs, // returns list of [ingredient, score] pairs
  R.sort(R.descend(R.nth(1))),
  R.map(R.nth(0)),
  R.take(MAX_SUGGESTIONS)
);

const getSuggestions = (recipes: Array<Recipe>): Array<Ingredient> => {
  // Find the ingredients that are most missing from the recipes

  const ingredientScores: IngredientScores = {};

  for (const r of recipes) {
    const numMissing = r.ingredientsNotMatched.length;
    for (const i of r.ingredientsNotMatched) {
      const iScore = 1.0 / numMissing;
      if (i in ingredientScores) {
        ingredientScores[i] += iScore;
      } else {
        ingredientScores[i] = iScore;
      }
    }
  }

  return extractSortedSuggestions(ingredientScores);
};

export default getSuggestions;
