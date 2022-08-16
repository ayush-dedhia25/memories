import { Container } from '@material-ui/core';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

function App() {
   return (
      <Container maxwidth="lg">
         <Navbar />
         <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/auth" element={<Auth />} />
         </Routes>
      </Container>
   );
}

export default App;