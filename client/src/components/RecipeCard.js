// @flow
import React from "react";
import styles from "styles/recipecard.module.css";
import classNames from "classnames";
import allRecipesLogo from "assets/AllRecipes_logo.jpg";
import eggPhoto from "assets/Egg_Soup.jpg";
//-------------ICONS--------------
// TODO: Determine whether this is a good implementation
import calorieImg from "assets/icons/flame.svg";
import fatImg from "assets/icons/oil_drop.svg";
import carbsImg from "assets/icons/carbs.svg";
import proteinImg from "assets/icons/protein.svg";
import sugarImg from "assets/icons/Sugar_Cube.svg";
import servingsizeImg from "assets/icons/Fork_1.svg";

import type { Node } from "react";
import type { Recipe } from "models/recipe";
import type { Ingredient } from "models/ingredient";

//Constants
const MAX_INGREDIENT_SIZE = 135;

type Props = {
  recipe: Recipe
};

type NutritionInfoProps = {
  className: string,
  details: number,
  icon: string,
  title: Node | string,
  tag: string,
  isLargeTitle: boolean
};

class NutritionInfoCard extends React.PureComponent<NutritionInfoProps> {
  render() {
    const { className, details, icon, title, tag, isLargeTitle } = this.props;
    return (
      <div className={classNames(styles.SecondaryRecipeCard, className)}>
        <div className={styles.RecipeCardOffset}>
          <div className={styles.NutritionDescriptionItem}>
            <img
              className={styles.NutritionDescriptionItemImage}
              src={icon}
              alt={title}
            />
            <div
              className={
                isLargeTitle
                  ? classNames(styles.LargeWordFont, styles.DietTitle)
                  : styles.DietTitle
              }
            >
              {title}
            </div>
            <div
              className={classNames(
                styles.Center,
                styles.NutritionDescriptionItem
              )}
            >
              <div className={styles.Bold}>{details}</div>
              <div className={isLargeTitle ? styles.SmallFont : styles.Bold}>
                {tag}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class SecondaryRecipeCards extends React.PureComponent<Props> {
  render() {
    const { recipe } = this.props;
    return (
      <div className={styles.SecondaryRecipeCardContainer}>
        <NutritionInfoCard
          details={recipe.nutritionalInfo.calories}
          icon={calorieImg}
          title="Calories"
          tag="kcal"
          className={styles.CaloriesColor}
          isLargeTitle={true}
        />
        <NutritionInfoCard
          details={recipe.nutritionalInfo.fat}
          icon={fatImg}
          title="Fat"
          tag="g"
          className={styles.FatColor}
          isLargeTitle={false}
        />
        <NutritionInfoCard
          details={recipe.nutritionalInfo.carbs}
          icon={carbsImg}
          title="Carbs"
          tag="g"
          className={styles.CarbsColor}
          isLargeTitle={false}
        />
        <NutritionInfoCard
          details={recipe.nutritionalInfo.protein}
          icon={proteinImg}
          title="Protein"
          tag="g"
          className={styles.ProteinColor}
          isLargeTitle={false}
        />
        <NutritionInfoCard
          details={recipe.nutritionalInfo.sugar}
          icon={sugarImg}
          title="Sugar"
          tag="g"
          className={styles.SugarColor}
          isLargeTitle={false}
        />
        <NutritionInfoCard
          details={recipe.servingSize}
          icon={servingsizeImg}
          title={
            <span>
              Serving<br></br>Size
            </span>
          }
          tag="people"
          className={styles.ServingSize}
          isLargeTitle={true}
        />
      </div>
    );
  }
}

type IngredientTokenProps = {
  ingredient: Ingredient,
  isMatched: boolean
};

class RecipeIngredientToken extends React.PureComponent<IngredientTokenProps> {
  render() {
    const { ingredient, isMatched } = this.props;
    return (
      <div
        key={ingredient}
        className={
          isMatched
            ? styles.RecipeCardIngredientItem
            : classNames(
                styles.RecipeCardIngredientItem,
                styles.NotMatchedIngredient
              )
        }
      >
        {ingredient}
      </div>
    );
  }
}

type ScoreProps = {
  recipeScore: number
};

class RecipeScore extends React.PureComponent<ScoreProps> {
  render() {
    const { recipeScore } = this.props;
    return (
      <div className={styles.ScoreContainer}>
        <div className={styles.ScoreCircle}>
          <div className={styles.ScoreNumber} alt="0%">
            {recipeScore}%
          </div>
        </div>
      </div>
    );
  }
}

type LogoProps = {
  logoImg: string,
  logoAlt: string
};

class RecipeLogo extends React.PureComponent<LogoProps> {
  render() {
    const { logoImg, logoAlt } = this.props;
    return (
      <div className={styles.LogoContainer}>
        <div className={styles.RecipeCardSiteLogo}>
          <img
            className={styles.RecipeCardSiteLogoImage}
            src={logoImg}
            alt={logoAlt}
          />
        </div>
      </div>
    );
  }
}

type IngredientBoxProps = {
  matchedIngredients: Array<Ingredient>,
  notMatchedIngredients: Array<Ingredient>
};

class RecipeIngredientBox extends React.PureComponent<IngredientBoxProps> {
  render() {
    const { matchedIngredients, notMatchedIngredients } = this.props;
    return (
      <div className={styles.RecipeCardIngredientBox}>
        {matchedIngredients.map(i => (
          <RecipeIngredientToken key={i} ingredient={i} isMatched={true} />
        ))}
        {notMatchedIngredients.map(i => (
          <RecipeIngredientToken key={i} ingredient={i} isMatched={false} />
        ))}
      </div>
    );
  }
}

type PrimaryCardState = {
  ingredientBoxWidth: ?number
};

// NOTE: May need to fix the typing to fit well with flow
class PrimaryRecipeCard extends React.PureComponent<Props, PrimaryCardState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ingredientBoxWidth: null
    };
    this.setIngredientBoxWidth = this.setIngredientBoxWidth.bind(this);
  }

