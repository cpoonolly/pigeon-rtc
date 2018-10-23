import React, { Component } from 'react';
import { Row, Col, CardPanel } from 'react-materialize'
import WebRTCVideo from './WebRTCVideo/WebRTCVideo'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localVideoSrc: null,
      remoteVideoSrc: null
    };

    this.handleUserMedia = this.handleUserMedia.bind(this);
    this.handleUserMediaError = this.handleUserMediaError.bind(this);
  }

  componentDidMount() {
    navigator.getUserMedia({video: true}, this.handleUserMedia, this.handleUserMediaError);
  }

  handleUserMedia(stream) {
    this.setState({localVideoSrc: window.URL.createObjectURL(stream)});
  }

  handleUserMediaError() {
    console.error('Failed to get User Media');
  }

  render() {
    return (
      <div className="App">
        <Row>
          <Col s={6}>
            <CardPanel>
              <WebRTCVideo videoSrc={this.state.localVideoSrc}/>
            </CardPanel>
          </Col>
          <Col s={6}>
            <CardPanel>
              <WebRTCVideo videoSrc={this.state.remoteVideoSrc}/>
            </CardPanel>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
