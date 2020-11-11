import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Login from './components/Login';
import FriendsList from './components/FriendsList';
import PrivateRoute from './components/PrivateRoute';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="links">
          <Link to='/login'>Login</Link>
          <Link to='/friends-list'>Friends</Link>
        </div>
        <Switch>

          <PrivateRoute path="/friends-list" component={FriendsList}/>
          <Route exact path='/login' component={Login} />
          <Route component={Login} />

        </Switch>
      </div>
    </Router>

  );
}

export default App;

// i<3Lambd4
