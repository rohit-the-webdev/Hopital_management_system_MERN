import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const storedUser = JSON.parse(localStorage.getItem("hospitalUser"));

    if (!storedUser) {
      alert("Please register first");
      setIsLoading(false);
      return;
    }

    if (email === storedUser.email && password === storedUser.password) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(storedUser));

      setTimeout(() => {
        setIsLoading(false);
        navigate("/dashboard");
      }, 1000);
    } else {
      alert("Invalid email or password");
      setIsLoading(false);
    }
  };

  return (
    <div
      className="container-fluid p-0 m-0"
      style={{
        minHeight: "100vh",
        width: "100%",
        background: `
    linear-gradient(135deg, rgba(11,79,108,0.85) 0%, rgba(10,36,114,0.85) 100%),
    url('https://static.vecteezy.com/system/resources/previews/029/840/181/non_2x/ideal-healthcare-background-with-surrealist-blurry-hospital-scene-ai-generative-free-photo.jpg')
  `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
        backgroundAttachment: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "15px"
      }}
    >
      <div className="container px-2 px-sm-3 px-md-4 py-3">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6">

            {/* Card */}
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

              {/* Header */}
              <div
                className="card-header text-white text-center border-0"
                style={{
                  background:
                    "linear-gradient(135deg, #0B4F6C 0%, #1A5F7A 100%)",
                  padding: "1.5rem",
                }}
              >
                <h4 className="fw-bold mb-0">MediCare HMS</h4>
                <small>Sign in to your account</small>
              </div>

              {/* Body */}
              <div className="card-body bg-white p-4">
                <form onSubmit={handleLogin}>

                  {/* Email */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold small">
                      <FaEnvelope className="me-1 text-primary" size={12} />
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      className="form-control py-2"
                      placeholder="doctor@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold small">
                      <FaLock className="me-1 text-primary" size={12} />
                      PASSWORD
                    </label>

                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control py-2"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-light border"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                      >
                        {showPassword ? (
                          <FaEyeSlash />
                        ) : (
                          <FaEye />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 fw-semibold mb-2"
                    disabled={isLoading}
                    style={{
                      background:
                        "linear-gradient(135deg, #0B4F6C 0%, #1A5F7A 100%)",
                      border: "none",
                      borderRadius: "8px",
                    }}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Signing In...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  {/* Register Link */}
                  <div className="text-center">
                    <small className="text-secondary">
                      Don’t have an account?{" "}
                      <Link
                        to="/register"
                        className="text-primary fw-semibold text-decoration-none"
                      >
                        Create Account
                      </Link>
                    </small>
                  </div>

                </form>
              </div>

              {/* Footer */}
              <div className="card-footer bg-white border-0 text-center py-2 border-top">
                <small className="text-muted">
                  © 2024 MediCare HMS
                </small>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;