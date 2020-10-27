import React, {useState} from 'react'

import "./Followers.css"
import SidebarRow from './SidebarRow'

function Followers() {

    const [followers, setfollowers] = useState([
        {
            username: 'Sarang Shekokar',
            profilePic: 'https://static.toiimg.com/photo/76729750.cms'
        },
        {
            username: 'Satish Gangula', 
            profilePic: 'https://i.kinja-img.com/gawker-media/image/upload/t_original/ijsi5fzb1nbkbhxa2gc1.png'
        },
        {
            username: 'Harsh Shah',
            profilePic: 'https://images.alphacoders.com/711/thumb-350-711581.jpg'
        },
    ])

    return (
        <div>
            {
                followers.map((follower)=> (
                    <SidebarRow username={follower.username} profilePic={follower.profilePic} />
                ))
            }
        </div>
    )
}

export default Followers
