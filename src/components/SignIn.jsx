import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import "../style/SignIn.css";
import { setSavedToken } from "../feature/redux/slice/tokenSlice";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@gmail\.com$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    let valid = true;

    if (email.trim() === "") {
      setEmailError("Email is required.");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
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

    if (!valid) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/auth/generateToken", {
        email,
        password
      });
      console.log(response.data);
      // Store token in Redux state
      dispatch(setSavedToken({ token:response.data.token, id:response.data.id }));
      navigate('/catalog'); 
    } catch (error) {
      console.error(error);
      alert("Sign In Failed. Please check your credentials.");
    }
  };

  return (
    <div className="login">
      <form className="signin" onSubmit={handleSignIn}>
        {fullNameError && <p className="error">{fullNameError}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className="error">{emailError}</p>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <p className="error">{passwordError}</p>}
        <button type="submit">Sign In</button>
        <p>
          Don't have an account? <a href="/sign-up">SignUp</a>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
