import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = {
      name,
      email,
      password,
    };

    localStorage.setItem("hospitalUser", JSON.stringify(userData));

    alert("Registration Successful!");
    navigate("/");
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
      
      <div className="card shadow-lg border-0" style={{ width: "550px" }}>
        
        {/* Header */}
        <div className="card-header bg-success text-white text-center py-4">
          <h3 className="mb-0">🏥 Hospital Management System</h3>
          <small>Register New Account</small>
        </div>

        {/* Body */}
        <div className="card-body p-4">
          <h5 className="text-center text-secondary mb-4">
            Create your account
          </h5>

          <form onSubmit={handleRegister}>
            
            {/* Name */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3 position-relative">
              <label className="form-label fw-semibold">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control form-control-lg pe-5"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="position-absolute"
                style={{ top: "58px", right: "15px", cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Confirm Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Button */}
            <button className="btn btn-success btn-lg w-100">
              Register
            </button>

            {/* Login Link */}
            <p className="text-center mt-4 mb-0">
              Already have an account?{" "}
              <Link to="/" className="fw-bold text-decoration-none">
                Login
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
