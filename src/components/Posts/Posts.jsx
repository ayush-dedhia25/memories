import { useSelector } from 'react-redux';
import { CircularProgress, Grid } from '@material-ui/core';

import Post from './Post/Post';
import useStyles from './styles';

function Posts({ setCurrentId }) {
   const posts = useSelector(state => state.posts);
   const classes = useStyles();
   
   if (!posts.length) {
      return <CircularProgress />;
   }
   
   return (
      <Grid className={classes.container} alignItems='stretch' spacing={3} container>
         {posts.map(post => (
            <Grid key={post._id} item xs={12} sm={6}>
               <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
         ))}
      </Grid>
   );
}

export default Posts;