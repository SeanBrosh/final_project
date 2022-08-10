import React from 'react';

export default function AccountProfileContent(props) {

    let{email,name,rank,image} = props
    return (
    <div>
        User Name : {name}<br></br>
        <br></br>
        User Email : {email}<br></br>
        <br></br>
        User Rank : {rank}<br></br>
        <br></br>
        {image == "" ?  "" : <div>User Image:<br></br><br></br><img style={{height:150}} src={image}></img></div>}
    </div>
  )
}
