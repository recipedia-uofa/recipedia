// @flow
import { combineReducers } from 'redux';
import searchbarReducer from './searchbarReducer';
import resultsReducer from './resultsReducer';

import type { Action } from 'actions';
import type { State } from 'types/states';

const rootReducer: (state: State, action: Action) => State = combineReducers({
  searchbar: searchbarReducer,
  results: resultsReducer,
});

export default rootReducer;
