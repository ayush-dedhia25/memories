import { AUTH, LOGOUT } from '../constants/actionTypes';

function AuthReducer(state = {}, action) {
   switch (action.type) {
      case AUTH:
         localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
         return { ...state, authData: action?.payload };
      case LOGOUT:
         localStorage.clear();
         return { ...state, authData: null };
      default:
         return state;
   }
}

export default AuthReducer;