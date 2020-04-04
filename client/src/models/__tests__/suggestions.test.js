// @flow
import * as R from "ramda";
import getSuggestions from "models/suggestions";

import type { Ingredient } from "models/ingredient";
import type { Recipe } from "models/recipe";

const dummyRecipe = (missingIngredients: Array<Ingredient>): Recipe => ({
  url: "fake",
  title: "fake recipe",
  ingredientsMatched: [],
  ingredientsNotMatched: missingIngredients,
  nutritionalInfo: {
    calories: 100,
    fat: 1,
    carbs: 1,
    protein: 0,
    sugar: 0
  },
  imageUrl: "fake image",
  nutritionScore: 15,
  ratingScore: 4.2,
  servingSize: 4
});

const ingredients: Array<Ingredient> = [
  "hot sauce",
  "potato",
  "leek",
  "onion",
  "pasta",
  "tomato sauce",
  "pepper"
];

const recipes: Array<Recipe> = [
  dummyRecipe(["hot sauce"]),
  dummyRecipe(["potato", "leek"]),
  dummyRecipe(["onion", "pasta", "potato", "tomato sauce", "pepper"])
];

test("all missing ingredients ranked", () => {
  const suggestions = getSuggestions(recipes);
  expect(suggestions.sort()).toStrictEqual(ingredients.sort());
});

// Two ingredients should rank highest in the suggestions,
// but these tests don't perscribe the order

test("ranks finishing recipes highly", () => {
  const suggestions = getSuggestions(recipes);
  expect(R.take(2, suggestions).includes("hot sauce")).toBeTruthy();
});

test("ranks multiple sightings highly", () => {
  const suggestions = getSuggestions(recipes);
  expect(R.take(2, suggestions).includes("potato")).toBeTruthy();
});
