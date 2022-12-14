import { useEffect } from 'react';
import { CircularProgress, Divider, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

import { getPost, getPostBySearch } from '../../redux/actions/posts';
import useStyles from './styles';

function PostDetails() {
   const classes = useStyles();
   const dispatch = useDispatch();
   const { id } = useParams();
   const navigate = useNavigate();
   const { post, posts, isLoading } = useSelector((state) => state.posts);
   
   useEffect(() => {
      dispatch(getPost(id));
   }, [id]);
   
   useEffect(() => {
      if (post) dispatch(getPostBySearch({ search: 'none', tags: post?.tags.join(',') }));
   }, [post]);
   
   if (!post) return null;
   
   if (isLoading) {
      return (
         <Paper className={classes.loadingPaper} elevation={6}>
            <CircularProgress size="7em" />
         </Paper>
      );
   }
   
   const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);
   
   const openPost = (id) => {
      navigate(`/posts/${id}`);
   };
   
   return (
      <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
         <div className={classes.card}>
            <div className={classes.section}>
               <Typography variant="h3" component="h2">{post.title}</Typography>
               <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
               <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
               <Typography variant="h6">Created by: {post.name}</Typography>
               <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
               <Divider style={{ margin: '20px 0' }} />
               <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
               <Divider style={{ margin: '20px 0' }} />
               <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
               <Divider style={{ margin: '20px 0' }} />
            </div>
            <div className={classes.imageSection}>
               <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
            </div>
         </div>
         {recommendedPosts.length ? (
            <div className={classes.section}>
               <Typography gutterBottom variant="h5">You might also like: </Typography>
               <Divider />
               <div className={classes.recommendedPosts}>
                  {recommendedPosts.map(({ _id, name, title, message, likes, selectedFile }) => (
                     <div key={_id} style={{ margin: '20px', cursor: 'pointer' }} onClick={(e) => openPost(_id)}>
                        <Typography gutterBottom variant="h6">{title}</Typography>
                        <Typography gutterBottom variant="subtitle2">{name}</Typography>
                        <Typography gutterBottom variant="subtitle2">{message}</Typography>
                        <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                        <img src={selectedFile} width="200px" />
                     </div>
                  ))}
               </div>
            </div>
         ) : <Typography variant="body1" style={{ marginTop: '15px' }}>Currently no posts to recommend to you! Try spending some time in here.</Typography>}
      </Paper>
   );
}

export default PostDetails;