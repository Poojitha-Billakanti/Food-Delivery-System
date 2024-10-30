import React from "react";
import { useLocation } from "react-router-dom";
import "../style/OrderConfirmation.css";
import Navbar from "../libs/blocks/UpdateProfileNavbar";

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderId, deliveryTime } = location.state;

  return (
    <>
    <Navbar/>
    <div className="order-confirmation">
      <h2>Order Confirmed</h2>
      <p>Your order has been placed successfully!</p>
      <p>Order ID: {orderId}</p>
      <p>Your order will be delivered within {deliveryTime}.</p>
    </div>
    </>
  );
};

export default OrderConfirmation;
