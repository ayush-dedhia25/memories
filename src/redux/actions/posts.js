import * as Types from '../constants/actionTypes';
import * as api from '../../api';

export function getPost(id) {
   return async (dispatch) => {
      try {
         dispatch({ type: Types.START_LOADING });
         const { data } = await api.fetchPost(id);
         dispatch({ type: Types.FETCH_POST, payload: data });
         dispatch({ type: Types.END_LOADING });
      } catch (err) {
         console.log(err);
      }
   };
}

export function getPosts(page) {
   return async (dispatch) => {
      try {
         dispatch({ type: Types.START_LOADING });
         const { data } = await api.fetchPosts(page);
         dispatch({ type: Types.FETCH_ALL, payload: data });
         dispatch({ type: Types.END_LOADING });
      } catch (err) {
         console.log(err);
      }
   };
}

export function getPostBySearch(searchQuery) {
   return async (dispatch) => {
      try {
         dispatch({ type: Types.START_LOADING });
         const { data } = await api.fetchPostsBySearch(searchQuery);
         dispatch({ type: Types.FETCH_BY_SEARCH, payload: data });
         dispatch({ type: Types.END_LOADING });
      } catch (err) {
         console.log(err);
      }
   };
}

export function createPost(post, navigate) {
   return async (dispatch) => {
      try {
         dispatch({ type: Types.START_LOADING });
         const { data } = await api.createPost(post);
         navigate(`/posts/${data._id}`);
         dispatch({ type: Types.CREATE, payload: data });
         dispatch({ type: Types.END_LOADING });
      } catch (err) {
         console.log(err);
      }
   };
}

export function updatePost(currentId, post) {
   return async (dispatch) => {
      try {
         const { data } = await api.updatePost(currentId, post);
         dispatch({ type: Types.UPDATE, payload: data });
      } catch (err) {
         console.log(err);
      }
   };
}

export function deletePost(currentId) {
   return async (dispatch) => {
      try {
         await api.deletePost(currentId);
         dispatch({ type: Types.DELETE, payload: currentId });
      } catch (err) {
         console.log(err);
      }
   };
}

export function likePost(currentId) {
   return async (dispatch) => {
      try {
         const { data } = await api.likePost(currentId);
         dispatch({ type: Types.LIKE, payload: data });
      } catch (err) {
         console.log(err);
      }
   };
}