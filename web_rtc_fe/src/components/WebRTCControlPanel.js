import React, { Component } from 'react';

// material ui
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

const styles = ((theme) => ({
  controlPanelBtnContainer: {
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
  },
  controlPanelBtn: {
    width: '100%',
    height: '100%',
  },
  controlPanelIcon: {
    marginLeft: '15px'
  },
}));

class WebRTCControlPanel extends Component {
  render() {
    const { classes, controlPanel } = this.props;

    return (
      <Card>
        <CardContent>  
          <Grid container spacing={controlPanel.buttons.length * 6} justify="space-evenly" alignItems="center">
            {controlPanel.buttons.map((button) => (
              <Grid key={button.id} item xs={4} className={classes.controlPanelBtnContainer}>
                <Button variant="contained" color="primary" className={classes.controlPanelBtn} onClick={() => button.onClick()}>
                  {button.render()}
                </Button>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(WebRTCControlPanel);
