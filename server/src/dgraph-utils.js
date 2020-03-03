// @flow

export const toVarArray = (vars: Array<string>): string => {
  return `["${vars.join('","')}"]`;
};
