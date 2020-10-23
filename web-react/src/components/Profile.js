import React from 'react'
import PostGrid from './PostGrid'
import Details from './Details'
import { Container } from '@material-ui/core'
function Profile() {
  return (
    <div>
      <Container maxWidth="md">
        <Details />
                                {/* 
        <div
          style={{
            
            marginBottom: '30px',
            
          }}
        ></div> */}
        <PostGrid />
      </Container>
    </div>
  )
}

export default Profile
