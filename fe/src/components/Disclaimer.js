import React, { Component } from 'react';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = ((theme) => ({
  disclaimerContainer: {
    marginTop: '50px',
  },
}));

class Disclaimer extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.disclaimerContainer}>
        <Typography variant="overline">Disclaimer:</Typography>
        <Typography variant="caption" gutterBottom>
          Because each peer only sends one pigeon each, PigeonRTC does not support <a href="http://tools.ietf.org/html/draft-ietf-rtcweb-jsep-03#section-3.4.1">ICE Candidate Trickling</a>.<br/>
          For this and other reasons (namely my crippling inadequacies as an engineer/human being), there's a high likelihood of crappy/failing connections.
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(Disclaimer);