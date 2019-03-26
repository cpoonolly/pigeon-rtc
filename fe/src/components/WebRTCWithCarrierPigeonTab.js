import React, { Component } from 'react';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';

// web rtc stuff
import WebRTCVideo from './WebRTCVideo';
import LocalConnectionTextField from './LocalConnectionTextField';
import RemoteConnectionTextField from './RemoteConnectionTextField';
import PigeonRTCConnectionMngr from '../connectionManagers/PigeonRTCConnectionMngr';
import Disclaimer from './Disclaimer';

const styles = ((theme) => ({
  root: {
    padding: '20px',
  },
  videoChatSection: {
    marginBottom: '30px',
  },
  videoChatContainer: {
    minWidth: `${WebRTCVideo.MIN_WIDTH + 50}px`,
  },
  startOrAcceptFormLabel: {
    marginBottom: '20px',
  },
  offerAnswerInputContainer: {
    width: '100%',
    marginBottom: '30px',
  },
}));

class WebRTCWithCarrierPigeonTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startOrAccept: null,
      isConnected: false,
      localConnectionData: '',
      remoteConnectionData: ''
    };

    this.rtcConnectionMngr = new PigeonRTCConnectionMngr();
    this.rtcConnectionMngr.subscribe((localConnectionData) => this.handleLocalConnectionData(localConnectionData));

    // since we're using MediaStream objects need to store these as members and user refs to set the video src's
    this.localVideoStream = null;
    this.localVideoEl = null;
    
    this.remoteVideoStream = null;
    this.remoteVideoEl = null;

    this.setLocalVideoEl = this.setLocalVideoEl.bind(this);
    this.setRemoteVideoEl = this.setRemoteVideoEl.bind(this);
  }

  setLocalVideoEl(el) {
    this.localVideoEl = el;

    this.rtcConnectionMngr.getLocalMediaStream()
      .then((mediaStream) => this.localVideoStream = mediaStream)
      .then(() => {
        if (this.localVideoEl) this.localVideoEl.srcObject = this.localVideoStream;
      });
  }

  setRemoteVideoEl(el) {
    this.remoteVideoEl = el;

    this.rtcConnectionMngr.getRemoteMediaStream()
      .then((mediaStream) => this.remoteVideoStream = mediaStream)
      .then(() => {
        if (this.remoteVideoEl) this.remoteVideoEl.srcObject = this.remoteVideoStream;
      });
  }

  handleLocalConnectionData(localConnectionData) {
    this.setState({localConnectionData});
  }

  handleRemoteConnectionData(remoteConnectionData) {
    this.setState({remoteConnectionData});
  }

  handleStartOrAcceptSelection(startOrAccept) {
    this.setState({startOrAccept});
    if (startOrAccept === 'start') {
      this.rtcConnectionMngr.createOffer();
    }
  }

  handleConnectBtnClick() {
    const remoteConnectionData = JSON.parse(this.state.remoteConnectionData);

    try {
      if (this.state.startOrAccept === 'start') {
        this.rtcConnectionMngr.handleAnswer(remoteConnectionData)
          .then(() => this.setState({isConnected: true}));
      } else if (this.state.startOrAccept === 'accept') {
        this.rtcConnectionMngr.handleOffer(remoteConnectionData)
          .then(() => this.setState({isConnected: true}));
      }
    } catch (error) {
      console.error(error);
    }
  }

  renderSetupConnectionUI() {
    const { startOrAccept } = this.state;
    const { classes } = this.props;

    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          {this.renderStartOrAcceptConnectionRadioGroup()}
        </Grid>
        <Grid item className={classes.offerAnswerInputContainer}>
          {startOrAccept && this.renderOfferAnswerFields()}
        </Grid>
        <Grid item>
          {startOrAccept && this.renderConnectBtn()}
        </Grid>
        <Grid item>
          {startOrAccept && <Disclaimer></Disclaimer>}
        </Grid>
      </Grid>
    )
  }

  renderStartOrAcceptConnectionRadioGroup() {
    const { startOrAccept } = this.state;
    const { classes } = this.props;

    return (
      <FormControl component="fieldset">
        <FormLabel component="legend" className={classes.startOrAcceptFormLabel}>
          <Typography variant="h5">
            Setup a WebRTC connection via Carrier Pigeon
          </Typography>
          <Typography variant="subtitle1">
            now compatible with smoke signals &amp; messages in a bottle!
          </Typography>
          <Typography variant="caption">
            Note: Connections can be setup via pigeon or like literally anything else...
          </Typography>
        </FormLabel>
        <RadioGroup
          row
          name="start_or_accept"
          value={startOrAccept}
          onChange={(event) => this.handleStartOrAcceptSelection(event.target.value)}
          style={{display: 'flex', justifyContent: 'space-evenly'}}
        >
          <FormControlLabel
            value="start"
            control={<Radio />}
            label="Start a Connection"
            disabled={startOrAccept !== null}
          />
          <FormControlLabel
            value="accept"
            control={<Radio />}
            label="Accept a Connection"
            disabled={startOrAccept !== null}
          />
        </RadioGroup>
      </FormControl>
    );
  }

  renderConnectBtn() {
    const { startOrAccept, localConnectionData, remoteConnectionData, isConnected } = this.state;
    const { classes } = this.props;

    let isDisabled = true;
    if (startOrAccept === 'start') {
      isDisabled = (!localConnectionData || !remoteConnectionData || isConnected)
    } else if (startOrAccept === 'accept') {
      isDisabled = (!remoteConnectionData || isConnected);
    }

    return (
      <Button
        disabled={isDisabled}
        variant="contained"
        color="primary"
        className={classes.startOrAcceptConnectBtn}
        onClick={() => this.handleConnectBtnClick()}
      >
        Connect
      </Button>
    );
  }

  renderOfferAnswerFields() {
    const { startOrAccept, localConnectionData, remoteConnectionData } = this.state;
    const { classes } = this.props;

    let remoteConnectionTextField = (
      <RemoteConnectionTextField
        remoteConnectionData={remoteConnectionData}
        onChange={(newVal) => this.handleRemoteConnectionData(newVal)}
      ></RemoteConnectionTextField>
    );

    let localConnectionTextField = (
      <LocalConnectionTextField 
        localConnectionData={localConnectionData}
      ></LocalConnectionTextField>
    );

    return (
      <Grid container spacing={16} justify="space-evenly">
        <Grid item xs={6}>
          {startOrAccept === 'start' && localConnectionTextField}
          {startOrAccept === 'accept' && remoteConnectionTextField}
        </Grid>
        <Grid item xs={6}>
          {startOrAccept === 'start' && remoteConnectionTextField}
          {startOrAccept === 'accept' && localConnectionData && localConnectionTextField}
        </Grid>
      </Grid>
    );
  }

  renderVideoChatUI() {
    const { classes } = this.props;

    return (
      <Grid container spacing={16} direction="row" justify="center" className={classes.videoChatSection}>
        <Grid item xs={6} className={classes.videoChatContainer}>
          <WebRTCVideo videoName="Local" videoRef={this.setLocalVideoEl} muted={true}/>
        </Grid>
        <Grid item xs={6} className={classes.videoChatContainer}>
          <WebRTCVideo videoName="Remote" videoRef={this.setRemoteVideoEl}/>
        </Grid>
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.renderVideoChatUI()}
        {this.renderSetupConnectionUI()}
      </div>
    );
  }
}

export default withStyles(styles)(WebRTCWithCarrierPigeonTab);