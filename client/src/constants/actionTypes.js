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

// Add search token
export const ADD_SEARCH_TOKEN = 'searchbar/ADD_TOKEN';
export type AddSearchToken = 'searchbar/ADD_TOKEN';

// Remove a particular token
export const REMOVE_SEARCH_TOKEN = 'searchbar/REMOVE_TOKEN';
export type RemoveSearchToken = 'searchbar/REMOVE_TOKEN';

// Clear all tokens
export const CLEAR_SEARCH_TOKENS = 'searchbar/CLEAR_TOKENS';
export type ClearSearchTokens = 'searchbar/CLEAR_TOKENS';

// Display an error message
export const INVALID_SEARCH_ENTRY = 'searchbar/INVALID_ENTRY';
export type InvalidSearchEntry = 'searchbar/INVALID_ENTRY';

export const CHANGE_SEARCH_TEXT = 'searchbar/CHANGE_TEXT';
export type ChangeSearchText = 'searchbar/CHANGE_TEXT';
