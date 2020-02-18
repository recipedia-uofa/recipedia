// @flow
import { combineReducers } from 'redux';
import searchbarReducer from './searchbarReducer';
import resultsReducer from './resultsReducer';

import type { Action } from 'actions';
import type { SearchbarState } from './searchbarReducer';
import type { ResultsState } from './resultsReducer';

export type State = {|
  searchbar: SearchbarState,
  results: ResultsState,
|};

const rootReducer: (state: State, action: Action) => State = combineReducers({
  searchbar: searchbarReducer,
  results: resultsReducer,
});

export default rootReducer;
