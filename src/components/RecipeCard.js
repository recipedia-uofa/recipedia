// @flow
import React from 'react';
import { connect } from 'react-redux';
import styles from 'styles/recipecard.module.css';
import allRecipesLogo from 'assets/AllRecipes_logo.jpg';
import eggPhoto from 'assets/Egg_Soup.jpg';

type Props = {||};

class RecipeCard extends React.PureComponent<Props> {
    render() {
        return (
            <div>
                <div className={styles.LogoContainer}>
                    <div className={styles.RecipeCardSiteLogo}>
                        <img src={allRecipesLogo} className={styles.RecipeCardSiteLogoImage} />
                    </div>
                </div>
                <div className={styles.RecipeCardContainer}>
                    <div className={styles.RecipeCardImageContainer}>
                        <img src={eggPhoto} className={styles.RecipeCardImage} />
                    </div>
                    <div className={styles.RecipeCardTitle}>Soup... but with EGGS!</div>
                    <div className={styles.RecipeCardDescription}>If you really like eggs, then you will really like this recipe.<br/><br/>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi deleniti accusamus veniam nihil sapiente repudiandae ducimus cumque quisquam nam sed sint est voluptas ex, aspernatur quia adipisci eius. Ducimus, quaerat!</div>
                </div>
            </div>
        );
    }
}

export default RecipeCard;