import React, { Component } from 'react';
import pigeonSvg from '../imgs/pigeon.svg'; 

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
  pigeonSvg: {
    width: '300px',
    height: '300px',
  }
}));

class AboutPigeonRTC1 extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container direction="column" alignItems="stretch" className={classes.aboutTab}>
        <Grid item className={classes.aboutTabSection}>
          <Typography variant="h1">Pigeon RTC</Typography>
        </Grid>
        <Grid item className={classes.aboutTabSection}>
          <img src={pigeonSvg} className={classes.pigeonSvg}></img>
        </Grid>
        <Grid item className={classes.aboutTabSection}>
          <Typography variant="h4">
            It's <a href="https://webrtc.org/">WebRTC</a> without the signalling servers ..and with pigeons!
          </Typography>
          <Typography variant="subtitle1">
            (See also <a href="https://en.wikipedia.org/wiki/IP_over_Avian_Carriers">IPoAC</a>)
          </Typography>
        </Grid>
        <Grid item className={classes.aboutTabSection}>
          <Button variant="contained" color="primary" onClick={this.props.onMoreInfoBtnClick}>
            ...Ummm What?
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(AboutPigeonRTC1);