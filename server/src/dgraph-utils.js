// @flow
import * as R from "ramda";

export const varArray = (vars: Array<string>): string => {
  return `["${vars.join('","')}"]`;
};

// If the input is falsy, it will be filtered
const filterFalsy = R.filter(R.identity);

type FalsyString = ?(string | false);

// Convert many clauses into one insertable string
// filters false, null or undefined clauses
export const clauseArray = (clauses: Array<FalsyString>): string => {
  return filterFalsy(clauses).join("\n");
};

export const camelToSnake = (s: string): string => {
  return s
    .replace(/[\w]([A-Z])/g, m => {
      return m[0] + "_" + m[1];
    })
    .toLowerCase();
};
