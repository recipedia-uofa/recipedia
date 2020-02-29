// @flow
import type { Ingredient } from "models/ingredient";

type NutritionalInfo = {
  calories: number,
  fat: number, // in grams
  carbs: number, // in grams
  protein: number, // in grams
  sugar: number // in grams
};

export type Recipe = {
  url: string, // unique
  title: string,
  ingredientsMatched: Array<Ingredient>,
  ingredientsNotMatched: Array<Ingredient>,
  nutritionalInfo: NutritionalInfo,
  imageUrl: string,
  nutritionScore: number,
  servingSize: number // in people
};

/*
-----------RECIPE CARD OBJECT DATA-----------
The following is a rough guess as to how the format of the 'recipe' object data
is represented. (Used JSON-like syntax for high-level purposes. NOT ACTUAL IMPLEMENTATION)
{
  "RecipeTitle" : String,
  "RecipeURL" : String,
  "RecipeSourceLogoImg" : Image(uri),
  "RecipeImg" : Image(uri),
  "IngredientsMatched" : List<String>,
  "IngredientsNotMatched" : List<String>,
  "RecipeNutritionScore" : Float(will be percentage),
  "NutritionFacts" : {
      "Calories" : Int | String,
      "Fat" : Int | String,
      "Carbs" : Int | String,
      "Protein" : Int | String,
      "Sugar" : Int | String,
      "ServingSize" : Int | String,
    }
  }
 */
