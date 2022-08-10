import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

export default function AccountAdminManagementContent(props) {
    let{email,name,rank,id} = props

    const [ranks, setRanks] = useState(null);
    const styles = {
        border: '1px solid black', margin:50 , padding:30}
        const apiUrlDelete = 'http://proj9.ruppin-tech.co.il/api/deleteuser';
        const apiUrlChangeRank = 'http://proj9.ruppin-tech.co.il/api/updateuserrank';


        const intputTakerRanks = (event) => {
            setRanks(event.target.value);
          }

    const btnDeleteUser = () => {
        const userDeleteDetails = {
          User_ID: props.id
        };
        fetch(apiUrlDelete, {
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
    

      const btnChangeRank = () => {
          if(ranks===null)
          {
              alert("You must choose the wanted rank change before pressing change!")
              return
          }
        const userRankUpdateDetails = {
          User_ID: props.id,
          User_Rank: ranks
        };
        fetch(apiUrlChangeRank, {
          method: 'PUT',
          body: JSON.stringify(userRankUpdateDetails),
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
            alert("Error in Rank Update Process!")
            return;
          }
          alert("User's rank have been succesfully changed!")
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
        <FormControl style={{margin:30}}
      display="flex"
  justifyContent="center"
  alignItems="center"  sx={{ minWidth: 200 }}>
        <InputLabel id="demo-simple-select-label">Choose the rank.</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={ranks}
          label="Choose the rank."
          onChange={intputTakerRanks}
          
        >
          <MenuItem value={"User"}>User</MenuItem>
          <MenuItem value={"Larp Creator"}>Larp Creator</MenuItem>
          <MenuItem value={"Moderator"}>Moderator</MenuItem>
          <MenuItem value={"Banned"}>Banned</MenuItem>
        </Select>
      </FormControl> <br></br>
      <Button style={{margin:30}}  variant="contained" onClick={btnChangeRank}>Change Rank</Button><br/>
        <br></br>
        <br></br>
    </div>
  )
}
