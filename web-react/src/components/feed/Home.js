//This is the first page that the user views after logging in.

import React from 'react'
import Feed from './Feed'
import Header from '../Header'
import Sidebar from './Sidebar'
import Landing from './Landing'
import './Home.css'
import {useAuth0} from '@auth0/auth0-react'

function Home() {
  const {isAuthenticated, user} = useAuth0();
  //isAuthenticated is a flag that shows if the user is logged in.

  return (
    // if user is authenticated Show them the home page
    (isAuthenticated && (
      <div className="home">
        {/* Load the sidebar (suggestions) */}
        <Sidebar />
        {/* Load the feed */}
        <Feed />
      </div>
    )) ||
    (!isAuthenticated && (
      // if User is not logged in take them back to landing page.
      <div>
        <Landing  />
      </div>
    ))
  )
}

export default Home
