import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../app/store";
import SignIn from "../SignIn";

describe("SignIn Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders SignIn form", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
  });

  test("validates email and password fields", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </Provider>
    );
    fireEvent.click(screen.getByText("Sign In"));
    await waitFor(() => {
      expect(screen.getByText("Email is required.")).toBeInTheDocument();
      expect(screen.getByText("Password is required.")).toBeInTheDocument();
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "invalidemail" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "weak" },
    });

    fireEvent.click(screen.getByText("Sign In"));

    await waitFor(() => {
      expect(
        screen.getByText("Please enter a valid email address.")
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "Password must be at least 8 characters long, including uppercase, lowercase, number, and special character."
        )
      ).toBeInTheDocument();
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "valid@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "StrongPassword1@" },
    });

    fireEvent.click(screen.getByText("Sign In"));
    await waitFor(() => {
      expect(screen.queryByText("Email is required.")).not.toBeInTheDocument();
      expect(
        screen.queryByText("Password is required.")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Please enter a valid email address.")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(
          "Password must be at least 8 characters long, including uppercase, lowercase, number, and special character."
        )
      ).not.toBeInTheDocument();
    });
  });
});
