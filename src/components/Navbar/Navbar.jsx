import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';
import { LOGOUT } from '../../redux/constants/actionTypes';
import useStyles from './styles';

function Navbar() {
   const classes = useStyles();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const location = useLocation();
   const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
   
   const logout = () => {
      dispatch({ type: LOGOUT });
      navigate('/auth');
      setUser(null);
   };
   
   useEffect(() => {
      const token = user?.token;
      if (token) {
         const decodedToken = decode(token);
         if (decodedToken.exp * 1000 < (new Date()).getTime()) {
            logout();
         }
      }
      setUser(JSON.parse(localStorage.getItem('profile')));
   }, [location]);
   
   return (
      <AppBar className={classes.appBar} position="static" color="inherit">
         <Link to="/" className={classes.brandContainer}>
            <img src={memoriesText} alt="Memories Icon" height="45px" />
            <img className={classes.image} src={memoriesLogo} alt="Memories Image" height="40px" />
         </Link>
         <Toolbar className={classes.toolbar}>
            {user ? (
               <div className={classes.profile}>
                  <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                  <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                  <Button className={classes.logout} variant="contained" color="secondary" onClick={logout}>Logout</Button>
               </div>
            ) : <Button component={Link} to="/auth" variant="contained" color="primary">Login</Button>}
         </Toolbar>
      </AppBar>
   );
}

export default Navbar;