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
  constructor() {
    super();
  }


  componentDidMount() {


    console.log('mounted')
    this.socket = new WebSocket("ws://127.0.0.1:8000/game/");
    
    this.socket.addEventListener('message', function (event) {
      console.log('Message from server ', event.data);
      // debugger;
    });
    
    // this.socket.addEventListener('open', function (event) {
    //   this.send('ABC');
    // })
    // while (!this.socket.readyState) {
    //   debugger;
    // }
    // this.socket.send('ABC');
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/:id/" component={GamePage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    )}
}

export default App;
