// @flow
import React from "react";
import { connect } from "react-redux";
import * as R from "ramda";
import Fuse from "fuse.js";

import styles from "styles/autocomplete.module.css";

import type { Ingredient, IngredientMap } from "models/ingredient";
import type { State } from "types/states";

const options = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 20,
  maxPatternLength: 32,
  minMatchCharLength: 1
};

// ([0, 2], ['a', 'b', 'c']) => ['a', 'c']
// See https://github.com/ramda/ramda/issues/1123
const pickIndexes = R.useWith(R.ap, [R.map(R.nth), R.of]);

const computeItems = (
  maxItems: number,
  searchText: string,
  validIngredients: Array<Ingredient>
): Array<Ingredient> => {
  const fuse = new Fuse(validIngredients, options);
  const matchIdxs = fuse.search(searchText);
  const items = pickIndexes(matchIdxs, validIngredients);
  return R.take(maxItems, items);
};

type Props = {
  maxItems: number,
  // redux
  searchText: string,
  validIngredients: Array<Ingredient>
};

const mapStateToProps = (state: State, ownProps) => ({
  searchText: state.searchbar.text,
  validIngredients: state.searchbar.validIngredientArray
});

// This component
class Autocomplete extends React.PureComponent<Props> {
  static defaultProps = {
    maxItems: 7
  };

  render() {
    const { searchText, validIngredients, maxItems } = this.props;

    const items = computeItems(maxItems, searchText, validIngredients);
    return (
      <div className={styles.autocomplete}>
        <div className={styles.autocompleteItems}>
          <div>
            <div className={styles.autocompleteItemKeyword}>
              DIET
            </div>
          </div>
          {items.map(i => (
            <div key={i}>{i}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Autocomplete);
