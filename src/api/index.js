import axios from 'axios';

const API = axios.create({
   baseURL: 'http://localhost:3000',
   timeout: 5000,
});

API.interceptors.request.use((req) => {
   const profile = JSON.parse(localStorage.getItem('profile'));
   if (profile) {
      req.headers.Authorization = `Bearer ${profile.token}`;
   }
   return req;
});

// Posts API
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatePost) => API.patch(`/posts/${id}`, updatePost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost   = (id) => API.patch(`/posts/${id}/like-post`);

// Users API
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);