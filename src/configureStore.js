// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

import type { State } from './reducers';

export default function configureStore(initialState: State={}) {
  return createStore(
   rootReducer,
   initialState,
   applyMiddleware(thunk)
  );
}
