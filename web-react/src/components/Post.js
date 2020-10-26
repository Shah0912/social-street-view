import { Avatar } from '@material-ui/core'
import React from 'react'


import "./Post.css"

function Post({username, profileImg, imgSrc, caption}) {
    return (
        <div className="post">

            <div className="postHeader">
                <Avatar 
                    className="postAvatar"
                    alt = {username}
                    src = {profileImg}
                    // alt={username}
                    // alt="AdityaShah"
                    // src="https://images.alphacoders.com/711/thumb-350-711581.jpg"
                />
                <h3>{username}</h3>
            </div>

            <img className="postImage" src={imgSrc} />

            <h4 className="postText"><strong>{username} : </strong>{caption}</h4>
            
        </div>
    )
}

export default Post
