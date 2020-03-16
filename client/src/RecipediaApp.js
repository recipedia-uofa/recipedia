// @flow
import React from "react";
import { connect } from "react-redux";
import * as R from "ramda";
import noResultsImg from "assets/Sad_Plate.svg";
import { ReactComponent as RecipediaLogo } from "assets/RecipediaLogo.svg";
import SearchBar from "components/SearchBar";
import RecipeView from "components/RecipeView";
import UserGuide from "components/UserGuide";
import SearchToken from "models/SearchToken";

import type { State } from "types/states";

const noResultsStyle = {
  upperContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20vh"
  },
  verticalContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "35%",
    maxWidth: "90%"
  },
  title: {
    fontSize: "4em",
    fontStyle: "bold",
    alignText: "center"
  }
};

const withResultsStyle = {
  upperContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "81%",
    marginLeft: "7%",
    maxWidth: "90%"
  },
  title: {
    marginTop: 100,
    width: "20%"
  },
  noResultsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "20%",
    margin: "0 auto",
    marginTop: "10%"
  },
  noResultsImage: {
    float: "left",
    width: "75%",
    height: "100%",
    position: "relative",
    bottom: 0,
    left: 0,
    marginBottom: "10%",
    opacity: 0.5
  },
  noResultsDescription: {
    color: "grey",
    fontSize: "30px"
  }
};

const resultModes = {
  SEARCH_BAR_ONLY: "SEARCH_BAR_ONLY",
  IS_LOADING: "IS_LOADING",
  NO_RESULTS: "NO_RESULTS",
  SHOW_RESULTS: "SHOW_RESULTS"
};

type ResultMode = $Keys<typeof resultModes>;

const isEmptySearchQuery = (tokens: Array<SearchToken>): boolean => {
  return R.isEmpty(R.filter(t => !t.isPartial() && t.isIngredient(), tokens));
};

const getMode = (
  resultsArePending: boolean,
  hasResults: boolean,
  showResults: boolean,
  tokens: Array<SearchToken>
): ResultMode => {
  if (resultsArePending) {
    return resultModes.IS_LOADING;
  }
  // resultsArePending == false

  if (!showResults || isEmptySearchQuery(tokens)) {
    return resultModes.SEARCH_BAR_ONLY;
  }
  // showResults == true

  if (!hasResults) {
    return resultModes.NO_RESULTS;
  }

  return resultModes.SHOW_RESULTS;
};

type Props = {
  resultsArePending: boolean,
  hasResults: boolean,
  showResults: boolean,
  tokens: Array<SearchToken>
};

class RecipediaApp extends React.Component<Props> {
  render() {
    const { resultsArePending, hasResults, showResults, tokens } = this.props;

    const mode = getMode(resultsArePending, hasResults, showResults, tokens);

    if (mode !== resultModes.SEARCH_BAR_ONLY) {
      const style = withResultsStyle;
      return (
        <div>
          <UserGuide />
          <div style={style.upperContainer}>
            <RecipediaLogo data-testid="logo" />
            <SearchBar withResults={true} />
          </div>
          <br />
          {mode === resultModes.NO_RESULTS && (
            <div style={style.noResultsContainer}>
              <img
                style={style.noResultsImage}
                src={noResultsImg}
                alt="test image"
              />
              <div style={style.noResultsDescription}>No results found.</div>
            </div>
          )}
          {mode === resultModes.SHOW_RESULTS && <RecipeView />}
        </div>
      );
    }

    const style = noResultsStyle;
    return (
      <div style={style.upperContainer}>
        <UserGuide />
        <div style={style.verticalContainer}>
          <RecipediaLogo data-testid="logo" />
          <SearchBar withResults={false} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State, ownProps) => ({
  resultsArePending: state.results.isPending,
  hasResults: !R.isEmpty(state.results.recipes),
  showResults: state.results.visible,
  tokens: state.searchbar.tokens
});

export default connect(mapStateToProps)(RecipediaApp);
