// Profile page of the user
import React from 'react'
import PostGrid from './PostGrid'
import Details from './Details'
import { Container } from '@material-ui/core'
import {useAuth0} from '@auth0/auth0-react'


function Profile(props) {

  console.log("Profile props", props);
  const {isAuthenticated, user} = useAuth0();
  if(!isAuthenticated) {
    return (
      <div>Sign in to continue</div>
    )
  }
  return (
    <div>
      <Container maxWidth="md">
        <Details email={props.location.state.email}/>
                                {/* 
        <div
          style={{
            
            marginBottom: '30px',
            
          }}
        ></div> */}
        <PostGrid email={props.location.state.email}/>
      </Container>
    </div>
  )
}

export default Profile
