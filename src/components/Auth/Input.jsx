import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

function Input({ autoFocus, half, handleChange, handleShowPassword, label, name, type }) {
   return (
      <Grid item xs={12} sm={half ? 6 : 12}>
         <TextField
            type={type}
            name={name}
            label={label}
            onChange={handleChange}
            autoFocus={autoFocus}
            required fullWidth xs={6}
            variant="outlined"
            InputProps={name === 'password' ? ({
               endAdornment: (
                  <InputAdornment position="end">
                     <IconButton onClick={handleShowPassword}>
                        {type === 'password' ? <Visibility /> : <VisibilityOff />}
                     </IconButton>
                  </InputAdornment>
               )
            }) : null}
         />
      </Grid>
   );
}

export default Input;