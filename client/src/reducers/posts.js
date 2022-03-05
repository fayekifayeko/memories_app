import {
  FETCH_ALL,
  CREATE,
  LIKE,
  DELETE,
  UPDATE,
  FETCH_ALL_BY_SEARCH,
  START_LOADING,
  END_LOADING,
} from "../constants/actions";

/* export default (state = [], action) => {
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
}; */

export default (state = { posts: [], isLoading: true }, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currenPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };

    case FETCH_ALL_BY_SEARCH:
      return { ...state, posts: action.payload.data };

    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };

    case UPDATE:
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };

    case DELETE:
      return {
        ...state,
        posts: state.filter((item) => item._id !== action.payload),
      };
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};
