import React, { Component } from 'react';
import './App.css';

// web rtc stuff
import WebRTCWithServerTab from './WebRTCWithServerTab/WebRTCWithServerTab';


class App extends Component {
  render() {
    return (
      <div className="App">
        <WebRTCWithServerTab></WebRTCWithServerTab>
      </div>
    );
  }
}

export default App;
