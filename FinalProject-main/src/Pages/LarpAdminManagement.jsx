import React, { useEffect, useState } from 'react';
import PrimarySearchAppBar from '../Tools/MenuAppBar';
import LarpAdminManagementContent from './LarpAdminManagementContent';
import { useNavigate } from 'react-router-dom';



export default function LarpAdminManagement() {
const navigate = useNavigate();
const apiUrl = 'http://proj9.ruppin-tech.co.il/api/getlarpinfoall';
const [larpsSearch, setLarpsSearch] = useState([]);
    const styles = {
        border: '1px solid black', margin:100 , padding:30 ,backgroundColor:"white"}

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
          setLarpsSearch(result)
      }
      )
  }, [])


  const addLarps =() => {

      if (larpsSearch == null) {
          navigate('/');
          return;
      }


          let temp = larpsSearch.map((larps,index)=> {if(larps.name!=="Admin") return<LarpAdminManagementContent key={index} larpSingle={larps}/> })
          return temp




  }


  return (
      
    <div style={{backgroundColor:"peachpuff"}}><PrimarySearchAppBar></PrimarySearchAppBar>
    <div style={styles}>
        <h1>Larp Management</h1>
        {addLarps()}
        </div>
    </div>
  )
}
