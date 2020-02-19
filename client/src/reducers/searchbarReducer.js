// @flow
import { ADD_SEARCH_TOKEN, CHANGE_SEARCH_TEXT } from 'constants/actionTypes';
import type { Action } from 'actions';
import type { SearchbarState } from 'types/states';

const initialState: SearchbarState = {
    text: '',
    tokens: [],
};

export default (state: SearchbarState = initialState, action: Action): SearchbarState => {
    switch (action.type) {
        case CHANGE_SEARCH_TEXT:
            return {
                ...state,
                text: action.text,
            };
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
