import axios from 'axios';

const postApiUrl = 'http://localhost:5000/posts';

export const fetchPosts = () => axios.get(postApiUrl);