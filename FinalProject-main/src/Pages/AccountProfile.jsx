import React, { useEffect, useState } from 'react';
import PrimarySearchAppBar from '../Tools/MenuAppBar';
import AccountProfileContent from './AccountProfileContent';
import MediaCard from '../Tools/MediaCard';
import { useNavigate } from 'react-router-dom';


export default function AccountProfile() {

    const styles = {
        border: '1px solid black', margin:100 , padding:30 ,backgroundColor:"white"}
    
        const [larpsSearch, setLarpsSearch] = useState([]);
        const [favoriteList, setFavoriteList] = useState(null);
        const currentUser = JSON.parse(sessionStorage.getItem('login'));
        const apiUrlAllLarps = 'http://proj9.ruppin-tech.co.il/api/getlarpinfoall';
        const apiUrlRelevantFavorites = 'http://proj9.ruppin-tech.co.il/api/getfavoriteinfobyusername/' + currentUser.name;
        const navigate = useNavigate();
        
        useEffect(() => {
        
          fetch(apiUrlRelevantFavorites, {
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
          }
          )
        }, [])
        
        
        const printFavorites =() => {
        
        
          if(favoriteList !== null)
          {
              let valid_title_list = favoriteList.map(favoriteList => favoriteList.Title)
              let temp = larpsSearch.map((larps,index)=> {if (valid_title_list.includes(larps.Title)) return <MediaCard key={index} title={larps.Title} short_desc={larps.Short_Description} date={larps.LarpDate.slice(0,10)} takenImage={larps.Larp_Images}/> })
              return temp
        
          }
          return ""
        
        
        
        }
        

  return (
    <div style={{backgroundColor:"peachpuff"}}>
    <PrimarySearchAppBar></PrimarySearchAppBar>
    <div style={styles}>
      <h1>Account Profile Page</h1>
      <AccountProfileContent email={currentUser.email} name={currentUser.name} rank={currentUser.rank}image={currentUser.user_image}/><br></br>
      {favoriteList=== null || favoriteList.length === 0 ?  "" :<h1>Favorite List:</h1>}
      {printFavorites()}
      </div>
  </div>
  )
}