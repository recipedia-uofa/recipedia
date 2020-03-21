// @flow
import * as R from "ramda";

type MatchedIndices = Array<[number, number]>;

// The score is normalized to [0, 1] where 1 is a good match and 0 is a bad one
export const score = (
  record: string,
  matchedIndices: MatchedIndices
): number => {
  const maxScore = record.length;
  const queryScore =
    matchedIndices.reduce((s, [startIdx, endIdx]) => {
      // Earlier matches are scored higher
      const mult = 1 / (startIdx + 1);
      return s + mult * (endIdx - startIdx + 1);
    }, 0) || 0;
  return queryScore / maxScore;
};

// Cap this to avoid performance issues
const MAX_QUERY_LEN = 60;

const sanitizeRegExp = (s: string): string => {
  // $& means the whole matched string
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").slice(0, MAX_QUERY_LEN);
};

// Match the query string to the record.
// @return -1 for no match or the index where the match starts
export const match = (
  query: string, // Note: Should be sanitized
  record: string
): false | MatchedIndices => {
  // Case insensitive pattern match
  const pattern = new RegExp(query, "i");
  const match = pattern.exec(record);

  if (match) {
    // Returns the index of the match
    return [[match.index, match.index + query.length - 1]];
  }

  return false;
};

type Match = {
  value: any,
  matchedIndices: MatchedIndices,
  score: number
};

type SearchOptions = {
  key: string | (any => string)
};

const getSortedMatches = R.pipe(
  R.sort(R.descend(R.prop("score"))),
  R.map(R.prop("value"))
);

const search = (
  query: string,
  records: Array<any>,
  opts: SearchOptions
): Array<any> => {
  const fullOpts = {
    ...opts
  };

  const queryLowerCase = sanitizeRegExp(query).toLowerCase();
  const matches: Array<Match> = [];

  // Extract the searchable string from a record
  const getRecordString: any => string =
    typeof fullOpts.key === "string" ? R.prop(fullOpts.key) : fullOpts.key;

  for (const record of records) {
    // We assume record is lower case
    const recordString = getRecordString(record);
    const matchedIndices = match(queryLowerCase, recordString);

    if (!matchedIndices) {
      continue;
    }

    const matchObj = {
      value: record,
      matchedIndices,
      score: score(recordString, matchedIndices)
    };

    matches.push(matchObj);
  }

  return getSortedMatches(matches);
};

export default search;
