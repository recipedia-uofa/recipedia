// @flow
import React from "react";
import { connect } from "react-redux";
import * as R from "ramda";
import noResultsImg from "assets/Sad_Plate.svg";
import RecipediaLogo from "assets/RecipediaLogo";
import RecipediaR from "assets/RecipediaR";
import SearchBar from "components/SearchBar";
import RecipeView from "components/RecipeView";
import UserGuide from "components/UserGuide";
import SuggestionToken from "components/SuggestionToken";
import SearchToken from "models/SearchToken";
import LoadingOverlay from "components/LoadingOverlay";
import searchbarStyle from "styles/searchbar.module.css";

import type { Ingredient } from "models/ingredient";
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
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column"
  },
  suggestionTokenContainer: {
    margin: "10px 0"
  },
  searchBarMinWidth: {
    minWidth: "85%"
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
  tokens: Array<SearchToken>,
  suggestions: Array<Ingredient>
};

class RecipediaApp extends React.Component<Props> {
  // REQ 8-1: Website Render Results State
  render() {
    const {
      resultsArePending,
      hasResults,
      showResults,
      tokens,
      suggestions
    } = this.props;

    const mode = getMode(resultsArePending, hasResults, showResults, tokens);

    if (mode !== resultModes.SEARCH_BAR_ONLY) {
      const style = withResultsStyle;
      return (
        <div>
          <UserGuide withResults={true} />
          <div className={searchbarStyle.resultsUpperContainer}>
            <div className={searchbarStyle.recipediaLogoContainer}>
              <RecipediaR data-testid="logo" />
            </div>
            <div style={style.searchBarMinWidth}>
              <SearchBar withResults={true} />
              <div style={style.suggestionTokenContainer}>
                {suggestions.map(s => (
                  <SuggestionToken key={s} suggestion={s} />
                ))}
              </div>
            </div>
          </div>
          <br />
          {mode === resultModes.NO_RESULTS && (
            <div style={style.noResultsContainer}>
              <img
                style={style.noResultsImage}
                src={noResultsImg}
                alt="No Results"
              />
              <div style={style.noResultsDescription}>No results found.</div>
            </div>
          )}
          {/* REQ 7-3: Recipe result loading bar */}
          {mode === resultModes.IS_LOADING && <LoadingOverlay />}
          {mode === resultModes.SHOW_RESULTS && <RecipeView />}
        </div>
      );
    }

    const style = noResultsStyle;
    return (
      <div style={style.upperContainer}>
        <UserGuide withResults={false} />
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
  tokens: state.searchbar.tokens,
  suggestions: state.results.suggestions
});

export default connect(mapStateToProps)(RecipediaApp);
