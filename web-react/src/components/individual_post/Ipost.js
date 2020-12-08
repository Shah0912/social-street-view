import { Avatar } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import CommentIcon from '@material-ui/icons/Comment';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import NearMeIcon from '@material-ui/icons/NearMe';
import Comment from './Comment';
import Icomment from './Icomment';
import {useAuth0} from '@auth0/auth0-react';
import { useMutation, useQuery, gql } from '@apollo/client';
import {Link} from 'react-router-dom'


import "./Ipost.css"

const GET_POST = gql `
    query getPost($id : String!) {
        Image(filter: {id: $id}) {
            url
            caption
            posts {
                users_posted {
                    name
                    profileImg
                    email
                }
            }
            comments_on(orderBy: timestamp_desc) {
                text
                users {
                    name
                    profileImg
                    email
                }
            }

        }



    }
`

function Ipost(id) {

    const [email, setemail] = useState("");
    console.log('HERE')
    console.log(id)
    const {isAuthenticated, user} = useAuth0();
    // console.log("id = ", id.location.data   );
    // console.log("id = .. ", id);

    //FOR GETTING THE POST
    const {loading, error, data} = useQuery(GET_POST, {
        variables: {id: id.location.data},
        pollInterval : 500
        });
    const [Data, setData] = useState(undefined);

    useEffect(() => {
        if(loading == false && data) {
            setData(data);
            setemail(data.Image[0].posts[0].users_posted[0].email);
        }
    }, [loading, data]);


    //FOR GETTING COMMENTS
    // const {loading1, error1, data1} = useQuery(GET_COMMENTS, {
    //     variables: {Iid: id.location.data}
    //     });
    // const [Data1, setData1] = useState(undefined);

    // useEffect(() => {
    //     if(loading1 == false && data1) {
    //         setData1(data1);
    //     }
    // }, [loading1, data1]);

    

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    // if(error1) return `Error! ${error1.message}`;



    console.log("data = ", Data);
    if(Data) {
        console.log("Ipostdata = ",Data);
        // console.log("Comments", Data1);
        return (
            <div className="ipost">
                <div className="photo">
                    <div className="ipostTop">
                    <Link to = {{
                        pathname: "/profile",
                        state: {
                            email: {email}
                        }
                    }} >
                        <Avatar 
                            className="ipostAvatar"
                            // alt="AdityaShah"
                            alt = {Data.Image[0].posts[0].users_posted[0].name}
                            // src="https://images.alphacoders.com/711/thumb-350-711581.jpg"
                            src= {Data.Image[0].posts[0].users_posted[0].profileImg}
                        />
                    </Link>
                        <h3>{Data.Image[0].posts[0].users_posted[0].name}</h3>
                        
                    </div>

                    <div className="ipostBody">
                        <img className="ipostImage" src={Data.Image[0].url} />
                        {/* <h4 className="ipostText"><strong>{username} : </strong>{caption}</h4> */}
                        {/* <img className="ipostImage" src="https://i.ytimg.com/vi/ck4RGeoHFko/maxresdefault.jpg" /> */}
                        <h4 className="iposText"><strong>{Data.Image[0].posts[0].users_posted[0].name} : </strong> {Data.Image[0].caption} </h4>
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
                    <Comment id = {id.location.data} email = {user.email}/>
                    {console.log("email State = ", email)}
                    
                    {/* <div className="comment"> */}
                        {
                            Data.Image[0].comments_on.map((com) => (
                                <Icomment username={com.users[0].name} email={com.users[0].email} cmt={com.text} profileImg = {com.users[0].profileImg} />
                            ))
                        }
                        {/* <Icomment username={"Sarang Shekokar"} cmt={"This is a comment"} profileImg = {"https://images.alphacoders.com/711/thumb-350-711581.jpg"}/>  */}
                    {/* </div> */}
                    
                </div>
            </div>
        )
    }
    return (
        <div>
            Error in loading the Post please reload...
        </div>
    )
}

export default Ipost
