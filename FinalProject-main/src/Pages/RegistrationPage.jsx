import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import {useNavigate } from 'react-router-dom';
import PrimarySearchAppBar from '../Tools/MenuAppBar';
import bcrypt from 'bcryptjs';


export default function RegistrationPage() {



const apiUrl = 'http://proj9.ruppin-tech.co.il/api/adduser';
const apiUrlGetCountries = 'http://proj9.ruppin-tech.co.il/api/getallcountries';
const [email, setEmail] = useState(null);
const [pass, setPass] = useState(null);
const [confirmPass, setConfirmPass] = useState(null)
const [name, setName] = useState(null);
const [image, setImage] = useState("");
const [country, setCountry] = useState(null);
const [countriesFromDB, setCountriesFromDB] = useState(null);
const [anonButton, setAnonButton] = useState(null)
const navigate = useNavigate();
const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@+[a-zA-Z0-9.-]+.[a-zA-Z]$');
const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{5,}$');
const validName = new RegExp('^[a-zA-Z0-9._:$!%-].{2,20}$');


const styles = {
  border: '1px solid black', margin:100 , padding:30,backgroundColor:"white"}

  const btnSetAnonymous = () => {
    setCountry('Anonymous')
  }

  const fillAnonymosButtonContent =() => {


  
    return anonButton
  
  
  }


  const fillCountryChoiceContent =() => {


  


    return       <FormControl 
 sx={{ minWidth: 300 }}>
    <Autocomplete
    style={{margin:30} }
    disablePortal
    id="combo-box-demo"
    options={countriesFromDB}
    sx={{ width: 300 }}
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
  


  useEffect(() => {
  

    if (country === 'Anonymous')
    { 
      setAnonButton(<div><Button style={{margin:30}} color="error" variant="contained" disabled >Marked as Anonymous</Button><br></br></div>)
      return
    }
    else
    {
      setAnonButton(<div><Button style={{margin:30}} onClick={btnSetAnonymous} variant="contained" >Signed up as Anonymous</Button><br></br></div>)
    }
  }, [country])

const btnAddUser = () => {
  if (email === null || pass === null || confirmPass=== null|| name === null || country === null)
  {
    alert("Please fill all the fields but image - which is optional.")
    return
  }
  if (!validEmail.test(email))
  {
    alert("Please write the email in a proper email format.")
    return
  }
 if(!validPassword.test(pass)) 
 {
    alert("Please write the password in length of at least 6 - which include small and big letters and numnbers!")
    return
  }
 
  if (confirmPass !== pass)
  {
    alert("Please write make sure that your password and password confirmation are the same!")
    return
  }

  if (!validName.test(name))
  {
    alert("Please write the name with at least 3 letters, up to 20")
    return
  }
  const hashedPassword = bcrypt.hashSync(pass, 10)
;
  const userRegisterDetail = {
    User_Name : name,
    Email: email,
    User_Password: hashedPassword,
    User_Country : country,
    User_Image : image
  };
  fetch(apiUrl, {
    method: 'PUT',
    body: JSON.stringify(userRegisterDetail),
    headers: new Headers({
      'Content-type': 'application/json; charset=UTF-8',
      'Accept': 'application/json; charset=UTF-8'
    })
  }).then(res => {
    if (res.ok) {
      return res.json()
    }
    else {
      return null;
    }
  }).then((result) => {
    if (result == null) {
      alert("The email or username are already taken!")
      return;
    }
    alert("User was successfully created!")
    navigate('/login')

  },
    (error) => {
      console.log("err post=", error)
    });

}



  return (
    <div style={{backgroundColor:"peachpuff"}}>
        <PrimarySearchAppBar></PrimarySearchAppBar>

        <div style={styles}>
        <TextField style={{margin:10}} type="email" color='success' id="email-input" label="Email" variant="standard" onChange={(e)=> setEmail(e.target.value)}/><br/>
        <TextField style={{margin:10}} color='success' id="password-input" label="Password" variant="standard" onChange={(e)=> setPass(e.target.value)} type="password"/><br/>
        <TextField style={{margin:10}} color='success' id="confirm-password-input" label="Password Confirmation" variant="standard" onChange={(e)=> setConfirmPass(e.target.value)} type="password"/><br/>
        <TextField style={{margin:10}} color='success' id="name-input" label="Name" variant="standard" onChange={(e)=> setName(e.target.value)}/><br/>
        <TextField style={{margin:10}} color='success' id="image-input" label="Image SRC" variant="standard" onChange={(e)=> setImage(e.target.value)}/><br/>
        {fillCountryChoiceContent()}
        <br></br>
        Should you prefer to not have your country chosen - you can click on the Anonymous button instead!<br></br>
        {fillAnonymosButtonContent()}
        <Button style={{margin:30}} variant="contained" onClick={btnAddUser}>Register</Button><br/>
        </div>
    </div>
  )
}
