import { Avatar } from '@material-ui/core'
import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

import "./Icomment.css";

function Icomment({username, email, profileImg, cmt}) {
    console.log("IComment email = ", email);
    return (
        <div className="icom">
            <Link to = {{
                pathname: "/profile",
                state: {
                    email: {email}
                }
            }} >
            <Avatar alt = {username} src = {profileImg}/>
            </Link>
            <h4>{username} : </h4>
            <p>  {cmt}</p>
        </div>
    )
}

export default Icomment
