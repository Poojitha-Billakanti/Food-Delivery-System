import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/Cart.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../libs/blocks/Navbar.jsx"

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const authToken = useSelector((state) => state.tokenLoader.token);
  console.log(authToken);
  const userId = useSelector((state) => state.tokenLoader.id);
  const navigate = useNavigate();
  

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/cart/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setCartItems(response.data); 
        calculateTotalPrice(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/cart/${userId}/remove/${cartItemId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("Item removed successfully:", response.data);
      // Refresh cart items after removal
      fetchCartItems();
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const calculateTotalPrice = (cartItems) => {
    const totalPrice = cartItems.reduce(
      (accumulator, item) => accumulator + item.price,0);
   setTotalPrice(totalPrice);
  };

  // const PrivateRoute = ({auth: {}})

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Add items to place an order.");
      return;
    }
    navigate("/payment", { state: { totalPrice } });
  };
  return (
    <div className="cart">
      <h2>View Cart</h2>
      <div><Navbar/></div>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <h3>{item.foodName}</h3>
            <p>{item.description}</p>
            <p>${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total Price: ${totalPrice}</h3>
        <button onClick={handlePlaceOrder} disabled={cartItems.length === 0}>
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default Cart;
