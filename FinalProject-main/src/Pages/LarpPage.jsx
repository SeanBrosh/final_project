import React, { useState, useEffect } from 'react';
import PrimarySearchAppBar from '../Tools/MenuAppBar';
import LarpPageContent from './LarpPageContent';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function LarpPage() {

  const styles = {
    border: '1px solid black', margin:100 , padding:30,backgroundColor:"white"}
  
  const navigate = useNavigate();
  const larpChoice = JSON.parse(localStorage.getItem('larpChoice'));
  const [isFavorited, setIsFavorited] = useState(null)
  const [favButton, setFavButton] = useState(null)
  const [larpContent, setLarpContent] = useState(null)
  const [score, setScore] = useState(null)
  
const apiUrl = 'http://proj9.ruppin-tech.co.il/api/getlarpinfo/'+larpChoice;
  
const apiUrlAdd = 'http://proj9.ruppin-tech.co.il/api/addfavorite';
const apiUrlRemove = 'http://proj9.ruppin-tech.co.il/api/deletefavorite';
const apiUrlGet = 'http://proj9.ruppin-tech.co.il/api/postfavoriteofspecificcombo/'


const addFavorites= () => {
  let userName = JSON.parse(sessionStorage.getItem('login')).name;
  let larpTitle = larpContent.Title
  ;
  const favoretAddDetails = {
    Title : larpTitle,
    User_Name: userName,
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

const getScore= (larpTitle) => {

  const apiUrlScore = 'http://proj9.ruppin-tech.co.il/api/getcaculatedscorebylarptitle/'+larpTitle;
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
  let userName = JSON.parse(sessionStorage.getItem('login')).name;
  let larpTitle = larpContent.Title
  ;
  const favoretRemoveDetails = {
    Title : larpTitle,
    User_Name: userName,
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
      let currentUser = JSON.parse(sessionStorage.getItem('login'));
      getScore(result.Title)
      if(currentUser === null || currentUser.name === result.User_Name)
      {
          return;
      }
      else{
          const favoriteComboDetails = {
            User_Name: currentUser.name,
            Title: result.Title
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


const fillLarpContent =() => {

  if (larpContent == null) {
      navigate('/');
      return;
  }
  return <LarpPageContent title={larpContent.Title} long_desc={larpContent.Long_Description} payment={larpContent.Payment} image={larpContent.Larp_Images} link={larpContent.Link} creator_name={larpContent.User_Name} date={larpContent.LarpDate} dateEnd={larpContent.LarpDateEnd} hasFood={larpContent.HasFood_Description} hasSleep={larpContent.HasSleep_Description} tags={larpContent.Tag_Description} country={larpContent.Country} location={larpContent.Location}  score={score}/> 


}

const fillFavoriteButtonContent =() => {

  if (isFavorited == null) {
      return;
  }

  return favButton


}
useEffect(() => {

  if (isFavorited == null ) {
    return;
}
  if (isFavorited== true)
  {
    setFavButton(<Button style={{margin:30}} color="error" variant="contained" onClick={delFavorites}>Remove from Favorites!</Button>)
    return
  }
  else
  {
    setFavButton(<Button style={{margin:30}} variant="contained" onClick={addFavorites}>Add to Favorites!</Button>)
  }
}, [isFavorited])



  return (
    <div style={{backgroundColor:"peachpuff"}}>    <PrimarySearchAppBar></PrimarySearchAppBar>
    <div style={styles}>
    {fillLarpContent()}<br></br>
    {fillFavoriteButtonContent()}
    </div>
    </div>
  )
}
