import { useEffect, useState } from 'react';
import { Button, Paper, TextField, Typography } from '@mui/material';
import FileBase from 'react-file-base64';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { createPost, updatePost } from '../../redux/actions/posts';
import useStyles from './styles';

function Form({ currentId, setCurrentId }) {
   const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
   const classes = useStyles();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const post = useSelector((state) => currentId ? state.posts.posts.find(p => p._id === currentId) : null);
   const user = JSON.parse(localStorage.getItem('profile'));
   
   useEffect(() => {
      if (post) setPostData(post);
   }, [post]);
   
   const handleSubmit = async (e) => {
      e.preventDefault();
      if (currentId === 0) {
         dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
         clear();
      } else {
         dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
         clear();
      }
   };
   
   const clear = () => {
      setCurrentId(0);
      setPostData({ title: '', message: '', tags: '', selectedFile: '' });
   };
   
   if (!user?.result?.name) {
      return (
         <Paper className={classes.paper}>
            <Typography variant="h6" align="center">
               Please Sign in to create your own memories and like others memories!
            </Typography>
         </Paper>
      );
   }
   
   return (
      <Paper className={classes.paper} elevation={6}>
         <form className={`${classes.form} ${classes.root}`} autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId ? "Editing" : "Creating"} a Memory</Typography>
            <TextField
               name="title" variant="outlined" label="Title"
               fullWidth value={postData.title}
               onChange={(e) => setPostData(state => ({ ...state, title: e.target.value }))}
            />
            <TextField
               name="message" variant="outlined" label="Message"
               fullWidth value={postData.message}
               onChange={(e) => setPostData(state => ({ ...state, message: e.target.value }))}
            />
            <TextField
               name="tags" variant="outlined" label="Tags"
               fullWidth value={postData.tags}
               onChange={(e) => setPostData(state => ({ ...state, tags: e.target.value.split(",") }))}
            />
            <div className={classes.fileInput}>
               <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) => setPostData(state => ({ ...state, selectedFile: base64 }))}
               />
            </div>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
               Submit
            </Button>
            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
               Clear
            </Button>
         </form>
      </Paper>
   );
}

export default Form;