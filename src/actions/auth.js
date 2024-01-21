//client/src/actions/auth.js
import * as api from "../api";
import { setCurrentUser } from "./currentUser";

export const login = (authData) => async (dispatch) => {
  try {
    const { data } = await api.login(authData);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
  } catch (error) {
    console.log(error);
  }
};

// export const signup = (signupData, history) => async (dispatch) => {
//   try {
//     const { data } = await api.signup(signupData);

//     // Assuming the user data is available in the signup API response
//     const userData = data.user; // Adjust this based on the actual structure of the response
//     dispatch({ type: "AUTH", data });

//     // Dispatch the setCurrentUser action with the user data
//     dispatch(setCurrentUser(userData));

//     // Save user data to localStorage if needed
//     localStorage.setItem('Profile', JSON.stringify(userData));

//     // Redirect to a different route (e.g., home) after successful signup
//     history.push('/'); // Update the route as needed
//   } catch (error) {
//     console.log("Signup failed:", error);
//     // Handle the error (e.g., display an error message to the user)
//   }
// };