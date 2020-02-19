// @flow
import type { SearchToken } from 'types/tokens';

export type SearchbarState = {|
    +text: string,                // the search string
    +tokens: Array<SearchToken>,  // list of search tokens
|};

export type ResultsState = {|
    +recipes: Array<string>,
    +visible: boolean,
|};

export type State = {|
    +searchbar: SearchbarState,
    +results: ResultsState,
|};

export type GetState = () => State;
