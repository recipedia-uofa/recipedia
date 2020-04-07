// @flow
import keywords, { toKeyword, isValidKeyword } from "models/keywords";
import { isValidDiet } from "models/diets";

import type { Ingredient, IngredientMap } from "models/ingredient";
import type { Diet } from "models/diets";
import type { Keyword } from "models/keywords";

// REQ 3-2: Ingredient Search Tokens
// REQ 3-4: Merged Search Token
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

  // REQ 3-3: Partial Search Token
  isPartial(): boolean {
    return this.value === null;
  }

  isKeyIngredient(): boolean {
    return !this.isPartial() && this.keyword === keywords.KEY;
  }

  isDiet(): boolean {
    return this.keyword === keywords.DIET;
  }

  isBlacklist(): boolean {
    return this.keyword === keywords.NOT;
  }

  isSimpleIngredient(): boolean {
    return !this.isPartial() && this.keyword === keywords.NONE;
  }

  isIngredient(): boolean {
    return this.isKeyIngredient() || this.isSimpleIngredient();
  }

  hasKeyword(): boolean {
    return this.keyword !== keywords.NONE;
  }

  // Test if this token is valid on its own,
  // without considering other tokens in the searchbar
  isValid(validIngredients: IngredientMap): boolean {
    const isValidIngredient = (i: ?string) => !!i && i in validIngredients;

    if (this.hasKeyword() && !isValidKeyword(this.keyword)) {
      return false;
    } else if (this.hasKeyword()) {
      if (this.isPartial()) {
        return true;
      } else if (this.isDiet()) {
        return isValidDiet(this.value);
      } else {
        return isValidIngredient(this.value);
      }
    } else {
      return isValidIngredient(this.value);
    }
  }

  // REQ 8-3: Query hashing.
  encode(): string {
    if (this.isSimpleIngredient()) {
      // $FlowFixMe
      return this.value;
    }

    return `${this.keyword}_${this.value || ""}`;
  }

  equals(other: ?any): boolean {
    if (other === this) {
      return true;
    }

    if (other instanceof SearchToken) {
      return this.keyword === other.keyword && this.value === other.value;
    }

    return false;
  }

  // REQ 8-3: Query hashing.
  static decode(str: string): SearchToken | null {
    if (str === "") {
      return null;
    }

    if (!str.includes("_")) {
      return new SearchToken(keywords.NONE, str);
    }

    const [keywordStr, valueStr] = str.split("_");

    if (!isValidKeyword(keywordStr)) {
      return null;
    }

    const value = valueStr !== "" ? valueStr : null;
    return new SearchToken(toKeyword(keywordStr), value);
  }
}
