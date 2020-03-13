// @flow
// SEARCH actions

// Send search request to the server
export const EXECUTE_SEARCH = "search/EXECUTE";
export type ExecuteSearch = "search/EXECUTE";

// Receive search results
export const RECEIVE_SEARCH = "search/RECEIVE";
export type ReceiveSearch = "search/RECEIVE";

// Invalid search, or search returns error
export const INVALID_SEARCH = "search/INVALID";
export type InvalidSearch = "search/INVALID";

// SEARCHBAR actions

// Add search token
export const ADD_SEARCH_TOKEN = "searchbar/ADD_TOKEN";
export type AddSearchToken = "searchbar/ADD_TOKEN";

// Remove a particular token
export const DELETE_SEARCH_TOKEN = "searchbar/DELETE_TOKEN";
export type DeleteSearchToken = "searchbar/DELETE_TOKEN";

// Clear all tokens
export const CLEAR_SEARCH_TOKENS = "searchbar/CLEAR_TOKENS";
export type ClearSearchTokens = "searchbar/CLEAR_TOKENS";

// Display an error message
export const INVALID_SEARCH_ENTRY = "searchbar/INVALID_ENTRY";
export type InvalidSearchEntry = "searchbar/INVALID_ENTRY";

export const CHANGE_SEARCH_TEXT = "searchbar/CHANGE_TEXT";
export type ChangeSearchText = "searchbar/CHANGE_TEXT";

export const RECIEVE_VALID_INGREDIENTS = "searchbar/RECEIVE_INGREDIENTS";
export type RecieveValidIngredients = "searchbar/RECEIVE_INGREDIENTS";

export const CHANGE_AUTOCOMPLETE_SELECTION = "searchbar/CHANGE_SELECTION";
export type ChangeAutocompleteSelection = "searchbar/CHANGE_SELECTION";
