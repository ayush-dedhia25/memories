import * as Types from '../constants/actionTypes';

const initialState = {
   isLoading: true,
   posts: [],
};

function PostsReducer(state = initialState, action) {
   switch (action.type) {
      case Types.START_LOADING:
         return { ...state, isLoading: true };
      case Types.END_LOADING:
         return { ...state, isLoading: false };
      case Types.FETCH_ALL:
         return {
            ...state,
            posts: action.payload.data,
            currentPage: action.payload.currentPage,
            numberOfPages: action.payload.numberOfPages,
         };
      case Types.FETCH_BY_SEARCH:
         return { ...state, posts: action.payload };
      case Types.FETCH_POST:
         return { ...state, post: action.payload };
      case Types.CREATE:
         return { ...state, posts: [...state.posts, action.payload] };
      case Types.UPDATE:
      case Types.LIKE:
         return { ...state, posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post) };
      case Types.DELETE:
         return { ...state, posts: state.posts.filter(post => post._id !== action.payload) };
      default:
         return state;
   }
}

export default PostsReducer;