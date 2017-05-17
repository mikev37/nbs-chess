import React from 'react';
import {Router, Route} from 'react-router';

import NotFound from './components/404.js.jsx';
import SignIn from './components/SignIn.js.jsx';
import CreateGame from './components/Create.js.jsx';
import User from './components/User.js.jsx';
import App from "./App.js";
import Game from "./components/Game.js.jsx";

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App}>
        <Route path="/game/:gameid" component={Game}/>
        <Route path="/user" component={User}/>
        <Route path="/new/game" component={CreateGame}/>
        <Route path="/sign-in" component={SignIn}/>
      
    </Route>
    
  </Router>
);
// <!--<Route path="*" component={NotFound}/>

export default Routes;