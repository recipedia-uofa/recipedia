// @flow
import React from "react";
import { connect } from "react-redux";
import * as colours from "constants/colours";
import styles from "styles/userguide.module.css";

type Props = {
    isOpen: boolean
};

class UserGuide extends RecipeCard.PureComponent<Props> {
    render() {
        const { isOpen } = this.props;
        // IsOpen states that if the user opens the site for the first time
        // the user guide should be automatically open. Otherwise closed
        if (isOpen) {
            return (
                <div></div>
            );
        }
        
        return (
            <div></div>
        );
    };
};

export default UserGuide;