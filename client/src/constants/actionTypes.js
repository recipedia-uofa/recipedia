// @flow
// SEARCH actions

// Send search request to the server
export const EXECUTE_SEARCH = 'search/EXECUTE';
export type ExecuteSearch = 'search/EXECUTE';

// Receive search results
export const RECEIVE_SEARCH = 'search/RECEIVE';
export type ReceiveSearch = 'search/RECEIVE';

// Invalid search, or search returns error
export const INVALID_SEARCH = 'search/INVALID';
export type InvalidSearch = 'search/INVALID';
