// @flow
import * as R from "ramda";
import type { Ingredient } from "models/ingredient";

type MatchedIndices = Array<[number, number]>;

// The score is normalized to [0, 1] where 1 is a good match and 0 is a bad one
const score = (query: string, matchedIndices: MatchedIndices): number => {
  const maxScore = query.length;
  const queryScore = matchedIndices.reduce((s, [startIdx, endIdx]) => {
    const mult = 1 / (startIdx + 1);
    s += mult * (endIdx - startIdx);
  }, 0) || 0;
  return queryScore / maxScore;
};

// Match the query string to the record.
// @return -1 for no match or the index where the match starts
const match = (query: string, record: string): false | MatchedIndices => {
  if (record.includes(query)) {
    // Case insensitive pattern match
    const pattern = new RegExp(`${query}`, "i");
    pattern.exec(record);
    // Returns the index of the match
    return [[pattern.lastIndex - query.length, pattern.lastIndex]];
  }

  return false;
}

type Match = {
  value: any,
  matchedIndices: MatchedIndices,
  score: number
};

type SearchOptions = {
  key: string,
};

const getSortedMatches = R.pipe(
  R.sortBy(R.descend(R.prop("score"))),
  R.map(R.prop("value"))
);

const search = (query: string, records: Array<any>, opts: SearchOptions): Array<Match> => {
  const queryLowerCase = query.toLowerCase();
  const matches: Array<Match> = [];
  for (const record of records) {
    // We assume record is lower case
    const matchedIndices = match(queryLowerCase, record[opts.key]);

    if (!matchedIndices) {
      continue;
    }

    matches.push({
      value: record,
      matchedIndices,
      score: score(query, matchedIndices)
    });
  }
  return getSortedMatches(matches);
};

export default search;
