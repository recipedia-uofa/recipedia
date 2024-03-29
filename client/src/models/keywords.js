// @flow
const keywords = {
  KEY: "KEY",
  NOT: "NOT",
  DIET: "DIET",
  NONE: "NONE"
};

export type Keyword = $Keys<typeof keywords>;

// $FlowFixMe
export const allKeywords: Array<Keyword> = Object.values(keywords);

export const isValidKeyword = (str: ?string): boolean => {
  return !!str && str.toUpperCase() in keywords;
};

export const toKeyword = (str: string): Keyword => {
  return keywords[str.toUpperCase()];
};

export default keywords;
