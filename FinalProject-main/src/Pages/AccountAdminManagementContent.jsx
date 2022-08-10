import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';


export default function AccountAdminManagementContent(props) {
    let{email,name,rank,id} = props

    const styles = {
        border: '1px solid black', margin:50 , padding:30}
        const apiUrl = 'http://proj9.ruppin-tech.co.il/api/deleteuser';

    const btnDeleteUser = () => {
        const userDeleteDetails = {
          User_ID: props.id
        };
        fetch(apiUrl, {
          method: 'DELETE',
          body: JSON.stringify(userDeleteDetails),
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
            alert("Error in Delete Process!")
            return;
          }
          alert("User have been deleted Succesfully!")
          window.location.reload(false);
        },
          (error) => {
            console.log("err post=", error)
          });

    
      }
    

    return (
    <div style={styles}> 
        User Name : {name}<br></br>
        <br></br>
        User Email : {email}<br></br>
        <br></br>
        User Rank : {rank}
        <br></br>
        <Button style={{margin:30}} color="error" variant="contained" onClick={btnDeleteUser}>Delete</Button><br/>
        <br></br>
        <br></br>
    </div>
  )
}
