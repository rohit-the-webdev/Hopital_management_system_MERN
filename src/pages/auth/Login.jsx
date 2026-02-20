import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css";

const Login = () => {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("hospitalUser"));

    if (!storedUser) {
      alert("No user found. Please register first.");
      return;
    }

    if (
      storedUser.email === loginData.email &&
      storedUser.password === loginData.password
    ) {
      alert("Login Successful!");
      navigate("/dashboard");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">

        <div className="text-center mb-3">
          <h3 className="fw-bold text-white">Sign up</h3>
          <p className="text-light">Login to Continue</p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <input type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleChange}
              required />
          </div>

          <div className="mb-4">
            <input type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
              required />
          </div>

          <button className="btn auth-btn w-100">
            Login
          </button>

          <p className="text-center mt-3 text-white">
            Don't have account? 
            <Link to="/" className="text-warning ms-1">
              Register
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;
