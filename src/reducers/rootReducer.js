// @flow
import { combineReducers } from 'redux';
import searchReducer from './searchReducer';

import type { Action } from 'actions';
import type { SearchState } from './searchReducer';

export type State = {|
  search: SearchState,
|};

const rootReducer: (state: State, action: Action) => State = combineReducers({
  search: searchReducer
});

export default rootReducer;
