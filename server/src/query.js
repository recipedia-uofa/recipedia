// @flow
import dgraph from "dgraph-js";
import grpc from "grpc";

const clientStub = new dgraph.DgraphClientStub(
  "localhost:9080",
  grpc.credentials.createInsecure()
);
const dgraphClient = new dgraph.DgraphClient(clientStub);

const runQuery = async (query: string) => {
  const res = await dgraphClient.newTxn().query(query);
  return res.getJson();
};

export default runQuery;
