import { Avatar } from '@material-ui/core'
import React from 'react';
import {Link} from 'react-router-dom'


import "./SidebarRow.css"

function SidebarRow({username, email, profilePic}) {

    return (
        // on click take to the profile of the suggested person.
        <div className="sidebarRow">
            <Link to = {{
                pathname: "/profile",
                state: {
                    email: {email}
                }
            }} >
            <Avatar src={profilePic} />
            </Link>
            <h4>{username}</h4>
            
        </div>
    )
}

export default SidebarRow
