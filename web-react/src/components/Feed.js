import { Avatar } from '@material-ui/core';
import React from 'react'
import StoryReel from './StoryReel'
import Sidebar from './Sidebar'

import "./Feed.css";

function Feed() {
    return (
        <div className="feed">
            <StoryReel />
            {/* <Sidebar /> */}
        </div>
    )
}

export default Feed
