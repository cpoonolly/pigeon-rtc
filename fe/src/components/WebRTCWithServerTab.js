import React, { Component } from 'react';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

// web rtc stuff
import WebRTCVideo from './WebRTCVideo';
import WebRTCConnectionManager from '../connectionManagers/WebRTCConnectionManager';

// uuid
import uuid from 'uuid/v4';

const DEFAULT_SOCKET_URL = 'https://api.cpoonolly.com:3001';

const styles = ((theme) => ({
  uiContainer: {
    height: '100%',
    padding: '100px',
  },
  doublePadded: {
    padding: theme.spacing.unit * 2,
  },
  controlPanelBtnContainer: {
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
  },
  controlPanelBtn: {
    width: '100%',
    height: '100%',
  },
  controlPanelBtnIcon: {
    marginLeft: '15px'
  },
}));

class WebRTCWithServerTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      serverUrl: DEFAULT_SOCKET_URL,
      roomUuid: uuid(),
      isConnected: false
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
    this.handleConnectClick = this.handleConnectClick.bind(this);

    this.setLocalVideoEl = this.setLocalVideoEl.bind(this);
    this.setRemoteVideoEl = this.setRemoteVideoEl.bind(this);
  }

  handleServerUrlChange(newText) {
    this.setState({serverUrl: newText});
  }

  handleRoomUuidChange(newText) {
    this.setState({roomUuid: newText});
  }

  handleConnectClick() {
    this.rtcConnectionMngr = new WebRTCConnectionManager(this.state.serverUrl, this.state.roomUuid);
    this.setState({isConnected: true});
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

  renderSetConnectionUI() {
    const { classes } = this.props;

    return (
      <Grid container spacing={12} className={classes.uiContainer} justify="center" alignItems="stretch">
        {/* <Grid item xs={3}>
          <TextField
            label="Server Url"
            fullWidth
            value={this.state.serverUrl}
            onChange={(event) => this.handleServerUrlChange(event.target.value)}
          />
        </Grid> */}
        <Grid item xs={3}>
          <TextField
            label="Room ID"
            fullWidth
            value={this.state.roomUuid}
            onChange={(event) => this.handleRoomUuidChange(event.target.value)}
          />
        </Grid>
        <Grid item xs={1} className={classes.doublePadded}>
          <Button variant="contained" color="primary" onClick={this.handleConnectClick}>Connect</Button>
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
            {this.renderVideoChatUIControlPanel()}
          </Grid>
        </Grid>
      </div>
    );
  }

  renderVideoChatUIControlPanel() {
    const { classes } = this.props;
  
    return (
      <Card>
        <CardContent>  
          <Grid container spacing={12} justify="space-evenly" alignItems="center">
            <Grid item xs={4} className={classes.controlPanelBtnContainer}>
              <Button variant="contained" color="primary" className={classes.controlPanelBtn} onClick={() => this.handleCallStart()}>
                Call <Icon className={classes.controlPanelBtnIcon}>call</Icon>
              </Button>
            </Grid>
            <Grid item xs={4} className={classes.controlPanelBtnContainer}>
              <Button variant="contained" color="primary" className={classes.controlPanelBtn} onClick={() => this.handleCallEnd()}>
                End Call <Icon className={classes.controlPanelBtnIcon}>call_end</Icon>
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }

  render() {
    return (!this.state.isConnected ? this.renderSetConnectionUI() : this.renderVideoChatUI());
  }
}

export default withStyles(styles)(WebRTCWithServerTab);
