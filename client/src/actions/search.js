// @flow
import axios, { AxiosError } from 'axios';
import { EXECUTE_SEARCH, RECEIVE_SEARCH, INVALID_SEARCH } from 'constants/actionTypes';

import type { ExecuteSearch, ReceiveSearch, InvalidSearch } from 'constants/actionTypes';

type ExecuteSearchAction = { type: ExecuteSearch };

type ReceiveSearchAction = {
    type: ReceiveSearch,
    recipes: Array<string>,
};

type InvalidSearchAction = { type: InvalidSearch };

const requestSearch = (): ExecuteSearchAction => ({
    type: EXECUTE_SEARCH,
});

const receiveSearch = (recipes: Array<string>): ReceiveSearchAction => ({
    type: RECEIVE_SEARCH,
    recipes,
});

const invalidSearch = (): InvalidSearchAction => ({
    type: INVALID_SEARCH,
});

const mockRecipeReturn: Array<string> = [
  'Soup with eggs',
  'Lasagna',
  'Broccoli and Cheese',
];

export const executeSearch = () => {
    // (dispatch, getState) =>
    return (dispatch: *) => {
        dispatch(requestSearch());
        // TODO: Use actual API call and get url based on state
        return axios.get('http://localhost:8080')
            .then((res) => dispatch(receiveSearch(mockRecipeReturn)))
            .catch((err) => dispatch(receiveSearch(mockRecipeReturn))) // TODO: remove this line
            .catch((err: AxiosError) => {
                console.error(err);
                dispatch(invalidSearch());
            });
    };
};

export type SearchActions =
    ExecuteSearchAction | ReceiveSearchAction | InvalidSearchAction;
