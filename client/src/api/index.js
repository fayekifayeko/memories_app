import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

//const postApiUrl = "http://localhost:5000/posts"; // should be changed to Prod url later

// export const fetchPosts = () => axios.get(postApiUrl);

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, post) => API.patch(`/posts/${id}`, post);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchTerm=${searchQuery.searchTerm || "none"}&tags=${
      searchQuery.tags || ["none"]
    }`
  );

export const signin = (formData) => API.post(`/users/signin`, formData);
export const signup = (formData) => API.post(`/users/signup`, formData);
