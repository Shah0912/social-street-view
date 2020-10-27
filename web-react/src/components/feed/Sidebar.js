import React, {useState} from 'react'
import SidebarRow from './SidebarRow'
import "./Sidebar.css"

function Sidebar() {

    const [users, setusers] = useState([
        {
            username: "Sarang Shekokar",
            profilePic:"https://static.toiimg.com/photo/76729750.cms"
        },
        {
            username:"Satish Gangula",
            profilePic:"https://i.kinja-img.com/gawker-media/image/upload/t_original/ijsi5fzb1nbkbhxa2gc1.png"
        },
        {
            username: "Sairam Gangula",
            profilePic: "https://www.nj.com/resizer/h8MrN0-Nw5dB5FOmMVGMmfVKFJo=/450x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg"
        },
        {
            username: "Harsh Shah",
            profilePic:"https://images.alphacoders.com/711/thumb-350-711581.jpg"
        }
    ])

    return (

        <div className="sidebar">
            <p>Sugestions For You...</p>

            {
                users.map((user) => (
                    <SidebarRow username={user.username} profilePic = {user.profilePic} />
                ))
            }

            {/* <SidebarRow username="Sarang Shekokar" profilePic="https://static.toiimg.com/photo/76729750.cms" />
            <SidebarRow username="Satish Gangula" profilePic="https://i.kinja-img.com/gawker-media/image/upload/t_original/ijsi5fzb1nbkbhxa2gc1.png"/>
            <SidebarRow username="Sairam Gangula" profilePic="https://www.nj.com/resizer/h8MrN0-Nw5dB5FOmMVGMmfVKFJo=/450x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg"/>
            <SidebarRow username="Harsh Shah" profilePic="https://images.alphacoders.com/711/thumb-350-711581.jpg"/> */}
            
        </div>
    )
}

export default Sidebar;
