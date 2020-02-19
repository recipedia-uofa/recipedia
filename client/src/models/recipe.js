// @flow
import type { Ingredient } from 'types/ingredient';

type NutritionalInfo = {
    calories: number,
    carbs: number, // in grams
};

export type Recipe = {
    url: string, // unique
    name: string,
    ingredients: Array<Ingredient>,
    nutritionalInfo: NutritionalInfo,
    imageUrl: string,
    rating: number,
    cookTime: number, // in mins
};
