import { Avatar } from '@material-ui/core'
import React from 'react';

import "./SidebarRow.css"

function SidebarRow({username, profilePic}) {
    return (
        <div className="sidebarRow">
            <Avatar src={profilePic} />
            <h4>{username}</h4>
            
        </div>
    )
}

export default SidebarRow
