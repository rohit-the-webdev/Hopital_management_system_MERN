import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaHospital } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("hospitalUser"));

    if (!user) {
      alert("Please register first");
      return;
    }

    if (email === user.email && password === user.password) {
      alert("Login Successful");
      navigate("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow-lg border-0 rounded-4" style={{ width: "500px" }}>
        
        {/* Header */}
        <div className="card-header text-center text-white py-4 rounded-top-4"
          style={{ background: "linear-gradient(135deg, #0d6efd, #0b5ed7)" }}
        >
          <FaHospital size={40} className="mb-2" />
          <h4 className="mb-0 fw-bold">Hospital Management System</h4>
          <small className="opacity-75">Secure Login Portal</small>
        </div>

        {/* Body */}
        <div className="card-body p-4">
          <h5 className="text-center fw-semibold mb-4">Welcome Back 👋</h5>

          <form onSubmit={handleLogin}>
            
            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Email Address</label>
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-white">
                  <FaEnvelope className="text-primary" />
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Password</label>
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-white">
                  <FaLock className="text-primary" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="input-group-text bg-white"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {/* Login Button */}
            <button className="btn btn-primary btn-lg w-100 fw-semibold">
              Login
            </button>

            {/* Footer */}
            <div className="text-center mt-4">
              <small className="text-muted">
                Don’t have an account?{" "}
                <Link to="/register" className="fw-semibold text-decoration-none">
                  Register here
                </Link>
              </small>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
