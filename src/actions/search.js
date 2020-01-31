// @flow
export const EXECUTE_SEARCH_ACTION = 'EXECUTE_SEARCH_ACTION';

export type ExecuteSearchAction = {
  type: 'EXECUTE_SEARCH_ACTION',
};

export const executeSearch = (): ExecuteSearchAction => ({
  type: EXECUTE_SEARCH_ACTION,
});
