import { Avatar } from '@material-ui/core'
import React,{useState, useEffect} from 'react'
import CommentIcon from '@material-ui/icons/Comment';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import NearMeIcon from '@material-ui/icons/NearMe';
import Comment from '../individual_post/Comment'
import {useAuth0} from '@auth0/auth0-react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom'
import "./Post.css"
import Icomment from '../individual_post/Icomment';

const GET_COMMENTS = gql`
    query GetComments($Iid:String!) {
        Image(id: $Iid) {
            comments_on(orderBy:timestamp_desc) {
                text
                timestamp
                users {
                    name
                    profileImg
                }
            }
        }
    }
`

const ADD_LIKES = gql `
    mutation($email: String! $Iid: String!) {
        MergeUserLikes(from:{email:$email} to:{id:$Iid}) {
            from{
                name
                email
            }
            to {
                id
            }
        }
    }
`


function Post({username, email, profileImg, imgSrc, caption, id}) {
    //For routing to individual post
    const history = useHistory();
    //Context for User from Auth0
    const {isAuthenticated, user} = useAuth0();

    //Mutation to addLikes
    const [addLikes] = useMutation(ADD_LIKES);


    const [textColor, setTextColor] = useState('black');

    const handleLikeClick = (e) => {
        setTextColor(textColor === 'black' ? '#2e81f4' : 'black');
        addLikes({
            variables: {
                email: user.email,
                Iid: id     
            }
        })
        console.log("textColor", textColor)
    }

    const [Email, setEmail] = useState("");

    useEffect(() => {
        if(isAuthenticated == true) {
          setEmail(user.email);
        }
    }, [isAuthenticated]);

    function handleClick() {
        console.log(id);
        history.push({
            pathname:'/post',
            data: id
        });
    }
    
    return (
        <div className="post">

            <div className="postHeader">
                <Link to = {{
                    pathname: "/profile",
                    state: {
                        email: {email}
                    }
                }} >
                    <Avatar 
                        className="postAvatar"
                        alt = {username}
                        src = {profileImg}
                        // alt={username}
                        // alt="AdityaShah"
                        // src="https://images.alphacoders.com/711/thumb-350-711581.jpg"
                    />
                </Link>
                <h3>{username}</h3>
            </div>

            <img className="postImage" onClick = {handleClick} src={imgSrc} />

            <h4 className="postText"><strong>{username} : </strong>{caption}</h4>

            <div className="postBottom" >
                <div className="postOption" onClick={handleLikeClick} style = {{color: textColor}}>
                    <ThumbUpIcon />
                    <p >Like</p>
                </div>
                <div className="postOption"> 
                    <CommentIcon />
                    <p>Comment</p>
                </div>
                <div className="postOption">
                    <NearMeIcon />
                    <p>Share</p>
                </div>
            </div>

            <div className="Comments">
                {/* <h2>Comments</h2> */}
                <Comment id = {id} email = {user.email} />
                <div className="Comment">
                    {/* <Avatar 
                        className="postAvatar"
                        alt = {username}
                        src = {profileImg}
                        alt={username}
                        alt="AdityaShah"
                        src="https://images.alphacoders.com/711/thumb-350-711581.jpg"
                    />
                    <h3>Sarang Shekokar : </h3>
                    <p>This is a comment</p> */}

                    

                    {/* <Icomment username = "Sarang Shekokar" cmt = "This is a comment" profileImg = "https://images.alphacoders.com/711/thumb-350-711581.jpg"/> */}
                </div>
                
            </div>
            
        </div>
    )
}
    

export default Post
