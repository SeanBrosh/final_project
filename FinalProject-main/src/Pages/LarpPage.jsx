import React, { useState, useEffect } from 'react';
import PrimarySearchAppBar from '../Tools/MenuAppBar';
import LarpPageContent from './LarpPageContent';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import StarRating from "../Tools/StarRating";

import '../Styles/global.css';

import favActive from '../images/favoritebutton01.png'
import favNotActive from '../images/favoritebutton03.png'


export default function LarpPage() {

  const navigate = useNavigate();
  const larpChoice = JSON.parse(localStorage.getItem('larpChoice'));
  const [larpChoiceId, setLarpChoiceId] = useState(null)
  const [isFavorited, setIsFavorited] = useState(null)
  const [isScoredBefore, setIsScoredBefore] = useState(false)
  const [isCreator, setIsCreator] = useState(null)
  const [isLogged, setIsLogged] = useState(JSON.parse(sessionStorage.getItem('login')))
  const [larpContent, setLarpContent] = useState(null)
  const [score, setScore] = useState(null)
  const [currentUserScore, setCurrentUserScore] = useState(null)

  
const apiUrlGetLarp = 'http://proj9.ruppin-tech.co.il/api/getlarpinfo/'+larpChoice;
  
const apiUrlAdd = 'http://proj9.ruppin-tech.co.il/api/addfavorite';
const apiUrlRemove = 'http://proj9.ruppin-tech.co.il/api/deletefavorite';
const apiUrlGet = 'http://proj9.ruppin-tech.co.il/api/postfavoriteofspecificcombo/'

const apiUrlScoreGet = 'http://proj9.ruppin-tech.co.il/api/getscoreofspecificcombo'



const addFavorites= () => { //adding a new favorite to the list
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

const getScore= (Larp_ID) => { //getting the score to show the general caculated score - the caculation is done in the server side.

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



const delFavorites= () => { //when you 'remove' favorite - it delete it from the DB table.
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
    setIsFavorited(false) //this is here to show the 'add favorite' button.
  },
    (error) => {
      console.log("err post=", error)
    });

  
}



useEffect(() => {


  
  fetch(apiUrlGetLarp, { //getting larp info
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
        window.location.reload(false);
          return null;
      }
  }).then((result) => {
      setLarpContent(result) //saving the larp
      setLarpChoiceId(result.Larp_ID) //given we work with the larp's id a few times - it is only right to also put it in it's own parameter
      if(result === null)
      {
        return
      }
      let currentUser = JSON.parse(sessionStorage.getItem('login')); //we make sure to do stuff like pulling the user's score to the specific larp - only if there is a user logged
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
        setIsCreator(true) //to prevent from a larp's creator to give score to his own larps - and given it is pointless for a larp creator to be able to add favorite to his own larp, given he has a list of all the larps he created on user info.
        return;
      }
      else{
        setIsCreator(false)
          const favoriteComboDetails = { //checking if the person and larp ids are a 'pair' in the db table
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

  if( isLogged != null) //making sure that the person is in the page logged on - via the currentuser pull we did earlier.
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
    
    setIsScoredBefore(true) //this is here - as there are 2 forms of scoring - update existing score, hence to check if he scored before, and creating a new score to the score table.
    setCurrentUserScore(result)
  },
    (error) => {
      console.log("err post=", error)
    });
  }
}, [larpChoiceId])



const fillLarpContent =() => {

  if (larpContent == null) { //sending the details to the larp page content page - where it is organizing the parameters.
      navigate('/');
      return;
  }
  return <LarpPageContent title={larpContent.Title} long_desc={larpContent.Long_Description} payment={larpContent.Payment} image={larpContent.Larp_Images} link={larpContent.Link} creator_name={larpContent.User_Name} date={larpContent.LarpDate} dateEnd={larpContent.LarpDateEnd} hasFood={larpContent.HasFood_Description} hasSleep={larpContent.HasSleep_Description} tags={larpContent.Tag_Description} country={larpContent.Country} location={larpContent.Location} price={larpContent.Payment} score={score}/> 


}




const NavToLarpEdit =() => {

  navigate('/larpchangepage');

}


const handleIsScoredBefore= (takenAnswer) => {
  setIsScoredBefore(takenAnswer)
}



  return (
    <div className="background-color-for-all footer-color">    <PrimarySearchAppBar></PrimarySearchAppBar>
    <div className="general-container">
    {fillLarpContent()}<br></br>
    {!isCreator && isFavorited == true && <img style={{ cursor:"pointer" ,width:50}} alt="Remove from Favorite" src={favActive} onClick={() => delFavorites()} />}
    {!isCreator && isFavorited == false && <img style={{cursor:"pointer" ,width:50}} alt="Add to Favorite" src={favNotActive}   onClick={() => addFavorites()} />}
    {isCreator && !isFavorited && <Button style={{margin:30}} variant="contained" onClick={NavToLarpEdit}>Edit Larp</Button>}
    <br></br>
    <br></br>
    {!isCreator && isLogged!= null &&<div><StarRating takenScore={currentUserScore} isScoredBefore={isScoredBefore} handleIsScoredBefore={handleIsScoredBefore} userID={isLogged.user_id} larpID={larpChoiceId} /></div>}
    </div>
    </div>
  )
}
