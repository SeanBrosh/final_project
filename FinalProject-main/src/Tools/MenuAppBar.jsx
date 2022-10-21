import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {useNavigate } from 'react-router-dom';
import CustomizedInputBase from './CustomizedInputBase';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link, useLocation } from 'react-router-dom';

import websiteLogo from '../images/logosingle-ORG.png'
import websiteName from '../images/headline-org.png'

import '../Styles/global.css';
import '../Styles/media-query.css'


export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  let sessionUser = JSON.parse(sessionStorage.getItem('login'));
  let session = false;
  if(sessionUser !== null){
    session = true;
  }
  let adminUser = false;
  let larpCreatorPlus = false;
  if (sessionUser !== null && sessionUser.rank == "Moderator" || sessionUser !== null && sessionUser.rank == "Admin")
  {
    adminUser= true;
  }
  if (sessionUser !== null && sessionUser.rank == "Moderator" || sessionUser !== null && sessionUser.rank == "Admin" || sessionUser !== null && sessionUser.rank == "Larp Creator")
  {
    larpCreatorPlus= true;
  }
  



  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOutButton =() => {
    sessionStorage.clear()
    if(location.pathname === '/') //checks if we're already on that page.
    {
      window.location.reload(false);
      setAnchorEl(null);
    }
    else
    {
    navigate('/')
    setAnchorEl(null);
    }
  }

  const handleAccountProfileMover=() =>{
    navigate('/accountprofile')
    setAnchorEl(null);
  };

  const handleAccountChangeMover=() =>{
    localStorage.removeItem('userChoice') //handles the issue if you want to move from another user's account change details - to your own; hence the refresh.
    if(location.pathname === '/accountchange') //checks if we're already on that page.
    {
      window.location.reload(false);
      setAnchorEl(null);
    }
    else
    {
    navigate('/accountchange')
    setAnchorEl(null);
    }
  };

  const handleLarpCreatorMover=() =>{
    navigate('/larpbuilderpage')
    setAnchorEl(null);
  };

  const handleAdminUserMover=() =>{
    navigate('/accountadminmanagement')
    setAnchorEl(null);
  };

  const handleAdminLarpMover=() =>{
    navigate('/larpadminmanagement')
    setAnchorEl(null);
  };



  const logoHanlder=() =>{
    navigate('/')
    setAnchorEl(null);
  };

  const loginHandler=() =>{
    navigate('/login')
    setAnchorEl(null);
  };


  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });

  return (
    <React.Fragment>
    <Box sx={{ flexGrow: 1 }} >
      <ThemeProvider theme={darkTheme}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton onClick={logoHanlder}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img className='menu-logo-controller' src={websiteLogo} alt="Logo" />
          </Typography>
          </IconButton>
          <IconButton onClick={logoHanlder}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img className='menu-website-name-controller' style={{height:30}} src={websiteName} alt="Logo" />
          </Typography>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <CustomizedInputBase tags={null} hasFood={null} hasSleep={null} paymentStartingRng={null} paymentEndingRng={null} dateStart={null} dateEnd={null} country={null} intputStyle={{p: '5px 50px', display: 'flex', alignItems: 'center', width: 200 }}/>
          </Typography>
          <div className='normal-navbar-shower'>
          {adminUser &&
          <IconButton onClick={handleAdminUserMover}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        User Management
        </Typography>
        </IconButton>
          }
                {adminUser &&
          <IconButton onClick={handleAdminLarpMover}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          LARP Table Management
        </Typography>
        </IconButton>
          }

          {larpCreatorPlus &&
          <IconButton onClick={handleLarpCreatorMover}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Create a LARP!
        </Typography>
        </IconButton>
          }
          
          </div>
          <div className='burger-navbar-shower'>

          </div>
          {session? 
          <div>
            <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleAccountProfileMover}>Profile</MenuItem>
            <MenuItem onClick={handleAccountChangeMover}>Change Account Settings</MenuItem>
            <div className='burger-navbar-shower'>
              {adminUser &&
            <MenuItem onClick={handleAdminUserMover}>User Management</MenuItem>
              }
              {adminUser &&
              <MenuItem onClick={handleAdminLarpMover}>LARP Table Management</MenuItem>
              }
            {larpCreatorPlus && 
            <MenuItem onClick={handleLarpCreatorMover}>Create a LARP!</MenuItem>}
            </div>
            <MenuItem onClick={handleLogOutButton}>Log Off</MenuItem>

          </Menu>
          </div>
        </div> :     <IconButton onClick={loginHandler}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Login
          </Typography>
          </IconButton>
         }

        </Toolbar>
      </AppBar>
      
      </ThemeProvider>
    </Box>
     </React.Fragment>
  );
}