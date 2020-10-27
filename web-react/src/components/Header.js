import React from "react";
import "./Header.css";
import {Link} from 'react-router-dom'

import StreetviewIcon from '@material-ui/icons/Streetview';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import AddIcon from '@material-ui/icons/Add'; // For posting
import { Avatar, IconButton } from "@material-ui/core";
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const Header = () => {
  const linkStyle = {
    color:'#2e81f4'
  }

  return (
    <div className="header">
      <div className="headerLeft">
        <Link to='/'>
        <img
          alt="logo"
          src="https://img.icons8.com/bubbles/2x/street-view.png"
          style={{ height: '50px' }}
        />
        </Link>
        <div className="headerInput">
          <SearchIcon />
          <input placeholder="Search" type="text" />
        </div>
      </div>

      <div className="headerCenter">
        <div className="headerOption headerOption--active">
          <Link to="/" style = {linkStyle}>
          <HomeIcon fontSize="large" />
          </Link>
        </div>

        <div className="headerOption">
          <Link to="/street_view" style = {linkStyle}>
          <StreetviewIcon fontSize="large" />
          </Link>
        </div>

        {/* <div className="homeOptions">
          <IconButton>
          <SupervisedUserCircleIcon  fontSize ="large"/>
          </IconButton>
          
        </div> */}
      </div>

      <div className="headerRight">
        <div
          className="headerInfo"
          style={{ maxHeight: '40px', justifyContent: 'center' }}
        >
          <Link to = '/profile'>
          <IconButton alignItems='center'>
            <Avatar fontSize="small" />
          </IconButton>
          </Link>
          <h4>Aditya Shah</h4>
          
        </div>

        <IconButton className="iconLeft">
          <AddIcon />
        </IconButton>
        <IconButton className="iconLeft">
          <NotificationsActiveIcon />
        </IconButton>
        <IconButton className="iconLeft">
          <ArrowDropDownIcon />
        </IconButton>
      </div>
    </div>
  )
};

export default Header;