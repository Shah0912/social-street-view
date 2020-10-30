import { Avatar } from '@material-ui/core'
import React from 'react'


import "./Comment.css"

function Comment() {
    return (
        <div className="postComment">
            <Avatar />
            <input type = "Text" placeholder="Write your comment" className="commentText"/>
            <button type="submit" className="commentButton"> Post </button>
        </div>
    )
}

export default Comment
