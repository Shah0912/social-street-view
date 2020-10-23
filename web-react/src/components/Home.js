import React from 'react'
import Feed from './Feed'
import Header from './Header'
import Sidebar from './Sidebar'
import "./Home.css";

function Home() {
    return (
        <div className="home">

            <Sidebar />    
            <Feed />
            
        </div>
    )
}

export default Home;
