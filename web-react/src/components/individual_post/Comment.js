import { Avatar } from '@material-ui/core'
import React,{useState, useEffect} from 'react'
import { useMutation, gql } from '@apollo/client';
import "./Comment.css"

var Sentiment = require('sentiment')

const { v4: uuidv4 } = require('uuid');



const ADD_COMMENT = gql`
  mutation add_comment(
    $sentiment: Int
    $Cid: String!
    $Com: String!
    $Ctime: String!
    $lat: String
    $lon: String
    $Iid: String!
    $email: String!
  ) {
    CreateComment(
      sentiment: $sentiment
      id: $Cid
      text: $Com
      timestamp: $Ctime
      latitude: $lat
      longitude: $lon
    ) {
      id
      text
    }

    AddCommentOn(from: { id: $Cid }, to: { id: $Iid }) {
      from {
        text
      }
      to {
        id
      }
    }

    AddCommentUsers(from: { email: $email }, to: { id: $Cid }) {
      from {
        name
        email
      }
      to {
        text
      }
    }
  }
`


function Comment({id, email}) {


    const [addComment] = useMutation(ADD_COMMENT);
    const [lat, setlat] = useState()
    const [lon, setlon] = useState()
    const [enteredText, setEnteredText] = useState(''); 


    const [Com, setCom] = useState("");     
    const [sentiment, setsentiment] = useState(0);

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            console.log("position = ", position);
            setlat(position.coords.latitude);
            setlon(position.coords.longitude);
        })
    },[])

    const sentiment1 = new Sentiment();
    function handleChange(e) {
      setCom(e.target.value);
      const res = sentiment1.analyze(Com)
      setsentiment(res.score);
      console.log("Sentiment = ",sentiment);
  }
    function onSubmit(Com, id, email) {
        let Ctime = new Date();
        let Cid = uuidv4();
        // navigator.geolocation.getCurrentPosition((position)=>{
        //     console.log("position = ", position);
        //     setlat(position.coords.latitude);
        //     setlon(position.coords.longitude);
        // })
        addComment({
          variables: {
            Cid: Cid,
            Com: Com,
            Ctime: Ctime,
            lat: lat.toString(),
            lon: lon.toString(),
            Iid: id,
            email: email,
            sentiment: sentiment,
          },
        })
        setEnteredText('');
    }

    return (
        <div className="postComment">
            <Avatar />
            <input type = "Text" placeholder="Write your comment" onChange={e=>handleChange(e)} className="commentText"/>
            <button type="submit" className="commentButton" value={enteredText} onClick={() => onSubmit(Com, id, email, sentiment)}> Post </button>
        </div>
    )
}

export default Comment
