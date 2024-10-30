import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";
import Payment from "../Payment";
import store from "../../app/store";

jest.mock("axios");
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    state: {
      totalPrice: 100,
    },
  }),
}));

describe("Payment component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("renders Payment component", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Payment />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Please Proceed to Pay")).toBeInTheDocument();
    expect(screen.getByText("Total Price: $100.00")).toBeInTheDocument();
    expect(screen.getByLabelText("Card Number:")).toBeInTheDocument();
    expect(screen.getByLabelText("PIN:")).toBeInTheDocument();
  });

  test("validates card number and PIN input", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Payment />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText("Card Number:"), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByLabelText("PIN:"), {
      target: { value: "12" },
    });

    fireEvent.click(screen.getByText("Confirm Payment"));

    await waitFor(() => {
      expect(
        screen.getByText("Please enter a valid card number.")
      ).toBeInTheDocument();
    });
  });
});
