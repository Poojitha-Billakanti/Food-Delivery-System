import React, { Profiler } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import FoodCatalog from "../src/components/FoodCatalog.jsx";
import Cart from "../src/components/Cart.jsx";
import OrderStatus from "./components/OrderConfirmation.jsx";
import Payment from "../src/components/Payment.jsx";
import { Provider } from "react-redux";
import store from "../src/app/store.js";
//  import Navbarr from "../src/components/Navbarr.jsx";
import LandingPage from "./components/LandingPage.jsx";
import UpdateProfile from "./components/UpdateProfile.jsx";
import ChangePassword from "./components/ChangePassword.jsx";
import MyProfile from "./components/MyProfile.jsx";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/" element={<Navbarr />} /> */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/catalog" element={<FoodCatalog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-status" element={<OrderStatus />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/my-profile" element={<MyProfile />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
