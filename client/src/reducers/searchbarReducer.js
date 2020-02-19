// @flow
import {
  ADD_SEARCH_TOKEN,
  REMOVE_SEARCH_TOKEN,
  INVALID_SEARCH_ENTRY,
  CHANGE_SEARCH_TEXT
} from "constants/actionTypes";
import type { Action } from "actions";
import type { SearchbarState } from "types/states";

const initialState: SearchbarState = {
  text: "",
  tokens: [],
  error: ""
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
    case REMOVE_SEARCH_TOKEN:
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
    default:
      return state;
  }
};
