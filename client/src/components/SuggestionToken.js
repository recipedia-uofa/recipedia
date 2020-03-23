// @flow
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as colours from "constants/colours";
import { addSuggestion } from "actions/searchbar";

import type { Ingredient } from "models/ingredient";
import suggestionStyle from "styles/searchbar.module.css";

const style = {
  outerBox: {
    backgroundColor: colours.KEY_KEYWORD_COLOUR,
    color: "white"
  }
};

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
      <div className={suggestionStyle.suggestionBox} style={style.outerBox} onClick={() => addSuggestion(suggestion)}>
        {"+ " + suggestion}
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(SuggestionToken);
