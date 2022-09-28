import React, { useState, useEffect } from 'react';
import PrimarySearchAppBar from '../Tools/MenuAppBar';
import LarpPageContent from './LarpPageContent';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';

export default function LarpPage() {

  const styles = {
    border: '1px solid black', margin:100 , padding:30,backgroundColor:"white"}
  
  const navigate = useNavigate();
  const larpChoice = JSON.parse(localStorage.getItem('larpChoice'));
  const [larpChoiceId, setLarpChoiceId] = useState(null)
  const [isFavorited, setIsFavorited] = useState(null)
  const [isScoredBefore, setIsScoredBefore] = useState(false)
  const [isCreator, setIsCreator] = useState(null)
  const [isLogged, setIsLogged] = useState(JSON.parse(sessionStorage.getItem('login')))
  const [favButton, setFavButton] = useState(null)
  const [larpContent, setLarpContent] = useState(null)
  const [score, setScore] = useState(null)
  const [currentUserScore, setCurrentUserScore] = useState(null)
  
const apiUrl = 'http://proj9.ruppin-tech.co.il/api/getlarpinfo/'+larpChoice;
  
const apiUrlAdd = 'http://proj9.ruppin-tech.co.il/api/addfavorite';
const apiUrlRemove = 'http://proj9.ruppin-tech.co.il/api/deletefavorite';
const apiUrlGet = 'http://proj9.ruppin-tech.co.il/api/postfavoriteofspecificcombo/'

const apiUrlScoreGet = 'http://proj9.ruppin-tech.co.il/api/getscoreofspecificcombo'
const apiUrlScoreAdd = 'http://proj9.ruppin-tech.co.il/api/addscore'
const apiUrlScoreUpdate = 'http://proj9.ruppin-tech.co.il/api/updatescore'


const addFavorites= () => {
  let userName = isLogged.user_id;
  let larpTitle = larpContent.Larp_ID
  ;
  const favoretAddDetails = {
    Larp_ID : larpTitle,
    User_ID: userName,
  };
  fetch(apiUrlAdd, {
    method: 'PUT',
    body: JSON.stringify(favoretAddDetails),
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
      alert("There was an error while adding the Favorites")
      return;
    }
    setIsFavorited(true)
  },
    (error) => {
      console.log("err post=", error)
    });

  
}

const getScore= (Larp_ID) => {

  const apiUrlScore = 'http://proj9.ruppin-tech.co.il/api/getcaculatedscorebylarpID/'+Larp_ID;
  fetch(apiUrlScore, {
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
    setScore(result)
}
)
}



const delFavorites= () => {
  let userName = JSON.parse(sessionStorage.getItem('login')).user_id;
  let larpTitle = larpContent.Larp_ID
  ;
  const favoretRemoveDetails = {
    Larp_ID : larpTitle,
    User_ID: userName
  };
  fetch(apiUrlRemove, {
    method: 'DELETE',
    body: JSON.stringify(favoretRemoveDetails),
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
      alert("There was an error while deleting the Favorites")
      return;
    }
    setIsFavorited(false)
  },
    (error) => {
      console.log("err post=", error)
    });

  
}



useEffect(() => {


  
  fetch(apiUrl, {
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
      setLarpContent(result)
      setLarpChoiceId(result.Larp_ID)
      if(result === null)
      {
        return
      }
      let currentUser = JSON.parse(sessionStorage.getItem('login'));
      if(result !== null)
      {
      getScore(result.Larp_ID)
      }
      if(currentUser === null )
      {
          return;
      }
      else if (currentUser.name === result.User_Name)
      {
        setIsCreator(true)
        return;
      }
      else{
        setIsCreator(false)
          const favoriteComboDetails = {
            User_ID: currentUser.user_id,
            Larp_ID: result.Larp_ID
          };
          fetch(apiUrlGet, {
            method: 'POST',
            body: JSON.stringify(favoriteComboDetails),
            headers: new Headers({
              'Content-type': 'application/json; charset=UTF-8',
              'Accept': 'application/json; charset=UTF-8'
            })
          }).then(res => {
            if (res.ok) {
              return res.json()
            }
            else {
              setIsFavorited(false)
              
              return null;
            }
          }).then((result) => {
            if (result == null) {
              return;
            }
            
            setIsFavorited(true)
          },
            (error) => {
              console.log("err post=", error)
            });
      }
  }
  )
}, [])


