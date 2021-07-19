import logo from './logo.svg';
import React from 'react';
import { io } from "socket.io-client";
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    const socket = new WebSocket("ws://127.0.0.1:8001/game/");
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    )}
}

export default App;
