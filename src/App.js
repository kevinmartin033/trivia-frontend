import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/:id/" component={GamePage}/>
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    )}
}

export default App;
