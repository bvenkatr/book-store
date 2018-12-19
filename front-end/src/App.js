import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Books from "./components/Books";

class App extends Component {
  render() {
    return (
      <div className="App" style={{display:"flex"}}>
          <Books />
      </div>
    );
  }
}

export default App;
