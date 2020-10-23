import React from "react";
import "./Header.css";
import StreetviewIcon from '@material-ui/icons/Streetview';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import AddIcon from '@material-ui/icons/Add'; // For posting
import { Avatar, IconButton } from "@material-ui/core";
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const Header = () => {
  return (
    <div className="header">
      <div className="headerLeft">
        <img
          alt="logo"
          src="https://img.icons8.com/bubbles/2x/street-view.png"
          style={{ height: '50px' }}
        />
        <div className="headerInput">
          <SearchIcon />
          <input placeholder="Search" type="text" />
        </div>
      </div>

      <div className="headerCenter">
        <div className="headerOption headerOption--active">
          <HomeIcon fontSize="large" />
        </div>

        <div className="headerOption">
          <StreetviewIcon fontSize="large" />
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
          <IconButton alignItems='center'>
            <Avatar fontSize="small" />
          </IconButton>
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