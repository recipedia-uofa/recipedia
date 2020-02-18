// @flow
import { ADD_SEARCH_TOKEN } from 'constants/actionTypes';
import type { Action } from 'actions';
import type { SearchToken } from 'types/tokens';

export type SearchbarState = {|
    +text: string,                // the search string
    +tokens: Array<SearchToken>,  // list of search tokens
|};

const initialState: SearchbarState = {
    text: '',
    tokens: [],
};

export default (state: SearchbarState = initialState, action: Action): SearchbarState => {
    switch (action.type) {
        case ADD_SEARCH_TOKEN:
            return {
                ...state,
                text: '',
                tokens: [
                    ...state.tokens,
                    action.token,
                ],
            };
        default:
            return state
    }
};
