import { Button } from '@material-ui/core';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Icon from './Icon';

function GoogleAuth({ classes }) {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   
   const googleSuccess = async (signInResult) => {
      const profileObject = signInResult?.profileObj;
      const access_token = signInResult?.tokenId;
      try {
         dispatch({ type: 'AUTH', payload: { profileObject, token: access_token } });
         navigate('/');
      } catch (err) {
         console.log(err);
      }
   }
   
   const googleFailure = (signInError) => {
      console.log(signInError);
      console.log('Google Sign In was unsuccessful. Try again later');
   }
   
   return (
      <GoogleLogin
         clientId="407256462936-3sibfpi763fm3i2s8i4a3ro783n93cvk.apps.googleusercontent.com"
         cookiePolicy="single_host_origin"
         render={(renderProps) => (
            <Button
               className={classes.googleButton}
               color="primary"
               variant="contained"
               onClick={renderProps.onClick}
               disabled={renderProps.disabled}
               startIcon={<Icon />}
               fullWidth
            >
               Google Sign In
            </Button>
         )}
         onSuccess={googleSuccess}
         onFailure={googleFailure}
      />
   );
}

export default GoogleAuth;