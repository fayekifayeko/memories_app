import { FETCH_ALL, CREATE, LIKE, DELETE, UPDATE } from "../constants/actions";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;

    case CREATE:
      return [...state, action.payload];

    case UPDATE:
    case LIKE:
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );

    case DELETE:
      return state.filter((item) => item._id !== action.payload);
    default:
      return state;
  }
};
