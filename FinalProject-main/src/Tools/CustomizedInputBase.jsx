import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate } from 'react-router-dom';

export default function CustomizedInputBase() {
    const [searchInput, setSearchInput] = React.useState(null);
    const navigate = useNavigate();

    const searchHandler=() =>{
        localStorage.setItem('searchInput', JSON.stringify(searchInput));
        navigate('/larppagesearch')
      };
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase onChange={(e)=> setSearchInput(e.target.value)}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search for Larp"
        inputProps={{ 'aria-label': 'search for larp' }}
      />
      <IconButton onClick={searchHandler} type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}