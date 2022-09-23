import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LarpSearchParameters from '../Classes/LarpSearchParameters';
import {useNavigate } from 'react-router-dom';

export default function CustomizedInputBase(props) {
  let{tags,hasFood,hasSleep,paymentStartingRng,paymentEndingRng,dateStart,dateEnd ,country} = props
    const [searchInput, setSearchInput] = React.useState(null);
    const navigate = useNavigate();

    const searchHandler=() =>{
      var formatedDate = null
      var formatedDateEnd = null
      if (dateEnd !== null && dateStart !== null)
      {
        if (dateEnd.getFullYear() < dateStart.getFullYear() || dateEnd.getFullYear() == dateStart.getFullYear() && dateEnd.getMonth() < dateStart.getMonth() || dateEnd.getFullYear() == dateStart.getFullYear() && dateEnd.getMonth() == dateStart.getMonth() && dateEnd.getDate() < dateStart.getDate()) 
        {
            alert("Bad End date! You can only add end date that starts from the starting date, onwards.")
            return;
        }
        else
        {


          formatedDate =(dateStart.getMonth()+1).toString()+ "/" + dateStart.getDate().toString() +"/"+ dateStart.getFullYear().toString()
          formatedDateEnd =(dateEnd.getMonth()+1).toString()+ "/" + dateEnd.getDate().toString() +"/"+ dateEnd.getFullYear().toString()


        }
      }
      else if(dateEnd !== null && dateStart === null)
      {
        formatedDateEnd =(dateEnd.getMonth()+1).toString()+ "/" + dateEnd.getDate().toString() +"/"+ dateEnd.getFullYear().toString()
      }
      else if(dateEnd === null && dateStart !== null)
      {
        formatedDate =(dateStart.getMonth()+1).toString()+ "/" + dateStart.getDate().toString() +"/"+ dateStart.getFullYear().toString()
      }
        localStorage.setItem('LarpSearchParameters', JSON.stringify(new LarpSearchParameters(searchInput,tags,hasFood,hasSleep,paymentStartingRng,paymentEndingRng,formatedDate,formatedDateEnd,country)));
        navigate('/larppagesearch')


      };
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 200 }}
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