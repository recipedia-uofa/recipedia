// @flow
import "regenerator-runtime/runtime";
import * as dgraph from "dgraph-js";
import grpc from "grpc";

const clientStub = new dgraph.DgraphClientStub(
  "localhost:9080",
  grpc.credentials.createInsecure()
);
const dgraphClient = new dgraph.DgraphClient(clientStub);

if (process.env.NODE_ENV === "development") {
  dgraphClient.setDebugMode(true);
} else {
  dgraphClient.setDebugMode(false);
}

const runQuery = async (query: string, vars: ?Object) => {
  const txn = dgraphClient.newTxn({ readOnly: true });
  const res = !vars
    ? await txn.query(query)
    : await txn.queryWithVars(query, vars);

  return res.getJson();
};

export default runQuery;
