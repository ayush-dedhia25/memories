import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { deletePost, likePost } from '../../../redux/actions/posts';
import useStyles from './styles';

function Likes({ user, post }) {
   if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
         ? (<><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>)
         : (<><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</> );
   }
   return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
}

function Post({ post, setCurrentId }) {
   const classes = useStyles();
   const dispatch = useDispatch();
   const user = JSON.parse(localStorage.getItem('profile'));
   
   return (
      <Card className={classes.card}>
         <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
         <div className={classes.overlay}>
            <Typography variant="h6">{post.name}</Typography>
            <Typography variant="body2">created {moment(post.createdAt).fromNow()}</Typography>
         </div>
         {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <div className={classes.overlay2}>
               <Button style={{color: "white"}} size="small" onClick={() => setCurrentId(post._id)}>
                  <MoreHorizIcon fontSize="medium" />
               </Button>
            </div>
         )}
         <div className={classes.details}>
            <Typography variant="body2" color="textSecondary">
               {post.tags.map(tag => `#${tag} `)}
            </Typography>
         </div>
         <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
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