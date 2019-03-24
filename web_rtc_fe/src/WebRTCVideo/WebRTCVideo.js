import React, { Component } from 'react';
import { CardPanel } from 'react-materialize'

class WebRTCVideo extends Component {
  render() {
    return (
      <CardPanel>
        <h3>{this.props.videoName}</h3>
        <video ref={this.props.videoRef} autoPlay="true"></video>
      </CardPanel>
    );
  }
}

export default WebRTCVideo;
