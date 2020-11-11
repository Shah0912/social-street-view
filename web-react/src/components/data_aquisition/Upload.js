
import React, { Component } from 'react';
import axios from 'axios';
import {Progress} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// const axios = require("axios").default;


import "./Upload.css"



class Upload extends Component {
  constructor(props) {
    super(props);
      this.state = {
        selectedFile: null,
        loaded:0
      }
   
  }
  checkMimeType=(event)=>{
    //getting file object
    let files = event.target.files 
    //define message container
    let err = []
    // list allow mime type
   const types = ['image/png', 'image/jpeg', 'image/gif']
    // loop access array
    for(var x = 0; x<files.length; x++) {
     // compare file type find doesn't matach
         if (types.every(type => files[x].type !== type)) {
         // create error message and assign to container   
         err[x] = files[x].type+' is not a supported format\n';
       }
     };
     for(var z = 0; z<err.length; z++) {// if message not same old that mean has error 
         // discard selected file
        toast.error(err[z])
        event.target.value = null
    }
   return true;
  }
  maxSelectFile=(event)=>{
    let files = event.target.files
        if (files.length > 3) { 
           const msg = 'Only 3 images can be uploaded at a time'
           event.target.value = null
           toast.warn(msg)
           return false;
      }
    return true;
 }
 checkFileSize=(event)=>{
  let files = event.target.files
  let size = 2000000 
  let err = []; 
  for(var x = 0; x<files.length; x++) {
  if (files[x].size > size) {
   err[x] = files[x].type+'is too large, please pick a smaller file\n';
 }
};
for(var z = 0; z<err.length; z++) {// if message not same old that mean has error 
  // discard selected file
 toast.error(err[z])
 event.target.value = null
}
return true;
}
onChangeHandler=event=>{
  var files = event.target.files
  if(this.maxSelectFile(event) && this.checkMimeType(event) &&    this.checkFileSize(event)){ 
  // if return true allow to setState
     this.setState({
     selectedFile: files,
     loaded:0
  })
}
}
  onClickHandler = () => {
    const data = new FormData() 
    for(var x = 0; x<this.state.selectedFile.length; x++) {
      data.append('file', this.state.selectedFile[x])
    }
    axios.post("http://localhost:8000/upload", data, {
      onUploadProgress: ProgressEvent => {
        this.setState({
          loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
        })
      },
    })
      .then(res => { // then print response status
        toast.success('upload success')
        console.log(this);







        let locality = this.state.Location;
        let State = this.state.State;
        let url =
        "https://us1.locationiq.com/v1/search.php?key=b63d71d9d444f7&q=" +
        locality.split(" ").join("%20") +
        ",%20" +
        State.split(" ").join("%20") +
        ",%20" +
        "India&format=json";
      console.log(url);
      const location = axios
      .get(url)
      .then((res) => {
        //console.log(res.data[0].lat);
        //console.log(res.data[0].lon);
        console.log(res.data[0]);

        // CALL CLOUDINARY HERE
        // CALL GRAPHQL QUERY HERE
        // IMG LOCATION IS IN MAIN DIR: dataAcquisition/public/
        //filename: this.selectedFile.File.name
        //Timestamp: this.selectedFile.File.lastModified

        return res.data[0];
      })
      .catch((error) => {
        console.error(error.message);
      });








      
      // const lat = location.lat;
      // const lon = location.lon;
      // console.log(lat);
      // console.log(lon);
      })
      .catch(err => { // then print response status
        console.log(err);
        toast.error('upload fail')
      })
    }


    handleStateChange = (e) => {
      this.setState({State: e.target.value});
    }

    handleLocationChange = (e) => {
      this.setState({Location: e.target.value});
    }

  render() {
    return (
      <div class="container" className="Upload">
	      <div class="row">
      	  <div class="offset-md-3 col-md-6">
               <div class="form-group files">
                <label className="Upload-header">Upload Your File </label>
                <input type="text" placeholder="Location" value={this.state.Location} onChange={this.handleLocationChange}/>
                <input type="text" placeholder="State" value={this.state.State} onChange={this.handleStateChange}/>
                <input type="file" className= "fileInput" multiple onChange={this.onChangeHandler}/>
              </div>  
              <div class="form-group" className= "fileInput">
              <ToastContainer />
              <Progress max="100" className="progress" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress>
        
              </div> 
              
              <button type="button" className="button" onClick={this.onClickHandler}>Upload</button>

	      </div>
      </div>
      </div>
    );
  }
}

export default Upload;