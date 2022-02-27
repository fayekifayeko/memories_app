// @ts-nocheck
import { AUTH, LOGOUT } from "../constants/actions";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload })); // local storage to still work if refresh the page and keep the loging info for some time
      return { ...state, authData: action?.payload };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
