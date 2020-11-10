import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/Header'
import Profile from './components/profile/Profile'
import Home from './components/feed/Home'
import Map from './components/social_street_view/Map'
import Upload from './components/data_aquisition/Upload'
import Ipost from './components/individual_post/Ipost'
import Sentiment from './components/sentiment/Sentiment'
import Test from './components/test'

export default function App() {
  return (
    <React.Fragment>
      <Router>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/street_view" component={Map} />
        <Route path="/profile" component={Profile} />
        <Route path="/sentiment" component={Sentiment} />
<<<<<<< HEAD
        <Route path="/test" component={Test} />
=======
        <Route path="/upload" component={Upload} />
        <Route path="/post" component={Ipost} />
>>>>>>> cda8b70f7dd1c4601e0721a215f392fff0ecaee0
        {/* <Upload /> */}
        {/* <Ipost /> */}
      </Router>
    </React.Fragment>
  )
}

