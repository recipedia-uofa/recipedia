// @flow
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import RecipediaApp from "./RecipediaApp";
import initialize from "./initialize";
import configureStore from "./configureStore";
import * as serviceWorker from "./serviceWorker";

const root = document.getElementById("root");

if (root) {
  initialize();
  ReactDOM.render(
    <Provider store={configureStore()}>
      <RecipediaApp />
    </Provider>,
    root
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
