import { Avatar } from '@material-ui/core'
import React from 'react'

import "./Icomment.css";

function Icomment({username, profileImg, cmt}) {
    return (
        <div className="icom">
            <Avatar alt = {username} src = {profileImg}/>
            <h4>{username} : </h4>
            <p>  {cmt}</p>
        </div>
    )
}

export default Icomment
