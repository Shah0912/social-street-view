import React from 'react'
import { GridList, GridListTile } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
//import withWidth, { isWidthUp } from '@material-ui/core/withWidth'

function PostGrid(props) {
  console.log(props.width)
  const url =
    'https://images.unsplash.com/photo-1495615080073-6b89c9839ce0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=822&q=80'

  return (
    <GridList cellHeight={293} cols={3} style={{ justifyContent: 'center' }}>
      <GridListTile>
        <img src={url} alt="f" />
      </GridListTile>
      <GridListTile>
        <img src={url} alt="f" />
      </GridListTile>
      <GridListTile>
        <img src={url} alt="f" />
      </GridListTile>
      <GridListTile>
        <img src={url} alt="f" />
      </GridListTile>
      <GridListTile>
        <img src={url} alt="f" />
      </GridListTile>
      <GridListTile>
        <img src={url} alt="f" />
      </GridListTile>
      <GridListTile>
        <img src={url} alt="f" />
      </GridListTile>
      <GridListTile>
        <img src={url} alt="f" />
      </GridListTile>
      <GridListTile>
        <img src={url} alt="f" />
      </GridListTile>
      <GridListTile>
        <img src={url} alt="f" />
      </GridListTile>
      <GridListTile>
        <img src={url} alt="f" />
      </GridListTile>
      <GridListTile>
        <img src={url} alt="f" />
      </GridListTile>
      <GridListTile>
        <img src={url} alt="f" />
      </GridListTile>
      <GridListTile>
        <img src={url} alt="f" />
      </GridListTile>
      <GridListTile>
        <img src={url} alt="f" />
      </GridListTile>
      <GridListTile>
        <img src={url} alt="f" />
      </GridListTile>
      <GridListTile>
        <img src={url} alt="f" />
      </GridListTile>
      <GridListTile>
        <img src={url} alt="f" />
      </GridListTile>
      <GridListTile>
        <img src={url} alt="f" />
      </GridListTile>
      <GridListTile>
        <img src={url} alt="f" />
      </GridListTile>
      <GridListTile>
        <img src={url} alt="f" />
      </GridListTile>
      <GridListTile>
        <img src={url} alt="f" />
      </GridListTile>
      <GridListTile>
        <img src={url} alt="f" />
      </GridListTile>
      <GridListTile>
        <img src={url} alt="f" />
      </GridListTile>
    </GridList>
  )
}
export default PostGrid
