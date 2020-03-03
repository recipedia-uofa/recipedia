// @flow
import type SearchToken from "models/SearchToken";
import type { Ingredient } from "models/ingredient";
import type { Recipe } from "models/recipe";

export type SearchbarState = {|
  +text: string, // the search string
  +tokens: Array<SearchToken>, // list of search tokens
  +error: string,
  +validIngredients: Array<Ingredient>, // list of valid ingredients
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
