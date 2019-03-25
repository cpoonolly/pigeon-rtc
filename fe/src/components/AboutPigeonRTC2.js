import React, { Component } from 'react';
import PigeonRTCSignallingImg from '../imgs/PigeonRTC_signalling.png';
import WebRTCSignallingImg from '../imgs/WebRTC_signalling.png';
import WebRTCNeedsServersImg from '../imgs/WebRTC_needs_servers.png';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// TODO - This and all other px literals should probably be replaced with spacing units?
const styles = ((theme) => ({
  aboutTab: {
    padding: '100px',
  },
  aboutTabSection: {
    marginBottom: '50px',
  },
  signallingImg: {
    width: '100%'
  },
  aboutSectionBodyText: {
    fontSize: '24px'
  }
}));

class AboutPigeonRTC2 extends Component {

  renderWebRTCNeedsServers() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Grid item className={classes.aboutTabSection}>
          <Typography variant="h4">WebRTC still needs servers</Typography>
        </Grid>
        <Grid item className={classes.aboutTabSection}>
          <Typography variant="body1" className={classes.aboutSectionBodyText}>
              While WebRTC lets us do some <a href="https://webrtc.org/start/#demos-and-samples">pretty cool things</a>, such as <a href="https://appr.tc/">real time video chats</a> &amp; <a href="https://webrtc.github.io/samples/src/content/datachannel/filetransfer/">file transfers.</a><br/>
              It still has one major unforgivable shortcomming ... it still needs servers.
          </Typography>
        </Grid>
        <Grid item className={classes.aboutTabSection}>
          <img src={WebRTCNeedsServersImg} alt="web rtc needs servers"></img>
          <Typography variant="caption" gutterBottom>
            <a href="https://www.html5rocks.com/en/tutorials/webrtc/infrastructure/">Read more about WebRTC Signalling</a>
          </Typography>
        </Grid>
      </React.Fragment>
    )
  }

  renderSignallingComparison() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Grid item className={classes.aboutTabSection}>
          <Typography variant="h4">
            Pigeon RTC takes away the need for signalling servers!
          </Typography>
        </Grid>
        <Grid item className={classes.aboutTabSection}>
          <Grid container direction="row" justify="space-evenly" spacing={16}>
            <Grid item xs={6}>
              <Typography variant="h6">WebRTC Signalling</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">PigeonRTC Signalling</Typography>
            </Grid>
          </Grid>
          <Grid container direction="row" justify="space-evenly" spacing={16}>
            <Grid item xs={6}>
              <img src={WebRTCSignallingImg} alt="web rtc signalling" className={classes.signallingImg}></img>
            </Grid>
            <Grid item xs={6}>
              <img src={PigeonRTCSignallingImg} alt="pigeon rtc signalling" className={classes.signallingImg}></img>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.aboutTabSection}>
          <Typography variant="body1" className={classes.aboutSectionBodyText}>
            Instead relying on cold unfeeling racks of machinery to connect us,<br/>
            we can instead put our faith in disease ridden flying rats!
          </Typography>
        </Grid>
      </React.Fragment>
    )
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container direction="column" alignItems="center" className={classes.aboutTab}>
        {this.renderWebRTCNeedsServers()}
        <Grid item className={classes.aboutTabSection}></Grid>
        {this.renderSignallingComparison()}
        <Grid item className={classes.aboutTabSection}>
          <Button variant="contained" color="primary" onClick={this.props.onConnectBtnClick}>
            ...Okay
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(AboutPigeonRTC2);