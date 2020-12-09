import { Avatar } from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import StoryReel from './StoryReel'
import Sidebar from './Sidebar'
import Post from './Post'
import { useMutation, useQuery, gql } from '@apollo/client';
import {useAuth0} from '@auth0/auth0-react';


import "./Feed.css";

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

    useEffect(() => {
        if(loading == false && data) {
            setData(data);
        }
    }, [loading, data]);



    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    // console.log("Data = ", data); 


    // const [posts, setPosts] = useState([
    //     {
    //         username: 'Aditya Shah', 
    //         profileImg: 'https://www.news4jax.com/resizer/b89RYEm5oAgzxJxWIGoyLJ9lZu8=/960x960/smart/filters:format(jpeg):strip_exif(true):strip_icc(true):no_upscale(true):quality(65)/cloudfront-us-east-1.images.arcpublishing.com/gmg/X462YQ4HIJEGHHX2I3LXRV4G7A.jpg',
    //         imgSrc : 'https://i.ytimg.com/vi/ck4RGeoHFko/maxresdefault.jpg',
    //         caption: 'Yesssssss'
    //     },
    //     {
    //         username: 'Sarang Shekokar', 
    //         profileImg: 'https://images.alphacoders.com/711/thumb-350-711581.jpg',
    //         imgSrc : 'https://www.htxt.co.za/wp-content/uploads/2019/02/Kurzgesagt-Loneliness.png',
    //         caption: 'A good caption..'
    //     }
    // ]);

if(Data)
    return (
        <div className="feed">
            
            <StoryReel />
            {
                // posts.map((post)=> (
                    // <Post username={post.username} caption={post.caption} imgSrc={post.imgSrc} profileImg={post.profileImg}/>
                // ))
            }
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
    return(
        <div>
            Error in loading the feed. Please reload.
        </div>
    )
}

export default Feed
