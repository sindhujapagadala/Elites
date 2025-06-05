import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext/UserContext";
import "./LoginSignup.css";

const USER_BASE_URL = "http://localhost:8080/user";

export default function LoginSignup() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // ---- LOGIN ----
      try {
        const response = await axios.post(`${USER_BASE_URL}/login`, {
          email: formData.email,
          password: formData.password,
        });

        if (response.status === 200) {
          setUser(response.data);
          navigate("/home");
        }
      } catch (error) {
        alert("Login Error: " + (error.response?.data || error.message));
      }
    } else {
      // ---- SIGNUP (OTP Bypassed) ----
      try {
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match.");
          return;
        }

        const axiosConfig = {
          headers: { "Content-Type": "multipart/form-data" },
        };

        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("password", formData.password);
        if (formData.profilePic) {
          data.append("profilePic", formData.profilePic);
        }

        const response = await axios.post(`${USER_BASE_URL}/create`, data, axiosConfig);

        if (response.status === 200) {
          setUser(response.data);
          navigate("/home");
        }
      } catch (error) {
        alert("Signup Error: " + (error.response?.data || error.message));
      }
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-toggle">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          {isLogin ? (
            <>
              <h2>Login</h2>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="submit">Login</button>
            </>
          ) : (
            <>
              <h2>Create Account</h2>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <input
                type="file"
                name="profilePic"
                accept="image/*"
                onChange={handleChange}
              />
              <button type="submit">Signup</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
