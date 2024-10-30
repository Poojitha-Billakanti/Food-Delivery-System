import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../app/store";
import FoodCatalog from "../FoodCatalog";
import axios from "axios";
import { addToCart } from "../../actions/cartActions";

jest.mock("axios");

describe("FoodCatalog Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders FoodCatalog component", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FoodCatalog />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText("Sort by")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search here..")).toBeInTheDocument();
  });
});
