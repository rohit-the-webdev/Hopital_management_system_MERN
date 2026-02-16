import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.fullName.trim())
      newErrors.fullName = "Full name is required";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email address";

    if (!/^[0-9]{10}$/.test(formData.phone))
      newErrors.phone = "Enter valid 10-digit phone number";

    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    localStorage.setItem("hmsUser", JSON.stringify(formData));
    alert("Account created successfully!");
    navigate("/login");
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3f2fd, #e8f5e9)",
      }}
    >
      <div
        className="card shadow-lg border-0 p-5"
        style={{
          width: "100%",
          maxWidth: "500px",
          borderRadius: "20px",
        }}
      >
        <div className="text-center mb-4">
          <h3 className="fw-bold" style={{ color: "#198754" }}>
            Hospital Management System
          </h3>
          <p className="text-muted">Create Your Account</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>

          <div className="mb-3">
            <label className="form-label fw-semibold d-block text-start">
              Full Name
            </label>
            <input
              type="text"
              className={`form-control rounded-3 ${errors.fullName ? "is-invalid" : ""}`}
              name="fullName"
              onChange={handleChange}
            />
            <div className="invalid-feedback">
              {errors.fullName}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold d-block text-start">
              Email Address
            </label>
            <input
              type="email"
              className={`form-control rounded-3 ${errors.email ? "is-invalid" : ""}`}
              name="email"
              onChange={handleChange}
            />
            <div className="invalid-feedback">
              {errors.email}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold d-block text-start">
              Phone Number
            </label>
            <input
              type="text"
              className={`form-control rounded-3 ${errors.phone ? "is-invalid" : ""}`}
              name="phone"
              onChange={handleChange}
            />
            <div className="invalid-feedback">
              {errors.phone}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold d-block text-start">
              Password
            </label>
            <input
              type="password"
              className={`form-control rounded-3 ${errors.password ? "is-invalid" : ""}`}
              name="password"
              onChange={handleChange}
            />
            <div className="invalid-feedback">
              {errors.password}
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold d-block text-start">
              Confirm Password
            </label>
            <input
              type="password"
              className={`form-control rounded-3 ${errors.confirmPassword ? "is-invalid" : ""}`}
              name="confirmPassword"
              onChange={handleChange}
            />
            <div className="invalid-feedback">
              {errors.confirmPassword}
            </div>
          </div>

          <button
            type="submit"
            className="btn w-100 text-white rounded-3"
            style={{
              backgroundColor: "#198754",
              fontWeight: "600",
            }}
          >
            Register
          </button>

          <p className="text-center mt-3 mb-0">
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none fw-semibold">
              Sign In
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Register;
