// @flow
import searchbarReducer from "reducers/searchbarReducer";
import {
  changeSearchText,
  clearSearchTokens,
  internal as searchbarActionsInternal
} from "actions/searchbar";
import { internal as urlActionsInternal } from "actions/url";
import SearchToken from "models/SearchToken";
import keywords from "models/keywords";

import type { SearchbarState } from "types/states";
import type { SyncState } from "actions/url";

const {
  invalidSearchToken,
  clearSearchError,
  deleteSearchToken,
  addSearchToken,
  changeAutocompleteSelection,
  receiveValidIngredients
} = searchbarActionsInternal;
const { loadFromUrl } = urlActionsInternal;

const defaultState: SearchbarState = {
  text: "",
  tokens: [],
  error: "",
  showError: false,
  validIngredientInputs: [],
  validIngredientMap: {},
  autocompleteItems: [],
  autocompleteSelection: 0
};

const testToken = new SearchToken(keywords.NONE, "test");
const testToken2 = new SearchToken(keywords.NOT, "test2");
const partialDietToken = new SearchToken(keywords.DIET);

const lastToken = (tokens: Array<SearchToken>): SearchToken => {
  return tokens[tokens.length - 1];
};

test("adds search token", () => {
  const currentState: SearchbarState = {
    ...defaultState,
    tokens: [testToken]
  };

  const newState = searchbarReducer(currentState, addSearchToken(testToken2));
  expect(newState.tokens.length).toBe(2);
  expect(lastToken(newState.tokens).equals(testToken2)).toBeTruthy();
  expect(newState.autocompleteItems.length).toBe(0);
  expect(newState.autocompleteSelection).toBe(0);
});

test("shows autocomplete on adding partial diet token", () => {
  const newState = searchbarReducer(
    defaultState,
    addSearchToken(partialDietToken)
  );
  expect(newState.tokens.length).toBe(defaultState.tokens.length + 1);
  expect(lastToken(newState.tokens).equals(partialDietToken)).toBeTruthy();
  expect(newState.autocompleteItems.length).toBeGreaterThan(0);
});

test("removes search token", () => {
  const currentState: SearchbarState = {
    ...defaultState,
    text: "sometext",
    tokens: [testToken, testToken2]
  };

  const newState = searchbarReducer(currentState, deleteSearchToken(1));
  expect(newState.tokens.length).toBe(1);
  expect(lastToken(newState.tokens).equals(testToken)).toBeTruthy();
  expect(newState.text).toBe(currentState.text);
});

test("removes autocomplete on removing partial diet token", () => {
  const startState: SearchbarState = {
    ...defaultState,
    tokens: [testToken]
  };

  const currentState = searchbarReducer(
    startState,
    addSearchToken(partialDietToken)
  );
  expect(currentState.autocompleteItems.length).toBeGreaterThan(0);

  const removedState = searchbarReducer(currentState, deleteSearchToken(1));
  expect(removedState.tokens.length).toBe(1);
  expect(lastToken(removedState.tokens).equals(testToken)).toBeTruthy();
  expect(removedState.autocompleteItems.length).toBe(0);
});

test("get invalid search", () => {
  const errorMessage = "invalid token";

  const newState = searchbarReducer(
    defaultState,
    invalidSearchToken(errorMessage)
  );
  expect(newState.error).toBe(errorMessage);
  expect(newState.showError).toBe(true);
});

test("clears search error", () => {
  const currentState: SearchbarState = {
    ...defaultState,
    showError: true
  };

  const newState = searchbarReducer(currentState, clearSearchError());
  expect(newState.showError).toBe(false);
});

test("responds to changed text", () => {
  const currentState: SearchbarState = {
    ...defaultState,
    text: "k",
    autocompleteItems: [],
    autocompleteSelection: 1
  };

  const newState = searchbarReducer(currentState, changeSearchText("ke"));

  expect(newState.text).toBe("ke");
  expect(newState.autocompleteItems.length).toBeGreaterThan(0);
  expect(newState.autocompleteSelection).toBe(0);
});

test("loads valid ingredients", () => {
  const currentState: SearchbarState = {
    ...defaultState,
    validIngredientInputs: [],
    validIngredientMap: {},
    tokens: [testToken, new SearchToken(keywords.NONE, "bad"), testToken2]
  };

  const validIngredients = ["test", "test2"];

  const newState = searchbarReducer(
    currentState,
    receiveValidIngredients(validIngredients)
  );
  expect(newState.validIngredientInputs.length).toBe(2);
  expect(Object.keys(newState.validIngredientMap).length).toBe(2);
  expect(newState.tokens).toStrictEqual([testToken, testToken2]);
});

test("change autocomplete selection", () => {
  const currentState: SearchbarState = {
    ...defaultState,
    autocompleteSelection: 1
  };

  const newState = searchbarReducer(
    currentState,
    changeAutocompleteSelection(0)
  );
  expect(newState.autocompleteSelection).toBe(0);
});

test("load tokens from url", () => {
  const urlState: SyncState = [testToken, testToken2];

  const currentState: SearchbarState = {
    ...defaultState,
    tokens: []
  };

  const newState = searchbarReducer(currentState, loadFromUrl(urlState));
  expect(newState.tokens).toStrictEqual(urlState);
});
