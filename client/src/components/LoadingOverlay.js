// @flow
import React from "react";
import loadingStyle from "styles/loadingbar.module.css";
import LoadingGif from "assets/loading-fork.gif";

const LoadingOverlay = () => {
  return (
    <div className={loadingStyle.overlay}>
      <div className={loadingStyle.overlayContainer}>
        <img
          src={LoadingGif}
          alt="Loading"
          className={loadingStyle.overlayImg}
        />
        <div className={loadingStyle.overlayText}>Loading Deliciousness...</div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
