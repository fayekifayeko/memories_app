import { FETCH_ALL, CREATE, LIKE, DELETE, UPDATE, FETCH_ALL_BY_SEARCH } from "../constants/actions";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;

      case FETCH_ALL_BY_SEARCH:
        return action.payload.data;

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
