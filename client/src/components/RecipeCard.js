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

import type { Recipe } from "models/recipe";

type Props = {
  recipe: Recipe
};

class RecipeCard extends React.PureComponent<Props> {
  render() {
    const { recipe } = this.props;
    return (
      <div className={styles.RecipeCards}>
        <div className={styles.LogoContainer}>
          <div className={styles.RecipeCardSiteLogo}>
            <img
              className={styles.RecipeCardSiteLogoImage}
              src={allRecipesLogo}
              alt="AllRecipes.com"
            />
          </div>
        </div>
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
            <div className={styles.RecipeCardIngredientContainer}>
              <div className={styles.RecipeCardIngredientBox}>
                {recipe.ingredientsMatched.map(i => (
                  <div key={i} className={styles.RecipeCardIngredientItem}>
                    {i}
                  </div>
                ))}
                {recipe.ingredientsNotMatched.map(i => (
                  <div
                    key={i}
                    className={classNames(
                      styles.RecipeCardIngredientItem,
                      styles.NotMatchedIngredient
                    )}
                  >
                    {i}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.ScoreContainer}>
          <div className={styles.ScoreCircle}>
            <div className={styles.ScoreNumber} alt="0%">
              {recipe.nutritionScore}%
            </div>
          </div>
        </div>
        <div className={styles.SecondaryRecipeCardContainer}>
          <div
            className={classNames(
              styles.SecondaryRecipeCard,
              styles.CaloriesColor
            )}
          >
            <div className={styles.RecipeCardOffset}>
              <div className={styles.NutritionDescriptionItem}>
                <img
                  className={styles.NutritionDescriptionItemImage}
                  src={calorieImg}
                  alt="Calories"
                />
                <div
                  className={classNames(styles.LargeWordFont, styles.DietTitle)}
                >
                  Calories
                </div>
                <div
                  className={classNames(
                    styles.Center,
                    styles.NutritionDescriptionItem
                  )}
                >
                  <div className={styles.Bold}>
                    {recipe.nutritionalInfo.calories}
                  </div>
                  <div className={styles.SmallFont}>kcal</div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={classNames(styles.SecondaryRecipeCard, styles.FatColor)}
          >
            <div className={styles.RecipeCardOffset}>
              <div className={styles.NutritionDescriptionItem}>
                <img
                  className={styles.NutritionDescriptionItemImage}
                  src={fatImg}
                  alt="Fat"
                />
                <div className={styles.DietTitle}>Fat</div>
                <div
                  className={classNames(
                    styles.Center,
                    styles.NutritionDescriptionItem
                  )}
                >
                  <div className={styles.Bold}>
                    {recipe.nutritionalInfo.fat}g
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={classNames(
              styles.SecondaryRecipeCard,
              styles.CarbsColor
            )}
          >
            <div className={styles.RecipeCardOffset}>
              <div className={styles.NutritionDescriptionItem}>
                <img
                  className={styles.NutritionDescriptionItemImage}
                  src={carbsImg}
                  alt="Carbs"
                />
                <div className={styles.DietTitle}>Carbs</div>
                <div
                  className={classNames(
                    styles.Center,
                    styles.NutritionDescriptionItem
                  )}
                >
                  <div className={styles.Bold}>
                    {recipe.nutritionalInfo.carbs}g
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={classNames(
              styles.SecondaryRecipeCard,
              styles.ProteinColor
            )}
          >
            <div className={styles.RecipeCardOffset}>
              <div className={styles.NutritionDescriptionItem}>
                <img
                  className={styles.NutritionDescriptionItemImage}
                  src={proteinImg}
                  alt="Protein"
                />
                <div className={styles.DietTitle}>Protein</div>
                <div
                  className={classNames(
                    styles.Center,
                    styles.NutritionDescriptionItem
                  )}
                >
                  <div className={styles.Bold}>
                    {recipe.nutritionalInfo.protein}g
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={classNames(
              styles.SecondaryRecipeCard,
              styles.SugarColor
            )}
          >
            <div className={styles.RecipeCardOffset}>
              <div className={styles.NutritionDescriptionItem}>
                <img
                  className={styles.NutritionDescriptionItemImage}
                  src={sugarImg}
                  alt="Sugar"
                />
                <div className={styles.DietTitle}>Sugar</div>
                <div
                  className={classNames(
                    styles.Center,
                    styles.NutritionDescriptionItem
                  )}
                >
                  <div className={styles.Bold}>
                    {recipe.nutritionalInfo.sugar}g
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={classNames(
              styles.SecondaryRecipeCard,
              styles.ServingSize
            )}
          >
            <div className={styles.RecipeCardOffset}>
              <div className={styles.NutritionDescriptionItem}>
                <img
                  className={styles.NutritionDescriptionItemImage}
                  src={servingsizeImg}
                  alt="ServingSize"
                />
                <div
                  className={classNames(styles.LargeWordFont, styles.DietTitle)}
                >
                  Serving<br></br>Size
                </div>
                <div
                  className={classNames(
                    styles.Center,
                    styles.NutritionDescriptionItem
                  )}
                >
                  <div className={styles.Bold}>{recipe.servingSize}</div>
                  <div className={styles.SmallFont}>people</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeCard;
