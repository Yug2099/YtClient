import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../actions/auth";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { BiUserCircle } from "react-icons/bi";
import "./SignIn.css";

const SignIn = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle login logic
    dispatch(login({ email, password }));
  };

  const onSuccessGoogle = (response) => {
    const googleEmail = response?.profileObj.email;
    // Handle Google login logic
    dispatch(login({ email: googleEmail }));
  };

  const onFailureGoogle = (response) => {
    console.log("Google login failed", response);
  };

  return (
    <div className="Form_Container">
      <form onSubmit={handleSubmit} className="SignIn_Form">
        {/* Email Input */}
        {/* <label>Email</label> */}
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <br />

        {/* Password Input */}
        {/* <label>Password</label> */}
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <br />

        {/* Submit Button */}
        <button type="submit">Sign In</button>

        {/* Sign Up Link */}
        {/* <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p> */}

        {/* Google Login */}
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

export default SignIn;
