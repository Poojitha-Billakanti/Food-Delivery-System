import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Payment.css";
import PaymentNavbar from "../libs/blocks/PaymentNavbar";
import { useSelector } from "react-redux";

const Payment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [pin, setPin] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");
  const [pinError, setPinError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const authToken = useSelector((state) => state.tokenLoader.token);
  console.log(authToken);
  const userId = useSelector((state) => state.tokenLoader.id);
  const totalPrice = location.state.totalPrice;

  const handleConfirmOrder = async () => {
    try {
      if (!validateCardNumber(cardNumber)) {
        setCardNumberError("Please enter a valid card number.");
        return;
      }

      if (!validatePIN(pin)) {
        setPinError("PIN must be exactly 4 digits.");
        return;
      }

      const paymentResponse = await axios.post(
        `http://localhost:8080/api/payment/processPayment`,
        {
          amount: totalPrice,
          cardNumber,
          pin,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("Payment processed successfully:", paymentResponse.data);
      alert("Payment processed successfully");

      const orderResponse = await axios.post(
        `http://localhost:8080/api/order/placeOrder`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const orderId = orderResponse.data.id;
      navigate("/order-status", { state: { orderId, deliveryTime: "30 minutes" } });
    } catch (error) {
      console.error("Error processing payment or placing order:", error);
      alert("Failed to process payment or place order. Please try again.");
    }
  };

  const validateCardNumber = (cardNumber) => {
    // Simple validation for a 16-digit card number
    return /^\d{16}$/.test(cardNumber);
  };

  const validatePIN = (pin) => {
    // PIN must be exactly 4 digits
    return /^\d{4}$/.test(pin);
  };

  return (
    <>
      <PaymentNavbar />
      <div className="payment-container">
        <div className="payment">
          <h2>Please Proceed to Pay</h2>
          <div className="payment-details">
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <label>
              Card Number:
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => {
                  setCardNumber(e.target.value);
                  setCardNumberError("");
                }}
              />
              {cardNumberError && <p className="error">{cardNumberError}</p>}
            </label>
            <label>
              PIN:
              <input
                type="password"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setPinError("");
                }}
              />
              {pinError && <p className="error">{pinError}</p>}
            </label>
            <button onClick={handleConfirmOrder}>Confirm Payment</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
