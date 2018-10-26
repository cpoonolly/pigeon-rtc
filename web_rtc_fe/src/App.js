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

    this.state = {
      localVideoSrc: null,
      remoteVideoSrc: null
    };

    this.rtcConnectionMngr = new WebRTCConnectionManager();

    this.handleCallStart = this.handleCallStart.bind(this);
    this.handleCallEnd = this.handleCallEnd.bind(this);
  }

  componentDidMount() {
    console.log('component did mount');
    
    this.rtcConnectionMngr.getLocalMediaStreamURL()
      .then((localMediaStreamURL) => this.setState({localVideoSrc: localMediaStreamURL}));
    this.rtcConnectionMngr.getRemoteMediaStreamURL()
      .then((remoteMediaStreamURL) => {
        console.log(`remoteMediaStreamURL: ${remoteMediaStreamURL}`);
        this.setState({remoteVideoSrc: remoteMediaStreamURL});
      });
  }

  handleCallStart() {
    console.log('Call Started!');

    this.rtcConnectionMngr.call();
  }

  handleCallEnd() {
    console.log('Call Ended!');

    console.log('...no it didn\'t...');
  }

  render() {
    return (
      <div className="App">
        <Row>
          <Col s={6}>
            <WebRTCVideo videoName="Local" videoSrc={this.state.localVideoSrc}/>
          </Col>
          <Col s={6}>
            <WebRTCVideo videoName="Remote" videoSrc={this.state.remoteVideoSrc}/>
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
