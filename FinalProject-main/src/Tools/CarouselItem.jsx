import React from 'react';
import { Paper, Button } from '@mui/material'
import {useNavigate } from 'react-router-dom';

import '../Styles/global.css';
import '../Styles/media-query.css'

import tempImage from '../images/photo placeholder 01.png'

export default function CarouselItem(props) {
    let{title,  short_desc,score, img} = props
    const navigate = useNavigate();
    const navBtnClicker=() =>{
        localStorage.setItem('larpChoice', JSON.stringify(title));
        navigate('/larppage')
    
    }
    const larpImage= <img  src={img} onClick={navBtnClicker} alt={title} style={{width: '100%',  height: '100%' , maxHeight:600, aspectRatio: 135 / 76,cursor:"pointer"}} />
    const defultImage = <img  onClick={navBtnClicker} style={{width: '100%',  height: '100%',maxHeight:600, aspectRatio: 135 / 76, cursor:"pointer"}} src={tempImage} alt="Logo" />

    return (
        <Paper  >
            <div className='carousel-container'>
            {img === "" ?defultImage : larpImage}
            <div class="text-block">
                <h3 style={{marginTop:"50px"}}>{title}</h3>
            <p class="line-breaker-fix">{short_desc}</p>
            <p>{score === null? "" :<div>Community Score: {score}</div> }</p>
            </div>
            </div>
        </Paper> 
        )
}
