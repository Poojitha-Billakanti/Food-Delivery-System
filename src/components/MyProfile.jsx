import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "../style/Profile.css"; 
import ProfileNavbar from "../libs/blocks/ProfileNavbar.jsx"

const MyProfile = () => {
  const authToken = useSelector((state) => state.tokenLoader.token);
  const userId = useSelector((state) => state.tokenLoader.id);
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    address: "",
    mobileNumber: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/auth/my-profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log("Profile data:", response.data);
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <> <ProfileNavbar/>
    <div className="profile-wrapper">
      <h2 className="profile-title">My Profile</h2>
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-field">
            <label>Full Name:</label>
            <input type="text" value={profile.fullName} readOnly />
          </div>
          <div className="profile-field">
            <label>Email:</label>
            <input type="email" value={profile.email} readOnly />
          </div>
          <div className="profile-field">
            <label>Address:</label>
            <input type="text" value={profile.address} readOnly />
          </div>
          <div className="profile-field">
            <label>Mobile Number:</label>
            <input type="text" value={profile.mobileNumber} readOnly />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default MyProfile;
