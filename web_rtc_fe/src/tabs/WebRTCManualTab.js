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


// web rtc stuff
import WebRTCVideo from '../components/WebRTCVideo';
import ManualWebRTCConnectionManager from '../connectionManagers/ManualWebRTCConnectionManager';

const styles = ((theme) => ({
  root: {
    padding: '20px',
  },
  videoChatContainer: {
    paddingBottom: '30px',
  },
  startOrAcceptFormLabel: {
    marginBottom: '20px',
  },
  offerAnswerInputContainer: {
    width: '100%',
    marginBottom: '30px',
  },
  offerAnswerInput: {
    width: '100%'
  },
  doublePadded: {
    padding: theme.spacing.unit * 2,
  },
}));

class WebRTCManualTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startOrAccept: null,
      isConnected: false,
      localConnectionData: '',
      remoteConnectionData: '',
    };

    this.rtcConnectionManager = new ManualWebRTCConnectionManager();
    this.rtcConnectionManager.subscribe((localConnectionData) => this.handleLocalConnectionData(localConnectionData));

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

    this.rtcConnectionManager.getLocalMediaStream()
      .then((mediaStream) => this.localVideoStream = mediaStream)
      .then(() => {
        if (this.localVideoEl) this.localVideoEl.srcObject = this.localVideoStream;
      });
  }

  setRemoteVideoEl(el) {
    this.remoteVideoEl = el;

    this.rtcConnectionManager.getRemoteMediaStream()
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
      this.rtcConnectionManager.createOffer();
    }
  }

  handleConnectBtnClick() {
    const remoteConnectionData = JSON.parse(this.state.remoteConnectionData);

    try {
      if (this.state.startOrAccept === 'start') {
        this.rtcConnectionManager.handleAnswer(remoteConnectionData)
          .then(() => this.setState({isConnected: true}));
      } else if (this.state.startOrAccept === 'accept') {
        this.rtcConnectionManager.handleOffer(remoteConnectionData)
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
      </Grid>
    )
  }

  renderStartOrAcceptConnectionRadioGroup() {
    const { startOrAccept } = this.state;
    const { classes } = this.props;

    return (
      <FormControl component="fieldset">
        <FormLabel component="legend" className={classes.startOrAcceptFormLabel}>
          Start or Accept a WebRTC Connection manually
        </FormLabel>
        <RadioGroup
          row
          name="start_or_accept"
          value={startOrAccept}
          onChange={(event) => this.handleStartOrAcceptSelection(event.target.value)}
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
      <TextField
        label={`${startOrAccept === 'start' ? 'Answer' : 'Offer'} - Get this from your friend!`}
        onChange={(event) => this.handleRemoteConnectionData(event.target.value)}
        value={remoteConnectionData}
        multiline
        rows="1"
        margin="normal"
        variant="outlined"
        className={classes.offerAnswerInput}
      />
    );

    let localConnectionTextField = (
      <TextField
        label={`${startOrAccept === 'start' ? 'Offer' : 'Answer'} - Send this to your friend!`}
        disabled
        value={localConnectionData}
        multiline
        rows="1"
        margin="normal"
        variant="outlined"
        className={classes.offerAnswerInput}
      />
    );

    return (
      <Grid container spacing={12} justify="space-evenly">
        <Grid item xs={4}>
          {startOrAccept === 'start' && localConnectionTextField}
          {startOrAccept === 'accept' && remoteConnectionTextField}
        </Grid>
        <Grid item xs={4}>
          {startOrAccept === 'start' && remoteConnectionTextField}
          {startOrAccept === 'accept' && localConnectionData && localConnectionTextField}
        </Grid>
      </Grid>
    );
  }

  renderVideoChatUI() {
    const { classes } = this.props;

    return (
      <Grid container spacing={12} justify="center" alignItems="stretch" className={classes.videoChatContainer}>
        <Grid item xs={6} className={classes.doublePadded}>
          <WebRTCVideo videoName="Local" videoRef={this.setLocalVideoEl}/>
        </Grid>
        <Grid item xs={6} className={classes.doublePadded}>
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

export default withStyles(styles)(WebRTCManualTab);