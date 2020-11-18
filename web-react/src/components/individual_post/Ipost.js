import { Avatar } from '@material-ui/core'
import React from 'react'
import CommentIcon from '@material-ui/icons/Comment';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import NearMeIcon from '@material-ui/icons/NearMe';
import Comment from './Comment';
import Icomment from './Icomment';


import "./Ipost.css"

function Ipost() {
    return (
        <div className="ipost">
            <div className="photo">
                <div className="ipostTop">
                    <Avatar 
                        className="ipostAvatar"
                        // alt = {username}
                        // src = {profileImg}
                        // alt={username}
                        alt="AdityaShah"
                        src="https://images.alphacoders.com/711/thumb-350-711581.jpg"
                    />
                    {/* <h3>{username}</h3> */}
                    <h3>Aditya Shah</h3>
                </div>

                <div className="ipostBody">
                    {/* <img className="ipostImage" src={imgSrc} /> */}
                    {/* <h4 className="ipostText"><strong>{username} : </strong>{caption}</h4> */}
                    <img className="ipostImage" src="https://i.ytimg.com/vi/ck4RGeoHFko/maxresdefault.jpg" />
                    <h4 className="iposText"><strong>Aditya Shah : </strong>This is a caption</h4>
                </div>

                <div className="ipostBottom">
                    <div className="ipostOption">
                        <ThumbUpIcon />
                        <p>Like</p>
                    </div>
                    <div className="ipostOption"> 
                        <CommentIcon />
                        <p>Comment</p>
                    </div>
                    <div className="ipostOption">
                        <NearMeIcon />
                        <p>Share</p>
                    </div>
                </div>

            </div>

            <div className="comments">
                <h2>Comments</h2>
                <Comment />
                <div className="comment">
                    {/* <Avatar 
                        className="ipostAvatar"
                        alt = {username}
                        src = {profileImg}
                        alt={username}
                        alt="AdityaShah"
                        src="https://images.alphacoders.com/711/thumb-350-711581.jpg"
                    />
                    <h3>Sarang Shekokar : </h3>
                    <p>This is a comment</p> */}
                    <Icomment username={"Sarang Shekokar"} cmt={"This is a comment"} profileImg = {"https://images.alphacoders.com/711/thumb-350-711581.jpg"}/> 
                </div>
                
            </div>
        </div>
    )
}

export default Ipost
