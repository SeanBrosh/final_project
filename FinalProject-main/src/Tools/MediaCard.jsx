import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate } from 'react-router-dom';

import tempImage from '../images/photo placeholder 01.png'

export default function MediaCard(props) {
  let{title,short_desc, date,dateEnd,hasSleep,hasFood,price,tags, country, takenImage} = props
  const navigate = useNavigate();
  const styles = {
    border: '1px solid black', margin:50, padding:30}


  const larpPageHandler=() =>{
    localStorage.setItem('larpChoice', JSON.stringify(title));
    navigate('/larppage')
  };

  return (
    <div style={styles}>
    <Card sx={{ maxWidth: 700 }}>
      <CardMedia
        component="img"
        height="300"
        image={takenImage == "" ? tempImage: takenImage}
        alt="larp image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {short_desc}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <br></br>
          <p>  Date Start: {date} </p><p> Date End: {dateEnd}</p>
                                  
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={larpPageHandler} size="small">See More!</Button>
      </CardActions>
    </Card>
    </div>
  );
}