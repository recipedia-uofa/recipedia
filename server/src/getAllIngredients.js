// @flow
import * as R from "ramda";
import query from "./query";

import type { Ingredient } from "models/ingredient";

type IngredientResult = {
  iname: string
};

type QueryResult = {
  allIngredients: Array<IngredientResult>
};

const getIngredientName = (i: IngredientResult): string => i.iname;

const extractIngredients: QueryResult => Array<Ingredient> = R.pipe(
  R.prop("allIngredients"),
  R.map(getIngredientName)
);

const getAllIngredients = async (): Promise<Array<Ingredient>> => {
  const result = await query(`{
    allIngredients(func: type(Ingredient)) {
       iname
    }
  }`);
  return extractIngredients(result).sort();
};

export default getAllIngredients;
