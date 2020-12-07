import React, {useState, useEffect} from 'react'
import {gql, useQuery} from '@apollo/client'; 
import "./Followers.css"
import {useAuth0} from '@auth0/auth0-react'
import SidebarRow from './SidebarRow'

const GET_FOLLOWERS = gql `
    query getFollowers($email: String!) {
        User(email: $email) {
            follows {
                name
                email
                profileImg
            }
        }
    }
`

function Followers() {

    // const [followers, setfollowers] = useState([
    //     {
    //         username: 'Sarang Shekokar',
    //         profilePic: 'https://static.toiimg.com/photo/76729750.cms'
    //     },
    //     {
    //         username: 'Satish Gangula', 
    //         profilePic: 'https://i.kinja-img.com/gawker-media/image/upload/t_original/ijsi5fzb1nbkbhxa2gc1.png'
    //     },
    //     {
    //         username: 'Harsh Shah',
    //         profilePic: 'https://images.alphacoders.com/711/thumb-350-711581.jpg'
    //     },
    // ])


    const {isAuthenticated, user} = useAuth0();
    const {loading, error, data} = useQuery(GET_FOLLOWERS, {
        variables: {email: user.email},
        // pollInterval: 1000,
    });
    const [Data, setData] = useState(undefined);
    useEffect(() => {
        if(loading == false && data) {
            setData(data);
        }
    }, [loading, data]);



    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    console.log("Data = ", data);

    if(Data) {
        return (
            <div>
                {
                    // followers.map((follower)=> (
                    //     <SidebarRow username={follower.username} profilePic={follower.profilePic} />
                    // ))
                }
                {
                    // console.log("followers", Data.User)
                    (!!Data.User[0].follows) && Data.User[0].follows.map((user) => (
                        <SidebarRow username = {user.name} profilePic = {user.profileImg} />
                    ))
                }
            </div>
        )
    }
    return (
        <div>
            Error in loading the data...
        </div>
    )
    
}

export default Followers
