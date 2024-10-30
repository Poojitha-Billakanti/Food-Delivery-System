import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../src/style/SignUp.css";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@gmail\.com$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  const validateMobileNumber = (mobileNumber) => {
    // Validating 10-digit mobile number
    const mobileNumberPattern = /^\d{10}$/;
    return mobileNumberPattern.test(mobileNumber);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    let valid = true;

    if (fullName.trim() === "") {
      setFullNameError("Full name is required.");
      valid = false;
    } else {
      setFullNameError("");
    }

    if (email.trim() === "") {
      setEmailError("Email is required.");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid Gmail address.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.trim() === "") {
      setPasswordError("Password is required.");
      valid = false;
    } else if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters long, including uppercase, lowercase, number, and special character.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (address.trim() === "") {
      setAddressError("Address is required.");
      valid = false;
    } else {
      setAddressError("");
    }

    if (mobileNumber.trim() === "") {
      setMobileNumberError("Mobile number is required.");
      valid = false;
    } else if (!validateMobileNumber(mobileNumber)) {
      setMobileNumberError("Please enter a valid 10-digit mobile number.");
      valid = false;
    } else {
      setMobileNumberError("");
    }
    valid=true;
    if (!valid) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/auth/register", {
        fullName,
        email,
        password,
        address,
        mobileNumber,
      });
      alert("Registration successful");
      console.log(response.data);
      navigate("/sign-in");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="bg">
      <form className="signup" onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          autoComplete="off"
        />
        {fullNameError && <p className="error">{fullNameError}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />
        {emailError && <p className="error">{emailError}</p>}
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          autoComplete="off"
        />
        {addressError && <p className="error">{addressError}</p>}
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          autoComplete="off"
        />
        {mobileNumberError && <p className="error">{mobileNumberError}</p>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
        />
        {passwordError && <p className="error">{passwordError}</p>}
        <button type="submit">Sign Up</button>
        <p className="right-align">
          Already have an account? <a href="/sign-in">SignIn</a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
