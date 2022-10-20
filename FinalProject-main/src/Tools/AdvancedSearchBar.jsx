import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import {useNavigate } from 'react-router-dom';
import CustomizedInputBase from './CustomizedInputBase';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '../Styles/global.css';
import '../Styles/media-query.css'


export default function MenuAppBar() {
const [anchorEl, setAnchorEl] = useState(null);
const [tags, setTags] = useState("");
const [hasFood, setHasFood] = useState("");
const [hasSleep, setHasSleep] = useState("");
const [paymentRngStart, setPaymentRngStart] = useState(null);
const [paymentRngEnd, setPaymentRngEnd] = useState(null);
const [date, setDate] = useState(null);
const [dateEnd, setDateEnd] = useState(null);
const [country, setCountry] = useState(null);
const [countriesFromDB, setCountriesFromDB] = useState(null);
const apiUrlGetCountries = 'http://proj9.ruppin-tech.co.il/api/getallcountries';
  const navigate = useNavigate();


  

  
const intputTakerTags = (event) => {
    setTags(event.target.value);
  }
  
  const intputTakerHasFood = (event) => {
    setHasFood(event.target.value);
  }
  
  const intputTakerHasSleep = (event) => {
    setHasSleep(event.target.value);
  }
  
  
  const fillCountryChoiceContent =() => {
  
  
    
  
  
    return       <FormControl 
  sx={{ minWidth: 300 }}>
    <Autocomplete
    disablePortal
    id="combo-box-demo"
    options={countriesFromDB}
    sx={{ minWidth: 300 }}
    value={country}
    onChange={(event, value) => setCountry(value)}
    renderInput={(params) => <TextField  {...params} label="Country" />}
  />
  </FormControl>
  }
  
  useEffect(() => {
  
  
    fetch(apiUrlGetCountries, {
        method: 'GET',
        headers: new Headers({
            'Content-type': 'application/json; charset=UTF-8',
        })
    }).then(res => {
        if (res.ok) {
            let temp = res.json()
  
            return temp
        }
        else {
            return null;
        }
    }).then((result) => {
         setCountriesFromDB(result)
    }
    )
  }, [])
  



  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOutButton =() => {
    sessionStorage.clear()
    navigate('/')
    setAnchorEl(null);
  }


  
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });

  

  return (
    <div  className="advance-search-organizer">
<div className="advance-search-organizer-two">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <CustomizedInputBase country={country} tags={tags} hasFood={hasFood} hasSleep={hasSleep} paymentStartingRng={paymentRngStart} paymentEndingRng={paymentRngEnd} dateStart={date} dateEnd={dateEnd} intputStyle={{p: '5px 50px', display: 'flex', alignItems: 'center', minWidth: 200 }}/>
          </Typography>
        <TextField id="payment-start-input" type="number" onChange={(e)=> setPaymentRngStart(e.target.value)}  label="Min Price"/>
        <TextField id="payment-end-input"  type="number" onChange={(e)=> setPaymentRngEnd(e.target.value)}  label="Max Price"/>
        
        

  
        <LocalizationProvider dateAdapter={AdapterDateFns}>
    
  <DatePicker 
    label="Start Date"
    value={date}
    onChange={(e) => {
      setDate(e);
    }}
    renderInput={(params) => <TextField {...params} />}
  />
</LocalizationProvider>

<LocalizationProvider dateAdapter={AdapterDateFns}>
  <DatePicker 
    label="End Date"
    value={dateEnd}
    onChange={(e) => {
      setDateEnd(e);
    }}
    renderInput={(params) => <TextField {...params} />}
  />
</LocalizationProvider>
    
</div>
<div className="advance-search-organizer-two">
      <FormControl 
      display="flex"
  justifyContent="center"
  alignItems="center"  sx={{ minWidth: 190 }}>
        <InputLabel id="demo-simple-select-label">LARP Theme</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tags}
          label="Choose the LARP's Theme!"
          onChange={intputTakerTags}
          
        >
          <MenuItem value={"Sci-Fi"}>Sci-Fi</MenuItem>
          <MenuItem value={"Post-Apocalyptic"}>Post-Apocalyptic</MenuItem>
          <MenuItem value={"Fantasy"}>Fantasy</MenuItem>
          <MenuItem value={"Political"}>Political</MenuItem>
          <MenuItem value={"Militant"}>Militant</MenuItem>
        </Select>
      </FormControl> 



    <FormControl 
    display="flex"
  justifyContent="center"
  alignItems="center"  sx={{ minWidth: 150 }}>
        <InputLabel id="demo-simple-select-label">Food Handling</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={hasFood}
          label="Choose how you handle food in your LARP!"
          onChange={intputTakerHasFood}
          
        >
          <MenuItem value={"Free Food"}>Free Food</MenuItem>
          <MenuItem value={"Paid Food"}>Paid Food</MenuItem>
          <MenuItem value={"No Food"}>No Food</MenuItem>
        </Select>
      </FormControl> 

      <FormControl 
      display="flex"
  justifyContent="center"
  alignItems="center"  sx={{ minWidth: 170 }}>
        <InputLabel id="demo-simple-select-label">Lodging Handling</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={hasSleep}
          label="Choose how you handle lodging in your LARP!"
          onChange={intputTakerHasSleep}
          
        >
          <MenuItem value={"Free Lodging"}>Free Lodging</MenuItem>
          <MenuItem value={"Paid Lodging"}>Paid Lodging</MenuItem>
          <MenuItem value={"No Lodging"}>No Lodging</MenuItem>
        </Select>
      </FormControl> 
      {fillCountryChoiceContent()}
      </div>
      </div>
  );
}