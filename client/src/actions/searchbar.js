// @flow
import * as R from "ramda";
import axios, { AxiosError } from "axios";

import {
  ADD_SEARCH_TOKEN,
  DELETE_SEARCH_TOKEN,
  CLEAR_SEARCH_TOKENS,
  INVALID_SEARCH_ENTRY,
  CHANGE_SEARCH_TEXT,
  RECIEVE_VALID_INGREDIENTS
} from "constants/actionTypes";

import keywords, { isValidKeyword, toKeyword } from "models/keywords";
import { isValidDiet } from "models/diets";
import SearchToken from "models/SearchToken";
import { executeSearch } from "actions/search";

import type {
  AddSearchToken,
  DeleteSearchToken,
  ClearSearchTokens,
  InvalidSearchEntry,
  ChangeSearchText,
  RecieveValidIngredients
} from "constants/actionTypes";

import type { Ingredient, IngredientMap } from "models/ingredient";
import type { GetState } from "types/states";

type AddSearchTokenAction = {
  type: AddSearchToken,
  token: SearchToken
};

type DeleteSearchTokenAction = {
  type: DeleteSearchToken,
  index: number
};

type ClearSearchTokensAction = {
  type: ClearSearchTokens
};

type InvalidSearchEntryAction = {
  type: InvalidSearchEntry,
  message: string
};

type ChangeSearchTextAction = {
  type: ChangeSearchText,
  text: string
};

type RecieveValidIngredientsAction = {
  type: RecieveValidIngredients,
  ingredients: Array<Ingredient>,
};

const invalidSearchToken = (message: string): InvalidSearchEntryAction => ({
  type: INVALID_SEARCH_ENTRY,
  message
});

const clearSearchError = (): InvalidSearchEntryAction => ({
  type: INVALID_SEARCH_ENTRY,
  message: ""
});

export const deleteSearchToken = (index: number): DeleteSearchTokenAction => ({
  type: DELETE_SEARCH_TOKEN,
  index
});

export const deleteLastSearchToken = () => {
  return (dispatch: *, getState: GetState) => {
    const numTokens = getState().searchbar.tokens.length;

    // Do nothing if there are no tokens
    if (numTokens === 0) {
      return;
    }

    dispatch(deleteSearchToken(numTokens - 1));
    dispatch(executeSearch());
  };
};

const INVALID_INGREDIENT_MESSAGE = "Entered an invalid ingredient";
const INVALID_DIET_MESSAGE = "Entered an invalid diet";
const INVALID_KEY_OR_INGREDIENT_MESSAGE = "Entered an invalid keyword or ingredient";

// Returns if the ingredient is valid, and the appropriate error message IF
// it is invalid
const isValidInput = (
  input: string,
  currentTokens: Array<SearchToken>,
  validIngredients: IngredientMap
): [boolean, string] => {
  const isValidIngredient = (i: string) => i in validIngredients;

  const isValidKeyOrIngredient: string => boolean = R.anyPass([
    isValidIngredient,
    isValidKeyword
  ]);

  if (currentTokens.length === 0) {
    return [isValidKeyOrIngredient(input), INVALID_KEY_OR_INGREDIENT_MESSAGE];
  }

  const lastToken = currentTokens[currentTokens.length - 1];
  if (lastToken.isPartial()) {
    if (lastToken.isDiet()) {
      return [isValidDiet(input), INVALID_DIET_MESSAGE];
    } else {
      return [isValidIngredient(input), INVALID_INGREDIENT_MESSAGE];
    }
  } else {
    return [isValidKeyOrIngredient(input), INVALID_KEY_OR_INGREDIENT_MESSAGE];
  }
};

const addSearchToken = (token: SearchToken): AddSearchTokenAction => ({
  type: ADD_SEARCH_TOKEN,
  token: token
});

export const tryAddSearchToken = (input: string) => {
  return (dispatch: *, getState: GetState) => {
    const state = getState();
    const { tokens, validIngredients } = state.searchbar;

    const [isValid, errorMessage] = isValidInput(input, tokens, validIngredients);
    if (!isValid) {
      dispatch(invalidSearchToken(errorMessage));
      return;
    }

    const hasLastToken = tokens.length > 0;
    if (!hasLastToken || !tokens[tokens.length - 1].isPartial()) {
      if (isValidKeyword(input)) {
        // create a partial token
        const newToken = new SearchToken(toKeyword(input));
        dispatch(addSearchToken(newToken));
        dispatch(clearSearchError());
        return;
      }

      // create an ingredient token
      const newToken = new SearchToken(keywords.NONE, input);
      dispatch(addSearchToken(newToken));
      dispatch(clearSearchError());
      dispatch(executeSearch());
      return;
    }

    // merge the token with the last keyword
    const lastToken = tokens[tokens.length - 1];
    const mergedToken = new SearchToken(lastToken.keyword, input);
    dispatch(deleteSearchToken(tokens.length - 1));
    dispatch(addSearchToken(mergedToken));
    dispatch(clearSearchError());
    dispatch(executeSearch());
  };
};

export const clearSearchTokens = (): ClearSearchTokensAction => ({
  type: CLEAR_SEARCH_TOKENS
});

export const changeSearchText = (text: string): ChangeSearchTextAction => ({
  type: CHANGE_SEARCH_TEXT,
  text
});

const receiveValidIngredients = (ingredients: Array<Ingredient>): RecieveValidIngredientsAction => ({
  type: RECIEVE_VALID_INGREDIENTS,
  ingredients,
});

type ValidIngredientReturn = {
  data: Array<Ingredient>,
};

export const loadValidIngredients = () => {
  return (dispatch: *, getState: GetState) => {
    if (!R.isEmpty(getState().searchbar.validIngredients)) {
      // We already have valid ingredients
      return;
    }

    axios.get("http://localhost:9000/ingredients")
      .then((res: ValidIngredientReturn) => dispatch(receiveValidIngredients(res.data)))
      .catch((err: AxiosError) => {
        console.error(err);
      });
  }
};

export type SearchBarActions =
  | AddSearchTokenAction
  | DeleteSearchTokenAction
  | ClearSearchTokensAction
  | InvalidSearchEntryAction
  | ChangeSearchTextAction
  | RecieveValidIngredientsAction;
