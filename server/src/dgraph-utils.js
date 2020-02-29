// @flow

type DgraphResult = {
  data: Object
};

export const extractResult = (queryName: string) => {
  return (result: DgraphResult) => result.data[queryName];
};
