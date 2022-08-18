import { useSelector } from 'react-redux';
import { CircularProgress, Grid, Typography } from '@material-ui/core';

import Post from './Post/Post';
import useStyles from './styles';

function Posts({ setCurrentId }) {
   const { posts, isLoading } = useSelector((state) => state.posts);
   const classes = useStyles();
   
   if (!posts.length && !isLoading) {
      return <Typography>No Memories Present Currently. You can try on creating one.</Typography>;
   }
   
   return (
      isLoading ? <CircularProgress /> : (
         <Grid className={classes.container} alignItems="stretch" spacing={3} container>
            {posts.map((post) => (
               <Grid item key={post._id} xs={12} sm={12} md={6} lg={3}>
                  <Post post={post} setCurrentId={setCurrentId} />
               </Grid>
            ))}
         </Grid>
      )
   );
}

export default Posts;