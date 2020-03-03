// @flow
import {
  ADD_SEARCH_TOKEN,
  DELETE_SEARCH_TOKEN,
  INVALID_SEARCH_ENTRY,
  CHANGE_SEARCH_TEXT,
  RECIEVE_VALID_INGREDIENTS
} from "constants/actionTypes";
import type { Action } from "actions";
import type { SearchbarState } from "types/states";

const initialState: SearchbarState = {
  text: "",
  tokens: [],
  error: "",
  validIngredients: [],
};

export default (
  state: SearchbarState = initialState,
  action: Action
): SearchbarState => {
  switch (action.type) {
    case ADD_SEARCH_TOKEN:
      return {
        ...state,
        text: "",
        tokens: [...state.tokens, action.token]
      };
    case DELETE_SEARCH_TOKEN:
      return {
        ...state,
        tokens: [
          ...state.tokens.slice(0, action.index),
          ...state.tokens.slice(action.index + 1)
        ]
      };
    case INVALID_SEARCH_ENTRY:
      return {
        ...state,
        error: action.message
      };
    case CHANGE_SEARCH_TEXT:
      return {
        ...state,
        text: action.text
      };
    case RECIEVE_VALID_INGREDIENTS:
      console.log(`Loaded ingredients:\n${action.ingredients.toString()}`);
      return {
        ...state,
        validIngredients: action.ingredients,
      };
    default:
      return state;
  }
};
