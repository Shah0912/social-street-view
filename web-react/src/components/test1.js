import React from 'react'
import {Grid,TextField,makeStyles, Button} from '@material-ui/core'

const useStyle = makeStyles(theme => ({
  root : {
    '& .MuiFormControl-root': {
      width:"80&",
      margin:theme.spacing(1)
    }
  }
}))

function test1() {
  //const classes = useStyle()
  return (
    <div>
      <form>
        <div >
      <Grid container justify="center" >
      
        <Grid item style={{display:'flex',flexDirection:'column', maxWidth:'400', minWidth:'300'}} >
          <h1>Upload Image</h1>
        <Button  color="primary" variant="contained">
            Choose Photo
          </Button>
          <TextField size="small" variant="outlined" placeholder="Title" margin="normal"/>
          <TextField size="small" variant="outlined" placeholder="Location" margin="normal"/>
          <TextField size="small" variant="outlined" placeholder="State" margin="normal"/>
          <TextField size="small" variant="outlined" placeholder="Tags" margin="normal"/>
          <TextField size="small" variant="outlined" placeholder="Caption" margin="normal"/>
          <div style={{height:20}} />
          <Button color="primary" variant="contained">
            Upload Photo
          </Button>
        </Grid>
      </Grid>
      </div>
      </form>
      </div>
      
    )
}

export default test1
