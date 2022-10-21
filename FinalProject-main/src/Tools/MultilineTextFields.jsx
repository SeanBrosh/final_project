import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function MultilineTextFields(props) {
  let{labelFill,  inputTaker, value, helperText, givenRows} = props


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
        <TextField style ={{width: '80%'}}
        value={value}
          id="outlined-multiline-static"
          label={labelFill}
          helperText={helperText}
          multiline
          rows={givenRows}
        />
      </div>
    </Box>
  );
}
