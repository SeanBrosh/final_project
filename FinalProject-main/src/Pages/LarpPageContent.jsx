import React from 'react';
import Button from '@mui/material/Button';




export default function LarpPageContent(props) {
    let{title,long_desc,link,date,creator_name,image,hasFood,hasSleep,tags} = props
  return (
      
    <div> 
    <h2>{title}</h2>
    <p>{long_desc}</p>
    <br></br>
    <p>Link to the LARP's Website: <a href={link}>{link}</a></p>
    <br></br>
    <p>Lodging: {hasSleep}</p>
    <p>Food: {hasFood}</p>
    <p>Larp Theme: {tags}</p>
    <p>Date of Event: {date.slice(0,10)}</p>
    <p>Created by: {creator_name}</p>
    <p>{image == "" ?  "" : <div><br></br><br></br><img style={{height:150}} src={image}></img></div>}</p>
    
    
    </div>
  )
}
