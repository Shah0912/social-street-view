import React from 'react'
import { GridList, GridListTile, Grid } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import { useQuery, gql } from '@apollo/client'
//import withWidth, { isWidthUp } from '@material-ui/core/withWidth'

const GET_DATA_QUERY = gql`
  {
    User(name: "Aditya Shah") {
      posted {
        has_image {
          url
        }
      }
    }
  }
`

function PostGrid(props) {
  const { loading, error, data } = useQuery(GET_DATA_QUERY)
  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>

  console.log(data.User[0].posted[1].has_image[0].url)
  const url = data.User[0].posted[1].has_image[0].url
  /*     'https://images.unsplash.com/photo-1495615080073-6b89c9839ce0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=822&q=80'
   */
  return (
    <GridList cellHeight={293} cols={3} style={{ justifyContent: 'center' }}>
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
      </GridListTile>
      <GridListTile style={{ height: '100%' }}>
        <img src={url} alt="f" style={{ width: '100%' }} />
      </GridListTile>
      <GridListTile style={{ height: '100%' }}>
        <img src={url} alt="f" style={{ width: '100%' }} />
      </GridListTile>
    </GridList>
  )
}
export default PostGrid
