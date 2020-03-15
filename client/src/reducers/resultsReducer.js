// @flow
import { EXECUTE_SEARCH, RECEIVE_SEARCH } from "constants/actionTypes";
import type { Action } from "actions";
import type { ResultsState } from "types/states";

const initialState: ResultsState = {
  recipes: [],
  isPending: false,
  visible: false
};

export default (
  state: ResultsState = initialState,
  action: Action
): ResultsState => {
  switch (action.type) {
    case EXECUTE_SEARCH:
      return {
        ...state,
        isPending: true
      };
    case RECEIVE_SEARCH:
      return {
        ...state,
        recipes: action.recipes,
        isPending: false,
        visible: true
      };
    default:
      return state;
  }
};
