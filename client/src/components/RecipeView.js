// @flow
import React from "react";
import { connect } from "react-redux";
import RecipeCard from "components/RecipeCard";
import type { Recipe } from "models/recipe";
import styles from "styles/searchbar.module.css";

type Props = {
  recipes: Array<Recipe>
};

const style = {
  recipeView: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "90%",
    marginLeft: "5%"
  }
};

class RecipeView extends React.PureComponent<Props> {
  render() {
    const { recipes } = this.props;
    const recipeItems = recipes.map(r => <RecipeCard key={r.url} recipe={r} />);

    return <div className={styles.recipeView}>{recipeItems}</div>;
  }
}

const mapStateToProps = (state, ownProps) => ({
  recipes: state.results.recipes
});

export default connect(mapStateToProps)(RecipeView);
