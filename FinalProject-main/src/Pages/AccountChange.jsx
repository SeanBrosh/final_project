import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import User from '../Classes/User';
import {useNavigate } from 'react-router-dom';
import PrimarySearchAppBar from '../Tools/MenuAppBar';
import bcrypt from 'bcryptjs';



export default function AccountChange() {

const currentUser = JSON.parse(sessionStorage.getItem('login'));
const [email, setEmail] = useState(currentUser.email);
const [pass, setPass] = useState(null);
const [confirmPass, setConfirmPass] = useState(null)
const [name, setName] = useState(currentUser.name);
const [image, setImage] = useState(currentUser.user_image);
const navigate = useNavigate();
const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@+[a-zA-Z0-9.-]+.[a-zA-Z]$');
const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
const validName = new RegExp('^[a-zA-Z0-9._:$!%-].{3,20}$');
const apiUrl = 'http://proj9.ruppin-tech.co.il/api/updateuser';

const styles = {
    border: '1px solid black', margin:100 , padding:30 ,backgroundColor:"white"}



 const btnChangeInformation = () => {
     
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
          User_ID: currentUser.user_id,
          User_Name : name,
          Email: email,
          User_Password: pass === null ? null: bcrypt.hashSync(pass, 10),
          User_Rank : currentUser.rank,
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
          sessionStorage.clear()
          sessionStorage.login = JSON.stringify(new User(currentUser.user_id,  name,email,currentUser.rank, image))
          navigate('/accountprofile')
      
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
              <h3>Please fill the fields you want to change - the other field shall remain the same.</h3>
              <TextField style={{margin:10}} color='success' id="email-input" label="New Email" variant="standard" onChange={(e)=> setEmail(e.target.value)} type="email"/><br/>
              <TextField style={{margin:10}} color='success' id="password-input" label="New Password" variant="standard" onChange={(e)=> setPass(e.target.value)} type="password"/><br/>
              <TextField style={{margin:10}} color='success' id="confirm-password-input" label="Password Confirmation" variant="standard" onChange={(e)=> setConfirmPass(e.target.value)} type="password"/><br/>
              <TextField style={{margin:10}} color='success' id="name-input" label="New Name" variant="standard" onChange={(e)=> setName(e.target.value)}/><br/>
              <TextField style={{margin:10}} color='success' id="image-input" label="Image SRC" variant="standard" onChange={(e)=> setImage(e.target.value)}/><br/>
              <Button style={{margin:30}} variant="contained" onClick={btnChangeInformation}>Change Information</Button><br/>
              </div>
          </div>
        )
      }