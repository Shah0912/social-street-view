import { Avatar } from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import StoryReel from './StoryReel'
import Sidebar from './Sidebar'
import Post from './Post'
import { useMutation, useQuery, gql } from '@apollo/client';
import {useAuth0} from '@auth0/auth0-react';


import "./Feed.css";


//Query to get the posts for generating the feed.
const GET_POSTS = gql`
  query getPosts {
    User(first: 5) {
      email
      name
      profileImg
      posted {
        # has_video
        has_image(orderBy: timestamp_desc) {
          id
          caption
          #timestamp
          url
        }
      }
    }
  }
`


function Feed() {

    const {loading, error, data} = useQuery(GET_POSTS);
    const [Data, setData] = useState(undefined);

    // Runs if loading or data is updated.
    useEffect(() => {
        if(loading == false && data) {
            setData(data);
        }
    }, [loading, data]);



    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    // console.log("Data = ", data); 


// If Data is not NULL
if(Data)
    return (
        <div className="feed">
            
            <StoryReel />
            {
                // console.log("Feed data", Data.User[0].posted[0].has_image) && 
                Data.User.map((user) => (
                    // console.log("feed user", user.posted[0])
                    (!!user.posted[0] ) && user.posted[0].has_image.map((post)=>(
                        // console.log("post = ", post) &&
                        <Post username={user.name} email = {user.email} caption={post.caption} imgSrc={post.url} profileImg ={user.profileImg} id = {post.id}/>
                    ))
                ))   
            }
        </div>
    )
    // If Data is NULL
    return(
        <div>
            Error in loading the feed. Please reload.
        </div>
    )
}

export default Feed
