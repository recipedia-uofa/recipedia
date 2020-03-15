import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import RecipediaApp from "../RecipediaApp";
import configureStore from "../configureStore";

test("renders app", () => {
  const { getByTestId } = render(
    <Provider store={configureStore()}>
      <RecipediaApp />
    </Provider>
  );
  expect(getByTestId("logo")).toBeInTheDocument();
});
