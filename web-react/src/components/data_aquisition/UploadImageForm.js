import React, {useState} from 'react';
// import { css } from '@emotion/core';
import { jsx, css } from '@emotion/react';
import { useMutation, gql } from '@apollo/client';
import { useDropzone } from 'react-dropzone';
import {useAuth0} from '@auth0/auth0-react';
import axios from 'axios';


const { v4: uuidv4 } = require('uuid');


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

const ADDIMAGE = gql`
  mutation addImage($Pid: String!, $Ptime: String!, $tags: String, $latitude: String, $longitude: String, $Iid: String!, $caption: String!, $url: String!, $email: String!) {
    CreatePost(id:$Pid, timestamp: $Ptime, tags: $tags, latitude: $latitude, longitude: $longitude) {
      id
      timestamp
    }
    CreateImage (caption: $caption, id: $Iid, url: $url) {
      id
      caption
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

  const [uploadImage] = useMutation(UPLOAD_IMAGE_TO_CLOUDINARY)

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

        let url =
         "https://us1.locationiq.com/v1/search.php?key=b63d71d9d444f7&q=" +
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
    <div>
      <h1>Upload to Cloudinary</h1>
      {
        uploadSuccess && <p css={css`
          color: lightgreen;
        `}>
          Successfully Uploaded!
        </p>
      }
      <input type="text" placeholder="Title" onChange={e => handleChange(e)} />
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p> 
        
        Choose file to upload...
        
        </p>
        {console.log("inputProps = ",getInputProps())}
      </div>
      <input type="text" placeholder="Location" onChange={e=>handleChangeL(e)}/>
      <input type="text" placeholder="State" onChange={e=>handleChangeS(e)}/>
      <input type="text" placeholder="tags" onChange={e=>handleChangeT(e)} />
      <input type="text" placeholder="caption" onChange={e=>handleChangeC(e)} />
      {isAuthenticated &&
        <button onClick={() => onSubmit(fileToUpload, uploadOptions)}> Upload Photo</button>
      }
    </div>
  );
};