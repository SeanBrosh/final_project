import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import User from '../Classes/User';
import { useNavigate } from 'react-router-dom';
import MenuAppBar from '../Tools/MenuAppBar';
import bcrypt from 'bcryptjs';


export default function LoginPage() {

  const apiUrlLogin = 'http://proj9.ruppin-tech.co.il/api/login';
  const apiUrlHash = 'http://proj9.ruppin-tech.co.il/api/hashedpass/';
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);
  const navigate = useNavigate();

  const styles = {
    border: '1px solid black', margin: 100, padding: 30, backgroundColor: "white"
  }


  const btnLogin = () => {

    const userEmailHashCheck = {
      Email: email
    };
    fetch(apiUrlHash, {
      method: 'POST',
      body: JSON.stringify(userEmailHashCheck),
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
        alert("Wrong email or password!")
        return;
      }
      let hashPass = bcrypt.hashSync(pass, result)
      const userLoginDetail = {
        Email: email,
        User_Password: hashPass
      };
      fetch(apiUrlLogin, {
        method: 'POST',
        body: JSON.stringify(userLoginDetail),
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
          alert("Wrong email or password!")
          return;
        }
        if(result.User_Rank == "Banned")
        {
          alert("The account has been banned.")
        }
        else
        {
        alert("Logged in Succesfully!")
        sessionStorage.clear()
        sessionStorage.login = JSON.stringify(new User(result.User_ID, result.Email, result.User_Name,result.User_Rank, result.User_Country, result.User_Image,))
        navigate('/');
        }
  
      },
        (error) => {
          console.log("err post=", error)
        });
  
    },
      (error) => {
        console.log("err post=", error)
      });

      
  }

  const btnRegister = () => {
    navigate('/registration');
  }


  return (
    <div style={{ backgroundColor: "peachpuff" }}>
      <MenuAppBar></MenuAppBar>
      <div style={styles}>
        <TextField style={{ margin: 10 }} color='success' id="email-input" label="Email" variant="standard" onChange={(e) => setEmail(e.target.value)} type="email" /><br />
        <TextField style={{ margin: 10 }} color='success' id="password-input" label="Password" variant="standard" onChange={(e) => setPass(e.target.value)} type="password" /><br />
        <Button style={{ margin: 30 }} variant="contained" onClick={btnLogin}>Log In</Button><br />
        <Button style={{ margin: 30 }} variant="contained" onClick={btnRegister}>Dont have an account?<br></br>Register here!</Button><br />
      </div>
    </div>
  )
}
