// @flow
import * as R from "ramda";
import {
  ADD_SEARCH_TOKEN,
  DELETE_SEARCH_TOKEN,
  INVALID_SEARCH_ENTRY,
  CLEAR_SEARCH_ERROR,
  CHANGE_SEARCH_TEXT,
  RECIEVE_VALID_INGREDIENTS,
  CHANGE_AUTOCOMPLETE_SELECTION,
  LOAD_FROM_URL
} from "constants/actionTypes";
import { allDiets } from "models/diets";
import { inputTypes, validInputTypes } from "models/input";
import keywords, { allKeywords } from "models/keywords";
import autocompleteSearch from "models/autocomplete";
import SearchToken from "models/SearchToken";

import type { Action } from "actions";
import type { SearchbarState } from "types/states";
import type { Diet } from "models/diets";
import type { Ingredient, IngredientMap } from "models/ingredient";
import type { Input } from "models/input";
import type { Keyword } from "models/keywords";

const MAX_AUTOCOMPLETE_ITEMS = 7;

const ingredientToInput = (i: Ingredient): Input => ({
  type: inputTypes.INGREDIENT,
  value: i
});
const ingredientsToInputs = R.map(ingredientToInput);

const dietToInput = (d: Diet): Input => ({
  type: inputTypes.DIET,
  value: d.toLowerCase()
});
const dietInputs = R.map(dietToInput, allDiets);

const keywordToInput = (k: Keyword): Input => ({
  type: inputTypes.KEYWORD,
  value: k.toLowerCase()
});
const keywordInputs = R.map(
  keywordToInput,
  allKeywords.filter(k => k !== keywords.NONE)
);

const searchOptions = {
  key: "value"
};

const computeAutocompleteItems = (
  searchText: string,
  tokens: Array<SearchToken>,
  validIngredientInputs: Array<Input>
): Array<Input> => {
  const validTypes = validInputTypes(tokens);

  if (searchText === "") {
    console.log(validTypes.includes(inputTypes.DIET));
    return validTypes.includes(inputTypes.DIET)
      ? R.take(MAX_AUTOCOMPLETE_ITEMS, dietInputs)
      : [];
  }

  const validItems = [
    ...(validTypes.includes(inputTypes.KEYWORD) ? keywordInputs : []),
    ...(validTypes.includes(inputTypes.INGREDIENT)
      ? validIngredientInputs
      : []),
    ...(validTypes.includes(inputTypes.DIET) ? dietInputs : [])
  ];

  const items = autocompleteSearch(searchText, validItems, searchOptions);
  return R.take(MAX_AUTOCOMPLETE_ITEMS, items);
};

const filterForValidTokens = (
  tokens: Array<SearchToken>,
  validIngredients: IngredientMap
): Array<SearchToken> => {
  if (R.isEmpty(validIngredients)) {
    return tokens;
  }
  return R.filter(
    (t: SearchToken) => t.isValid(validIngredients) && !t.isPartial(),
    tokens
  );
};

const initialState: SearchbarState = {
  text: "",
  tokens: [],
  error: "",
  showError: false,
  validIngredientInputs: [],
  validIngredientMap: {},
  autocompleteItems: [],
  autocompleteSelection: 0
};

export default (
  state: SearchbarState = initialState,
  action: Action
): SearchbarState => {
  switch (action.type) {
    case ADD_SEARCH_TOKEN:
      const newTokens = [...state.tokens, action.token];
      return {
        ...state,
        text: "",
        tokens: newTokens,
        autocompleteItems: computeAutocompleteItems(
          "",
          newTokens,
          state.validIngredientInputs
        ),
        autocompleteSelection: 0
      };
    case DELETE_SEARCH_TOKEN:
      const tokensAfterDelete = [
        ...state.tokens.slice(0, action.index),
        ...state.tokens.slice(action.index + 1)
      ];
      return {
        ...state,
        tokens: tokensAfterDelete,
        autocompleteItems: computeAutocompleteItems(
          state.text,
          tokensAfterDelete,
          state.validIngredientInputs
        ),
      };
    case INVALID_SEARCH_ENTRY:
      return {
        ...state,
        error: action.message,
        showError: true
      };
    case CLEAR_SEARCH_ERROR:
      return {
        ...state,
        showError: false
      };
    case CHANGE_SEARCH_TEXT:
      return {
        ...state,
        text: action.text,
        autocompleteItems: computeAutocompleteItems(
          action.text,
          state.tokens,
          state.validIngredientInputs
        ),
        autocompleteSelection: 0
      };
    case RECIEVE_VALID_INGREDIENTS:
      const ingredientMap: IngredientMap = R.indexBy(
        R.identity,
        action.ingredients
      );
      return {
        ...state,
        validIngredientInputs: ingredientsToInputs(action.ingredients),
        validIngredientMap: ingredientMap,
        tokens: filterForValidTokens(state.tokens, ingredientMap)
      };
    case CHANGE_AUTOCOMPLETE_SELECTION:
      return {
        ...state,
        autocompleteSelection: action.index
      };
    case LOAD_FROM_URL:
      return {
        ...state,
        tokens: filterForValidTokens(action.tokens, state.validIngredientMap)
      };
    default:
      return state;
  }
};
