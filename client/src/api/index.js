import axios from 'axios';

const postApiUrl = 'http://localhost:5000/posts';

export const fetchPosts = () => axios.get(postApiUrl);
export const createPost = (newPost) => axios.post(postApiUrl, newPost);
export const updatePost = (id, post) => axios.patch(`${postApiUrl}/${id}`, post);