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

const matchQuery = (
  ingredients: Array<string>,
  opts: MatchQueryOpts = { limit: 50 }
) => {
  return `
  {
    tokens as var(func: eq(xid, ${varArray(ingredients)}))

    var(func: uid(tokens)) {
      matchedRecipes as ~contains {
        numMatched as count(contains @filter(uid(tokens)))
      }
    }

    matchedRecipes(func: uid(matchedRecipes), orderdesc: val(numMatched), first: ${
      opts.limit
    }) {
      xid
      name
      rating
      matchedIngredients: contains @filter(uid(tokens)) {
        xid
      }
      contains {
        xid
      }
    }
  }`;
};

type IngredientResult = {
  xid: string
};

type MatchedRecipeResult = {
  xid: string,
  name: string,
  rating: number,
  matchedIngredients: Array<IngredientResult>,
  contains: Array<IngredientResult>
};

type QueryResult = {
  matchedRecipes: Array<MatchedRecipeResult>
};

const resultToIngredient: IngredientResult => Ingredient = i => i.xid;
const resultToIngredientArray = R.map(resultToIngredient);

const resultToRecipe = (result: MatchedRecipeResult): Recipe => {
  const ingredientsMatched = resultToIngredientArray(result.matchedIngredients);
  const recipeIngredients = resultToIngredientArray(result.contains);
  return {
    url: result.xid,
    title: result.name,
    rating: result.rating,
    ingredientsMatched,
    ingredientsNotMatched: R.difference(recipeIngredients, ingredientsMatched),
    nutritionalInfo: {
      calories: 300,
      fat: 10,
      carbs: 30,
      protein: 11,
      sugar: 7
    },
    imageUrl: "fake",
    nutritionScore: 15,
    servingSize: 4
  };
};

const extractFullRecipes: QueryResult => Array<Recipe> = R.pipe(
  R.prop("matchedRecipes"),
  R.map(resultToRecipe)
);

const matchRecipes = async (
  tokens: Array<SearchToken>
): Promise<Array<Recipe>> => {
  const ingredientTokens = tokens.filter(token => !token.hasKeyword());
  const ingredients = ingredientTokens.map(token => token.value || "");
  const res = await query(matchQuery(ingredients));
  return extractFullRecipes(res);
};

export default matchRecipes;
