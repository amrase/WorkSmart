import React, {useState, useEffect} from 'react';
import Nav from './main-containers/Nav'
import LoginMenu from './main-containers/LoginMenu'
import Content from './content/Content';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

function App() {



  const [loggedIn, setLoggedIn] = useState(null)

  

  return (
    <Router>
    <div>
      <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <Content loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
    </div>
    </Router>
  );
}

export default App;
