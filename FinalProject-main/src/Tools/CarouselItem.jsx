import React from 'react';
import { Paper, Button } from '@mui/material'
import {useNavigate } from 'react-router-dom';


export default function CarouselItem(props) {
    let{title,  short_desc} = props
    const navigate = useNavigate();
    const navBtnClicker=() =>{
        localStorage.setItem('larpChoice', JSON.stringify(title));
        navigate('/larppage')
    }

    return (
        <Paper>

            <h2>{title}</h2>
            <p>{short_desc}</p>
            <Button onClick={navBtnClicker} className="CheckButton">
                Check it out!
            </Button>
        </Paper> 
        )
}