  setIngredientBoxWidth = (w: number) => {
    if (this.state.ingredientBoxWidth === w) {
      return;
    }

    this.setState({ ingredientBoxWidth: w });
  };

  checkLargeIngredientAmount() {
    const { ingredientBoxWidth } = this.state;
    if (ingredientBoxWidth && ingredientBoxWidth > MAX_INGREDIENT_SIZE) {
      return (
        <div className={styles.maxIngredientContainer}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      );
    }
  }

  render() {
    const { recipe } = this.props;
    return (
      <div className={styles.RecipeCardContainer}>
        <div className={styles.RecipeCardImageContainer}>
          <img
            className={styles.RecipeCardImage}
            src={eggPhoto}
            alt={recipe.title}
          />
        </div>
        <div className={styles.RecipeCardTitle}>{recipe.title}</div>
        <div className={styles.RecipeCardDescription}>
          <div
            className={styles.RecipeCardDescriptionContainer}
            ref={el => el && this.setIngredientBoxWidth(el.offsetHeight)}
          >
            <RecipeIngredientBox
              matchedIngredients={recipe.ingredientsMatched}
              notMatchedIngredients={recipe.ingredientsNotMatched}
            />
          </div>
        </div>
        {this.checkLargeIngredientAmount()}
      </div>
    );
  }
}

class RecipeCard extends React.PureComponent<Props> {
  render() {
    const { recipe } = this.props;

    const recipe_url = recipe.url;

    return (
      <div
        className={styles.RecipeCards}
        onClick={() => window.open(recipe_url, "_blank")}
      >
        <RecipeLogo logoImg={allRecipesLogo} logoAlt="A|R" />
        <PrimaryRecipeCard recipe={recipe} />
        <RecipeScore recipeScore={recipe.nutritionScore} />
        <SecondaryRecipeCards recipe={recipe} />
      </div>
    );
  }
}

export default RecipeCard;
