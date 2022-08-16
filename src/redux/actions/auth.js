import { AUTH } from '../constants/actionTypes';
import * as api from '../../api';

export function signup(formData, navigate) {
   return async (dispatch) => {
      try {
         const { data } = await api.signUp(formData);
         dispatch({ type: AUTH, payload: data });
         navigate('/');
      } catch (err) {
         console.log(err);
      }
   };
}

export function signin(formData, navigate) {
   return async (dispatch) => {
      try {
         const { data } = await api.signIn(formData);
         dispatch({ type: AUTH, payload: data });
         navigate('/');
      } catch (err) {
         console.log(err);
      }
   };
}