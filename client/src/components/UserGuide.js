// @flow
import React from "react";
import styles from "styles/userguide.module.css";
import gif from "assets/test_gif.gif";
import keywordStyle from "styles/autocomplete.module.css";
import {
  KEY_KEYWORD_COLOUR,
  NOT_KEYWORD_COLOUR,
  DIET_KEYWORD_COLOUR,
  INGREDIENT_COLOUR
} from "constants/colours";

const localStyle = {
  closed: {
    width: "0",
    height: "0",
    padding: "0"
  },
  open: {
    width: "35%",
    height: "750px"
  },
  moveIcon: {
    left: "38%"
  },
  show: {
    opacity: "1"
  },
  hide: {
    opacity: "0"
  },
  stick: {
    position: "-webkit-sticky",
    position: "sticky",
    top: "0"
  },
  stickyUserGuide: {
    position: "-webkit-sticky",
    position: "sticky",
    top: "20px",
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

type Props = {};

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

    return (
      <div style={localStyle.stickyUserGuide}>
        <div
          className={styles.guideContainer}
          style={isOpen ? localStyle.open : localStyle.closed}
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
            <p>
              <i>Insert Gif</i>
            </p>
            <p>
              You can also select the proper ingredient from the visible{" "}
              <i>Autocomplete</i> box by either using the arrow keys then
              pressing the TAB key...
            </p>
            <p>
              <i>Enter Gif</i>
            </p>
            <p>Or by using the mouse to "click" the desired ingredient.</p>
            <p>
              <i>Enter Gif</i>
            </p>
            <h2>Entering Keywords</h2>
            <p>
              Recipedia includes a special feature to enhance the experience of
              searching for meaningful recipes. Keywords have been created to
              help you search for unique recipes
            </p>
            <p>
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
                    <li>Diet 1</li>
                    <li>Diet 2</li>
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
            </p>
            <p>
              To create keywords, simply type out the keyword fully and pressing
              enter
            </p>
            <p>
              <i>Insert Gif</i>
            </p>
            <p>
              Or select it from the <i>Autocomplete</i> box using arrow keys
              then pressing TAB
            </p>
            <p>
              <i>Insert Gif</i>
            </p>
            <p>or by using the mouse to "click" the keyword</p>
            <p>
              <i>Insert Gif</i>
            </p>
            <p>
              Once the keyword has been generated, continue to enter the
              specified ingredient, or diet, using similar methods above. Once
              complete, the keyword should look something like this
            </p>
            <p>
              <i>Insert Gif</i>
            </p>
            <p>
              Recipe results will start showing immediately for every ingredient
              and keyword that is entered.
            </p>
            <img className={styles.guideImage} src={gif} alt="Guide" />
            <h2>Observing recipes</h2>
            <p>
              You now have some recipes to choose from based on the ingredients
              and diets you may have entered! Recipedia allows you to quickly
              view some brief nutritional information by simply hovering over
              any of the recipes
            </p>
            <p>
              <i>Insert Gif</i>
            </p>
            <p>Hover over each nutrition stat to get the category</p>
            <p>
              <i>Insert Gif</i>
            </p>
            <p>
              Finally, to view the recipe from its original site location,
              simply "click" the recipe card!
            </p>
            <p>
              <i>Insert Gif</i>
            </p>
            <br></br>
            <p style={{ textAlign: "center" }}>
              Now you understand how to use the site!
            </p>
            <h1 className={styles.endStartHeader}>Happy Cooking!</h1>
          </div>
        </div>
        <div
          className={styles.infoIconContainer}
          style={isOpen ? localStyle.moveIcon : { left: "2%" }}
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
