import React from 'react'
import { Avatar, IconButton } from "@material-ui/core";
import { useHistory } from 'react-router-dom';

import "./Story.css";


function Story({image, profileSrc, title, id}) {
    
    //For routing to individual post
    const history = useHistory();

    function handleOnClick () {
        history.push({
            pathname:'/post',
            data: id
        });
    }

    
    return (
        <div className="story" style={{backgroundImage:`url(${image})`}} onClick={handleOnClick} >
            <Avatar className="storyAvatar" src={profileSrc}  />
            <h4>{title}</h4>
        </div>
    )
}

export default Story;
