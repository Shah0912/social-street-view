import { Avatar } from '@material-ui/core'
import React from 'react';

import "./SidebarRow.css"

function SidebarRow({name, profilePic}) {
    return (
        <div className="sidebarRow">
            <Avatar src={profilePic} />
            <h4>{name}</h4>
            
        </div>
    )
}

export default SidebarRow
