import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate } from 'react-router-dom';

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
        image={takenImage == "" ? "https://res.cloudinary.com/teepublic/image/private/s--vYjKUv2C--/c_fit,g_north_west,h_840,w_840/co_5c5c5c,e_outline:40/co_5c5c5c,e_outline:inner_fill:1/co_ffffff,e_outline:40/co_ffffff,e_outline:inner_fill:1/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_jpg,h_630,q_90,w_630/v1533171393/production/designs/2967437_0.jpg": takenImage}
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