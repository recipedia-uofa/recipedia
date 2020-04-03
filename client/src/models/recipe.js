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
  ratingScore: number,
  servingSize: number // in people
};
