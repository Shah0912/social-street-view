import React from 'react'
import PostGrid from './PostGrid'
import Details from './Details'
import { Container } from '@material-ui/core'
function Profile() {
  return (
    <div>
      <Container maxWidth="md">
        <Details />
        <div
          style={{
            marginTop: '30px',
            marginBottom: '30px',
            borderBottom: '1px solid #999',
          }}
        ></div>
        <PostGrid />
      </Container>
    </div>
  )
}

export default Profile
