import React from 'react'
var Sentiment = require('sentiment')

const sentiment = new Sentiment()

function Test1() {
  const res = sentiment.analyze('this is pathetic')
  console.log(res)
  return (
    <div>
      <p1>{res.score}</p1>
    </div>
  )
}

export default Test1
