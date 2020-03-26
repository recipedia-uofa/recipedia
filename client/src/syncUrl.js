// @flow
import * as R from "ramda";
import ReduxQuerySync from "redux-query-sync";
import SearchToken from "models/SearchToken";
import { loadSyncState } from "actions/url";

import type { SyncState } from "actions/url";
import type { State } from "types/states";

const SEP = "&";

const stringToState: (s: string) => ?SyncState = R.pipe(
  R.split(SEP),
  R.map(SearchToken.decode),
  R.filter(R.identity) // filter falsy values (i.e null)
);

const stateToString: (state: SyncState) => string = R.pipe(
  R.map((t: SearchToken) => t.encode()),
  R.join(SEP)
);

const syncUrl = (store: *) =>
  ReduxQuerySync({
    store,
    params: {
      q: {
        selector: (state: State): SyncState => state.searchbar.tokens,
        action: (value: SyncState) => loadSyncState(value),
        stringToValue: stringToState,
        valueToString: stateToString,
        defaultValue: []
      }
    },
    initialTruth: "location",
    replaceState: true
  });

export default syncUrl;
