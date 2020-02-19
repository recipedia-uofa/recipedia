// @flow
import {
    ADD_SEARCH_TOKEN,
    REMOVE_SEARCH_TOKEN,
    CLEAR_SEARCH_TOKENS,
    INVALID_SEARCH_ENTRY,
    CHANGE_SEARCH_TEXT,
} from 'constants/actionTypes';

import type {
    AddSearchToken,
    RemoveSearchToken,
    ClearSearchTokens,
    InvalidSearchEntry,
    ChangeSearchText,
} from 'constants/actionTypes';
import type { SearchToken } from 'types/tokens';
import type { State, GetState } from 'types/states';

type AddSearchTokenAction = {
    type: AddSearchToken,
    token: SearchToken,
};

type RemoveSearchTokenAction = {
    type: RemoveSearchToken,
    pos: number,
};

type ClearSearchTokensAction = {
    type: ClearSearchTokens,
};

type InvalidSearchEntryAction = {
    type: InvalidSearchEntry,
    message: string,
};

type ChangeSearchTextAction = {
    type: ChangeSearchText,
    text: string,
};

const invalidSearchToken = (message: string): InvalidSearchEntryAction => ({
    type: INVALID_SEARCH_ENTRY,
    message,
});

const isValidToken = (token: SearchToken, state: State): boolean => {
    return true;
};

const addSearchToken = (token: SearchToken): AddSearchTokenAction => ({
    type: ADD_SEARCH_TOKEN,
    token: token,
});

export const tryAddSearchToken = (token: SearchToken) => {
    return (dispatch: *, getState: GetState) => {
        if (!isValidToken(token, getState())) {
            dispatch(invalidSearchToken("Your input is not valid"));
            return;
        }

        dispatch(addSearchToken(token));
    };
};

export const removeSearchToken = (pos: number): RemoveSearchTokenAction => ({
    type: REMOVE_SEARCH_TOKEN,
    pos,
});

export const clearSearchTokens = (): ClearSearchTokensAction => ({
    type: CLEAR_SEARCH_TOKENS,
});

export const changeSearchText = (text: string): ChangeSearchTextAction => ({
    type: CHANGE_SEARCH_TEXT,
    text,
});

export type SearchBarActions =
    AddSearchTokenAction | RemoveSearchTokenAction | ClearSearchTokensAction |
    InvalidSearchEntryAction | ChangeSearchTextAction;
