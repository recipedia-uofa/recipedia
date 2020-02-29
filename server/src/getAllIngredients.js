// @flow
import * as R from "ramda";
import query from "./query";
import { extractResult } from "./dgraph-utils";

type IngredientResult = {
  xid: string
};

const extractIngredients: Object => Array<IngredientResult> = extractResult(
  "allIngredients"
);

const getIngredientName = (i: IngredientResult) => i.xid;

const getAllIngredients = async (): Promise<Array<string>> => {
  const result = await query(`{
    allIngredients(func: eq(<dgraph.type>, "Ingredient")) {
       xid
    }
  }`);

  return extractIngredients(result)
    .map(getIngredientName)
    .sort();
};

export default getAllIngredients;
