// @flow
import type SearchToken from "models/SearchToken";
import type { Recipe } from 'models/recipe';

export type SearchbarState = {|
  +text: string, // the search string
  +tokens: Array<SearchToken>, // list of search tokens
  +error: string
|};

export type ResultsState = {|
  +recipes: Array<Recipe>,
  +visible: boolean
|};

export type State = {|
  +searchbar: SearchbarState,
  +results: ResultsState
|};

export type GetState = () => State;
