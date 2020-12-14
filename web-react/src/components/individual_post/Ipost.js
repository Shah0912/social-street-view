import { Avatar } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import CommentIcon from '@material-ui/icons/Comment';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import NearMeIcon from '@material-ui/icons/NearMe';
import Comment from './Comment';
import Icomment from './Icomment';
import {useAuth0} from '@auth0/auth0-react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { useHistory, Link } from 'react-router-dom'


import "./Ipost.css"

// Get all the comments
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
                sentiment
                dist_id
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
    const history = useHistory()
    const [email, setemail] = useState("");
    console.log('HERE')
    console.log(id)
    const {isAuthenticated, user} = useAuth0();

    //FOR GETTING THE POST
    const {loading, error, data} = useQuery(GET_POST, {
        variables: {id: id.location.data},
        pollInterval : 500
        });
      // Run this query every 500ms (Poll interval)
    const [Data, setData] = useState(undefined);

    useEffect(() => {
        if(loading == false && data) {
            setData(data);
            setemail(data.Image[0].posts[0].users_posted[0].email);
        }
    }, [loading, data]);

    // Goes to sentiment when sentiment map button is clicked.
    function handleClick() {
      console.log(id)
      history.push({
        pathname: '/sentiment',
        data: id.location.data,
      })
    }
   

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    console.log("data = ", Data);
    if(Data) {
        console.log("Ipostdata = ",Data);
        return (
          <div className="ipost">
            <div className="photo">
              <div className="ipostTop">
                <Link
                  to={{
                    pathname: '/profile',
                    state: {
                      email: { email },
                    },
                  }}
                >
                  {/* Link to profile if clicked on the Avatar */}
                  <Avatar
                    className="ipostAvatar"
                    // alt="AdityaShah"
                    alt={Data.Image[0].posts[0].users_posted[0].name}
                    src={Data.Image[0].posts[0].users_posted[0].profileImg}
                  />
                </Link>
                <h3>{Data.Image[0].posts[0].users_posted[0].name}</h3>
              </div>

              <div className="ipostBody">
                <img className="ipostImage" src={Data.Image[0].url} />
                <h4 className="iposText">
                  <strong>
                    {Data.Image[0].posts[0].users_posted[0].name} :{' '}
                  </strong>{' '}
                  {Data.Image[0].caption}{' '}
                </h4>
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
                <div className="ipostOption" onClick={handleClick}>
                  <NearMeIcon />
                  <p>Sentiment Map</p>
                </div>
              </div>
            </div>

            <div className="comments">
              <h2>Comments</h2>
              <Comment id={id.location.data} email={user.email} />
              {console.log('email State = ', email)}
              {Data.Image[0].comments_on.map((com) => (
                <Icomment
                  username={com.users[0].name}
                  email={com.users[0].email}
                  cmt={com.text}
                  profileImg={com.users[0].profileImg}
                />
              ))}
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
