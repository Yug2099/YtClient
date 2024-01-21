// SignUp.js
import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { BiUserCircle } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const onSuccessGoogle = (response) => {
    const googleEmail = response?.profileObj.email;
    console.log("Google login successful", googleEmail);
  };

  const onFailureGoogle = (response) => {
    console.log("Google login failed", response);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Check for password match
    if (signUpData.password !== signUpData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      // Send the signupData to the server
      const response = await axios.post('http://localhost:5500/api/user/signup', signUpData);
      
      // Display the server response details in an alert
      const userDetailsAlert = response.data.userDetailsAlert;
      alert(userDetailsAlert);

      // Redirect to the signin page
      navigate('/signin');
    } catch (error) {
      console.error('Error during signup:', error.response.data);
      setError(error.response.data.details || "Signup failed");
    }
  };

  const handleInputChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
    setPasswordError(""); // Clear password error when the user types
    setError(""); // Clear other errors when the user types
  };

  const handleConfirmPasswordBlur = () => {
    // Check for password match when Confirm Password field is blurred
    if (signUpData.password !== signUpData.confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  return (
    <div className="Form_Container">
      <form onSubmit={handleSignUp} className="SignUp_Form">
        {/* Sign-Up Form */}
        <input type="text" name="name" value={signUpData.name} onChange={handleInputChange} placeholder="Name" required /><br />
        <input type="email" name="email" value={signUpData.email} onChange={handleInputChange} placeholder="Email" required /><br />
        <input type="password" name="password" value={signUpData.password} onChange={handleInputChange} placeholder="Password" required /><br />
        <input type="password" name="confirmPassword" value={signUpData.confirmPassword} onChange={handleInputChange} onBlur={handleConfirmPasswordBlur} placeholder="Confirm Password" required /><br />

        {/* Display error message */}
        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Sign Up</button>

        {/* Already have an account? Login */}
        <p>
          Already have an account? <Link to="/signin">Login</Link>
        </p>
        <GoogleLogin
          clientId="220416052057-loa308brffhl7r0jrqmj44a4fnpvloi8.apps.googleusercontent.com"
          onSuccess={onSuccessGoogle}
          onFailure={onFailureGoogle}
          render={(renderProps) => (
            <p onClick={renderProps.onClick} className="Auth_Btn">
              <BiUserCircle size={22} />
              <b>Sign in with Google</b>
            </p>
          )}
        />
      </form>
    </div>
  );
};

export default SignUp;
