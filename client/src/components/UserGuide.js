// @flow
import React from "react";
import styles from "styles/userguide.module.css";
import backspaceGif from "assets/userguide/Backspace_Token.gif";
import xGif from "assets/userguide/Click_X_Token.gif";
import IngredientAutocompleteClickGif from "assets/userguide/Ingredient_Autocomplete_Click.gif";
import IngredientAutocompleteTabGif from "assets/userguide/Ingredient_Autocomplete_Tab.gif";
import IngredientEnterGif from "assets/userguide/Ingredient_Enter.gif";
import KeywordAutocompleteClickGif from "assets/userguide/Keyword_Autocomplete_Click.gif";
import KeywordAutocompleteTabGif from "assets/userguide/Keyword_Autocomplete_Tab.gif";
import KeywordEnterGif from "assets/userguide/Keyword_Enter.gif";
import KeywordMergeGif from "assets/userguide/Keyword_Merge_Token.gif";
import RecipecardClickGif from "assets/userguide/Recipecard_Click.gif";
import RecipecardHoverGif from "assets/userguide/Recipecard_Hover.gif";
import RecipecardNutritionGif from "assets/userguide/Recipecard_Nutrition.gif";
import keywordStyle from "styles/autocomplete.module.css";
import {
  KEY_KEYWORD_COLOUR,
  NOT_KEYWORD_COLOUR,
  DIET_KEYWORD_COLOUR
} from "constants/colours";
import classNames from "classnames";

const localStyle = {
  closed: {
    width: "0",
    height: "0",
    padding: "0"
  },
  open: {
    width: "38%",
    height: "750px"
  },
  moveIcon: {
    left: "41%"
  },
  show: {
    opacity: "1"
  },
  hide: {
    opacity: "0"
  },
  absoluteUserGuide: {
    position: "absolute",
    top: "20px",
    left: "20px",
    width: "100%"
  },
  stickyUserGuide: {
    position: "-webkit-sticky",
    position: "sticky",
    top: "20px",
    width: "100%",
    zIndex: "99"
  },
  keywordDiv: {
    display: "flex",
    flexWrap: "wrap",
    padding: "10px",
    alignItems: "center"
  },
  keywordDivText: {
    marginLeft: "10px",
    fontSize: "18px",
    width: "80%"
  }
};

type Props = {
  withResults: boolean
};

type State = {
  isOpen: boolean
};

