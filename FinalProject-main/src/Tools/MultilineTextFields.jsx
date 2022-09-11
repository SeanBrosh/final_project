import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function MultilineTextFields(props) {
  let{labelFill,  inputTaker, value, helperText} = props


  return (
    <Box
    onChange={(e)=> inputTaker(e.target.value)}
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '75ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
        value={value}
          id="outlined-multiline-static"
          label={labelFill}
          helperText={helperText}
          multiline
          rows={4}
        />
      </div>
    </Box>
  );
}
