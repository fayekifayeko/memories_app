import * as api from "../api";
import { AUTH } from "../constants/actions";

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);
    dispatch({ type: AUTH, payload: data });
    history.push("/");
  } catch (err) {
    console.log(err);
  }
};

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signin(formData);
    dispatch({ type: AUTH, payload: data });
    history.push("/");
  } catch (err) {
    console.log(err);
  }
};
