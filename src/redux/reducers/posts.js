import * as Types from '../constants/actionTypes';

function PostsReducer(posts = [], action) {
   switch (action.type) {
      case Types.FETCH_ALL:
         return action.payload;
      case Types.CREATE:
         return [...posts, action.payload];
      case Types.UPDATE_POST:
      case Types.LIKE:
         return posts.map(post => post._id === action.payload._id ? action.payload : post);
      case Types.DELETE:
         return posts.filter(post => post._id !== action.payload);
      default:
         return posts;
   }
}

export default PostsReducer;