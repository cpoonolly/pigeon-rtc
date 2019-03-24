import React, { Component } from 'react';

// materialize
import { Row, Col, Button, TextInput } from 'react-materialize';

// web rtc stuff
import WebRTCVideo from '../WebRTCVideo/WebRTCVideo';
import WebRTCControlPanel from '../WebRTCControlPanel/WebRTCControlPanel';
import WebRTCConnectionManager from '../WebRTCConnectionManager';
import Input from 'react-materialize/lib/Input';

class WebRTCWithServerTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      serverUrl: null,
      isServerSet: false
    };

    this.rtcConnectionMngr = null; // new WebRTCConnectionManager();

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

  handleServerUrlChange(newText) {
    this.setState({serverUrl: newText});
  }

  handleSetServerClick() {
    this.rtcConnectionMngr = new WebRTCConnectionManager(this.state.serverUrl);
    this.setState({isServerSet: true});
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
    if (!this.state.isServerSet) {
      return (
        <Row>
          <Col s={6}>
            {/* WTF */}
            <input></input>
            {/* <TextInput label="Server Url" value={this.state.socketServerUrl} onChange={this.handleServerUrlChange}></TextInput> */}
          </Col>
          <Col s={6}>
            <Button onClick={this.handleSetServerClick}>Set</Button>
          </Col>
        </Row>
      );
    } else {
      return (
        <React.Fragment>
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
        </React.Fragment>
      );
    }
  }
}

export default WebRTCWithServerTab;
