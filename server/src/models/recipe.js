// @flow
import type { Ingredient } from "models/ingredient";

type NutritionalInfo = {
  calories: number, // in kcal
  fat: number, // in grams
  carbs: number, // in grams
  protein: number, // in grams
  sugar: number // in grams
};

export type Recipe = {
  url: string, // unique
  title: string,
  rating: number, // 1-5
  ratingScore: number,
  ingredientsMatched: Array<Ingredient>,
  ingredientsNotMatched: Array<Ingredient>,
  nutritionalInfo: NutritionalInfo,
  imageUrl: string,
  nutritionScore: number,
  servingSize: number // in people
};
