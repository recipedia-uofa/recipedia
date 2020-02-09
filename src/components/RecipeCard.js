// @flow
import React from 'react';
import styles from 'styles/recipecard.module.css';
import allRecipesLogo from 'assets/AllRecipes_logo.jpg';
import eggPhoto from 'assets/Egg_Soup.jpg';

type Props = {|
  title: string,
|};

class RecipeCard extends React.PureComponent<Props> {
    render() {
        const { title } = this.props;
        return (
            <div>
                <div className={styles.LogoContainer}>
                    <div className={styles.RecipeCardSiteLogo}>
                        <img className={styles.RecipeCardSiteLogoImage} src={allRecipesLogo} alt="AllRecipes.com"/>
                    </div>
                </div>
                <div className={styles.RecipeCardContainer}>
                    <div className={styles.RecipeCardImageContainer}>
                        <img className={styles.RecipeCardImage} src={eggPhoto} alt="Recipe" />
                    </div>
                    <div className={styles.RecipeCardTitle}>{title}</div>
                    <div className={styles.RecipeCardDescription}>If you really like eggs, then you will really like this recipe.<br/><br/>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi deleniti accusamus veniam nihil sapiente repudiandae ducimus cumque quisquam nam sed sint est voluptas ex, aspernatur quia adipisci eius. Ducimus, quaerat!</div>
                </div>
            </div>
        );
    }
}

export default RecipeCard;
