// @flow
import React from "react";
import styles from "styles/userguide.module.css";
import gif from "assets/test_gif.gif";

const localStyle = {
  closed: {
    width: "0",
    height: "0"
  },
  open: {
    width: "27%",
    height: "80%"
  },
  moveIcon: {
    left: "30%"
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
    top: "0",
  },
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
      <div>
        <div
          className={styles.guideContainer}
          style={isOpen ? localStyle.open : localStyle.closed}
        >
          <div
            className={styles.guideScrollContainer}
            style={isOpen ? localStyle.show : localStyle.hide}
          >
            <h1>User Guide</h1>
            <p>
              Welcome to Recipedia! The following guide will help you utilize
              the site.
            </p>
            <h2>Entering Ingredients</h2>
            <p>Enter information for ingredients</p>
            <h2>Entering Keywords</h2>
            <p>Enter information for keywords</p>
            <img className={styles.guideImage} src={gif} alt="Guide" />
            <h2>Searching for recipes</h2>
            <p>
              Now you can search for recipes! Click any of the resulting recipes
              to go to the recipe site.
            </p>
            <h1>Happy Cooking!</h1>
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
