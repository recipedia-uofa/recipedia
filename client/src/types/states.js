// @flow
import type SearchToken from "models/SearchToken";
import type { Ingredient, IngredientMap } from "models/ingredient";
import type { Recipe } from "models/recipe";
import type { Input } from "models/input";

export type SearchbarState = {|
  +text: string, // the search string
  +tokens: Array<SearchToken>, // list of search tokens
  +error: string,
  +validIngredientInputs: Array<Input>, // list of valid ingredients, formatted as inputs
  +validIngredientMap: IngredientMap, // map of valid ingredients
  +autocompleteItems: Array<Input>, // list of items in the autocomplete
  +autocompleteSelection: number // the index of the selected autocomplete item
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
