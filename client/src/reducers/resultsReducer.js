// @flow
import { RECEIVE_SEARCH } from 'constants/actionTypes';
import type { Action } from 'actions';
import type { ResultsState } from 'types/states';

const initialState: ResultsState = {
  recipes: [],
  visible: false,
};

export default (state: ResultsState = initialState, action: Action): ResultsState => {
  switch (action.type) {
    case RECEIVE_SEARCH:
      return {
          ...state,
          recipes: action.recipes,
          visible: action.recipes.length !== 0,
      };
    default:
      return state
  }
}
