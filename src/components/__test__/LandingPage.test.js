import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LandingPage from "../LandingPage";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../app/store";

describe("LandingPage component", () => {
  test("renders landing page with buttons and carousel", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LandingPage />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText("Food Delivery System")).toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });
});
