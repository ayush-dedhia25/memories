import * as Types from '../constants/actionTypes';
import * as api from '../../api';

export function getPosts() {
   return async (dispatch) => {
      try {
         const { data } = await api.fetchPosts();
         dispatch({ type: Types.FETCH_ALL, payload: data });
      } catch (err) {
         console.log(err);
      }
   };
}

export function createPost(post) {
   return async (dispatch) => {
      try {
         const { data } = await api.createPost(post);
         dispatch({ type: Types.CREATE, payload: data });
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