class UserGuide extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { isOpen: false };

    this.changeState = this.changeState.bind(this);
  }

  changeState = () => {
    const { isOpen } = this.state;
    if (isOpen) {
      this.setState({ isOpen: false });
    } else {
      this.setState({ isOpen: true });
    }
  };

  render() {
    const { isOpen } = this.state;
    const { withResults } = this.props;

    return (
      <div
        className={
          withResults ? styles.stickyUserGuide : styles.absoluteUserGuide
        }
      >
        <div
          className={
            isOpen
              ? classNames(styles.guideContainer, styles.open)
              : classNames(styles.guideContainer, styles.closed)
          }
        >
          <div
            className={styles.guideScrollContainer}
            style={isOpen ? localStyle.show : localStyle.hide}
          >
            <h1 className={styles.endStartHeader}>User Guide</h1>
            <p>
              Welcome to Recipedia! A website that will help you look for
              recipes on the web with your own pantry! This guide will help you
              utilize the site.
            </p>
            <h2>Entering Ingredients</h2>
            <p>
              Enter ingredients by typing out the ingredient word then press
              enter once complete.
            </p>
            <img
              className={styles.guideImage}
              src={IngredientEnterGif}
              alt="Guide"
            />
            <p>
              You can also select the proper ingredient from the visible{" "}
              <i>Autocomplete</i> box by either using the arrow keys then
              pressing the <strong>Tab</strong> key...
            </p>
            <img
              className={styles.guideImage}
              src={IngredientAutocompleteTabGif}
              alt="Guide"
            />
            <p>
              Or by using the mouse to <strong>Click</strong> the desired
              ingredient.
            </p>
            <img
              className={styles.guideImage}
              src={IngredientAutocompleteClickGif}
              alt="Guide"
            />
            <h2>Entering Keywords</h2>
            <p>
              Recipedia includes a special feature to enhance the experience of
              searching for meaningful recipes. Keywords have been created to
              help you search for unique recipes
            </p>
            <div>
              <div style={localStyle.keywordDiv}>
                <div
                  className={keywordStyle.autocompleteItemKeyword}
                  style={{ backgroundColor: KEY_KEYWORD_COLOUR }}
                >
                  KEY
                </div>
                <div style={localStyle.keywordDivText}>
                  <i>
                    Used for specifying ingredients that <strong>must</strong>{" "}
                    be included in recipes
                  </i>
                </div>
              </div>
              <div style={localStyle.keywordDiv}>
                <div
                  className={keywordStyle.autocompleteItemKeyword}
                  style={{ backgroundColor: DIET_KEYWORD_COLOUR }}
                >
                  DIET
                </div>
                <div style={localStyle.keywordDivText}>
                  <i>
                    Used for showing recipes that conform to a{" "}
                    <strong>specified</strong> diet. The following diets are
                    supported:
                  </i>
                  <ul>
                    <li>Vegetarian</li>
                    <li>Vegan</li>
                    <li>Gluten free</li>
                    <li>Lactose Free</li>
                    <li>Pescatarian</li>
                  </ul>
                </div>
              </div>
              <div style={localStyle.keywordDiv}>
                <div
                  className={keywordStyle.autocompleteItemKeyword}
                  style={{ backgroundColor: NOT_KEYWORD_COLOUR }}
                >
                  NOT
                </div>
                <div style={localStyle.keywordDivText}>
                  <i>
                    Used for specifying ingredients that{" "}
                    <strong>must not</strong> be included in recipes
                  </i>
                </div>
              </div>
            </div>
            <p>
              To create keywords, simply type out the keyword fully and pressing
              enter
            </p>
            <img
              className={styles.guideImage}
              src={KeywordEnterGif}
              alt="Guide"
            />
            <p>
              Or select it from the <i>Autocomplete</i> box using arrow keys
              then pressing <strong>Tab</strong>
            </p>
            <img
              className={styles.guideImage}
              src={KeywordAutocompleteTabGif}
              alt="Guide"
            />
            <p>
              or by using the mouse to <strong>Click</strong> the keyword
            </p>
            <img
              className={styles.guideImage}
              src={KeywordAutocompleteClickGif}
              alt="Guide"
            />
            <p>
              Once the keyword has been generated, continue to enter the
              specified ingredient, or diet, using similar methods above. Once
              complete, the keyword should look something like this
            </p>
            <img
              className={styles.guideImage}
              src={KeywordMergeGif}
              alt="Guide"
            />
            <p>
              Recipe results will start showing immediately for every ingredient
              and keyword that is entered.
            </p>
            <h2>Removing Ingredients</h2>
            <p>
              To remove any of the ingredients or diets that have been added,
              either press the <strong>Backspace</strong> key
            </p>
            <img className={styles.guideImage} src={backspaceGif} alt="Guide" />
            <p>
              or click the <strong>X</strong> that is right beside the
              ingredient
            </p>
            <img className={styles.guideImage} src={xGif} alt="Guide" />
            <h2>Observing recipes</h2>
            <p>
              You now have some recipes to choose from based on the ingredients
              and diets you may have entered! Recipedia allows you to quickly
              view some brief nutritional information by simply hovering over
              any of the recipes
            </p>
            <img
              className={styles.guideImage}
              src={RecipecardHoverGif}
              alt="Guide"
            />
            <p>Hover over each nutrition stat to get the category</p>
            <img
              className={styles.guideImage}
              src={RecipecardNutritionGif}
              alt="Guide"
            />
            <p>
              Finally, to view the recipe from its original site location,
              simply <strong>Click</strong> the recipe card!
            </p>
            <img
              className={styles.guideImage}
              src={RecipecardClickGif}
              alt="Guide"
            />
            <br></br>
            <p style={{ textAlign: "center" }}>
              Now you understand how to use the site!
            </p>
            <h1 className={styles.endStartHeader}>Happy Cooking!</h1>
          </div>
        </div>
        <div
          className={
            isOpen
              ? classNames(styles.infoIconContainer, styles.moveIcon)
              : styles.infoIconContainer
          }
          onClick={this.changeState}
        >
          <div className={isOpen ? styles.closeIcon : styles.infoIcon}>
            <div
              className={
                isOpen ? styles.closeIconContent : styles.infoIconContent
              }
            >
              {isOpen ? "X" : "i"}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserGuide;
