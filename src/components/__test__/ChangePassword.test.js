import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import ChangePassword from "../ChangePassword";
import store from "../../app/store";

jest.mock("axios");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("ChangePassword Component", () => {
  beforeEach(() => {
    axios.post.mockReset();
  });

  test("renders ChangePassword component", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ChangePassword />
        </BrowserRouter>
      </Provider>
    );

    expect(
      screen.getByRole("heading", { name: /Change Password/i })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Current Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("New Password")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Confirm New Password")
    ).toBeInTheDocument();
  });

  test("shows alert when new passwords do not match", async () => {
    window.alert = jest.fn();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ChangePassword />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Current Password"), {
      target: { value: "oldPassword" },
    });
    fireEvent.change(screen.getByPlaceholderText("New Password"), {
      target: { value: "newPassword" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm New Password"), {
      target: { value: "differentPassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Change Password/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("New passwords do not match!");
    });

    expect(axios.post).not.toHaveBeenCalled();
  });

  test("handles server error during password change", async () => {
    axios.post.mockRejectedValueOnce(new Error("Failed to change password"));

    window.alert = jest.fn();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ChangePassword />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Current Password"), {
      target: { value: "oldPassword" },
    });
    fireEvent.change(screen.getByPlaceholderText("New Password"), {
      target: { value: "newPassword" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm New Password"), {
      target: { value: "newPassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Change Password/i }));
  });
});
