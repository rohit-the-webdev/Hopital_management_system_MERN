import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaMobile } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateGmail = (email) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  };

  const validateMobile = (mobile) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile);
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const isValidLength = password.length >= 8;

    return {
      isValid: hasUpperCase && hasLowerCase && hasNumber && isValidLength,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      isValidLength
    };
  };

  const passwordValidation = validatePassword(password);

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Mobile validation
    if (!validateMobile(mobile)) {
      setMobileError("Please enter a valid 10-digit mobile number");
      setIsLoading(false);
      return;
    }
    setMobileError("");

    // Email validation
    if (!validateGmail(email)) {
      setEmailError("Please enter a valid Gmail address");
      setIsLoading(false);
      return;
    }
    setEmailError("");

    // Password validation
    if (!passwordValidation.isValid) {
      setPasswordError("Password does not meet requirements");
      setIsLoading(false);
      return;
    }
    setPasswordError("");

    // Confirm password validation
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Save user data
    const userData = {
      name,
      email,
      mobile,
      password,
    };

    localStorage.setItem("hospitalUser", JSON.stringify(userData));

    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 1500);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError("");
  };

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setMobile(value);
    }
    if (mobileError) setMobileError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
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
          <div className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-6">
            {/* Responsive Card */}
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden"
              style={{
                maxWidth: '550px',
                margin: '0 auto',
                width: '100%'
              }}
            >
              {/* Header - Responsive */}
              <div className="card-header text-white text-center border-0"
                style={{
                  background: 'linear-gradient(135deg, #0B4F6C 0%, #1A5F7A 100%)',
                  padding: 'clamp(1rem, 4vw, 1.5rem)'
                }}
              >
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <div className="bg-white text-primary rounded-circle me-2"
                    style={{
                      width: 'clamp(35px, 6vw, 45px)',
                      height: 'clamp(35px, 6vw, 45px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                    }}
                  >
                    <span style={{ fontSize: 'clamp(1.2rem, 4vw, 1.8rem)' }}>🏥</span>
                  </div>
                  <h3 className="mb-0 fw-bold" style={{ fontSize: 'clamp(1.1rem, 4vw, 1.5rem)' }}>MediCare HMS</h3>
                </div>
                <p className="mb-0 small opacity-90">Create your account</p>
              </div>

              {/* Card Body - Responsive */}
              <div className="card-body bg-white" style={{ padding: 'clamp(1rem, 4vw, 1.8rem)' }}>
                <form onSubmit={handleRegister} noValidate>
                  {/* Full Name Field */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold text-secondary small mb-1">
                      <FaUser className="me-1 text-primary" size={11} />
                      FULL NAME
                    </label>
                    <input
                      type="text"
                      className="form-control py-2"
                      placeholder="Dr. John Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      style={{ fontSize: 'clamp(0.85rem, 3vw, 0.95rem)' }}
                    />
                  </div>

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
                      style={{ fontSize: 'clamp(0.85rem, 3vw, 0.95rem)' }}
                    />
                    {emailError && (
                      <div className="invalid-feedback small">
                        {emailError}
                      </div>
                    )}
                  </div>

                  {/* Mobile Field - Icon only in label */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold text-secondary small mb-1">
                      <FaMobile className="me-1 text-primary" size={11} />
                      MOBILE NUMBER
                    </label>
                    <input
                      type="tel"
                      className={`form-control py-2 ${mobileError ? 'is-invalid' : ''}`}
                      placeholder="Enter 10-digit mobile number"
                      value={mobile}
                      onChange={handleMobileChange}
                      onBlur={() => {
                        if (mobile && !validateMobile(mobile)) {
                          setMobileError("Please enter a valid 10-digit mobile number");
                        }
                      }}
                      maxLength="10"
                      required
                      style={{ fontSize: 'clamp(0.85rem, 3vw, 0.95rem)' }}
                    />
                    {mobileError && (
                      <div className="invalid-feedback small">
                        {mobileError}
                      </div>
                    )}
                  </div>

                  {/* Password Fields */}
                  <div className="row g-2">
                    <div className="col-12 col-md-6 mb-2">
                      <label className="form-label fw-semibold text-secondary small mb-1">
                        <FaLock className="me-1 text-primary" size={11} />
                        PASSWORD
                      </label>
                      <div className="input-group input-group-sm">
                        <input
                          type={showPassword ? "text" : "password"}
                          className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                          placeholder="Password"
                          value={password}
                          onChange={handlePasswordChange}
                          required
                          style={{ fontSize: 'clamp(0.85rem, 3vw, 0.95rem)' }}
                        />
                        <button
                          type="button"
                          className="btn btn-light border"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{ padding: '0.25rem 0.75rem' }}
                        >
                          {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                        </button>
                      </div>
                    </div>

                    <div className="col-12 col-md-6 mb-2">
                      <label className="form-label fw-semibold text-secondary small mb-1">
                        <FaLock className="me-1 text-primary" size={11} />
                        CONFIRM
                      </label>
                      <div className="input-group input-group-sm">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          className="form-control"
                          placeholder="Confirm"
                          value={confirmPassword}
                          onChange={handleConfirmPasswordChange}
                          required
                          style={{ fontSize: 'clamp(0.85rem, 3vw, 0.95rem)' }}
                        />
                        <button
                          type="button"
                          className="btn btn-light border"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          style={{ padding: '0.25rem 0.75rem' }}
                        >
                          {showConfirmPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="mb-3">
                      <div className="d-flex gap-1 mb-1">
                        <div className={`flex-fill rounded-pill ${passwordValidation.isValidLength ? 'bg-success' : 'bg-secondary'}`} style={{ height: '4px' }}></div>
                        <div className={`flex-fill rounded-pill ${passwordValidation.hasUpperCase ? 'bg-success' : 'bg-secondary'}`} style={{ height: '4px' }}></div>
                        <div className={`flex-fill rounded-pill ${passwordValidation.hasLowerCase ? 'bg-success' : 'bg-secondary'}`} style={{ height: '4px' }}></div>
                        <div className={`flex-fill rounded-pill ${passwordValidation.hasNumber ? 'bg-success' : 'bg-secondary'}`} style={{ height: '4px' }}></div>
                      </div>
                      <div className="d-flex flex-wrap gap-2 small">
                        <span className={passwordValidation.isValidLength ? 'text-success' : 'text-secondary'}>8+ chars</span>
                        <span className={passwordValidation.hasUpperCase ? 'text-success' : 'text-secondary'}>A-Z</span>
                        <span className={passwordValidation.hasLowerCase ? 'text-success' : 'text-secondary'}>a-z</span>
                        <span className={passwordValidation.hasNumber ? 'text-success' : 'text-secondary'}>0-9</span>
                      </div>
                    </div>
                  )}

                  {/* Password Match Indicator */}
                  {password && confirmPassword && (
                    <div className="mb-3">
                      {password === confirmPassword ? (
                        <small className="text-success">✓ Passwords match</small>
                      ) : (
                        <small className="text-danger">Passwords do not match</small>
                      )}
                    </div>
                  )}

                  {/* Register Button */}
                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 fw-semibold mb-2"
                    disabled={isLoading}
                    style={{
                      background: 'linear-gradient(135deg, #0B4F6C 0%, #1A5F7A 100%)',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: 'clamp(0.9rem, 3vw, 1rem)'
                    }}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Creating...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </button>

                  {/* Login Link */}
                  <div className="text-center">
                    <small className="text-secondary">
                      Already have an account?{' '}
                      <Link to="/" className="text-primary fw-semibold text-decoration-none">
                        Sign In
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

export default Register;