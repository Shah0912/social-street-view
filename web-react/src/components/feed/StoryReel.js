import React from 'react'
import Story from './Story'
import { Avatar, IconButton } from "@material-ui/core";

import "./StoryReel.css";



function StoryReel() {
    return (
        <div className="storyReel">
            <Story 
                image="https://i.pinimg.com/originals/e4/12/1e/e4121ef2638b2e36b52c6cbed79da85d.jpg"
                profileSrc="https://static.toiimg.com/photo/76729750.cms"
                title="ABC"
            />
            <Story 
                image="https://mir-s3-cdn-cf.behance.net/projects/404/28737895110041.Y3JvcCwxNDg5LDExNjQsMCww.png"
                profileSrc="https://i.kinja-img.com/gawker-media/image/upload/t_original/ijsi5fzb1nbkbhxa2gc1.png"
                title="CDE"
            />
            <Story 
                image="https://mir-s3-cdn-cf.behance.net/projects/404/9b3f9078805941.Y3JvcCwxNDg4LDExNjMsMCww.png"
                profileSrc="https://www.nj.com/resizer/h8MrN0-Nw5dB5FOmMVGMmfVKFJo=/450x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg"
                title="FGH"
            />
            <Story 
                image="https://i.ytimg.com/vi/ck4RGeoHFko/maxresdefault.jpg"
                profileSrc="https://www.news4jax.com/resizer/b89RYEm5oAgzxJxWIGoyLJ9lZu8=/960x960/smart/filters:format(jpeg):strip_exif(true):strip_icc(true):no_upscale(true):quality(65)/cloudfront-us-east-1.images.arcpublishing.com/gmg/X462YQ4HIJEGHHX2I3LXRV4G7A.jpg"
                title="IJK"
            />
            <Story 
                image="https://www.htxt.co.za/wp-content/uploads/2019/02/Kurzgesagt-Loneliness.png"
                profileSrc="https://images.alphacoders.com/711/thumb-350-711581.jpg"
                title="LMN"
            />
        </div>
    )
}

export default StoryReel
