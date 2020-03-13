// @flow
import React from "react";
import { connect } from "react-redux";
import * as colours from "constants/colours";
import { inputTypes } from "models/input";
import keywords, { toKeyword } from "models/keywords";

import styles from "styles/autocomplete.module.css";

import type { Node } from "react";
import type { State } from "types/states";
import type { Input } from "models/input";
import type { Keyword } from "models/keywords";

const getTokenColour = (keyword: Keyword): string => {
  switch (keyword) {
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

type ItemProps = {
  item: Input
};

const AutocompleteItem = ({ item, ...props }: ItemProps): Node => {
  if (item.type === inputTypes.KEYWORD) {
    const itemKeywordColor = getTokenColour(toKeyword(item.value));
    return (
      <div {...props}>
        <div
          className={styles.autocompleteItemKeyword}
          style={{ backgroundColor: itemKeywordColor }}
        >
          {item.value.toUpperCase()}
        </div>
      </div>
    );
  }
  return <div {...props}>{item.value}</div>;
};

type Props = {
  // redux
  autocompleteItems: Array<Input>,
  selectedIndex: number
};

const mapStateToProps = (state: State, ownProps) => ({
  autocompleteItems: state.searchbar.autocompleteItems,
  selectedIndex: state.searchbar.autocompleteSelection
});

class Autocomplete extends React.PureComponent<Props> {
  render() {
    const { autocompleteItems: items, selectedIndex } = this.props;

    return (
      <div className={styles.autocomplete}>
        <div className={styles.autocompleteItems}>
          {items.map((item, index) => (
            <AutocompleteItem
              item={item}
              key={item.value}
              className={
                index === selectedIndex ? styles.autocompleteActive : ""
              }
            />
          ))}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Autocomplete);
