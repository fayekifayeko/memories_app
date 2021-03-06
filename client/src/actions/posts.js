import * as api from "../api";
import {
  FETCH_ALL,
  CREATE,
  LIKE,
  DELETE,
  UPDATE,
  FETCH_ALL_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
  POST_COMMENT,
} from "../constants/actions";

export const postComment = (comment, postId) => async (dispatch) => {
  try {
    const { data } = await api.postComment(comment, postId);
    dispatch({ type: POST_COMMENT, payload: data });
    return data.comments;
  } catch (err) {
    console.log(err);
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPost(id);
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data: data } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_ALL_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
  }
};

export const createPost = (newPost, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.createPost(newPost);
    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });
    history.push(`posts/${data._id}`);
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (err) {
    console.log(err);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch (err) {
    console.log(err);
  }
};
