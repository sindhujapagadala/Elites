import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext/UserContext";
import "./LoginSignup.css";

const USER_BASE_URL = "http://localhost:8080/user";
const OTP_BASE_URL = "http://localhost:8080/otp";

export default function LoginSignup() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  // Form and OTP states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: null,
  });

  const [signupOtpSent, setSignupOtpSent] = useState(false);
  const [signupOtp, setSignupOtp] = useState("");

  useEffect(() => {
    if (user) navigate("/home");
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const sendOtp = async () => {
    try {
      await axios.post(`${OTP_BASE_URL}/send-otp`, { email: formData.email });
      alert("OTP sent to your email.");
      setSignupOtpSent(true);
    } catch (error) {
      alert("Failed to send OTP: " + (error.response?.data || error.message));
    }
  };

  const resendOtp = async () => {
  try {
    await axios.post(`${OTP_BASE_URL}/resend`, { email: formData.email });
    alert("OTP resent to your email.");
    setSignupOtpSent(true);
  } catch (error) {
    const errorMsg =
      typeof error.response?.data === "string"
        ? error.response.data
        : error.response?.data?.message || error.message;

    alert("Failed to resend OTP: " + errorMsg);
  }
};



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // Login flow
      try {
        const response = await axios.post(`${USER_BASE_URL}/login`, {
          email: formData.email,
          password: formData.password,
        });

        setUser(response.data);
        navigate("/home");
      } catch (error) {
        alert("Login error: " + (error.response?.data || error.message));
      }
    } else {
      // Signup flow
      try {
        if (!signupOtpSent) {
          await sendOtp();
        } else {
          // Verify OTP
          const verifyRes = await axios.post(
            `${OTP_BASE_URL}/verify-otp?otp=${signupOtp}`,
            { email: formData.email }
          );

          if (verifyRes.data === "OTP verified successfully!") {
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
              {
                headers: { "Content-Type": "multipart/form-data" },
              }
            );

            setUser(response.data);
            navigate("/home");
          } else {
            alert("Invalid OTP");
          }
        }
      } catch (error) {
        alert("Signup error: " + (error.response?.data || error.message));
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
              setSignupOtpSent(false);
              setSignupOtp("");
            }}
          >
            Login
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => {
              setIsLogin(false);
              setSignupOtpSent(false);
              setSignupOtp("");
            }}
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

              {signupOtpSent && (
                <>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={signupOtp}
                    onChange={(e) => setSignupOtp(e.target.value)}
                    required
                  />
                  <button type="button" onClick={resendOtp}>
                    Resend OTP
                  </button>
                </>
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
