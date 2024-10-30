import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useLocation } from "react-router-dom";
import OrderConfirmation from "../OrderConfirmation";
import { Provider } from "react-redux";
import store from "../../app/store";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

describe("OrderConfirmation", () => {
  it("renders order confirmation details", () => {
    const mockOrderId = "123456";
    const mockDeliveryTime = "30 minutes";

    useLocation.mockReturnValue({
      state: {
        orderId: mockOrderId,
        deliveryTime: mockDeliveryTime,
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <OrderConfirmation />
        </BrowserRouter>
      </Provider>
    );

    expect(getByText("Order Confirmed")).toBeInTheDocument();
    expect(
      getByText("Your order has been placed successfully!")
    ).toBeInTheDocument();
    expect(getByText(`Order ID: ${mockOrderId}`)).toBeInTheDocument();
    expect(
      getByText(`Your order will be delivered within ${mockDeliveryTime}.`)
    ).toBeInTheDocument();
  });
});
