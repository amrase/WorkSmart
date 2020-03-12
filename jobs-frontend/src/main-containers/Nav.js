import React, { useEffect } from 'react'
import LoginMenu from './LoginMenu'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { useState } from 'react';


export default function Nav(props) {

    const handleLogout = () => {
        props.setLoggedIn(null)
    }

    const genProfileLink = () => {
        if(props.loggedIn){
            if(props.loggedIn.type == "user"){
                return <Link to={`/users/${props.loggedIn.id}`}><Button>Profile</Button></Link>
            } else if(props.loggedIn.type == "company"){
                return <Link to={`/company/${props.loggedIn.id}`}><Button>Company</Button></Link>
           
            } else {
                return null
            }
        } else {
            return null
        }
    }

 
  
    return (
        <div className="navbar">
          <h3>WORK-SMART</h3>
          {/* <button onClick={props.toggleLoggingIn}>{props.loggingIn ? "Main Menu" : "Login" }</button>  */}
            <div><Link to="/"><Button>Home</Button></Link></div>
            <div><Link to={props.loggedIn ? "/" : "/login"} onClick={props.loggedIn ? handleLogout : null}><Button>{props.loggedIn ? "Logout" : "Login"}</Button></Link></div>
            {/* <div><Link to="/jobs"><Button>Jobs</Button></Link></div> */}
            <div><Link to="/companies"><Button>Companies</Button></Link></div>
          

        
            {genProfileLink()}
         
        </div>

    )
}
