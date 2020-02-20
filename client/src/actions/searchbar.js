// @flow
import * as R from "ramda";

import {
  ADD_SEARCH_TOKEN,
  REMOVE_SEARCH_TOKEN,
  CLEAR_SEARCH_TOKENS,
  INVALID_SEARCH_ENTRY,
  CHANGE_SEARCH_TEXT
} from "constants/actionTypes";

import keywords, { isValidKeyword, toKeyword } from "models/keywords";
import { isValidDiet } from "models/diets";
import SearchToken from "models/SearchToken";

import type {
  AddSearchToken,
  RemoveSearchToken,
  ClearSearchTokens,
  InvalidSearchEntry,
  ChangeSearchText
} from "constants/actionTypes";

import type { GetState } from "types/states";

type AddSearchTokenAction = {
  type: AddSearchToken,
  token: SearchToken
};

type RemoveSearchTokenAction = {
  type: RemoveSearchToken,
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

const invalidSearchToken = (message: string): InvalidSearchEntryAction => ({
  type: INVALID_SEARCH_ENTRY,
  message
});

const isValidIngredient = (input: string): boolean => {
  return true;
};

const isValidAny: string => boolean = R.anyPass([
  isValidIngredient,
  isValidDiet,
  isValidKeyword
]);

const isValidInput = (
  input: string,
  currentTokens: Array<SearchToken>
): boolean => {
  if (currentTokens.length === 0) {
    return isValidAny(input);
  }

  const lastToken = currentTokens[currentTokens.length - 1];
  if (lastToken.isPartial()) {
    if (lastToken.isDiet()) {
      return isValidDiet(input);
    } else {
      return isValidIngredient(input);
    }
  } else {
    return isValidAny(input);
  }
};

const addSearchToken = (token: SearchToken): AddSearchTokenAction => ({
  type: ADD_SEARCH_TOKEN,
  token: token
});

export const tryAddSearchToken = (input: string) => {
  return (dispatch: *, getState: GetState) => {
    const tokens: Array<SearchToken> = getState().searchbar.tokens;

    if (!isValidInput(input, tokens)) {
      dispatch(invalidSearchToken("Your input is not valid"));
      return;
    }

    const hasLastToken = tokens.length > 0;
    if (!hasLastToken || !tokens[tokens.length - 1].isPartial()) {
      let newToken: SearchToken;
      if (isValidKeyword(input)) {
        // create a partial token
        newToken = new SearchToken(toKeyword(input));
      } else {
        // create an ingredient token
        newToken = new SearchToken(keywords.NONE, input);
      }

      dispatch(addSearchToken(newToken));
      return;
    }

    // merge the token with the last keyword
    const lastToken = tokens[tokens.length - 1];
    const mergedToken = new SearchToken(lastToken.keyword, input);
    dispatch(removeSearchToken(tokens.length - 1));
    dispatch(addSearchToken(mergedToken));
  };
};

export const removeSearchToken = (index: number): RemoveSearchTokenAction => ({
  type: REMOVE_SEARCH_TOKEN,
  index
});

export const clearSearchTokens = (): ClearSearchTokensAction => ({
  type: CLEAR_SEARCH_TOKENS
});

export const changeSearchText = (text: string): ChangeSearchTextAction => ({
  type: CHANGE_SEARCH_TEXT,
  text
});

export type SearchBarActions =
  | AddSearchTokenAction
  | RemoveSearchTokenAction
  | ClearSearchTokensAction
  | InvalidSearchEntryAction
  | ChangeSearchTextAction;
