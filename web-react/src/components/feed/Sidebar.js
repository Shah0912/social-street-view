import React, {useState, useEffect} from 'react'
import SidebarRow from './SidebarRow'
import { useQuery, gql, useMutation} from '@apollo/client'
import {useAuth0} from '@auth0/auth0-react'

import "./Sidebar.css"


const GET_SUGGESTION = gql`
    query GetSuggestions ($email: String!) {
        getSuggestions(email: $email) {
            name
            email
            profileImg
        } 
    }
`

function Sidebar() {

    const {isAuthenticated, user} = useAuth0();
    const {loading, error, data} = useQuery(GET_SUGGESTION, {
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
            <div className="sidebar">
            <p className="heading">Sugestions For You...</p>
            {
                // users.map((user) => (
                //     <SidebarRow username={user.username} profilePic = {user.profilePic} />
                // ))
                // console.log("suggestions", Data.getSuggestions[0].email) 

                Data.getSuggestions.map((fol=>(
                    <SidebarRow username={fol.name} profilePic = {fol.profileImg} />
                ))) 
            }

        </div>
        )
    }
    // const [users, setusers] = useState([
    //     {
    //         username: "Sarang Shekokar",
    //         profilePic:"https://static.toiimg.com/photo/76729750.cms"
    //     },
    //     {
    //         username:"Satish Gangula",
    //         profilePic:"https://i.kinja-img.com/gawker-media/image/upload/t_original/ijsi5fzb1nbkbhxa2gc1.png"
    //     },
    //     {
    //         username: "Sairam Gangula",
    //         profilePic: "https://www.nj.com/resizer/h8MrN0-Nw5dB5FOmMVGMmfVKFJo=/450x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg"
    //     },
    //     {
    //         username: "Harsh Shah",
    //         profilePic:"https://images.alphacoders.com/711/thumb-350-711581.jpg"
    //     }
    // ])

    return (

        <div className="sidebar">
            <p>Error in loading the suggestions. Please reload</p>             
        </div>
    )
}

export default Sidebar;
