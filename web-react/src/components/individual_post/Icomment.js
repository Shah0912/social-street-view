import { Avatar } from '@material-ui/core'
import React from 'react'

function Icomment({username, profileImg, cmt}) {
    return (
        <div className="comment">
            <Avatar alt = {username} src = {profileImg}/>
            <h3>{username} : </h3>
            <p>{cmt}</p>
        </div>
    )
}

export default Icomment
