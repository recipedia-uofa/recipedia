// @flow
import React from "react";
import { connect } from "react-redux";
import noResultsImg from "assets/Sad_Plate.svg";
import SearchBar from "components/SearchBar";
import RecipeView from "components/RecipeView";
import UserGuide from "components/UserGuide";

type Props = {|
  +showResults: boolean,
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
  },
  noResultsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "20%",
    margin: "0 auto",
    marginTop: "10%",
  },
  noResultsImage: {
    float: "left",
    width: "75%",
    height: "100%",
    position: "relative",
    bottom: 0,
    left: 0,
    marginBottom: "10%",
    opacity: 0.5,
  },
  noResultsDescription: {
    color: "grey",
    fontSize: "30px",
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
          <UserGuide />
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
      <div>
        <div style={style.upperContainer}>
          <UserGuide />
          <div style={style.verticalContainer}>
            <span style={style.title}>Recipedia</span>
            <SearchBar />
          </div>
        </div>
        <div style={style.noResultsContainer}>
          <img style={style.noResultsImage} src={noResultsImg}/>
          <div style={style.noResultsDescription}>No results found.</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  showResults: state.results.visible,
});

export default connect(mapStateToProps)(RecipediaApp);
