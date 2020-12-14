import React, {useState, useEffect} from 'react'
import Story from './Story'
import { Avatar, IconButton } from "@material-ui/core";
import { useMutation, useQuery, gql } from '@apollo/client';
import {useAuth0} from '@auth0/auth0-react';

import "./StoryReel.css";

// Get stories for the feed
const GET_STORIES = gql`
    query getVideos {
        User (first:5) {
            email
            name
            profileImg
            posted {
                # has_video
                has_image (first :1 orderBy:timestamp_desc) {
                    id
                    caption
                    timestamp
                    url
                }
            }
        }
    }
`

function StoryReel() {

    const {loading, error, data} = useQuery(GET_STORIES);
    const [Data, setData] = useState(undefined);

    // Runs everytime loading or data is updated.
    useEffect(() => {
        if(loading == false && data) {
            setData(data);
        }
    }, [loading, data]);



    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    console.log(data);

console.log(Data);

    // If data is not NULL
    if(Data) {
        return (
            <div className="storyReel">
                {
                    // console.log("storyReel data = ", Data) &&
                    // Data.map((user)=>(
                    //     console.log(user.posted)
                    // ))
                    // console.log("Data = ", Data)
                    Data.User.map((user) => (
                        // console.log("story", user) 
                        (!!user.posted[0]) && <Story profileSrc={user.profileImg} image={user.posted[0].has_image[0].url} title={user.posted[0].has_image[0].caption} id={user.posted[0].has_image[0].id} /> 
                    ))
                }

            {
                // stories.map( (story) => (
                    // <Story image= {story.image} profileSrc = {story.profileSrc} title = {story.title} />
                // ))
            }
        </div>
    )
}
    // If data is NULL
    return (
        <div>
            Error in loading
        </div>
    )
    
}

export default StoryReel
