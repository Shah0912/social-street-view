import React from 'react'
import { GridList, GridListTile, Grid } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import { useQuery, gql } from '@apollo/client'
import {useAuth0} from '@auth0/auth0-react'

//import withWidth, { isWidthUp } from '@material-ui/core/withWidth'

const GET_DATA_QUERY = gql`
  query getPost($email:String!){
  User(email:$email)
  {

    posted
    {
      has_image
      {
        url
      },
      has_video
      {
        url
      },
      has_text
      {
        url
      }
    }
  }
}
`

function PostGrid({email}) {
  const {isAuthenticated, user} = useAuth0();
  console.log("{email} = ",{email}, "email = ", email);
  const { loading, error, data } = useQuery(GET_DATA_QUERY,{variables:{email:email.email}});
  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>

  //const url = data.User[0].posted[1].has_image[0].url
  /*     'https://images.unsplash.com/photo-1495615080073-6b89c9839ce0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=822&q=80'
   */
  const posts = data.User[0].posted.map(post => {
    if(post.has_image.length)
    {
      const url = post.has_image[0].url
      return(
        <GridListTile style={{ height: '100%' }}>
        <img src={url} alt="f" style={{ width: '100%' }} />
      </GridListTile>
      )
    }
    if(post.has_video.length)
    {
      const url = post.has_video[0].url
      return(
        <GridListTile style={{ height: '100%' }}>
        <img src={url} alt="f" style={{ width: '100%' }} />
      </GridListTile>
      )
    }
    if(post.has_text.length)
    {
      const url = post.has_text[0].url
      return(
        <GridListTile style={{ height: '100%' }}>
        <img src={url} alt="f" style={{ width: '100%' }} />
      </GridListTile>
      )
    }
    console.log(post)
  })
  return (
    <GridList cellHeight={293} cols={3} style={{ justifyContent: 'center' }}>
      {posts}
      {/* <GridListTile style={{ height: '100%' }}>
        <img src={url} alt="f" style={{ width: '100%' }} />
      </GridListTile> */
      /* <GridListTile style={{ height: '100%' }}>
        <img src={url} alt="f" style={{ width: '100%' }} />
      </GridListTile>
      <GridListTile style={{ height: '100%' }}>
        <img src={url} alt="f" style={{ width: '100%' }} />
      </GridListTile>
      <GridListTile style={{ height: '100%' }}>
        <img src={url} alt="f" style={{ width: '100%' }} />
      </GridListTile>
      <GridListTile style={{ height: '100%' }}>
        <img src={url} alt="f" style={{ width: '100%' }} />
      </GridListTile>
      <GridListTile style={{ height: '100%' }}>
        <img src={url} alt="f" style={{ width: '100%' }} />
      </GridListTile>
      <GridListTile style={{ height: '100%' }}>
        <img src={url} alt="f" style={{ width: '100%' }} />
      </GridListTile>
      <GridListTile style={{ height: '100%' }}>
        <img src={url} alt="f" style={{ width: '100%' }} />
      </GridListTile>
      <GridListTile style={{ height: '100%' }}>
        <img src={url} alt="f" style={{ width: '100%' }} />
      </GridListTile>
      <GridListTile style={{ height: '100%' }}>
        <img src={url} alt="f" style={{ width: '100%' }} />
      </GridListTile>
      <GridListTile style={{ height: '100%' }}>
        <img src={url} alt="f" style={{ width: '100%' }} />
      </GridListTile>
      <GridListTile style={{ height: '100%' }}>
        <img src={url} alt="f" style={{ width: '100%' }} />
      </GridListTile>
      <GridListTile style={{ height: '100%' }}>
        <img src={url} alt="f" style={{ width: '100%' }} />
      </GridListTile>
      <GridListTile style={{ height: '100%' }}>
        <img src={url} alt="f" style={{ width: '100%' }} />
      </GridListTile>
      <GridListTile style={{ height: '100%' }}>
        <img src={url} alt="f" style={{ width: '100%' }} />
      </GridListTile>
      <GridListTile style={{ height: '100%' }}>
        <img src={url} alt="f" style={{ width: '100%' }} />
      </GridListTile>
      <GridListTile style={{ height: '100%' }}>
        <img src={url} alt="f" style={{ width: '100%' }} />
      </GridListTile>
      <GridListTile style={{ height: '100%' }}>
        <img src={url} alt="f" style={{ width: '100%' }} />
      </GridListTile>
      <GridListTile style={{ height: '100%' }}>
        <img src={url} alt="f" style={{ width: '100%' }} />
      </GridListTile>
      <GridListTile style={{ height: '100%' }}>
        <img src={url} alt="f" style={{ width: '100%' }} />
      </GridListTile>
      <GridListTile style={{ height: '100%' }}>
        <img src={url} alt="f" style={{ width: '100%' }} />
      </GridListTile>
      <GridListTile style={{ height: '100%' }}>
        <img src={url} alt="f" style={{ width: '100%' }} />
      </GridListTile>
      <GridListTile style={{ height: '100%' }}>
        <img src={url} alt="f" style={{ width: '100%' }} />
      </GridListTile>
      <GridListTile style={{ height: '100%' }}>
        <img src={url} alt="f" style={{ width: '100%' }} />
      </GridListTile> */}
    </GridList>
  )
}
export default PostGrid
