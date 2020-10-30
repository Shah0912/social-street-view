import { Avatar } from '@material-ui/core'
import React from 'react'
import CommentIcon from '@material-ui/icons/Comment';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import NearMeIcon from '@material-ui/icons/NearMe';
import Comment from '../individual_post/Comment'

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

            <div className="postBottom">
                <div className="postOption">
                    <ThumbUpIcon />
                    <p>Like</p>
                </div>
                <div className="postOption"> 
                    <CommentIcon />
                    <p>Comment</p>
                </div>
                <div className="postOption">
                    <NearMeIcon />
                    <p>Share</p>
                </div>
            </div>

            <div className="Comments">
                <h2>Comments</h2>
                <Comment />
                <div className="Comment">
                    <Avatar 
                        // className="postAvatar"
                        // alt = {username}
                        // src = {profileImg}
                        // alt={username}
                        alt="AdityaShah"
                        src="https://images.alphacoders.com/711/thumb-350-711581.jpg"
                    />
                    {/* <h3>{username} : </h3> */}
                    <h3>Sarang Shekokar : </h3>
                    <p>This is a comment</p>
                </div>
                
            </div>
            
        </div>
    )
}

export default Post
