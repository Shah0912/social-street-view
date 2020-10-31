import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/Header'
import Profile from './components/profile/Profile'
import Home from './components/feed/Home'
import Map from './components/social_street_view/Map'
import Sentiment from './components/sentiment/Sentiment'

export default function App() {
  return (
    <React.Fragment>
      <Router>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/street_view" component={Map} />
        <Route path="/profile" component={Profile} />
        <Route path="/sentiment" component={Sentiment} />
      </Router>
    </React.Fragment>
  )
}

