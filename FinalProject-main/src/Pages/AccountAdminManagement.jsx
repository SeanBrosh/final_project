import React, { useEffect, useState } from 'react';
import PrimarySearchAppBar from '../Tools/MenuAppBar';
import AccountAdminManagementContent from './AccountAdminManagementContent';
import { useNavigate } from 'react-router-dom';

import '../Styles/global.css';



export default function AccountAdminManagement() {

    const styles = {
        border: '1px solid black', margin:100 , padding:30 ,backgroundColor:"white"}
        const [usersTable, setUsersTable] = useState(null);
        const navigate = useNavigate();
        const apiUrl = 'http://proj9.ruppin-tech.co.il/api/getuserinfoall';
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
            setUsersTable(result)
          }
          )
      }, [])
    
    
      const userTableMaker =() => {
    
          if (usersTable == null) {
              navigate('/');
              return;
          }
    
    
              let temp = usersTable.map((users,index)=> {if(users.User_Rank!=="Admin") return<AccountAdminManagementContent key={index} name={users.User_Name} email={users.Email} rank={users.User_Rank} id={users.User_ID}/> })
              return temp
    
    
    
    
      }
    
   

  return (
      
    <div className="background-color-for-all"><PrimarySearchAppBar></PrimarySearchAppBar>
    <div style={styles}>
        <h1>User Management</h1>
        {userTableMaker()}
        </div>
    </div>
  )
}
