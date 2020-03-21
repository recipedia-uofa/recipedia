// @flow
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import TokenInput from 'react-customize-token-input';
import styles from "styles/searchbar.module.css";
import SearchIcon from "assets/search-egg.png";
import * as colours from "constants/colours";
import { executeSearch } from "actions";
import { loadValidIngredients } from "actions/searchbar";
// import TokenCreator from "components/TokenCreator";
import TokenInput from "components/TokenInput";

const BORDER_WIDTH = 1;
const CORNER_RADIUS = 15;

const style = {
  outerSearchBox: {
    border: `${BORDER_WIDTH}px solid ${colours.LIGHT_BACKGROUND_DEFAULT_COLOUR}`,
    backgroundColor: "white",
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
  searchButtonResults: {
    flex: `0 1 ${CORNER_RADIUS + 50}`,
    alignSelf: "stretch",
    color: "grey",
    borderRadius: `${CORNER_RADIUS}px`,
    marginLeft: `${CORNER_RADIUS}px`,
    padding: `${CORNER_RADIUS}px`
  },
  rowResults: {
    flexDirection: "row"
  },
  columnResults: {
    flexDirection: "column"
  }
};

type Props = {
  // redux
  errorMessage: string,
  executeSearch: () => void,
  loadValidIngredients: () => void,
  withResults: boolean
};

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
    const { withResults } = this.props;
    return (
      <div
        className={styles.searchContainer}
        style={withResults ? style.rowResults : style.columnResults}
      >
        <div style={style.outerSearchBox}>
          <TokenInput autoFocus />
          {withResults && (
            <div
              className={styles.searchIconContainer}
              onClick={this.props.executeSearch}
            >
              <span>
                <img src={SearchIcon} className={styles.searchIconImg} />
              </span>
            </div>
          )}
        </div>
        {!withResults && (
          <div className={styles.buttonContainer}>
            <button
              type="button"
              className={styles.searchButtonAttitude}
              style={
                withResults ? style.searchButtonResults : style.searchButton
              }
              onClick={this.props.executeSearch}
            >
              Search
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(SearchBar);
