// @flow
import * as R from "ramda";
import query from "./query";
import SearchToken from "models/SearchToken";
import keywords from "models/keywords";
import { varArray } from "./dgraph-utils";

import type { Ingredient } from "models/ingredient";
import type { Recipe } from "models/recipe";

type MatchQueryOpts = {
  limit: number
};

// Assumes there exists a variable "tokens" with the ingredients to match
const recipeElements = `
  url
  title
  img_url
  rating
  calories
  total_fat
  total_carbohydrates
  protein
  cholesterol
  sodium
  sugars
  servings
  matched_ingredients: contains @filter(uid(tokens)) {
    iname
  }
  contains {
    iname
  }
`;

export const matchQueryWithKeyIngredients = (
  allIngredients: Array<string>,
  keyIngredients: Array<string>,
  opts: MatchQueryOpts
): string => {
  return `
  {
    key_tokens as var(func: eq(iname, ${varArray(keyIngredients)}))
    tokens as var(func: eq(iname, ${varArray(allIngredients)}))

    var(func: uid(key_tokens)) {
      matchedRecipes as ~contains {
        keyMatched as count(contains @filter(uid(key_tokens)))
        numMatched as count(all_matched : contains @filter(uid(tokens)))
      }
    }

    matchedRecipes(func: uid(matchedRecipes), orderdesc: val(numMatched), first: ${
      opts.limit
    }) @filter(eq(val(keyMatched), ${keyIngredients.length})) {
      ${recipeElements}
    }
  }`;
};

export const matchQueryBasic = (
  allIngredients: Array<string>,
  opts: MatchQueryOpts
): string => {
  return `
  {
    tokens as var(func: eq(iname, ${varArray(allIngredients)}))

    var(func: uid(tokens)) {
      matchedRecipes as ~contains {
        numMatched as count(contains @filter(uid(tokens)))
      }
    }

    matchedRecipes(func: uid(matchedRecipes), orderdesc: val(numMatched), first: ${
      opts.limit
    }) {
      ${recipeElements}
    }
  }`;
};

const getTokenValue = (token: SearchToken): string => token.value || "";
const getAllIngredients: (Array<SearchToken>) => Array<string> = R.pipe(
  R.filter(token => token.isIngredient()),
  R.map(getTokenValue)
);
const getKeyIngredients: (Array<SearchToken>) => Array<string> = R.pipe(
  R.filter(token => token.isKeyIngredient()),
  R.map(getTokenValue)
);

const matchQuery = (
  tokens: Array<SearchToken>,
  opts: MatchQueryOpts = { limit: 50 }
): string => {
  const allIngredients = getAllIngredients(tokens);
  const keyIngredients = getKeyIngredients(tokens);

  if (R.isEmpty(keyIngredients)) {
    return matchQueryBasic(allIngredients, opts);
  }

  return matchQueryWithKeyIngredients(allIngredients, keyIngredients, opts);
};

type IngredientResult = {
  iname: string
};

type MatchedRecipeResult = {
  url: string,
  title: string,
  img_url: string,
  rating: number,
  calories: number,
  total_fat: number,
  total_carbohydrates: number,
  protein: number,
  cholesterol: number,
  sodium: number,
  sugars: number,
  servings: number,
  matched_ingredients: Array<IngredientResult>,
  contains: Array<IngredientResult>
};

type QueryResult = {
  matchedRecipes: Array<MatchedRecipeResult>
};

const resultToIngredient: IngredientResult => Ingredient = i => i.iname;
const resultToIngredientArray = R.map(resultToIngredient);

const resultToRecipe = (result: MatchedRecipeResult): Recipe => {
  const ingredientsMatched = resultToIngredientArray(
    result.matched_ingredients
  );
  const recipeIngredients = resultToIngredientArray(result.contains);
  return {
    url: result.url,
    title: result.title,
    rating: result.rating,
    ingredientsMatched,
    ingredientsNotMatched: R.difference(recipeIngredients, ingredientsMatched),
    nutritionalInfo: {
      calories: result.calories,
      fat: result.total_fat,
      carbs: result.total_carbohydrates,
      protein: result.protein,
      sugar: result.sugars
    },
    imageUrl: result.img_url,
    nutritionScore: 15,
    servingSize: result.servings
  };
};

const extractFullRecipes: QueryResult => Array<Recipe> = R.pipe(
  R.prop("matchedRecipes"),
  R.map(resultToRecipe)
);

const matchRecipes = async (
  tokens: Array<SearchToken>
): Promise<Array<Recipe>> => {
  const res = await query(matchQuery(tokens));
  return extractFullRecipes(res);
};

export default matchRecipes;
