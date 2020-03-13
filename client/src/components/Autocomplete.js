// @flow
import React from "react";
import { connect } from "react-redux";
import * as colours from "constants/colours";
import { inputTypes } from "models/input";
import keywords, { toKeyword } from "models/keywords";

import styles from "styles/autocomplete.module.css";

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

type Props = {
  // redux
  autocompleteItems: Array<Input>
};

const mapStateToProps = (state: State, ownProps) => ({
  autocompleteItems: state.searchbar.autocompleteItems
});

class Autocomplete extends React.PureComponent<Props> {
  render() {
    const { autocompleteItems: items } = this.props;

    return (
      <div className={styles.autocomplete}>
        <div className={styles.autocompleteItems}>
          {items.map(i => {
            if (i.type === inputTypes.KEYWORD) {
              const itemKeywordColor = getTokenColour(toKeyword(i.value));
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
