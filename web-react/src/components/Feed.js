import { Avatar } from '@material-ui/core';
import React, {useState} from 'react'
import StoryReel from './StoryReel'
import Sidebar from './Sidebar'
import Post from './Post'

import "./Feed.css";
import Followers from './Followers';

function Feed() {

    const [posts, setPosts] = useState([
        {
            username: 'Aditya Shah', 
            profileImg: 'https://www.news4jax.com/resizer/b89RYEm5oAgzxJxWIGoyLJ9lZu8=/960x960/smart/filters:format(jpeg):strip_exif(true):strip_icc(true):no_upscale(true):quality(65)/cloudfront-us-east-1.images.arcpublishing.com/gmg/X462YQ4HIJEGHHX2I3LXRV4G7A.jpg',
            imgSrc : 'https://i.ytimg.com/vi/ck4RGeoHFko/maxresdefault.jpg',
            caption: 'Yesssssss'
        },
        {
            username: 'Sarang Shekokar', 
            profileImg: 'https://images.alphacoders.com/711/thumb-350-711581.jpg',
            imgSrc : 'https://www.htxt.co.za/wp-content/uploads/2019/02/Kurzgesagt-Loneliness.png',
            caption: 'A good caption..'
        }
    ]);


    return (
        <div className="feed">
            
            <StoryReel />
            {/* <Post username="Aditya Shah" profileImg = "https://www.news4jax.com/resizer/b89RYEm5oAgzxJxWIGoyLJ9lZu8=/960x960/smart/filters:format(jpeg):strip_exif(true):strip_icc(true):no_upscale(true):quality(65)/cloudfront-us-east-1.images.arcpublishing.com/gmg/X462YQ4HIJEGHHX2I3LXRV4G7A.jpg" imgSrc = "https://i.ytimg.com/vi/ck4RGeoHFko/maxresdefault.jpg" caption = "Yesssssss"/>
            <Post username="Sarang Shekokar" profileImg = "https://images.alphacoders.com/711/thumb-350-711581.jpg" imgSrc = "https://www.htxt.co.za/wp-content/uploads/2019/02/Kurzgesagt-Loneliness.png" caption = "ABC"/>
            <Post username="Satish Gangula" profileImg = "https://i.kinja-img.com/gawker-media/image/upload/t_original/ijsi5fzb1nbkbhxa2gc1.png" imgSrc = "https://mir-s3-cdn-cf.behance.net/projects/404/9b3f9078805941.Y3JvcCwxNDg4LDExNjMsMCww.png" caption = "good caption..."/> */}
            {/* <Post /> */}
            {console.log(posts)}
            {
                posts.map((post)=> (
                    <Post username={post.username} caption={post.caption} imgSrc={post.imgSrc} profileImg={post.profileImg}/>
                ))
            }
        </div>
    )
}

export default Feed
