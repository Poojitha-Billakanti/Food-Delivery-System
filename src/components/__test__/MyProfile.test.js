import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../app/store";
import axios from "axios";
import MyProfile from "../MyProfile";

jest.mock("axios");

describe("MyProfile component", () => {
  test("renders myprofile component", async () => {
    const profileData = {
      fullName: "Poojitha",
      email: "poojitha@gmail.com",
      address: "123 Banglore",
      mobileNumber: "1234567890",
    };

    axios.get.mockResolvedValue({ data: profileData });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <MyProfile />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(
        screen.getByDisplayValue(profileData.fullName)
      ).toBeInTheDocument();
      expect(screen.getByDisplayValue(profileData.email)).toBeInTheDocument();
      expect(screen.getByDisplayValue(profileData.address)).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(profileData.mobileNumber)
      ).toBeInTheDocument();
    });
  });
});
