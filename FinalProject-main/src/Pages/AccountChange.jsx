import React, { useState,useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import User from '../Classes/User';
import {useNavigate } from 'react-router-dom';
import PrimarySearchAppBar from '../Tools/MenuAppBar';
import bcrypt from 'bcryptjs';



export default function AccountChange() {

const adminUserChanger = JSON.parse(localStorage.getItem('userChoice'));
const currentUser = JSON.parse(sessionStorage.getItem('login'));
const [id, setID] = useState(currentUser.user_id);
const [email, setEmail] = useState(currentUser.email);
const [pass, setPass] = useState(null);
const [confirmPass, setConfirmPass] = useState(null)
const [name, setName] = useState(currentUser.name);
const [rank, setRank] = useState(currentUser.rank);
const [image, setImage] = useState(currentUser.user_image);
const [country, setCountry] = useState(currentUser.country);
const [countriesFromDB, setCountriesFromDB] = useState(null);
const [anonButton, setAnonButton] = useState(null)
const navigate = useNavigate();
const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@+[a-zA-Z0-9.-]+.[a-zA-Z]$');
const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
const validName = new RegExp('^[a-zA-Z0-9._:$!%-].{3,20}$');
const apiUrl = 'http://proj9.ruppin-tech.co.il/api/updateuser';
const apiUrlGetCountries = 'http://proj9.ruppin-tech.co.il/api/getallcountries';

const styles = {
    border: '1px solid black', margin:100 , padding:30 ,backgroundColor:"white"}


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
      options={countriesFromDB ||[]}
      value={country}
      sx={{ width: 300 }}
      onChange={(event, value) => setCountry(value)}
      renderInput={(params) => <TextField  {...params} label="Country" />}
    />
    </FormControl>
    
    }
  
    
  
    useEffect(() => {

      if(adminUserChanger !== null)
      {
        const apiChosenUserInformation = "http://proj9.ruppin-tech.co.il/api/getuserinfo/"+ adminUserChanger
        fetch(apiChosenUserInformation, {
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
           setID(result.User_ID)
           setName(result.User_Name)
           setEmail(result.Email)
           setRank(result.User_Rank)
           setCountry(result.User_Country)
           setImage(result.User_Image)
      }
      )
      }

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
  

 const btnChangeInformation = () => {
     
        if (email === null || name === null)
        {
          alert("Please do not leave any field empty (but password, which is optional.).")
          return
        }
        if (!validEmail.test(email))
        {
          alert("Please write the email in a proper email format.")
          return
        }
       if(pass !== null && !validPassword.test(pass)) 
       {
          alert("Please write the password in length of at least 6 - which include small and big letters and numnbers!")
          return
        }
       
        if (confirmPass !== null && confirmPass !== pass)
        {
          alert("Please write make sure that your password and password confirmation are the same!")
          return
        }
      
        if (!validName.test(name))
        {
          alert("Please write the name with at least 3 letters, up to 20")
          return
        }
        const userUpdate = {
          User_ID: id,
          User_Name : name,
          Email: email,
          User_Password: pass === null ? null: bcrypt.hashSync(pass, 10),
          User_Rank : rank,
          User_Country :  country ,
          User_Image : image
        };
        fetch(apiUrl, {
          method: 'PUT',
          body: JSON.stringify(userUpdate),
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
          alert("User was successfully updated!")
          if(adminUserChanger===null)
          {
          sessionStorage.clear()
          sessionStorage.login = JSON.stringify(new User(currentUser.user_id,  name,email,currentUser.rank,country === null ? currentUser.country : country ,image))
          navigate('/accountprofile')
          }
          else
          {
            navigate('/accountadminmanagement')
          }
      
        },
          (error) => {
            console.log("err post=", error)
          });

      }

      
        return (
          <div style={{backgroundColor:"peachpuff"}}>
              <PrimarySearchAppBar></PrimarySearchAppBar>
              <div style={styles}>
              <h1>Change Your Account's Information</h1>
              <TextField style={{margin:10}} value={email} color='success' id="email-input" helperText="New Email" variant="standard" onChange={(e)=> setEmail(e.target.value)} type="email"/><br/>
              <h3>Please write the new password you wish to add. If the field will remain empty - the old password will remain.</h3>
              <TextField style={{margin:10}} color='success' id="password-input" helperText="New Password" variant="standard" onChange={(e)=> setPass(e.target.value)} type="password"/><br/>
              <TextField style={{margin:10}} color='success' id="confirm-password-input" helperText="Password Confirmation" variant="standard" onChange={(e)=> setConfirmPass(e.target.value)} type="password"/><br/>
              <TextField style={{margin:10}} value={name} color='success' id="name-input" helperText="New Name" variant="standard" onChange={(e)=> setName(e.target.value)}/><br/>
              <TextField style={{margin:10}} value={image} color='success' id="image-input" helperText="Image SRC" variant="standard" onChange={(e)=> setImage(e.target.value)}/><br/>
              Should you desire to keep your current country - keep the field empty.
              <br></br>
              {fillCountryChoiceContent()}
             <br></br>
              Should you prefer to not have your country chosen - you can click on the Anonymous button instead!<br></br>
              {fillAnonymosButtonContent()}
              <Button style={{margin:30}} variant="contained" onClick={btnChangeInformation}>Change Information</Button><br/>
              </div>
          </div>
        )
      }