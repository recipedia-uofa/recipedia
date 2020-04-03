// @flow
import { constantCase } from "constant-case";

const categories = {
  ADDED_SWEETENERS: "added sweeteners",
  ALCOHOL: "alcohol",
  BAKING_AND_GRAINS: "baking and grains",
  BEVERAGES: "beverages",
  CONDIMENTS: "condiments",
  DAIRY: "dairy",
  DAIRY_ALTERNATIVES: "dairy alternatives",
  DESSERTS_AND_SNACKS: "desserts and snacks",
  FISH: "fish",
  FRUITS: "fruits",
  LEGUMES: "legumes",
  MEATS: "meats",
  NUTS: "nuts",
  OILS: "oils",
  SAUCES: "sauces",
  SEAFOOD: "seafood",
  SEASONINGS: "seasonings",
  SOUP: "soup",
  SPICES: "spices",
  VEGETABLES: "vegetables"
};

export type Category = $Values<typeof categories>;

export const toCategory = (str: string): Category => {
  return categories[constantCase(str)];
};

export default categories;