useEffect(() => {
  
  if(isLogged != null)
  {
  const scoreComboDetails = {
    Larp_ID : larpChoiceId,
    User_ID: isLogged.user_id,
  };
  fetch(apiUrlScoreGet, {
    method: 'POST',
    body: JSON.stringify(scoreComboDetails),
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
      return;
    }
    
    setIsScoredBefore(true)
    setCurrentUserScore(result)
  },
    (error) => {
      console.log("err post=", error)
    });
  }
}, [larpChoiceId])



const fillLarpContent =() => {

  if (larpContent == null) {
      navigate('/');
      return;
  }
  return <LarpPageContent title={larpContent.Title} long_desc={larpContent.Long_Description} payment={larpContent.Payment} image={larpContent.Larp_Images} link={larpContent.Link} creator_name={larpContent.User_Name} date={larpContent.LarpDate} dateEnd={larpContent.LarpDateEnd} hasFood={larpContent.HasFood_Description} hasSleep={larpContent.HasSleep_Description} tags={larpContent.Tag_Description} country={larpContent.Country} location={larpContent.Location} price={larpContent.Payment} score={score}/> 


}

const SaveNewScore =() => {
  if(currentUserScore === null)
  {
    alert("Please choose a score before saving it!")
    return;
  }

if (isScoredBefore === false)
{
  const scoreAddNew = {
    Larp_ID : larpChoiceId,
    User_ID: isLogged.user_id,
    Larp_Score : currentUserScore
  };
  fetch(apiUrlScoreAdd, {
    method: 'PUT',
    body: JSON.stringify(scoreAddNew),
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
      alert("There was an error while adding the score.")
      return;
    }
    alert("The Larp's score was successfully added!")
    setIsScoredBefore(true)
  },
    (error) => {
      console.log("err post=", error)
    });
}
else
{
  const scoreUpdate = {
    Larp_ID : larpChoiceId,
    User_ID: isLogged.user_id,
    Larp_Score : currentUserScore
  };
  fetch(apiUrlScoreUpdate, {
    method: 'PUT',
    body: JSON.stringify(scoreUpdate),
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
      alert("There was an error while updating the score.")
      return;
    }
    alert("The Larp's score was successfully updated!")
  },
    (error) => {
      console.log("err post=", error)
    });
}

}





const NavToLarpEdit =() => {

  navigate('/larpchangepage');

}

const intputTakerScore = (event) => {
  setCurrentUserScore(event.target.value);
}


  return (
    <div style={{backgroundColor:"peachpuff"}}>    <PrimarySearchAppBar></PrimarySearchAppBar>
    <div style={styles}>
    {fillLarpContent()}<br></br>
    {!isCreator && isLogged!= null &&<div><FormControl style={{margin:30}}
      display="flex"
  justifyContent="center"
  alignItems="center"  sx={{ minWidth: 100 }}>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentUserScore}
          onChange={intputTakerScore}
          
        >
          <MenuItem value={"1"}>1</MenuItem>
          <MenuItem value={"2"}>2</MenuItem>
          <MenuItem value={"3"}>3</MenuItem>
          <MenuItem value={"4"}>4</MenuItem>
          <MenuItem value={"5"}>5</MenuItem>
        </Select>
        <FormHelperText>Rate the Larp!</FormHelperText>
      </FormControl> <br></br></div>}
    {!isCreator && isLogged!= null &&<div><Button style={{margin:30}} variant="contained" onClick={SaveNewScore}>Save the Score!</Button></div>}
    {isCreator && !isFavorited && <Button style={{margin:30}} variant="contained" onClick={NavToLarpEdit}>Edit Larp</Button>}
    {!isCreator && isFavorited == true && <Button style={{margin:30}} color="error" variant="contained" onClick={delFavorites}>Remove from Favorites!</Button>}
    {!isCreator && isFavorited == false && <Button style={{margin:30}} variant="contained" onClick={addFavorites}>Add to Favorites!</Button>}
    </div>
    </div>
  )
}
