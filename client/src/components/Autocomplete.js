// @flow
import React from "react";
import { connect } from "react-redux";
import * as R from "ramda";
import diets from "models/diets";
import { inputTypes, validInputTypes } from "models/input";
import keywords from "models/keywords";
import SearchToken from "models/SearchToken";
import autocompleteSearch from "models/autocomplete";
import * as colours from "constants/colours";

import styles from "styles/autocomplete.module.css";

import type { Diet } from "models/diets";
import type { Ingredient } from "models/ingredient";
import type { InputType } from "models/input";
import type { Keyword } from "models/keywords";
import type { State } from "types/states";

type Input = {
  type: InputType,
  value: Keyword | Ingredient | Diet
};

const getTokenColour = (token: string): string => {
  switch (token.toUpperCase()) {
    case keywords.NOT:
      return colours.NOT_KEYWORD_COLOUR;
    case keywords.KEY:
      return colours.KEY_KEYWORD_COLOUR;
    case keywords.DIET:
      return colours.DIET_KEYWORD_COLOUR;
    default:
      return colours.INGREDIENT_COLOUR;
  }
};

const ingredientToInput = (i: Ingredient): Input => ({
  type: inputTypes.INGREDIENT,
  value: i
});
const ingredientsToInputs = R.map(ingredientToInput);

const dietToInput = (d: Diet): Input => ({
  type: inputTypes.DIET,
  value: d.toLowerCase()
});
const dietInputs = R.map(dietToInput, Object.values(diets));

const keywordToInput = (k: Keyword): Input => ({
  type: inputTypes.KEYWORD,
  value: k.toLowerCase()
});
const keywordInputs = R.map(
  keywordToInput,
  Object.values(keywords).filter(k => k !== keywords.NONE)
);

const searchOptions = {
  key: "value"
};

const computeItems = (
  maxItems: number,
  searchText: string,
  validInputs: Array<Input>
): Array<Input> => {
  if (searchText === "") {
    return [];
  }

  const items = autocompleteSearch(searchText, validInputs, searchOptions);
  return R.take(maxItems, items);
};

type Props = {
  maxItems: number,
  // redux
  searchText: string,
  searchTokens: Array<SearchToken>,
  validIngredients: Array<Ingredient>
};

const mapStateToProps = (state: State, ownProps) => ({
  searchText: state.searchbar.text,
  searchTokens: state.searchbar.tokens,
  validIngredients: state.searchbar.validIngredientArray
});

class Autocomplete extends React.PureComponent<Props> {
  static defaultProps = {
    maxItems: 7
  };

  render() {
    const { searchText, searchTokens, validIngredients, maxItems } = this.props;

    const validTypes = validInputTypes(searchTokens);
    const validItems = [
      ...(validTypes.includes(inputTypes.KEYWORD) ? keywordInputs : []),
      ...(validTypes.includes(inputTypes.INGREDIENT)
        ? ingredientsToInputs(validIngredients)
        : []),
      ...(validTypes.includes(inputTypes.DIET) ? dietInputs : [])
    ];

    const items = computeItems(maxItems, searchText, validItems);
    return (
      <div className={styles.autocomplete}>
        <div className={styles.autocompleteItems}>
          {items.map(i => {
            if (i.type === inputTypes.KEYWORD) {
              const itemKeywordColor = getTokenColour(i.value);
              return (
                <div key={i.value}>
                  <div
                    className={styles.autocompleteItemKeyword}
                    style={{ backgroundColor: itemKeywordColor }}
                  >
                    {i.value.toUpperCase()}
                  </div>
                </div>
              );
            }
            return <div key={i.value}>{i.value}</div>;
          })}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Autocomplete);
