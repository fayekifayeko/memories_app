import axios from 'axios';

const postApiUrl = 'http://localhost:5000/posts'; // should be changed to Prod url later

export const fetchPosts = () => axios.get(postApiUrl);
export const createPost = (newPost) => axios.post(postApiUrl, newPost);
export const updatePost = (id, post) => axios.patch(`${postApiUrl}/${id}`, post);
export const deletePost = (id) => axios.delete(`${postApiUrl}/${id}`);
export const likePost = (id) => axios.patch(`${postApiUrl}/${id}/likePost`);