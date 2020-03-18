// @flow
import * as R from "ramda";
import axios, { AxiosError } from "axios";

import {
  ADD_SEARCH_TOKEN,
  DELETE_SEARCH_TOKEN,
  CLEAR_SEARCH_TOKENS,
  INVALID_SEARCH_ENTRY,
  CLEAR_SEARCH_ERROR,
  CHANGE_SEARCH_TEXT,
  RECIEVE_VALID_INGREDIENTS,
  CHANGE_AUTOCOMPLETE_SELECTION
} from "constants/actionTypes";

import keywords, { isValidKeyword, toKeyword } from "models/keywords";
import { inputTypes, isValidInput, isDuplicateInput } from "models/input";
import SearchToken from "models/SearchToken";
import { executeSearch } from "actions/search";

import type {
  AddSearchToken,
  DeleteSearchToken,
  ClearSearchTokens,
  InvalidSearchEntry,
  ClearSearchError,
  ChangeSearchText,
  RecieveValidIngredients,
  ChangeAutocompleteSelection
} from "constants/actionTypes";

import type { Ingredient } from "models/ingredient";
import type { GetState } from "types/states";

const ERROR_TIMEOUT_FADE = 3000;

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

type ClearSearchErrorAction = {
  type: ClearSearchError
};

type ChangeSearchTextAction = {
  type: ChangeSearchText,
  text: string
};

type RecieveValidIngredientsAction = {
  type: RecieveValidIngredients,
  ingredients: Array<Ingredient>
};

type ChangeAutocompleteSelectionAction = {
  type: ChangeAutocompleteSelection,
  index: number
};

const invalidSearchToken = (message: string): InvalidSearchEntryAction => ({
  type: INVALID_SEARCH_ENTRY,
  message
});

const clearSearchError = (): ClearSearchErrorAction => ({
  type: CLEAR_SEARCH_ERROR
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

export const deleteSpecificToken = (token: SearchToken) => {
  return(dispatch: *, getState: GetState) => {
    const tokens = getState().searchbar.tokens;

    const foundIndex = R.findIndex(t => t.equals(token))(tokens);
    
    if (foundIndex >= 0) {
      dispatch(deleteSearchToken(foundIndex));
      dispatch(executeSearch());
    }
  };
};

const addSearchToken = (token: SearchToken): AddSearchTokenAction => ({
  type: ADD_SEARCH_TOKEN,
  token: token
});

export const tryAddSearchToken = (input: string) => {
  return (dispatch: *, getState: GetState) => {
    const state = getState();
    const { tokens, validIngredientMap } = state.searchbar;

    const [isValid, errorMessage] = isValidInput(
      input,
      tokens,
      validIngredientMap
    );

    if (!isValid) {
      dispatch(invalidSearchToken(errorMessage));
      setTimeout(() => dispatch(clearSearchError()), ERROR_TIMEOUT_FADE);
      return;
    }

    const hasLastToken = tokens.length > 0;
    if (!hasLastToken || !tokens[tokens.length - 1].isPartial()) {
      if (isValidKeyword(input)) {
        // create a partial token
        const newToken = new SearchToken(toKeyword(input));
        dispatch(addSearchToken(newToken));
        return;
      }

      // create an ingredient token
      const newToken = new SearchToken(keywords.NONE, input);
      dispatch(addSearchToken(newToken));
      dispatch(executeSearch());
      return;
    }

    // merge the token with the last keyword
    const lastToken = tokens[tokens.length - 1];
    const mergedToken = new SearchToken(lastToken.keyword, input);
    dispatch(deleteSearchToken(tokens.length - 1));
    dispatch(addSearchToken(mergedToken));
    dispatch(executeSearch());
  };
};

export const completeSearchToken = () => {
  return (dispatch: *, getState: GetState) => {
    const {
      autocompleteItems,
      autocompleteSelection,
      tokens
    } = getState().searchbar;

    if (R.isEmpty(autocompleteItems)) {
      return;
    }

    const lastToken: ?SearchToken = R.isEmpty(tokens)
      ? null
      : tokens[tokens.length - 1];
    const selectedItem = autocompleteItems[autocompleteSelection];

    const [isDuplicate, errorMessage] = isDuplicateInput(
      selectedItem.value,
      tokens
    );

    if (isDuplicate) {
      dispatch(invalidSearchToken(errorMessage));
      setTimeout(() => dispatch(clearSearchError()), ERROR_TIMEOUT_FADE);
      return;
    }

    if (!lastToken || !lastToken.isPartial()) {
      let newToken: SearchToken;
      switch (selectedItem.type) {
        case inputTypes.KEYWORD:
          newToken = new SearchToken(toKeyword(selectedItem.value));
          dispatch(addSearchToken(newToken));
          return;
        case inputTypes.DIET:
          throw new Error("Cannot add diet without preceeding DIET keywords");
        case inputTypes.INGREDIENT:
          newToken = new SearchToken(keywords.NONE, selectedItem.value);
          dispatch(addSearchToken(newToken));
          dispatch(executeSearch());
          return;
        default:
          throw new Error("Unhandled input type");
      }
    }

    // merge the token
    const mergedToken = new SearchToken(lastToken.keyword, selectedItem.value);
    dispatch(deleteSearchToken(tokens.length - 1));
    dispatch(addSearchToken(mergedToken));
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

const receiveValidIngredients = (
  ingredients: Array<Ingredient>
): RecieveValidIngredientsAction => ({
  type: RECIEVE_VALID_INGREDIENTS,
  ingredients
});

type ValidIngredientReturn = {
  data: Array<Ingredient>
};

export const loadValidIngredients = () => {
  return (dispatch: *, getState: GetState) => {
    if (!R.isEmpty(getState().searchbar.validIngredientInputs)) {
      // We already have valid ingredients
      return;
    }

    axios
      .get("http://localhost:9000/ingredients")
      .then((res: ValidIngredientReturn) =>
        dispatch(receiveValidIngredients(res.data))
      )
      .catch((err: AxiosError) => {
        console.error(err);
      });
  };
};

const changeAutocompleteSelection = (
  index: number
): ChangeAutocompleteSelectionAction => ({
  type: CHANGE_AUTOCOMPLETE_SELECTION,
  index
});

export const incrementAutocompleteSelection = () => {
  return (dispatch: *, getState: GetState) => {
    const { autocompleteItems, autocompleteSelection } = getState().searchbar;

    const acItemsLength = autocompleteItems.length;
    const newSelection = Math.min(autocompleteSelection + 1, acItemsLength - 1);
    dispatch(changeAutocompleteSelection(newSelection));
  };
};

export const decrementAutocompleteSelection = () => {
  return (dispatch: *, getState: GetState) => {
    const { autocompleteSelection } = getState().searchbar;
    const newSelection = Math.max(autocompleteSelection - 1, 0);
    dispatch(changeAutocompleteSelection(newSelection));
  };
};

export type SearchBarActions =
  | AddSearchTokenAction
  | DeleteSearchTokenAction
  | ClearSearchTokensAction
  | InvalidSearchEntryAction
  | ClearSearchErrorAction
  | ChangeSearchTextAction
  | RecieveValidIngredientsAction
  | ChangeAutocompleteSelectionAction;
