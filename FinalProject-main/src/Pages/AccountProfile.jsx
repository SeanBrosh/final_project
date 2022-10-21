import React, { useEffect, useState } from 'react';
import PrimarySearchAppBar from '../Tools/MenuAppBar';
import AccountProfileContent from './AccountProfileContent';
import MediaCard from '../Tools/MediaCard';
import { useNavigate } from 'react-router-dom';

import '../Styles/global.css';


export default function AccountProfile() {


        const [larpsSearch, setLarpsSearch] = useState([]);
        const [favoriteList, setFavoriteList] = useState(null);
        const [areCreatedLarps, setAreCreatedLarps] = useState(false);
        const currentUser = JSON.parse(sessionStorage.getItem('login'));
        const apiUrlAllLarps = 'http://proj9.ruppin-tech.co.il/api/getlarpinfoall';
        const apiUrlRelevantFavorites = 'http://proj9.ruppin-tech.co.il/api/getfavoriteinfobyusername/' + currentUser.name;
        const navigate = useNavigate();
        
        useEffect(() => {
        
          fetch(apiUrlRelevantFavorites, { //pulling all the larps that are favorited by the person.
            method: 'GET',
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
            
            setFavoriteList(result)
          },
            (error) => {
              console.log("err post=", error)
            });
        
          fetch(apiUrlAllLarps, {
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
              setLarpsSearch(result)
              for(let i = 0; i < result.length; i++)
              {
                if(result[i].User_Name === currentUser.name)
                {
                  setAreCreatedLarps(true)
                }
              }
          }
          )
        }, [])
        
        
        const printFavorites =() => { //making sure to grab only the larps that has the right titles.
        
        
          if(favoriteList !== null)
          {
              let valid_title_list = favoriteList.map(favoriteList => favoriteList.Title)
              let temp = larpsSearch.map((larps,index)=> {if (valid_title_list.includes(larps.Title)) return <MediaCard key={index} title={larps.Title} short_desc={larps.Short_Description} date={larps.LarpDate.slice(0,10)} dateEnd={larps.LarpDateEnd.slice(0,10)} takenImage={larps.Larp_Images}/> })
              return temp
        
          }
          return ""
        
        
        
        }

        const printCreatedLarps =() => { //grabbing only the larps who's creator is the same name of the person who is logged on.
        
        

              let temp = larpsSearch.map((larps,index)=> {if (larps.User_Name === currentUser.name) return <MediaCard key={index} title={larps.Title} short_desc={larps.Short_Description} date={larps.LarpDate.slice(0,10)} dateEnd={larps.LarpDateEnd.slice(0,10)} takenImage={larps.Larp_Images}/> })
              if (temp.length > 0)
              {
              
              return temp
              }
        

          return ""
        
        
        
        }
        

  return (
    <div className="background-color-for- footer-color">
    <PrimarySearchAppBar></PrimarySearchAppBar>
    <div  className="general-container">
    <div style={{textAlign:"left"}}>
      <table  className="user-detail-cotainer" >
      <h1 className='upcoming-larps-title'>Account Profile Page</h1>
      <AccountProfileContent email={currentUser.email} name={currentUser.name} rank={currentUser.rank}image={currentUser.user_image} country={currentUser.country}/><br></br>
      </table>
      </div>
      {favoriteList=== null || favoriteList.length === 0 ?  "" :<h1 className='upcoming-larps-title'>Favorite List:</h1>}
      {printFavorites()}
     {areCreatedLarps === false ?  "" :<h1 className='upcoming-larps-title'>Created LARPs List:</h1> }
      {printCreatedLarps()}
      </div>
  </div>
  )
}
