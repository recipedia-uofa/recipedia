// @flow
import * as R from "ramda";
import query from "./query";
import SearchToken from "models/SearchToken";
import keywords from "models/keywords";
import { getBlacklistedCategories } from "models/diets";
import { varArray, clauseArray, camelToSnake } from "./dgraph-utils";

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
  nutrition_score
  matched_ingredients: contains @filter(uid(tokens)) {
    iname
  }
  contains {
    iname
  }
`;

const allTokenClause = (allIngredients: Array<string>): string =>
  `tokens as var(func: eq(iname, ${varArray(allIngredients)}))`;

const keyTokenClause = (keyIngredients: Array<string>): string =>
  `keyTokens as var(func: eq(iname, ${varArray(keyIngredients)}))`;

const blackTokenClause = (blacklists: Array<string>): string =>
  `blackTokens as var(func: eq(iname, ${varArray(blacklists)}))`;

const dietRestrictionClause = (dietRestrictions: Array<string>): string => `
  var(func: eq(cname, ${varArray(dietRestrictions)})) {
    dietRestrictions as ~categorized_as
  }`;

type QueryParams = {
  hasKeyIngredients: boolean,
  hasBlacklists: boolean,
  hasDietRestrictions: boolean,
  numKeyIngredients: number
};

// countVar as count(count_var : contains @filter(uid(tokens)))
const countClause = (countVar: string, tokensVar: string): string =>
  `${countVar} as count(${camelToSnake(
    countVar
  )} : contains @filter(uid(${tokensVar})))`;

const matchedRecipesClause = (params: QueryParams): string => {
  const seedTokens = params.hasKeyIngredients ? "keyTokens" : "tokens";

  const hasBlackClause = params.hasBlacklists || params.hasDietRestrictions;
  const blackVars = [
    params.hasBlacklists && "blackTokens",
    params.hasDietRestrictions && "dietRestrictions"
  ].filter(R.identity).join(',');

  return `
    var(func: uid(${seedTokens})) {
      matchedRecipes as ~contains {
        ${clauseArray([
          params.hasKeyIngredients && countClause("keyMatched", "keyTokens"),
          hasBlackClause && countClause("blackMatched", blackVars),
          countClause("numMatched", "tokens")
        ])}
      }
    }
  `;
};

const filterResultClause = (params: QueryParams) => {
  const hasBlacklists = params.hasBlacklists || params.hasDietRestrictions;
  if (!params.hasKeyIngredients && !hasBlacklists) {
    return "";
  }

  const keyFilter = params.hasKeyIngredients
    ? `eq(val(keyMatched), ${params.numKeyIngredients})`
    : null;

  const blackFilter = hasBlacklists ? "eq(val(blackMatched), 0)" : null;

  return `@filter(${[keyFilter, blackFilter]
    .filter(c => !R.isNil(c))
    .join(" AND ")})`;
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
const getBlacklists: (Array<SearchToken>) => Array<string> = R.pipe(
  R.filter(token => token.isBlacklist()),
  R.map(getTokenValue)
);

const getDietRestrictions: (Array<SearchToken>) => Array<string> = R.pipe(
  R.filter(token => token.isDiet()),
  R.map(getTokenValue),
  getBlacklistedCategories
);

export const matchQuery = (
  tokens: Array<SearchToken>,
  opts: MatchQueryOpts = { limit: 50 }
): string => {
  const allIngredients = getAllIngredients(tokens);
  const keyIngredients = getKeyIngredients(tokens);
  const blacklists = getBlacklists(tokens);
  const dietRestrictions = getDietRestrictions(tokens);

  const params = {
    hasKeyIngredients: !R.isEmpty(keyIngredients),
    hasBlacklists: !R.isEmpty(blacklists),
    hasDietRestrictions: !R.isEmpty(dietRestrictions),
    numKeyIngredients: keyIngredients.length
  };

  return `
  {
    ${clauseArray([
      allTokenClause(allIngredients),
      params.hasKeyIngredients && keyTokenClause(keyIngredients),
      params.hasBlacklists && blackTokenClause(blacklists),
      params.hasDietRestrictions && dietRestrictionClause(dietRestrictions)
    ])}

    ${matchedRecipesClause(params)}

    matchedRecipes(func: uid(matchedRecipes), orderdesc: val(numMatched), first: ${
      opts.limit
    }) ${filterResultClause(params)} {
      ${recipeElements}
    }
  }`;
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
  nutrition_score: number,
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
    nutritionScore: Math.round(result.nutrition_score),
    servingSize: result.servings
  };
};

const extractFullRecipes: QueryResult => Array<Recipe> = R.pipe(
  R.prop("matchedRecipes"),
  R.map(resultToRecipe)
);

const noRecipesToMatch = (tokens: Array<SearchToken>): boolean => {
  const allIngredientTokens = R.filter(token => token.isIngredient());
  return R.isEmpty(allIngredientTokens);
}

const matchRecipes = async (
  tokens: Array<SearchToken>
): Promise<Array<Recipe>> => {
  if (noRecipesToMatch(tokens)) {
    return [];
  }

  const res = await query(matchQuery(tokens));
  return extractFullRecipes(res);
};

export default matchRecipes;
