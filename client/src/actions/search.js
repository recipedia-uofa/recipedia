// @flow
import axios, { AxiosError } from "axios";
import {
  EXECUTE_SEARCH,
  RECEIVE_SEARCH,
  INVALID_SEARCH
} from "constants/actionTypes";
import SearchToken from "models/SearchToken";

import type { GetState } from "types/states";
import type {
  ExecuteSearch,
  ReceiveSearch,
  InvalidSearch
} from "constants/actionTypes";
import type { Recipe } from "models/recipe";

type ExecuteSearchAction = { type: ExecuteSearch };

type ReceiveSearchAction = {
  type: ReceiveSearch,
  recipes: Array<Recipe>
};

type InvalidSearchAction = { type: InvalidSearch };

const requestSearch = (): ExecuteSearchAction => ({
  type: EXECUTE_SEARCH
});

const receiveSearch = (recipes: Array<Recipe>): ReceiveSearchAction => ({
  type: RECEIVE_SEARCH,
  recipes
});

const invalidSearch = (): InvalidSearchAction => ({
  type: INVALID_SEARCH
});

type RecipeReturn = {
  data: Array<Recipe>
};

const recipeRequestBase = "http://localhost:9000/recipes";

const tokenToRequestArg = (token: SearchToken): string => `q=${token.encode()}`;

const buildRecipeRequest = (tokens: Array<SearchToken>): string => {
  return `${recipeRequestBase}/?${tokens.map(tokenToRequestArg).join("&")}`;
};

export const executeSearch = () => {
  // (dispatch, getState) =>
  return (dispatch: *, getState: GetState) => {
    const tokens = getState().searchbar.tokens;
    const requestUrl = buildRecipeRequest(tokens);

    dispatch(requestSearch());
    return axios
      .get(requestUrl)
      .then((res: RecipeReturn) => dispatch(receiveSearch(res.data)))
      .catch((err: AxiosError) => {
        console.error(err);
        dispatch(invalidSearch());
      });
  };
};

export type SearchActions =
  | ExecuteSearchAction
  | ReceiveSearchAction
  | InvalidSearchAction;
