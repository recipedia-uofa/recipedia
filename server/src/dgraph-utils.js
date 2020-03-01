// @flow

type DgraphResult = {
  data: Object
};

export const extractResult = (queryName: string) => {
  return (result: DgraphResult) => result.data[queryName];
};

export const toVarArray = (vars: Array<string>): string => {
  return `["${vars.join('","')}"]`;
}
