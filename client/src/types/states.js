// @flow
import type SearchToken from "models/SearchToken";
import type { Ingredient, IngredientMap } from "models/ingredient";
import type { Recipe } from "models/recipe";
import type { Input } from "models/input";

export type SearchbarState = {|
  +text: string, // the search string
  +tokens: Array<SearchToken>, // list of search tokens
  +error: string,
  +showError: boolean,
  +validIngredientInputs: Array<Input>, // list of valid ingredients, formatted as inputs
  +validIngredientMap: IngredientMap, // map of valid ingredients
  +autocompleteItems: Array<Input>, // list of items in the autocomplete
  +autocompleteSelection: number // the index of the selected autocomplete item
|};

// This state controls the results view
// searchbar only: isPending == false, visible == false
// loading indicator: isPending == true
// no results indicator: isPending == false, visible == true, recipes == empty
// recipe results shown: isPending == false, visible == true, recipes != empty
export type ResultsState = {|
  +recipes: Array<Recipe>,
  +isPending: boolean, // is a search query pending results?
  +visible: boolean // sticky visibility filter for results view
|};

export type State = {|
  +searchbar: SearchbarState,
  +results: ResultsState
|};

export type GetState = () => State;
