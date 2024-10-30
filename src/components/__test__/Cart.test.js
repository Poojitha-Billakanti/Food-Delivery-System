import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../app/store";
import axios from "axios";
import Cart from "../Cart";

jest.mock("axios");

const mockCartItems = [
  {
    id: 1,
    foodName: "Pizza",
    description: "Delicious pizza",
    price: 10.99,
    quantity: 2,
  },
  {
    id: 2,
    foodName: "Burger",
    description: "Juicy burger",
    price: 8.99,
    quantity: 1,
  },
];

describe("Cart Component", () => {
  beforeEach(() => {
    axios.get.mockResolvedValueOnce({
      data: mockCartItems,
    });

    axios.delete.mockResolvedValueOnce({
      data: {
        message: "Item removed successfully",
      },
    });
  });

  test("renders cart with items and total price", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </Provider>
    );
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(screen.getByText("Pizza")).toBeInTheDocument();
      expect(screen.getByText("Burger")).toBeInTheDocument();
    });
  });

  test("removes item from cart", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </Provider>
    );
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
    const removeButton = await screen.findAllByText("Remove");
    fireEvent.click(removeButton[0]);
  });
});
