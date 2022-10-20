import React from 'react';
import { Paper, Button } from '@mui/material'
import {useNavigate } from 'react-router-dom';


import tempImage from '../images/photo placeholder 01.png'

export default function CarouselItem(props) {
    let{title,  short_desc,score, img} = props
    const navigate = useNavigate();
    const navBtnClicker=() =>{
        localStorage.setItem('larpChoice', JSON.stringify(title));
        navigate('/larppage')
    
    }
    const larpImage= <img  src={img} alt={title} style={{width: '100%',  height: '100%' , maxHeight:600, aspectRatio: 135 / 76,}} />
    const defultImage = <img style={{width: '100%',  height: '100%',maxHeight:600, aspectRatio: 135 / 76,}} src={tempImage} alt="Logo" />

    return (
        <Paper  >
            {img === "" ?defultImage : larpImage}
            <h3>{title}</h3>
            <p>{short_desc}</p>
            <p>{score === null? "" :<div>Community Score: {score}</div> }</p>
            
            <Button onClick={navBtnClicker} className="CheckButton">
                Check it out!
            </Button>
        </Paper> 
        )
}
