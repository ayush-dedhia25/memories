import axios from 'axios';

const environment = import.meta.env.VITE_NODE_ENV || 'development';
let backendURI;

if (environment === 'production') {
   backendURI = 'https://my-memories-com.herokuapp.com';
} else {
   backendURI = 'http://localhost:3001';
}

const API = axios.create({ baseURL: backendURI, timeout: 15000 });

API.interceptors.request.use((req) => {
   const profile = JSON.parse(localStorage.getItem('profile'));
   if (profile) {
      req.headers.Authorization = `Bearer ${profile.token}`;
   }
   return req;
});

// Posts API
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatePost) => API.patch(`/posts/${id}`, updatePost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost   = (id) => API.patch(`/posts/${id}/like-post`);

// Users API
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
