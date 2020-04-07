// @flow
import * as R from "ramda";
import SearchToken from "models/SearchToken";
import { LOAD_FROM_URL } from "constants/actionTypes";
import { executeSearch } from "actions/search";

import type { LoadFromUrl } from "constants/actionTypes";
import type { GetState } from "types/states";

export type SyncState = Array<SearchToken>;

type LoadFromUrlAction = {
  type: LoadFromUrl,
  tokens: Array<SearchToken>
};

const loadFromUrl = (syncState: SyncState) => ({
  type: LOAD_FROM_URL,
  tokens: syncState
});

export const loadSyncState = (syncState: SyncState) => {
  return (dispatch: *, getState: GetState) => {
    if (!R.isEmpty(syncState)) {
      dispatch(loadFromUrl(syncState));
      dispatch(executeSearch());
    }
  };
};

export type UrlActions = LoadFromUrlAction;

export const internal = {
  loadFromUrl
};
