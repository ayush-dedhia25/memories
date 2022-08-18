import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useDispatch } from 'react-redux';

import Input from './Input';
import useStyles from './styles';
import { signin, signup } from '../../redux/actions/auth';

const initialState = {
   firstName: '',
   lastName: '',
   email: '',
   password: '',
   confirmPassword: '',
};

function Auth() {
   const classes = useStyles();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   
   const [formData, setFormData] = useState(initialState);
   const [isSignup, setIsSignup] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
   
   const handleSubmit = async (e) => {
      e.preventDefault();
      if (isSignup) {
         dispatch(signup(formData, navigate));
      } else {
         const data = { email: formData.email, password: formData.password };
         dispatch(signin(data, navigate));
      }
   }
   
   const handleChange = (e) => {
      setFormData((prevFormData) => ({
         ...prevFormData,
         [e.target.name]: e.target.value,
      }));
   }
   
   const handleShowPassword = (e) => {
      setShowPassword((prevState) => !prevState);
   }
   
   const switchMode = () => {
      setIsSignup((prevState) => !prevState);
      setShowPassword(false);
   }
   
   return (
      <Container component="main" maxWidth="xs">
         <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
               <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
               <Grid container spacing={2}>
                  {isSignup && (
                     <>
                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                        <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                     </>
                  )}
                  <Input type="email" name="email" label="Email Address" handleChange={handleChange} />
                  <Input type={showPassword ? 'text' : 'password'} name="password" label="Password" handleChange={handleChange} handleShowPassword={handleShowPassword} />
                  {isSignup && (
                     <Input type="password" name="confirmPassword" label="Repeat Password" handleChange={handleChange} handleShowPassword={handleShowPassword} />
                  )}
               </Grid>
               <Button type="submit" className={classes.submit} variant="contained" color="primary" fullWidth>
                  {isSignup ? 'Sign Up' : 'Sign In'}
               </Button>
               <Grid container justifyContent="flex-end">
                  <Grid item>
                     <Button onClick={switchMode}>
                        {isSignup
                           ? 'Already have an account? Sign In.'
                           : 'Don\'t have an account? Sign Up.'
                        }
                     </Button>
                  </Grid>
               </Grid>
            </form>
         </Paper>
      </Container>
   );
}

export default Auth;