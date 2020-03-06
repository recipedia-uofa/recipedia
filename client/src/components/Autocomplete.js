// @flow
import React from "react";
import { connect } from "react-redux";
import * as R from "ramda";
import Fuse from "fuse.js";
import diets from "models/diets";
import { inputTypes, validInputTypes } from "models/input";
import keywords from "models/keywords";
import SearchToken from "models/SearchToken";

import styles from "styles/autocomplete.module.css";

import type { Diet } from "models/diets";
import type { Ingredient } from "models/ingredient";
import type { InputType } from "models/input";
import type { Keyword } from "models/keywords";
import type { State } from "types/states";

type Input = {
  type: InputType,
  value: Keyword | Ingredient | Diet,
};

const ingredientToInput = (i: Ingredient): Input => ({
  type: inputTypes.INGREDIENT,
  value: i,
});
const ingredientsToInputs = R.map(ingredientToInput);

const dietToInput = (d: Diet): Input => ({
  type: inputTypes.DIET,
  value: d,
});
const dietInputs = R.map(dietToInput, Object.values(diets));

const keywordToInput = (k: Keyword): Input => ({
  type: inputTypes.KEYWORD,
  value: k,
});
const keywordInputs = R.map(
  keywordToInput,
  Object.values(keywords).filter(k => k !== keywords.NONE)
);

const fuseOptions = {
  shouldSort: true,
  threshold: 0.5,
  location: 0,
  distance: 1,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["value"]
};

const computeItems = (
  maxItems: number,
  searchText: string,
  validInputs: Array<Input>
): Array<Input> => {
  const fuse = new Fuse(validInputs, fuseOptions);
  const items = fuse.search(searchText);
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
      ...validTypes.includes(inputTypes.KEYWORD) ? keywordInputs : [],
      ...validTypes.includes(inputTypes.INGREDIENT) ? ingredientsToInputs(validIngredients) : [],
      ...validTypes.includes(inputTypes.DIET) ? dietInputs : []
    ];

    const items = computeItems(maxItems, searchText, validItems);
    return (
      <div className={styles.autocomplete}>
        <div className={styles.autocompleteItems}>
          {items.map(i => {
              if (i.type === inputTypes.KEYWORD) {
                return (
                  <div key={i.value}>
                    <div className={styles.autocompleteItemKeyword}>
                      {i.value}
                    </div>
                  </div>
                );
              }
              return (<div key={i.value}>{i.value}</div>);
          })}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Autocomplete);
