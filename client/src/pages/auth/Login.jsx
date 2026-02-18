import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const validateGmail = (email) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateGmail(email)) {
      setEmailError("Please enter a valid Gmail address");
      setIsLoading(false);
      return;
    }
    setEmailError("");

    const storedUser = localStorage.getItem("hospitalUser");
    
    setTimeout(() => {
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        
        if (userData.email === email && userData.password === password) {
          alert("Login Successful!");
          navigate("/dashboard");
        } else {
          alert("Invalid email or password");
        }
      } else {
        alert("No user found. Please register first.");
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError("");
  };

  return (
    <div 
      className="container-fluid p-0 m-0"
      style={{
        minHeight: '100vh',
        width: '100%',
        background: `linear-gradient(135deg, #0B4F6C 0%, #0A2472 100%), url('https://static.vecteezy.com/system/resources/previews/029/840/181/non_2x/ideal-healthcare-background-with-surrealist-blurry-hospital-scene-ai-generative-free-photo.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflowY: 'auto',
        padding: '15px'
      }}
    >
      <div className="container px-2 px-sm-3 px-md-4 py-3">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            {/* Responsive Card */}
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden" 
              style={{ 
                maxWidth: '450px',
                margin: '0 auto',
                width: '100%'
              }}
            >
              {/* Header - Responsive */}
              <div className="card-header text-white text-center border-0" 
                style={{
                  background: 'linear-gradient(135deg, #0B4F6C 0%, #1A5F7A 100%)',
                  padding: 'clamp(1.2rem, 5vw, 1.8rem)'
                }}
              >
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <div className="bg-white text-primary rounded-circle me-2" 
                    style={{ 
                      width: 'clamp(40px, 7vw, 48px)', 
                      height: 'clamp(40px, 7vw, 48px)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                    }}
                  >
                    <span style={{ fontSize: 'clamp(1.3rem, 5vw, 1.8rem)' }}>🏥</span>
                  </div>
                  <h3 className="mb-0 fw-bold" style={{ fontSize: 'clamp(1.2rem, 5vw, 1.6rem)' }}>MediCare HMS</h3>
                </div>
                <p className="mb-0 small opacity-90">Welcome back! Please login to continue</p>
              </div>

              {/* Card Body - Responsive */}
              <div className="card-body bg-white" style={{ padding: 'clamp(1.2rem, 5vw, 1.8rem)' }}>
                <form onSubmit={handleLogin} noValidate>
                  {/* Email Field */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold text-secondary small mb-1">
                      <FaEnvelope className="me-1 text-primary" size={11} />
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      className={`form-control py-2 ${emailError ? 'is-invalid' : ''}`}
                      placeholder="doctor@gmail.com"
                      value={email}
                      onChange={handleEmailChange}
                      onBlur={() => {
                        if (email && !validateGmail(email)) {
                          setEmailError("Only Gmail addresses are accepted");
                        }
                      }}
                      required
                      style={{ fontSize: 'clamp(0.9rem, 3vw, 1rem)' }}
                    />
                    {emailError && (
                      <div className="invalid-feedback small">
                        {emailError}
                      </div>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold text-secondary small mb-1">
                      <FaLock className="me-1 text-primary" size={11} />
                      PASSWORD
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control py-2"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ fontSize: 'clamp(0.9rem, 3vw, 1rem)' }}
                      />
                      <button
                        type="button"
                        className="btn btn-light border"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ padding: '0.375rem 1rem' }}
                      >
                        {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-4 gap-2">
                    <div className="form-check">
                      <input 
                        type="checkbox" 
                        className="form-check-input" 
                        id="rememberMe" 
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label className="form-check-label small text-secondary" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                    <Link to="/forgot-password" className="text-primary text-decoration-none small">
                      Forgot Password?
                    </Link>
                  </div>

                  {/* Login Button */}
                  <button 
                    type="submit" 
                    className="btn btn-primary w-100 py-2 fw-semibold mb-3"
                    disabled={isLoading}
                    style={{
                      background: 'linear-gradient(135deg, #0B4F6C 0%, #1A5F7A 100%)',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: 'clamp(0.95rem, 3vw, 1.1rem)'
                    }}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Logging in...
                      </>
                    ) : (
                      'Login to Dashboard'
                    )}
                  </button>

                  {/* Register Link */}
                  <div className="text-center">
                    <small className="text-secondary">
                      Don't have an account?{' '}
                      <Link to="/register" className="text-primary fw-semibold text-decoration-none">
                        Create Account
                      </Link>
                    </small>
                  </div>
                </form>
              </div>

              {/* Footer - Clean */}
              <div className="card-footer bg-white border-0 py-2 text-center border-top">
                <small className="text-muted" style={{ fontSize: 'clamp(0.65rem, 2vw, 0.7rem)' }}>
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