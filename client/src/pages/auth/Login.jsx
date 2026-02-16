import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Register from "./Register";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("hmsUser"));

    if (
      storedUser &&
      storedUser.email === formData.email &&
      storedUser.password === formData.password
    ) {
      alert("Login successful!");
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row shadow-lg rounded overflow-hidden" style={{ maxWidth: "900px" }}>
        
        {/* Left Section */}
        <div className="col-md-6 bg-success text-white p-5 d-flex flex-column justify-content-center">
          <h2 className="fw-bold mb-3">Welcome Back</h2>
          <p>
            Access your hospital management dashboard securely.
          </p>
        </div>

        {/* Right Section */}
        <div className="col-md-6 bg-white p-5">
          <h4 className="mb-4 text-center fw-bold">Sign In</h4>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={handleChange}
              />
            </div>

            {error && <div className="text-danger mb-3">{error}</div>}

            <button type="submit" className="btn btn-success w-100">
              Login
            </button>

            <p className="text-center mt-3">
              Don’t have an account?{" "}
              <Link to="/" className="text-decoration-none">
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
