import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/Header'
import Profile from './components/profile/Profile'
import Home from './components/feed/Home'
import Map from './components/social_street_view/Map'
import Upload from './components/data_aquisition/Upload'
import Ipost from './components/individual_post/Ipost'
import Sentiment from './components/sentiment/Sentiment'
import {useAuth0} from '@auth0/auth0-react'
import Test from './components/test'
import UploadFile from './components/data_aquisition/UploadFile'

export default function App() {

  // const {loginWithRedirect, logout, isAuthenticated} = useAuth0();

  return (
    <React.Fragment>
      <Router>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/street_view" component={Map} />
        <Route path="/profile" component={Profile} />
        <Route path="/sentiment" component={Sentiment} />
        <Route path="/test" component={Test} />
        {/* <Route path="/upload" component={UploadFile} /> */}
        <Route path="/upload" component={Upload} />
        <Route path="/post" component={Ipost} />
        {/* <Upload /> */}
        {/* <Ipost /> */}
      </Router>
    </React.Fragment>
  )
}

