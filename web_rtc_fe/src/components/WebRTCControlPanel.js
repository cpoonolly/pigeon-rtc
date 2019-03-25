import React, { Component } from 'react';

// material ui
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
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
    const { classes } = this.props;

    return (
      <Card>
        <CardContent>  
          <Grid container spacing={12} justify="space-evenly" alignItems="center">
            <Grid item xs={4} className={classes.controlPanelBtnContainer}>
              <Button variant="contained" color="primary" className={classes.controlPanelBtn} onClick={() => this.props.handleCallStart()}>
                Call <Icon className={classes.controlPanelIcon}>call</Icon>
              </Button>
            </Grid>
            <Grid item xs={4} className={classes.controlPanelBtnContainer}>
              <Button variant="contained" color="primary" className={classes.controlPanelBtn} onClick={() => this.props.handleCallEnd()}>
                End Call <Icon className={classes.controlPanelIcon}>call_end</Icon>
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(WebRTCControlPanel);
