import React, { useState, useEffect } from "react";

const StarRating = (props) => {
    let{takenScore, isScoredBefore, handleIsScoredBefore, userID,larpID} = props
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const apiUrlScoreAdd = 'http://proj9.ruppin-tech.co.il/api/addscore'
    const apiUrlScoreUpdate = 'http://proj9.ruppin-tech.co.il/api/updatescore'


const addScore = (rating) => {
    setRating(rating)
  
  if (isScoredBefore === false )
  {
    const scoreAddNew = {
      Larp_ID : larpID,
      User_ID: userID,
      Larp_Score : rating
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
      handleIsScoredBefore(true)
    },
      (error) => {
        console.log("err post=", error)
      });
  }
  else
  {const scoreUpdate = {
        Larp_ID : larpID,
        User_ID: userID,
        Larp_Score : rating
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
    },
      (error) => {
        console.log("err post=", error)
      });
  }
  
}

useEffect(() => {
  if(takenScore!== null)
  {
    setHover(takenScore)
  }


}, [takenScore])


    return (
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || rating) ? "on" : "off"}
              onClick={() => addScore(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
    );
  };

export default StarRating;
