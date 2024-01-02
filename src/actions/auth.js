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

export const signup = (signupData) => async (dispatch) => {
  try {
    const { data } = await api.signup(signupData);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
  } catch (error) {
    console.log(error);
  }
};
