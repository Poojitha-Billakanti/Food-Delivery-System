import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions.js";
import { IoMdSearch } from "react-icons/io";
import "../style/FoodCatalog.css";
import Navbar from "../libs/blocks/FoodCatalogNavbar.jsx";

const FoodCatalog = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [filteredFoodItems, setFilteredFoodItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.tokenLoader.token);
  // console.log(authToken);
  const userId = useSelector((state) => state.tokenLoader.id);

  useEffect(() => {
    fetchFoodItems();
  }, []);

  console.log("authToken" + authToken);
  console.log("userId"+userId);
  const fetchFoodItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/catalog/items",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setFoodItems(response.data);
      setFilteredFoodItems(response.data);
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  };

  const filterAndSortFoodItems = () => {
    let filteredItems = [...foodItems];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredItems = filteredItems.filter(
        (item) =>
          (item.foodName && item.foodName.toLowerCase().includes(query)) ||
          (item.restaurantName &&
            item.restaurantName.toLowerCase().includes(query)) ||
          (item.location && item.location.toLowerCase().includes(query))
      );
    }

    if (sortOption === "priceAsc") {
      filteredItems.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceDesc") {
      filteredItems.sort((a, b) => b.price - a.price);
    }

    setFilteredFoodItems(filteredItems);
  };

  useEffect(() => {
    filterAndSortFoodItems();
  }, [foodItems, searchQuery, sortOption]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      filterAndSortFoodItems();
    }
  };

  const handleAddToCart = async (item) => {
    if (!userId) {
      alert("User is not logged in. Please log in to add items to the cart.");
      return;
    }

    try {
      const cartItem = {
        userId : item.id,
        foodItemId: item.id,
        foodName: item.foodName,
        restaurantName:item.restaurantName,
        price: item.price,
        quantity: 1,
      };

      const response = await axios.post(
        `http://localhost:8080/api/cart/add/${userId}`,
        cartItem,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      dispatch(addToCart(item));
      alert("Added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart. Please try again.");
    }
  };

  return (
    <div className="food-catalog">
      <Navbar />
      <div className="search-filters">
        <div className="search-input">
          <input
            type="text"
            placeholder="Search here.."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
          />
          <div className="search-icon" onClick={filterAndSortFoodItems}>
            <IoMdSearch />
          </div>
        </div>
        <select value={sortOption} onChange={handleSortChange}>
          <option value="">Sort by</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
        </select>
      </div>
      <div className="food-items">
        {filteredFoodItems.map((item) => (
          <div key={item.id} className="food-item">
            <h3>{item.foodName}</h3>
            <p>{item.description}</p>
            <p>${item.price}</p>
            <p>{item.restaurantName}</p>
            <p>{item.location}</p>
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodCatalog;
