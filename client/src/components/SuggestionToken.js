// @flow
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as colours from "constants/colours";
import { addSuggestion } from "actions/searchbar";

import type { Ingredient } from "models/ingredient";
import suggestionStyle from "styles/searchbar.module.css";

const style = {
  symbol: {
    fontSize: "20px",
    fontWeight: "600",
    paddingRight: "5px",
    transformOrigin: "50% 60%",
    transform: "scale(1.3)",
  },
  contentContainer: {
    display: "flex",
    alignItems: "center",
  }
}

type Props = {
  suggestion: Ingredient,
  // redux
  addSuggestion: (suggestion: Ingredient) => void
};

const mapDispatchToProps = (dispatch: *) =>
  bindActionCreators(
    {
      addSuggestion
    },
    dispatch
  );

class SuggestionToken extends React.PureComponent<Props> {
  render() {
    const { suggestion, addSuggestion } = this.props;
    return (
      <div className={suggestionStyle.suggestionBox} onClick={() => addSuggestion(suggestion)}>
        <div style={style.contentContainer}>
          <div style={style.symbol}>+</div>
          {suggestion}
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(SuggestionToken);
