import React, { Component } from 'react';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = ((theme) => ({
  offerAnswerInput: {
    width: '100%'
  },
}));

class LocalConnectionDataTextField extends Component {
  render() {
    const { classes } = this.props;

    return (
      <TextField
        label={'Get this from your friend!'}
        onChange={(event) => this.props.onChange(event.target.value)}
        value={this.props.remoteConnectionData}
        multiline
        rows="2"
        margin="normal"
        variant="outlined"
        className={classes.offerAnswerInput}
      />
    )
  }
}

export default withStyles(styles)(LocalConnectionDataTextField);