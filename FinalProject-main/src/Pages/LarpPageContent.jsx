import React, {useEffect} from 'react';
import WebFont from 'webfontloader';

import tempImage from '../images/photo placeholder 01.png'

import '../Styles/global.css';

export default function LarpPageContent(props) {
    let{title,long_desc,link,date,creator_name,image,hasFood,hasSleep,tags, dateEnd, country,location,score, price} = props
    useEffect(() => { //function to load specific fonts from google.
      WebFont.load({
        google: {
          families: ['Cairo','Alfa Slab One']
        }
      });
     }, []);

  return (
    <div className="font-loader" style={{textAlign: 'left'}}> 
    <div class="container">
      {image === ""? <img src={tempImage} alt={title} style={{width: '100%',  maxHeight:500, aspectRatio: 135 / 76,}}></img>: <img src={image} alt={title} style={{width: '100%',maxHeight:500,  height:'60%', aspectRatio: 135 / 76,}}></img>}
  <div class="text-block">
    <h1 className='upcoming-larps-title' style={{marginTop:"50px"}}>{title}</h1>
  </div>
</div>
<br></br>
    <div style={{textAlign:"left"}}>
      <table  className="larp-detail-cotainer" >
    <p><div class="larp-details child">Link to the LARP's Website: </div>  <div class="child"><a href={link}>{"Click here to enter the Larp's website!"}</a></div></p>
    <p><div class="larp-details child">Lodging:</div>    <div class="child">{hasSleep}</div></p>
    <p><div class="larp-details child">Food:</div>    <div class="child"> {hasFood} </div></p>
    <p><div class="larp-details child">LARP Theme:</div> <div class="child"> {tags}</div></p>
    <p><div class="larp-details child">Price of participation:</div> <div class="child"> {price}</div></p>
    <p><div class="larp-details child">Date of Event:</div> <div class="child">{date.slice(0,10)}</div></p>
    <p><div class="larp-details child">The Event ends at the Date:</div> <div class="child">{dateEnd.slice(0,10)}</div></p>
    <p><div class="larp-details child">Location:</div> <div class="child">{location}, in {country}.</div></p>
    <p><div class="larp-details child">Created by:</div> <div class="child"></div>{creator_name}</p>
    <p><div class="larp-details child">Score:</div> <div class="child">{score == null ? "This LARP currently has no score." : score}</div></p>
    </table>
    </div>
    <br></br>
    <p class="line-breaker-fix">{long_desc}</p>
    </div>
  )
}
