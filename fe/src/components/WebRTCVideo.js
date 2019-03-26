import React, { Component } from 'react';

// material ui
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const MIN_WIDTH = 300;

const styles = ((theme) => ({
  videoCard: {
    width: '100%',
  },
  video: {
    width: '100%',
    minWidth: `${MIN_WIDTH}px`,
  },
}));

class WebRTCVideo extends Component {
  static get MIN_WIDTH() {
    return MIN_WIDTH;
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.videoCard}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {this.props.videoName}
          </Typography>
          <video ref={this.props.videoRef} autoPlay={true} muted={this.props.muted} className={classes.video}></video>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(WebRTCVideo);
