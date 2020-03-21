// @flow
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadingStyle from "styles/loadingbar.module.css";
import LoadingGif from "assets/loading-fork.gif";

type Props = {};

class LoadingOverlay extends PureComponent<Props> {
  render() {
    return (
      <div className={loadingStyle.overlay}>
        <div className={loadingStyle.overlayContainer}>
          <img src={LoadingGif} className={loadingStyle.overlayImg} />
          <div className={loadingStyle.overlayText}>
            Loading Deliciousness...
          </div>
        </div>
      </div>
    );
  }
}

export default LoadingOverlay;
