// @flow
import keywords, { toKeyword, isValidKeyword } from "models/keywords";

import type { Ingredient } from "models/ingredient";
import type { Diet } from "models/diets";
import type { Keyword } from "models/keywords";

export default class SearchToken {
  keyword: Keyword;
  value: ?(Diet | Ingredient);

  constructor(
    keyword: Keyword = keywords.NONE,
    value: ?(Diet | Ingredient) = null
  ) {
    this.keyword = keyword;
    this.value = value;
  }

  isPartial(): boolean {
    return this.value === null;
  }

  isKeyIngredient(): boolean {
    return this.keyword === keywords.KEY;
  }

  isDiet(): boolean {
    return this.keyword === keywords.DIET;
  }

  isBlacklist(): boolean {
    return this.keyword === keywords.NOT;
  }

  isSimpleIngredient(): boolean {
    return this.keyword === keywords.NONE;
  }

  isIngredient(): boolean {
    return this.isKeyIngredient() || this.isSimpleIngredient();
  }

  hasKeyword(): boolean {
    return this.keyword !== keywords.NONE;
  }

  encode(): string {
    return `${this.keyword}_${this.value || ""}`;
  }

  static decode(str: string): SearchToken | null {
    const [keywordStr, valueStr] = str.split("_");

    if (!isValidKeyword(keywordStr)) {
      return null;
    }

    return new SearchToken(toKeyword(keywordStr), valueStr);
  }
}
