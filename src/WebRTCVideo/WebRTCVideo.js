import React, { Component } from 'react';

class WebRTCVideo extends Component {
  render() {
    return (
      <video src={this.props.videoSrc} autoplay="true"></video>
    );
  }
}

export default WebRTCVideo;
