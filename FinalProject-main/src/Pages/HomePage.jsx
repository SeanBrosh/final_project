import React, { useEffect, useState } from 'react';
import PrimarySearchAppBar from '../Tools/MenuAppBar';
import Carousel from 'react-material-ui-carousel'
import CarouselItem from '../Tools/CarouselItem';
import MediaCard from '../Tools/MediaCard';




export default function HomePage() {
  

const apiUrl = 'http://proj9.ruppin-tech.co.il/api/getlarpinfoall';
  const [toplarps, setTopLarps] = useState(null);
  const [closestlarps, setClosetLarps] = useState(null);
  const styles = {
    border: '1px solid black', margin:100, padding:30, backgroundColor:"white"}







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
       setTopLarps(result)
  }
  )
}, [])


const CarouselMaker =() => {

  if (toplarps == null) {
      return;
  }

  let temp  =<Carousel>{toplarps.slice(0, 3).map( (item, i) => <CarouselItem key={i} title={toplarps[i].Title} short_desc={toplarps[i].Short_Description}/> )}</Carousel>
  return temp


}


const UpcomingLarpMaker =() => {

  if (toplarps == null) {
      return;
  }

  let temp  =toplarps.slice(0, 4).map((toplarps,index)=> <MediaCard key={index} title={toplarps.Title} short_desc={toplarps.Short_Description} date={toplarps.LarpDate.slice(0,10)} dateEnd={toplarps.LarpDateEnd.slice(0,10)} takenImage={toplarps.Larp_Images}/> )
  return temp

  

}


  
  //let closestLarpsShow = closestlarps.map((closestlarps,index)=> <MediaCard key={index} title={closestlarps.title} short_desc={closestlarps.short_desc} date={closestlarps.date}/> )
  return (

    
    <div style={{backgroundColor:"peachpuff"}}>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <div style={styles} className="">
        <h1>Looking for Larp</h1>
        {CarouselMaker()}
        <br></br>
        <h2>Upcoming larps!</h2>
        {UpcomingLarpMaker()}
        </div>

    </div>
  )
}
