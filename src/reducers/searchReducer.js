// @flow
import { EXECUTE_SEARCH_ACTION } from '../actions';
import type { Action } from '../actions';

type SearchState = $Exact<{
  +text: string; // the search string
}>;

const initialState = (): SearchState => ({
  text: '',
});

export default (state: SearchState = initialState(), action: Action): SearchState => {
  switch (action.type) {
    case EXECUTE_SEARCH_ACTION:
      return state;
    default:
      return state
  }
}
