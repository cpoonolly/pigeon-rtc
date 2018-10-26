import React, { Component } from 'react';
import { CardPanel } from 'react-materialize'

class WebRTCVideo extends Component {
  render() {
    return (
      <CardPanel>
        <h3>{this.props.videoName}</h3>
        <video src={this.props.videoSrc} autoPlay="true"></video>
      </CardPanel>
    );
  }
}

export default WebRTCVideo;
