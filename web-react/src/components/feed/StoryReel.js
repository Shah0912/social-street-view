import React, {useState, useEffect} from 'react'
import Story from './Story'
import { Avatar, IconButton } from "@material-ui/core";
import { useMutation, useQuery, gql } from '@apollo/client';
import {useAuth0} from '@auth0/auth0-react';

import "./StoryReel.css";


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

    useEffect(() => {
        if(loading == false && data) {
            setData(data);
        }
    }, [loading, data]);



    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    console.log(data);

    // const [stories, setstories] = useState([
    //     {
    //         image:"https://i.pinimg.com/originals/e4/12/1e/e4121ef2638b2e36b52c6cbed79da85d.jpg",
    //         profileSrc:"https://static.toiimg.com/photo/76729750.cms",
    //         title:"ABC"
    //     },
    //     {
    //         image:"https://mir-s3-cdn-cf.behance.net/projects/404/28737895110041.Y3JvcCwxNDg5LDExNjQsMCww.png",
    //         profileSrc:"https://i.kinja-img.com/gawker-media/image/upload/t_original/ijsi5fzb1nbkbhxa2gc1.png",
    //         title:"CDE"
    //     },
    //     {
    //         image:"https://mir-s3-cdn-cf.behance.net/projects/404/9b3f9078805941.Y3JvcCwxNDg4LDExNjMsMCww.png",
    //         profileSrc:"https://www.nj.com/resizer/h8MrN0-Nw5dB5FOmMVGMmfVKFJo=/450x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg",
    //         title:"FGH"
    //     },
    //     {
    //         image:"https://i.ytimg.com/vi/ck4RGeoHFko/maxresdefault.jpg",
    //         profileSrc:"https://www.news4jax.com/resizer/b89RYEm5oAgzxJxWIGoyLJ9lZu8=/960x960/smart/filters:format(jpeg):strip_exif(true):strip_icc(true):no_upscale(true):quality(65)/cloudfront-us-east-1.images.arcpublishing.com/gmg/X462YQ4HIJEGHHX2I3LXRV4G7A.jpg",
    //         title:"IJK"
    //     },
    //     {
    //         image:"https://www.htxt.co.za/wp-content/uploads/2019/02/Kurzgesagt-Loneliness.png",
    //         profileSrc:"https://images.alphacoders.com/711/thumb-350-711581.jpg",
    //         title:"LMN"
    //     }
    // ]
// );



console.log(Data);

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

    return (
        <div>
            Error in loading
        </div>
    )
    
}

export default StoryReel
