import React, {useState} from 'react';
// import { css } from '@emotion/core';
import { jsx, css } from '@emotion/react';
import { useMutation, gql } from '@apollo/client';
import { useDropzone } from 'react-dropzone';
import {useAuth0} from '@auth0/auth0-react';
import axios from 'axios';
import {Grid,TextField,makeStyles, Button} from '@material-ui/core'
import dotenv from 'dotenv'


const { v4: uuidv4 } = require('uuid');

// Upload image to cloudinary custom mutation
const UPLOAD_IMAGE_TO_CLOUDINARY = gql`
  mutation UploadImageToCloudinary($file: String! $uploadOptions: UploadOptionsInput){
    uploadImage(file: $file uploadOptions: $uploadOptions) {
      public_id
      url
      tags {
        tag_name
      }
    }
  }
`

// Add image mutation
const ADDIMAGE = gql`
  mutation addImage($Pid: String!, $Ptime: String!, $tags: String, $latitude: String, $longitude: String, $Iid: String!, $caption: String!, $url: String!, $email: String!) {
    CreatePost(id:$Pid, tags: $tags, latitude: $latitude, longitude: $longitude) {
      id
    }
    CreateImage (caption: $caption, id: $Iid, url: $url, timestamp: $Ptime) {
      id
      caption
      timestamp
    }
    AddPostHas_image(from:{id: $Pid} to: {id: $Iid}) {
      from {
        id
        tags
      }
      to {
        caption
        id
      }
    }
    AddUserPosted(from:{email: $email} to:{id: $Pid}) {
    from{
      email
      name
    }
    to {
      id
    }
  }
  }
`



export default function UploadImageForm(props) {

  const {isAuthenticated, user} = useAuth0();
  // Authentication context

  const [uploadImage] = useMutation(UPLOAD_IMAGE_TO_CLOUDINARY)
  // Hook to call the uploadImage to Cloudinary mutation

  const [uploadOptions, setUploadOptions] = React.useState({});
  const [fileToUpload, setFileToUpload] = React.useState({});
  const [filePreview, setFilePreview] = React.useState();
  const [uploadSuccess, setUploadSuccess] = React.useState(false);

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const [State, setState] = useState("");
  const [Location, setLocation] = useState("");
  const [Tag, setTag] = useState("");
  const [Caption, setCaption] = useState("");

  const [addImage] = useMutation(ADDIMAGE);

  function onDrop(acceptedFiles) {
    setFileToUpload(acceptedFiles[0]);
    setFilePreview(URL.createObjectURL(acceptedFiles[0]));
  }

  function handleChange(e) {
    setUploadOptions({
      ...uploadOptions,
      public_id: e.target.value
    });
  }

  function handleChangeC(e) {
    setCaption(e.target.value);
  }

  function handleChangeL(e) {
    setLocation(e.target.value);
  }

  function handleChangeS(e) {
    setState(e.target.value);
  }

  function handleChangeT(e) {
    setTag(e.target.value);
  }

  function onSubmit(file, options) {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      uploadImage({
        variables: {
          file: reader.result,
          uploadOptions: options
        }
      }).then(data => {
        setUploadSuccess(true);
        props.setUploadedImage(data.data.uploadImage)
        console.log(data);
        
        //data.data.uploadImage.url
        let Pid = uuidv4();
        let Iid = uuidv4();
        let Ptime = new Date();
        console.log("Pid", Pid);
        console.log("Iid", Iid);
        console.log("Ptime", Ptime);
        console.log("url", url);

        // Get coordinates from LocationIQ
        let key = process.env.LOCATIONIQ_KEY;
        let url =
         `https://us1.locationiq.com/v1/search.php?key=${key}&q=` +
         Location.split(" ").join("%20") +
         ",%20" +
         State.split(" ").join("%20") +
         ",%20" +
         "India&format=json";
       console.log(url);
       const location = axios
       .get(url)
       .then((res) => {
          addImage({
            variables: {
              Pid: Pid,
              Ptime: Ptime, 
              tags: Tag,
              latitude: res.data[0].lat,
              longitude: res.data[0].lon,
              Iid: Iid,
              caption: Caption, 
              url: data.data.uploadImage.url,
              email: user.email
            }
          })
       })
       .catch((error)=>{console.error(error.message)});

      })
    })
    reader.readAsDataURL(file)
  }


  return (
    <div >
      <Grid container justify="center" >
      
        <Grid item style={{display:'flex',flexDirection:'column', maxWidth:'400', minWidth:'300'}} >
          <h1>Upload Image</h1>
          <div {...getRootProps()}>
          <input {...getInputProps()} />
        <Button  color="primary" variant="contained">
            Choose Photo
          </Button>
          {console.log("inputProps = ",getInputProps())}
          </div>
          <TextField onChange={e => handleChange(e)} size="small" variant="outlined" placeholder="Title" margin="normal"/>
          <TextField onChange={e=>handleChangeL(e)} size="small" variant="outlined" placeholder="Location" margin="normal"/>
          <TextField onChange={e=>handleChangeS(e)} size="small" variant="outlined" placeholder="State" margin="normal"/>
          <TextField onChange={e=>handleChangeT(e)} size="small" variant="outlined" placeholder="Tags" margin="normal"/>
          <TextField onChange={e=>handleChangeC(e)} size="small" variant="outlined" placeholder="Caption" margin="normal"/>
          <div style={{height:20}} />
          {isAuthenticated && !!fileToUpload &&
          <Button onClick={() => onSubmit(fileToUpload, uploadOptions)} color="primary" variant="contained">
            Upload Photo
          </Button>
          }
          {
        uploadSuccess && <h1 style={css`
          color: lightgreen;
        `}>
          Successfully Uploaded!
        </h1>
      }
        </Grid>
      </Grid>
      </div>

    
  );
};