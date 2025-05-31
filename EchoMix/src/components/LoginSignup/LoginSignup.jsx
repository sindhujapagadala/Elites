import React from "react";
import { useState } from "react";
import { useRef } from "react";
import "./LoginSignup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useUser } from "../../UserContext/UserContext";

const BASE_URL = "http://localhost:8080/user";

export default function LoginSignup() {
  
  const {setUser} = useUser();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
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

  const [message , setmessage] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      try {
        let axiosConfig = {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
          },
        };

        const response = await axios.post(`${BASE_URL}/login`, {
          email: formData.email,
          password: formData.password,
        });
        if (response.status == 200) {
          setUser(response.data);
          navigate("/home")
        }
      } catch (error) {
        if (error.response && error.response.data) {
          alert(error.response.data);
        } else if (error.request) {
          console.error("No response from server", error.message);
        } else {
          console.error("Request error", error.message);
        }
      }
    } else {
      let axiosConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      if (formData.profilePic) {
        data.append("profilePic", formData.profilePic);
      }

      try {
        const response = await axios.post(
          `${BASE_URL}/create`,
          data,
          axiosConfig
        );
        if (response.status == 200) {
          console.log("Sign Up Successful", response.data);
          setUser(response.data);
          navigate("/home");
          if(response.status===400){
            setmessage("Please check the email or password.");
          }
        }
      } catch (error) {
        if (error.response && error.response.data) {
          console.error("Error", error.response.data);
          
         
        } else if (error.request) {
          console.error("No response from server", error.message);

        } else {
          console.error("Request error", error.message);
        }
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
              <h2>Welcome Back!</h2>
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
              <a href="#">Forgot Password?</a>
              <button type="submit">Login</button>
              <p>
                Not a Member?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsLogin(false);
                  }}
                >
                  Signup Now
                </a>
              </p>
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
              <p>
                Already have an account?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsLogin(true);
                  }}
                >
                  Login
                </a>
              </p>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
