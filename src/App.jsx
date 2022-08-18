import { Container } from '@material-ui/core';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

function App() {
   const user = JSON.parse(localStorage.getItem('profile'));
   
   return (
      <Container maxwidth="xl">
         <Navbar />
         <Routes>
            <Route exact path="/" element={<Navigate replace to="/posts" />} />
            <Route exact path="/posts" element={<Home />} />
            <Route exact path="/posts/search" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route exact path="/auth" element={!user ? <Auth /> : <Navigate replace to="/posts" />} />
         </Routes>
      </Container>
   );
}

export default App;