// @flow
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import TokenInput from 'react-customize-token-input';
import styles from "styles/searchbar.module.css";
import * as colours from "constants/colours";
import { executeSearch } from "actions";
import { loadValidIngredients } from "actions/searchbar";
// import TokenCreator from "components/TokenCreator";
import TokenInput from "components/TokenInput";

import type { State } from "types/states";

const BORDER_WIDTH = 1;
const CORNER_RADIUS = 15;

const style = {
  outerSearchBox: {
    border: `${BORDER_WIDTH}px solid ${colours.LIGHT_BACKGROUND_DEFAULT_COLOUR}`,
    borderRadius: `${CORNER_RADIUS}px`,
    padding: CORNER_RADIUS - BORDER_WIDTH,
    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
    height: "auto",
    display: "flex",
    flexWrap: "nowrap",
    boxSizing: "border-box",
    width: "100%"
  },
  searchButton: {
    flex: `0 1 ${CORNER_RADIUS + 50}`,
    alignSelf: "stretch",
    color: "grey",
    borderRadius: `${CORNER_RADIUS}px`,
    margin: "0 auto",
    marginTop: `${CORNER_RADIUS}px`,
    padding: `${CORNER_RADIUS}px`
  },
  noError: {
    opacity: 0,
    // width: 0,
    // padding: 0,
  },
  displayError: {
    opacity: 1,
    // width: "200px",
    // padding: "10px",
  }
};

type Props = {
  // redux
  errorMessage: string,
  executeSearch: () => void,
  loadValidIngredients: () => void
};

const mapStateToProps = (state: State, ownProps) => ({
  errorMessage: state.searchbar.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      executeSearch,
      loadValidIngredients
    },
    dispatch
  );

class SearchBar extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.loadValidIngredients();
  }

  render() {
    const { errorMessage } = this.props;
    const showError = errorMessage !== "";

    return (
      <div className={styles.searchContainer}>
        <div style={style.outerSearchBox}>
          <TokenInput autoFocus />
        </div>
        <span className={styles.toolTipError} style={showError ? style.displayError : style.noError}>{errorMessage}</span>
        <div className={styles.buttonContainer}>
          <button
            type="button"
            className={styles.searchButtonAttitude}
            style={style.searchButton}
            onClick={this.props.executeSearch}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
