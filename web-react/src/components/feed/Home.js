import React from 'react'
import Feed from './Feed'
import Header from '../Header'
import Sidebar from './Sidebar'
import './Home.css'
import {useAuth0} from '@auth0/auth0-react'

function Home() {
  const {isAuthenticated, user} = useAuth0();

  return (
    isAuthenticated &&
    <div className="home">
      <Sidebar />
      <Feed />
    </div>
    ||
    !isAuthenticated &&
    <div>Sign in to view</div> 
  )
}

export default Home
