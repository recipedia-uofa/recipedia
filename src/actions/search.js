// @flow
import { EXECUTE_SEARCH_ACTION } from 'constants/actionTypes';

export type ExecuteSearchAction = {
  type: 'EXECUTE_SEARCH_ACTION',
};

export const executeSearch = (): ExecuteSearchAction => ({
  type: EXECUTE_SEARCH_ACTION,
});

export type SearchActions = ExecuteSearchAction;
