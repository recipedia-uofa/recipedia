// @flow
const keywords = {
  KEY: "KEY",
  NOT: "NOT",
  DIET: "DIET",
  NONE: "NONE"
};

export type Keyword = $Keys<typeof keywords>;

export const isValidKeyword = (str: string): boolean => {
  return str in keywords;
};

export const toKeyword = (str: string): Keyword => {
  return keywords[str];
};

export default keywords;
