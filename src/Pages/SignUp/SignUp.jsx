import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { BiUserCircle } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [passwordError, setPasswordError] = useState("");

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
      // Log the sign-up data in the console
      console.log("Sign up data:", signUpData);

      // Assuming your server endpoint for user creation is '/api/user/signup'
      const response = await axios.post('http://localhost:5500/api/user/signup', signUpData);

      // Log the response from the server
      console.log('Server response:', response.data);

      // Assuming your sign-up logic is successful, redirect to the sign-in page
      navigate('/signin');
    } catch (error) {
      console.error('Error during signup:', error.response.data);

      // Display more detailed error message to the user
      alert(`Signup failed: ${error.response.data.details}`);
    }
  };

  const handleInputChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
    // Clear password error when the user types
    setPasswordError("");
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
        {/* Google Login */}
        {/* Sign-Up Form */}
        {/* <label>Name</label> */}
        <input type="text" name="name" value={signUpData.name} onChange={handleInputChange} placeholder="Name" required /><br />

        {/* <label>Email</label> */}
        <input type="email" name="email" value={signUpData.email} onChange={handleInputChange} placeholder="Email" required /><br />

        {/* <label>Password</label> */}
        <input type="password" name="password" value={signUpData.password} onChange={handleInputChange} placeholder="Password" required /><br />

        {/* <label>Confirm Password</label> */}
        <input type="password" name="confirmPassword" value={signUpData.confirmPassword} onChange={handleInputChange} onBlur={handleConfirmPasswordBlur} placeholder="Confirm Password" required /><br />

        {/* Display error message */}
        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}

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
