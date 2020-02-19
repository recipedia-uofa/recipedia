// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers/rootReducer';
import { CHANGE_SEARCH_TEXT } from 'constants/actionTypes';

import type { Action } from 'actions';
import type { GetState } from 'types/states';

// Filter specific action types from logger
const filteredActionTypes = [
    CHANGE_SEARCH_TEXT,
];

const logger = createLogger({
    predicate: (getState: GetState, action: Action) =>
        !filteredActionTypes.includes(action.type),
});

export default function configureStore(initialState:Object = {}) {
  return createStore(
   rootReducer,
   initialState,
   applyMiddleware(thunk, logger)
  );
}
