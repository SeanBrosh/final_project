import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import MediaCard from '../Tools/MediaCard';

export default function LarpAdminManagementContent(props) {
    let{larpSingle} = props
    const apiUrl = 'http://proj9.ruppin-tech.co.il/api/deletelarp';
    const styles = {
        border: '1px solid black', margin:50 , padding:30}

    const btnDeleteUser = () => {
      const larpDeleteDetails = {
        Larp_ID: larpSingle.Larp_ID,
      };
      fetch(apiUrl, {
        method: 'DELETE',
        body: JSON.stringify(larpDeleteDetails),
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
        alert("Larp have been deleted Succesfully!")
        window.location.reload(false);
      },
        (error) => {
          console.log("err post=", error)
        });
  
  
    }
  

     
  return (
    <div style={styles}><MediaCard title={larpSingle.Title} short_desc={larpSingle.Short_Description} takenImage={larpSingle.Larp_Images} date={larpSingle.LarpDate.slice(0,10)} dateEnd={larpSingle.LarpDateEnd.slice(0,10)}/> 
    <Button style={{margin:30}} color="error" variant="contained" onClick={btnDeleteUser}>Delete</Button><br/></div>
  )
}
