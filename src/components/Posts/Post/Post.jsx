import { Button, ButtonBase, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { deletePost, likePost } from '../../../redux/actions/posts';
import useStyles from './styles';

function Likes({ user, post }) {
   if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
         ? (<><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>)
         : (<><ThumbUpOffAltIcon fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</> );
   }
   return <><ThumbUpOffAltIcon fontSize="small" />&nbsp;Like</>;
}

function Post({ post, setCurrentId }) {
   const classes = useStyles();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const user = JSON.parse(localStorage.getItem('profile'));
   
   const openPost = (e) => {
      navigate(`/posts/${post._id}`);
   };
   
   return (
      <Card className={classes.card} raised elevation={6}>
         <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
         <div className={classes.overlay}>
            <Typography variant="h6">{post.name}</Typography>
            <Typography variant="body2">created {moment(post.createdAt).fromNow()}</Typography>
         </div>
         {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <div className={classes.overlay2} name="edit">
               <Button
                  onClick={(e) => {
                     e.stopPropogation();
                     setCurrentId(post._id)}
                  }
                  style={{ color: "white" }}
                  size="small"
               >
                  <MoreHorizIcon fontSize="medium" />
               </Button>
            </div>
         )}
         <div className={classes.details}>
            <Typography variant="body2" color="textSecondary">
               {post.tags.map(tag => `#${tag} `)}
            </Typography>
         </div>
         <Typography onClick={openPost} className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
         <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
         </CardContent>
         <CardActions className={classes.cardActions}>
            <Button size="small" color="primary" onClick={(e) => dispatch(likePost(post._id))} disabled={!user?.result}>
               <Likes user={user} post={post} />
            </Button>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
               <Button size="small" color="primary" onClick={(e) => dispatch(deletePost(post._id))} disabled={!user?.result}>
                  <DeleteIcon fontSize="small" /> Delete
               </Button>
            )}
         </CardActions>
      </Card>
   );
}

export default Post;