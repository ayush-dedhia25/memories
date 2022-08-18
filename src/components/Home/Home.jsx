import { useEffect, useState } from 'react';
import { AppBar, Button, Container, Chip, Grid, Grow, Paper, TextField } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import Pagination from '../Pagination';
import { getPosts, getPostBySearch } from '../../redux/actions/posts';
import useStyles from './styles';

function useQuery() {
   return new URLSearchParams(useLocation().search);
}

function Home() {
   const [currentId, setCurrentId] = useState(0);
   const [search, setSearch] = useState('');
   const [tags, setTags] = useState('');
   
   const dispatch = useDispatch();
   const classes = useStyles();
   const query = useQuery();
   const navigate = useNavigate();
   
   const page = query.get('page') || 1;
   const searchQuery = query.get('searchQuery');
   
   const searchPost = (e) => {
      if (search.trim() || tags) {
         dispatch(getPostBySearch({ search, tags: tags.split(' ').join(',') }));
         navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.split(' ').join(',')}`);
      } else {
         navigate('/');
      }
   };
   
   const handleKeyPress = (e) => {
      if (e.keyCode === 13) {
         searchPost();
      }
   };
   
   const handleAddChip = (chip) => {
      setTags((prevTags) => [...prevTags, chip]);
   };
   
   const handleDeleteChip = (chip) => {
      setTags((prevTags) => {
         return prevTags.filter((tag) => tag !== chip);
      });
   };
   
   return (
      <Grow in>
         <Container maxWidth="xl">
            <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
               <Grid item xs={12} sm={6} md={9}>
                  <Posts setCurrentId={setCurrentId} />
               </Grid>
               <Grid item xs={12} sm={6} md={3}>
                  <AppBar className={classes.appBarSearch} position="static" color="inherit">
                     <TextField
                        name="search"
                        variant="outlined"
                        label="Search Memories"
                        fullWidth
                        value={search}
                        onKeyPress={handleKeyPress}
                        onChange={({ target }) => setSearch(target.value)}
                     />
                     <TextField
                        name="tags"
                        variant="outlined"
                        label="Search Tags"
                        fullWidth
                        sx={{ margin: '15px 0' }}
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                     />
                     <Button className={classes.searchButton} color="primary" onClick={searchPost} variant="contained">
                        Search
                     </Button>
                  </AppBar>
                  <Form currentId={currentId} setCurrentId={setCurrentId} />
                  {(!searchQuery && !tags.length) && (
                     <Paper className={classes.pagination} elevation={6}>
                        <Pagination page={page} />
                     </Paper>
                  )}
               </Grid>
            </Grid>
         </Container>
      </Grow>
   );
}

export default Home;