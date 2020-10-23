import React from 'react'
import { Avatar, IconButton } from "@material-ui/core";

import "./Story.css";


function Story({image, profileSrc, title}) {
    return (
        <div className="story" style={{backgroundImage:`url(${image})`}} >
            <Avatar className="storyAvatar" src={profileSrc}  />
            <h4>{title}</h4>
        </div>
    )
}

export default Story;
