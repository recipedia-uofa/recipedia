// @flow
import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import resultsReducer from './resultsReducer';

import type { Action } from 'actions';
import type { SearchState } from './searchReducer';
import type { ResultsState } from './resultsReducer';

export type State = {|
  search: SearchState,
  results: ResultsState,
|};

const rootReducer: (state: State, action: Action) => State = combineReducers({
  search: searchReducer,
  results: resultsReducer,
});

export default rootReducer;
