// @flow
import resultsReducer from "reducers/resultsReducer";
import { internal as searchActionsInternal } from "actions/search";

import type { ResultsState } from "types/states";
import type { Recipe } from "models/recipe";

const { requestSearch, receiveSearch, invalidSearch } = searchActionsInternal;

const initialState: ResultsState = {
  recipes: [],
  suggestions: [],
  isPending: false,
  visible: false
};

const dummyRecipe = (): Recipe => ({
  url: "fake",
  title: "fake recipe",
  ingredientsMatched: ["potato"],
  ingredientsNotMatched: ["butter"],
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

test("goes to pending state on request", () => {
  const afterRequestState = resultsReducer(initialState, requestSearch());
  expect(afterRequestState.isPending).toBe(true);
});

test("recieves recipes", () => {
  const recipeResult = [dummyRecipe(), dummyRecipe()];

  const currentState: ResultsState = {
    recipes: [],
    suggestions: [],
    isPending: true,
    visible: false
  };

  const afterResultsState = resultsReducer(
    initialState,
    receiveSearch(recipeResult)
  );
  expect(afterResultsState.recipes.length).toBe(2);
  expect(afterResultsState.suggestions.length).toBeGreaterThan(0);
  expect(afterResultsState.isPending).toBe(false);
  expect(afterResultsState.visible).toBe(true);
});

test("recieves invalid search", () => {
  const currentState: ResultsState = {
    recipes: [dummyRecipe()],
    suggestions: [],
    isPending: true,
    visible: true
  };

  const afterInvalidState = resultsReducer(currentState, invalidSearch());
  expect(afterInvalidState.recipes.length).toBe(0);
  expect(afterInvalidState.visible).toBe(false);
});
