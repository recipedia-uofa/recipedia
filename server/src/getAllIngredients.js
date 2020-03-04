// @flow
import * as R from "ramda";
import query from "./query";

import type { Ingredient } from "models/ingredient";

type IngredientResult = {
  xid: string
};

type QueryResult = {
  data: {
    allIngredients: Array<IngredientResult>
  }
};

const getIngredientName = (i: IngredientResult): string => i.xid;

const extractIngredients: QueryResult => Array<Ingredient> = R.pipe(
  R.path(["allIngredients"]),
  R.map(getIngredientName)
);

const getAllIngredients = async (): Promise<Array<Ingredient>> => {
  const result = await query(`{
    allIngredients(func: eq(<dgraph.type>, "Ingredient")) {
       xid
    }
  }`);
  console.log(result);

  return extractIngredients(result).sort();
};

export default getAllIngredients;
