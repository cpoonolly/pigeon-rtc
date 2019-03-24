import React, { Component } from 'react';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// web rtc stuff
import WebRTCVideo from '../WebRTCVideo/WebRTCVideo';
import WebRTCControlPanel from '../WebRTCControlPanel/WebRTCControlPanel';
import WebRTCConnectionManager from '../WebRTCConnectionManager';

const DEFAULT_SOCKET_URL = 'http://localhost:8080';

const styles = ((theme) => ({
  uiContainer: {
    height: '100%',
    padding: '100px',
  },
  doublePadded: {
    padding: theme.spacing.unit * 2,
  },
}));

class WebRTCWithServerTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      serverUrl: DEFAULT_SOCKET_URL,
      isServerSet: false
    };

    this.rtcConnectionMngr = null;

    // since we're using MediaStream objects need to store these as members and user refs to set the video src's
    this.localVideoStream = null;
    this.localVideoEl = null;
    
    this.remoteVideoStream = null;
    this.remoteVideoEl = null;

    this.handleCallStart = this.handleCallStart.bind(this);
    this.handleCallEnd = this.handleCallEnd.bind(this);
    this.handleServerUrlChange = this.handleServerUrlChange.bind(this);
    this.handleSetServerClick = this.handleSetServerClick.bind(this);

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

  renderSetServerUI() {
    const { classes } = this.props;

    return (
      <Grid container spacing={12} className={classes.uiContainer} justify="center" alignItems="stretch">
        <Grid item xs={4}>
          <TextField
            label="Server Url"
            fullWidth
            value={this.state.serverUrl}
            onChange={(event) => this.handleServerUrlChange(event.target.value)}
          />
        </Grid>
        <Grid item xs={4} className={classes.doublePadded}>
          <Button variant="contained" color="primary" onClick={this.handleSetServerClick}>Connect</Button>
        </Grid>
      </Grid>
    );
  }

  renderVideoChatUI() {
    const { classes } = this.props;

    return (
      <div className={classes.uiContainer}>
        <Grid container spacing={12} justify="center" alignItems="stretch">
          <Grid item xs={6} className={classes.doublePadded}>
            <WebRTCVideo videoName="Local" videoRef={this.setLocalVideoEl}/>
          </Grid>
          <Grid item xs={6} className={classes.doublePadded}>
            <WebRTCVideo videoName="Remote" videoRef={this.setRemoteVideoEl}/>
          </Grid>
        </Grid>
        <Grid container spacing={12} justify="center" className={classes.doublePadded}>
          <Grid item xs={6}>
            <WebRTCControlPanel handleCallStart={this.handleCallStart} handleCallEnd={this.handleCallEnd}></WebRTCControlPanel>
          </Grid>
        </Grid>
      </div>
    );
  }

  render() {
    return (!this.state.isServerSet ? this.renderSetServerUI() : this.renderVideoChatUI());
  }
}

export default withStyles(styles)(WebRTCWithServerTab);
