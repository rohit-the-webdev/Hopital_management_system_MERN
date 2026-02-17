import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNo: "",
    gender: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobileNo") {
      setFormData({
        ...formData,
        mobileNo: value.replace(/\D/g, "")
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.mobileNo.length !== 10) {
      alert("Mobile Number must be 10 digits");
      return;
    }

    localStorage.setItem("hospitalUser", JSON.stringify(formData));

    alert("Registration Successful!");
    navigate("/login");
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">

        {/* Header */}
        <div className="text-center mb-4">
          <div className="brand-icon mb-2">🏥</div>
          <h3 className="fw-bold text-white">Create Your Account</h3>
          <p className="text-light small">
            Join our secure hospital management platform
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Full Name */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Mobile */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="mobileNo"
              maxLength="10"
              placeholder="Mobile Number"
              value={formData.mobileNo}
              onChange={handleChange}
              required
            />
          </div>

          {/* Gender */}
          <div className="mb-3">
            <select
              className="form-select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Email */}
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn auth-btn w-100">
            Create Account
          </button>

          <div className="text-center mt-4 small text-white">
            Already registered?{" "}
            <Link to="/login" className="text-warning fw-semibold">
              Sign In
            </Link>
          </div>

        </form>

      </div>
    </div>
  );
};

export default Register;
