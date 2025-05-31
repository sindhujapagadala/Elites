import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext/UserContext";
import "./LoginSignup.css";

const USER_BASE_URL = "http://localhost:8080/user";
const OTP_BASE_URL = "http://localhost:8080/otp";

export default function LoginSignup() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  // Login
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  // Signup
  const [signupOtpSent, setSignupOtpSent] = useState(false);
  const [signupOtp, setSignupOtp] = useState("");

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
      try {
        if (!otpSent) {
          await axios.post(`${OTP_BASE_URL}/send-otp`, {
            email: formData.email,
          });
          alert("OTP sent to your email.");
          setOtpSent(true);
        } else {
          const verifyRes = await axios.post(
            `${OTP_BASE_URL}/verify-otp?otp=${otp}`,
            { email: formData.email }
          );

          if (verifyRes.data === "OTP verified successfully!") {
            const response = await axios.post(`${USER_BASE_URL}/login`, {
              email: formData.email,
              password: formData.password,
            });

            if (response.status === 200) {
              setUser(response.data);
              navigate("/home");
            }
          } else {
            alert(verifyRes.data);
          }
        }
      } catch (error) {
        alert("Error: " + (error.response?.data || error.message));
      }
    } else {
      try {
        if (!signupOtpSent) {
          await axios.post(`${OTP_BASE_URL}/send-otp`, {
            email: formData.email,
          });
          alert("OTP sent to your email.");
          setSignupOtpSent(true);
        } else {
          const verifyRes = await axios.post(
            `${OTP_BASE_URL}/verify-otp?otp=${signupOtp}`,
            { email: formData.email }
          );

          if (verifyRes.data === "OTP verified successfully!") {
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

            const response = await axios.post(
              `${USER_BASE_URL}/create`,
              data,
              axiosConfig
            );

            if (response.status === 200) {
              setUser(response.data);
              navigate("/home");
            }
          } else {
            alert(verifyRes.data);
          }
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
            onClick={() => {
              setIsLogin(true);
              setOtpSent(false);
            }}
          >
            Login
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => {
              setIsLogin(false);
              setSignupOtpSent(false);
            }}
          >
            Signup
          </button>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          {isLogin ? (
            <>
              <h2>Secure Login</h2>
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
              {otpSent && (
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              )}
              <button type="submit">{otpSent ? "Verify & Login" : "Send OTP"}</button>
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
              {signupOtpSent && (
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={signupOtp}
                  onChange={(e) => setSignupOtp(e.target.value)}
                  required
                />
              )}
              <button type="submit">
                {signupOtpSent ? "Verify OTP & Signup" : "Send OTP"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
