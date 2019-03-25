import React, { Component } from 'react';

// material ui
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = ((theme) => ({
  videoCard: {
    width: '100%',
    heigth: '100%',
  }
}));

class WebRTCVideo extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.videoCard}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {this.props.videoName}
          </Typography>
          <video ref={this.props.videoRef} autoPlay={true}></video>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(WebRTCVideo);
