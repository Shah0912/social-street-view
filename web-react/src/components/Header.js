// Navigation bar, this component is rendered on every view.

import React,{useState, useEffect} from "react";
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
import {useAuth0} from '@auth0/auth0-react'
import {Button} from '@material-ui/core'
import { useQuery, gql, useMutation} from '@apollo/client'

//All the icons used are taken from material-ui/core

// Merge user query : If a user exists merge the node, if it doesn't create a new node.
//Returns name, email and profileImg that are stored.
const MERGE_USER = gql`
  mutation mergeUserMutation ($name: String!, $email: String!, $profileImg: String!) {
  MergeUser(name:$name, email: $email, profileImg: $profileImg) {
    name
    email
    profileImg
  }
}
`
// const MERGE_USER = gql`
//   mutation mergeUserMutation {
//   MergeUser(name: "Aditya Shah", email: "adi.shah0912@gmail.com", profileImg: "abc") {
//     name
//     email
//     profileImg
//   }
// }
// `

const Header = () => {
  const linkStyle = {
    color:'#2e81f4'
  }

  // Get the loginWithRedirect and logout functions.
  const {loginWithRedirect, logout, isAuthenticated, user} = useAuth0();

  // const [mergeUser] = useMutation(MergeUser);

  // React hook to call the mutation.
  const [createUser, { data, loading, error }] = useMutation(
    MERGE_USER
  )

  const [Logged, setLogged] = useState(0);
  
  const [Name, setName] = useState("");
  const [email, setemail] = useState("");
  const [PrfImg, setPrfImg] = useState("");


  useEffect(() => {
    if(isAuthenticated == true) {
      createUser({ variables: {name: user.name, email: user.email, profileImg: user.picture} });
      console.log("executed query");
      // If the user is authenticated merge the user.
      setemail(user.email);
    }
}, [isAuthenticated]);
// Runs every time isAuthenticated is updated.

  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/">
          <img
            alt="logo"
            // src="https://res-console.cloudinary.com/dw2ejcbvt/thumbnails/transform/v1/image/upload//v1607433940/bG9nb18xX3hybWtjZg==/drilldown"
            src = "https://res.cloudinary.com/dcr3apezm/image/upload/v1607533642/logo_znkf0f.png"
            style={{ height: '40px' }}
          />
          {/* Logo of the app */}
        </Link>
        <div className="headerInput">
          <SearchIcon />
          <input placeholder="Search" type="text" />
        </div>
      </div>

      <div className="headerCenter">
        <div className="headerOption headerOption--active">
          <Link to="/" style={linkStyle}>
            <HomeIcon fontSize="large" />
          </Link>
        </div>

        <div className="headerOption">
          <Link to="/street_view" style={linkStyle}>
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
          {/* <Link to="/profile" > */}
          <Link
            to={{
              pathname: '/profile',
              state: {
                email: { email },
              },
            }}
          >
            {/* If user is authenticated show the name adn profileImg */}
            <IconButton alignItems="center">
              {isAuthenticated && (
                <Avatar fontSize="small" src={user.picture} alt={user.name} />
              )}
            </IconButton>
          </Link>
          {/* <h4>Aditya Shah</h4> */}
          {/* <h4>{user.name}</h4> */}
          
          {isAuthenticated && <h4>{user.name}</h4>}
        </div>
        <Link to="/Upload">
          <IconButton className="iconLeft">
            <AddIcon />
          </IconButton>
        </Link>

        <IconButton className="iconLeft">
          <NotificationsActiveIcon />
        </IconButton>
        {/* <IconButton className="iconLeft">
          <ArrowDropDownIcon />
        </IconButton> */}
        {!isAuthenticated && (
          <Button
            color="inherit"
            onClick={() => {
              loginWithRedirect()
              // MergeUser({variables:{name: user.name, email: user.email}});

              // createUser({ variables: { name: user.value, email: user.email, $profileImg: user.picture} });
              // console.log(user);
              setLogged(1)
              setName(user.name)
              setemail(user.email)
              setPrfImg(user.picture)
            }}
          >
            Log In
          </Button>
        )}

        {
          isAuthenticated && (
            <Button color="inherit" onClick={() => logout()}>
              Log Out
            </Button>
          )
          // createUser({ variables: { name: user.value, email: user.email, $profileImg: user.picture} });
        }
      </div>
    </div>
  )
};

export default Header;