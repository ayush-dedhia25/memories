import { Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

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
                        {type === 'password' ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                     </IconButton>
                  </InputAdornment>
               )
            }) : null}
         />
      </Grid>
   );
}

export default Input;