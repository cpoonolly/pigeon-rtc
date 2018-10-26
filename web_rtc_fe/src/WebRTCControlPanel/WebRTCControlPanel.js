import React, { Component } from 'react';
import { CardPanel, Button, Icon } from 'react-materialize'

class WebRTCControlPanel extends Component {

  render() {
    return (
      <CardPanel>
        <Button onClick={() => this.props.handleCallStart()}>Call<Icon left>call</Icon></Button>
        <Button onClick={() => this.props.handleCallEnd()}>End Call<Icon left>call_end</Icon></Button>
      </CardPanel>
    );
  }
}

export default WebRTCControlPanel;
