// @flow
import React from "react";
import { connect } from "react-redux";
import RecipeCard from "components/RecipeCard";

type Props = {|
  recipes: Array<string>
|};

const style = {
  recipeView: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center"
  }
};

class RecipeView extends React.PureComponent<Props> {
  render() {
    const { recipes } = this.props;
    const recipeItems = recipes.map(r => <RecipeCard key={r} title={r} />);

    return <div style={style.recipeView}>{recipeItems}</div>;
  }
}

const mapStateToProps = (state, ownProps) => ({
  recipes: state.results.recipes
});

export default connect(mapStateToProps)(RecipeView);
