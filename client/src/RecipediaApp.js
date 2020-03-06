// @flow
import React from "react";
import { connect } from "react-redux";
import SearchBar from "components/SearchBar";
import RecipeView from "components/RecipeView";

type Props = {|
  +showResults: boolean
|};

const noResultsStyle = {
  upperContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
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
    fontSize: "2em",
    fontStyle: "bold",
    verticalAlign: "middle",
    marginLeft: "1em",
    marginRight: "1em"
  }
};

class RecipediaApp extends React.Component<Props> {
  render() {
    if (this.props.showResults) {
      const style = withResultsStyle;
      return (
        <div>
          <div style={style.upperContainer}>
            <span style={style.title}>Recipedia</span>
            <SearchBar />
          </div>
          <br />
          <RecipeView />
        </div>
      );
    }

    const style = noResultsStyle;
    return (
      <div style={style.upperContainer}>
        <div style={style.verticalContainer}>
          <span style={style.title}>Recipedia</span>
          <SearchBar />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  showResults: state.results.visible
});

export default connect(mapStateToProps)(RecipediaApp);
