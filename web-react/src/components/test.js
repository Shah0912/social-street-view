import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const GET_IMAGE = gql`
  mutation test1($file: String, $id: String, $caption: String) {
    photo(file: $file, id: $id, caption: $caption) {
      url
      id
      caption
    }
  }
`

const ADD_IMAGE = gql`
  mutation test($id: String!, $caption: String!, $url: String!) {
    CreateImage(id: $id, caption: $caption, url: $url) {
      url
    }
  }
`
const t = () => {}

function Test() {
  let d = {}
  const [addImage] = useMutation(ADD_IMAGE)
  const [getImage, { loading, error, data }] = useMutation(GET_IMAGE)
  getImage({
    variables: {
      file: '/home/sarang/Desktop/t1.png',
      id: 't1',
      caption: 'this is a test file',
    },
  })

  if (loading) return <p>loading</p>
  if (error) return <p>error</p>
  else {
    //console.log(data)
    const d = data ? data.photo : false
    //console.log(d)
    //d = await data.photo
    d && addImage({ variables: { id: d.id, caption: d.caption, url: d.url } })
  }
  return (
    <div>
      <h1>test</h1>
    </div>
  )
}

export default Test
