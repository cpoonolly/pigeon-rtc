import React, { Component } from 'react';
import './App.css';

// materialize
import { Row, Col } from 'react-materialize';
// web rtc stuff
import WebRTCVideo from './WebRTCVideo/WebRTCVideo';
import WebRTCControlPanel from './WebRTCControlPanel/WebRTCControlPanel';
import WebRTCConnectionManager from './WebRTCConnectionManager';

class App extends Component {
  constructor(props) {
    super(props);

    this.rtcConnectionMngr = new WebRTCConnectionManager();

    // since we're using MediaStream objects need to store these as members and user refs to set the video src's
    this.localVideoStream = null;
    this.localVideoEl = null;
    
    this.remoteVideoStream = null;
    this.remoteVideoEl = null;

    this.handleCallStart = this.handleCallStart.bind(this);
    this.handleCallEnd = this.handleCallEnd.bind(this);

    this.setLocalVideoEl = this.setLocalVideoEl.bind(this);
    this.setRemoteVideoEl = this.setRemoteVideoEl.bind(this);
  }

  handleCallStart() {
    console.log('Call Started!');

    this.rtcConnectionMngr.call();
  }

  handleCallEnd() {
    console.log('Call Ended!');

    console.log('...no it didn\'t...');
  }

  setLocalVideoEl(el) {
    this.localVideoEl = el;

    this.rtcConnectionMngr.getLocalMediaStream()
      .then((mediaStream) => this.localVideoStream = mediaStream)
      .then(() => this.localVideoEl.srcObject = this.localVideoStream);
  }

  setRemoteVideoEl(el) {
    this.remoteVideoEl = el;

    this.rtcConnectionMngr.getRemoteMediaStream()
      .then((mediaStream) => this.remoteVideoStream = mediaStream)
      .then(() => this.remoteVideoEl.srcObject = this.remoteVideoStream);
  }

  render() {
    return (
      <div className="App">
        <Row>
          <Col s={6}>
            <WebRTCVideo videoName="Local" videoRef={this.setLocalVideoEl}/>
          </Col>
          <Col s={6}>
            <WebRTCVideo videoName="Remote" videoRef={this.setRemoteVideoEl}/>
          </Col>
        </Row>
        <Row>
          <WebRTCControlPanel handleCallStart={this.handleCallStart} handleCallEnd={this.handleCallEnd}></WebRTCControlPanel>
        </Row>
      </div>
    );
  }
}

export default App;
