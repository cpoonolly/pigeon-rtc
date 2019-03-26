import React, { Component } from 'react';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = ((theme) => ({
  root: {
    
  },
}));

class StartConnectionSetup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 0,
      remoteConnectionData: null,
    };
  }

  handleNextStepBtnClick() {
    this.setState((oldState) => ({currentStep: oldState.currentStep + 1}));
  }

  handleRemoteConnectionDataChange(newVal) {
    this.setState({remoteConnectionData: newVal});
  }

  renderStep0() {
    const { localConnectionData } = this.props;

    return (
      <React.Fragment>
        <LocalConnectionTextField localConnectionData={localConnectionData}></LocalConnectionTextField>
        <Button
          variant="contained"
          color="primary"
          className={classes.startOrAcceptConnectBtn}
          onClick={() => this.handleNextStepBtnClick()}
        >
          Sent!
        </Button>        
      </React.Fragment>
    );
  }

  renderStep1() {
    const { remote } = this.props;

    return (
      <React.Fragment>
        <LocalConnectionTextField localConnectionData={localConnectionData}></LocalConnectionTextField>
        <Button
          variant="contained"
          color="primary"
          className={classes.startOrAcceptConnectBtn}
          onClick={() => this.handleNextStepBtnClick()}
        >
          Sent!
        </Button>        
      </React.Fragment>
    );
  }

  renderStep2() {

  }

  render() {
    const { currentStep } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Stepper activeStep={currentStep}>
          <Step completed={currentStep > 0}>Send a pigeon</Step>
          <Step completed={currentStep > 1}>Recieve a Pigeon</Step>
          <Step completed={currentStep > 2}>Connect!</Step>
        </Stepper>
        {currentStep === 0 && this.renderStep0()}
        {currentStep === 1 && this.renderStep1()}
        {currentStep === 2 && this.renderStep2()}
      </div>
    );
  }
}

export default withStyles(styles)(Disclaimer);