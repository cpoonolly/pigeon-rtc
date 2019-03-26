import React, { Component } from 'react';
import imgHowItWorksStep0 from '../imgs/howItWorks_step0.png';
import imgHowItWorksStep1 from '../imgs/howItWorks_step1.png';
import imgHowItWorksStep3 from '../imgs/howItWorks_step3.png';
import imgHowItWorksStep4 from '../imgs/howItWorks_step4.png';
import imgHowItWorksStep5 from '../imgs/howItWorks_step5.png';
import imgHowItWorksStep7 from '../imgs/howItWorks_step7.png';
import imgPigeon from '../imgs/pigeon.svg';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

const styles = ((theme) => ({
  howItWorksTab: {
    paddingTop: '50px',
    paddingBottom: '50px',
  },
  howItWorksTitle: {
    marginBottom: '50px',
  },
  stepContainer: {
    marginBottom: '50px',
  },
  stepImg: {
    maxWidth: '100%',
  },
  pigeonImg: {
    maxWidth: '100%',
    width: '50px'
  },
  pigeonReversedImg: {
    maxWidth: '100%',
    width: '50px',
    transform: 'scaleX(-1)',
  },
  disclaimerContainer: {
    marginTop: '50px',
  },
  continueButtonsContainer: {
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  continueButton: {
    marginLeft: '10px',
    marginRight: '10px',
  }
}));

class HowItWorksTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNoYoureStupidSnackbar: false
    };

    this.handleThisIsStupidBtnClick = this.handleThisIsStupidBtnClick.bind(this);
  }

  handleThisIsStupidBtnClick() {
    this.setState({showNoYoureStupidSnackbar: true});
  }

  render() {
    const { classes } = this.props;

  
    return (
      <div className={classes.howItWorksTab}>
        <div className={classes.howItWorksTitle}>
          <Typography variant="h4">How it works</Typography>
          <Typography variant="caption">Just 9 easy steps!</Typography>
        </div>

        <div className={classes.stepContainer}>
          <Typography variant="h6">Step 0: Click "Start a Connection"</Typography>
          <img src={imgHowItWorksStep0} alt="Step 0" className={classes.stepImg}></img>   
        </div>
        
        <div className={classes.stepContainer}>
          <Typography variant="h6" gutterBottom>Step 1: Copy the text in "Send this to your friend"</Typography>
          <img src={imgHowItWorksStep1} alt="Step 1" className={classes.stepImg}></img>   
        </div>

        <div className={classes.stepContainer}>
          <Typography variant="h6" gutterBottom>Step 2: Send the copied text to your friend (via pigeon).</Typography>
          <img src={imgPigeon} alt="Step 2" className={classes.pigeonImg}></img>
        </div>

        <div className={classes.stepContainer}>
          <Typography variant="h6" gutterBottom>Step 3: Friend recieving the text, clicks "Accept a Connection" on their machine.</Typography>
          <img src={imgHowItWorksStep3} alt="Step 3" className={classes.stepImg}></img>
        </div>

        <div className={classes.stepContainer}>
          <Typography variant="h6" gutterBottom>Step 4: Friend pastes your message in "Get this from your friend" &amp; clicks "Connect".</Typography>
          <img src={imgHowItWorksStep4} alt="Step 4" className={classes.stepImg}></img>   
        </div>

        <div className={classes.stepContainer}>
          <Typography variant="h6" gutterBottom>Step 5: Friend copies text in "Send this to your friend".</Typography>
          <img src={imgHowItWorksStep5} alt="Step 5" className={classes.stepImg}></img>   
        </div>

        <div className={classes.stepContainer}>
          <Typography variant="h6" gutterBottom>Step 6: Friend sends the copied text back to you (via pigeon).</Typography>
          <img src={imgPigeon} alt="Step 6" className={classes.pigeonReversedImg}></img>
        </div>

        <div className={classes.stepContainer}>
          <Typography variant="h6" gutterBottom>Step 7: Paste your friends message in "Get this from your friend" &amp; click "Connect".</Typography>
          <img src={imgHowItWorksStep7} alt="Step 7" className={classes.stepImg}></img>   
        </div>

        <div className={classes.stepContainer}>
          <Typography variant="h6" gutterBottom>Step 8: Profit???</Typography>
        </div>


        <div className={classes.disclaimerContainer}>
          <Typography variant="overline">Disclaimer:</Typography>
          <Typography variant="caption" gutterBottom>
            Because each peer only sends one pigeon each, PigeonRTC does not support <a href="http://tools.ietf.org/html/draft-ietf-rtcweb-jsep-03#section-3.4.1">ICE Candidate Trickling</a>.<br/>
            For this and other reasons (namely my crippling inadequacies as an engineer/human being), there's a high likelihood of crappy/failing connections.
          </Typography>
        </div>

        <div className={classes.continueButtonsContainer}>
          <Button color="primary" className={classes.continueButton} onClick={this.handleThisIsStupidBtnClick}>
            This is Stupid...
          </Button>
          <Button variant="contained" color="primary" className={classes.continueButton} onClick={this.props.onConnectBtnClick}>
            Coo-Coo-nnect!
          </Button>
        </div>
        <Snackbar
          anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
          open={this.state.showNoYoureStupidSnackbar}
          onClose={() => this.setState({showNoYoureStupidSnackbar: false})}
          autoHideDuration={1000}
          ContentProps={{'aria-describedby': 'message-no-youre-stupid-id'}}
          message={<span id="message-no-youre-stupid-id">You're Stupid..</span>}
        />
      </div>
      
    );
  }
}

export default withStyles(styles)(HowItWorksTab);