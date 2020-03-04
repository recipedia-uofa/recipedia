// @flow

export const varArray = (vars: Array<string>): string => {
  return `["${vars.join('","')}"]`;
};
