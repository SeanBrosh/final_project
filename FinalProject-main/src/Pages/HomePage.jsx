import React, { useEffect, useState } from 'react';
import PrimarySearchAppBar from '../Tools/MenuAppBar';
import AdvancedSearchBar from '../Tools/AdvancedSearchBar';
import Carousel from 'react-material-ui-carousel'
import CarouselItem from '../Tools/CarouselItem';
import MediaCard from '../Tools/MediaCard';





export default function HomePage() {
  

const apiUrlGetLarps = 'http://proj9.ruppin-tech.co.il/api/getlarpinfoall';
const apiUrlGetAllScore = 'http://proj9.ruppin-tech.co.il/api/getcaculatedscoreinfoall';
const currentUser = JSON.parse(sessionStorage.getItem('login'));
  const [allLarps, setAllLarps] = useState(null);
  const [allScore, setAllScore] = useState(null);
  const styles = {
    border: '1px solid black', margin:100, padding:30, backgroundColor:"white"}


    const isBeforeTheDate =(theEarlierDate, theLaterDate) => { //a function to test out if the first date is before the second date
      var earlierDateTransformer = new Date(theEarlierDate)//given some dates are formatted - we revert both to raw Date form.
      var laterDateTransformer = new Date(theLaterDate)
      if (laterDateTransformer.getFullYear() < earlierDateTransformer.getFullYear() || laterDateTransformer.getFullYear() == earlierDateTransformer.getFullYear() &&
       laterDateTransformer.getMonth() < earlierDateTransformer.getMonth() || laterDateTransformer.getFullYear() == earlierDateTransformer.getFullYear() 
       && laterDateTransformer.getMonth() == earlierDateTransformer.getMonth() && laterDateTransformer.getDate() < earlierDateTransformer.getDate()) 
      {//We pretty much go with one by one - first check if the year is bigger, than month - than day. If one of those fail -
          // it matters that the latter date is bigger.
          return false;
      }

      return true;
  }




useEffect(() => {


  fetch(apiUrlGetLarps, {
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
    setAllLarps(result)
  }
  )

  fetch(apiUrlGetAllScore, {
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
  setAllScore(result)
}
)
}, [])


const orderOfMostScoreAndClicks =(larpNamesWithValidDate) => {
//function to order the different larps - we're adding the arrays up, and using sorts at first to organize the first score array by the biggest to smallest socre - from there, we'll re-form the array with having priority to score sections, with every every section also being organized by the one with the most votes, to the one with the least.
let add2array2return
let allLarpsOrderedByClicks =  allScore.sort((a, b) => b.Amount_Of_Clicks - a.Amount_Of_Clicks)
allLarpsOrderedByClicks = allLarpsOrderedByClicks.filter((result) => larpNamesWithValidDate.find(({Title})=> result.Title === Title)) // - using both filter and than find, we make sure it filters and ADDS only the larps that has same titles as the titles in the larp list with the -valid dates-. 
let array2return = allLarpsOrderedByClicks.filter((result) => result.Caculated_Score == 5)
if(array2return.length < 3)
{
add2array2return = allLarpsOrderedByClicks.filter((result) => result.Caculated_Score == 4)
array2return = [...array2return,...add2array2return]
}
if(array2return.length < 3)
{
add2array2return = allLarpsOrderedByClicks.filter((result) => result.Caculated_Score == 3)
array2return = [...array2return,...add2array2return]
}if(array2return.length < 3)
{
add2array2return = allLarpsOrderedByClicks.filter((result) => result.Caculated_Score == 2)
array2return = [...array2return,...add2array2return]
}if(array2return.length < 3)
{
add2array2return = allLarpsOrderedByClicks.filter((result) => result.Caculated_Score == 1)
array2return = [...array2return,...add2array2return]
}
 

return array2return
}



const CarouselMaker =() => {

  if (allLarps == null) {
      return <div><h1>There are no active larps at the moment.</h1></div>;
  }
  let filteredLarps = allLarps
  let today = new Date().getTime()
  filteredLarps = filteredLarps.filter((result) => new Date(result.LarpDate).getTime() >= today) //making sure the only dates we'll show - are dates that are past the current date.
  let orderedScoreOfLarps
  if(allScore !== null)
  {
    orderedScoreOfLarps= orderOfMostScoreAndClicks(filteredLarps) //getting an array that with it, we'll know which larps has both the most score, and most votes.
    let scoredLarps
    if(orderedScoreOfLarps!== undefined)
      {
        if(orderedScoreOfLarps.length >= 3) //to handle each of the 3 different modes. We only have a situation of 3, 2, 1 or 0 scored larps.
        {
          scoredLarps=filteredLarps.filter((result) => result.Title === orderedScoreOfLarps[0].Title)
          scoredLarps=[...scoredLarps,...filteredLarps.filter((result) => result.Title === orderedScoreOfLarps[1].Title)]
          scoredLarps=[...scoredLarps,...filteredLarps.filter((result) => result.Title === orderedScoreOfLarps[2].Title)]
        }
        else if (orderedScoreOfLarps.length ==2)
        {
          scoredLarps=filteredLarps.filter((result) => result.Title === orderedScoreOfLarps[0].Title)
          scoredLarps=[...scoredLarps,...filteredLarps.filter((result) => result.Title === orderedScoreOfLarps[1].Title)]
        }
        else if (orderedScoreOfLarps.length ==1)
        {
          scoredLarps=filteredLarps.filter((result) => result.Title === orderedScoreOfLarps[0].Title)
        }

        if(scoredLarps !== undefined)
        {
          if(scoredLarps.length > 0)
          {
            filteredLarps = scoredLarps
          }
        }
      }
      
  }
  if(filteredLarps.length===0) //failsafe
  {
    return <div><h1>There are no active larps at the moment.</h1></div>
  }
  let converetedToMedia 
  if(orderedScoreOfLarps[0] !== undefined) //the if is there in case the loading fails - hence it'll give us a normal none-score carousel. Given filteredLarps should be in the same order as orderedScoreOfLarps - we can use that fact to extract the fitting score to the fitting larp, and show it, even if their in different arrays.
  {
   converetedToMedia  =<Carousel>{filteredLarps.slice(0, 3).map( (item, i) => <CarouselItem key={i} title={filteredLarps[i].Title} score={orderedScoreOfLarps[i].Caculated_Score} short_desc={filteredLarps[i].Short_Description}/> )}</Carousel>
  }
  else
  {
  converetedToMedia  =<Carousel>{filteredLarps.slice(0, 3).map( (item, i) => <CarouselItem key={i} title={filteredLarps[i].Title} short_desc={filteredLarps[i].Short_Description}/> )}</Carousel>
  }

  return converetedToMedia


}



const closestDateToCurrent =(recievedDates) => {

  if (recievedDates.length === 0){
    return []
  }
  let today = new Date().getTime()
  recievedDates = recievedDates.filter((result) => new Date(result.LarpDate).getTime() >= today) //making sure the only dates we'll show - are dates that are past the current date.
  if (recievedDates.length === 0){
    return []
  }


  recievedDates = recievedDates.sort((a, b) => new Date(a.LarpDate).getTime() - new Date(b.LarpDate).getTime()) //sorting by testing who has the smallest amount of time - from smallest to biggest; hence, from the closest larp, to the furthest away.

  
  return recievedDates

 


}

const UpcomingLarpMaker =() => {

  

  if (allLarps == null) {
      return <div><h1>No Larps that belongs to your country were found!</h1></div>;
  }

  let filteredLarps = allLarps //putting it on a new parameter - which we'll do all the changes to  - and 'write over' should we use any of the Ifs.

  if (currentUser!== null && currentUser.country!== 'Anonymous') //this is only relevant if the users who's contries are valid.
  {
    filteredLarps = filteredLarps.filter((result) => result.Country.toLowerCase() === currentUser.country.toLowerCase())
  }

  filteredLarps = closestDateToCurrent(filteredLarps)


  if (filteredLarps.length === 0)
  {
    return <div><h1>No Larps that belongs to your country were found!</h1></div>
  }
  let converetedToMedia  = filteredLarps.slice(0, 4).map((allLarps,index)=> <MediaCard key={index} title={allLarps.Title} short_desc={allLarps.Short_Description} date={allLarps.LarpDate.slice(0,10)} dateEnd={allLarps.LarpDateEnd.slice(0,10)} takenImage={allLarps.Larp_Images}/> )
  return converetedToMedia

  

}


  
  //let closestLarpsShow = closestlarps.map((closestlarps,index)=> <MediaCard key={index} title={closestlarps.title} short_desc={closestlarps.short_desc} date={closestlarps.date}/> )
  return (

    
    <div style={{backgroundColor:"peachpuff"}}>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <div style={styles} className="">
        <h1>Looking for Larp</h1>
        <br></br>
        <h2>Top Larps!</h2>
        {CarouselMaker()}
        <br></br>
       <AdvancedSearchBar></AdvancedSearchBar>
        <br></br>
        <h2>Upcoming larps!</h2>
        {UpcomingLarpMaker()}
        </div>

    </div>
  )
}
