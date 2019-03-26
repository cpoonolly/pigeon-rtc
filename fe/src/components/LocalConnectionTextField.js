import React, { Component } from 'react';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';

const styles = ((theme) => ({
  offerAnswerInput: {
    width: '100%'
  },
}));

class LocalConnectionDataTextField extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showTextCopiedSnackbar: false,
    };
  }

  handleLocalConnectionTextFieldClick() {
    // Jesus... this is how we need to access the clipboard?
    // https://stackoverflow.com/a/30810322
    // Should probably be using clipboard aAPI instead but i'm a little unclear on it's level of support...
    let tempTextField = document.createElement('textarea');
    tempTextField.innerText = this.state.localConnectionData;
    document.body.appendChild(tempTextField);
    tempTextField.select();
    document.execCommand('copy');
    tempTextField.remove();

    this.setState({showTextCopiedSnackbar: true});
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <TextField
          label={'Send this to your friend!'}
          disabled
          value={this.props.localConnectionData}
          multiline
          rows="2"
          margin="normal"
          variant="outlined"
          className={classes.offerAnswerInput}
          onClick={() => this.handleLocalConnectionTextFieldClick()}
        />
        <Snackbar
          anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
          open={this.state.showTextCopiedSnackbar}
          onClose={() => this.setState({showTextCopiedSnackbar: false})}
          autoHideDuration={1000}
          ContentProps={{'aria-describedby': 'message-text-copied-id'}}
          message={<span id="message-text-copied-id">Text copied! Now send it to your friend!</span>}
        />
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(LocalConnectionDataTextField);