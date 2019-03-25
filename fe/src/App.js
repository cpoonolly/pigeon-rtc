import React, { Component } from 'react';
import './App.css';
import pigeonSvg from './pigeon.svg'; 

// material-ui
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import purple from '@material-ui/core/colors/purple';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// web rtc stuff
// import WebRTCWithServerTab from './tabs/WebRTCWithServerTab';
import WebRTCWithCarrierPigeonTab from './tabs/WebRTCWithCarrierPigeonTab';
import { Button } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: purple
  },
});

const TAB_OPTIONS = Object.freeze({
  // SERVER: 'server',
  PIGEON: 'pigeon',
  ABOUT1: 'about1',
  ABOUT2: 'about2',
});

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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: TAB_OPTIONS.ABOUT1
    };

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(newTab) {
    this.setState({currentTab: newTab});
  }

  renderAbout1Tab() {
    const { classes } = this.props;

    return (
      <Grid container direction="column" alignItems="stretch" className={classes.aboutTab}>
        <Grid item className={classes.aboutTabSection}>
          <img src={pigeonSvg} className={classes.pigeonSvg}></img>
        </Grid>
        <Grid item className={classes.aboutTabSection}>
          <Typography variant="h3">
            It's <a href="https://webrtc.org/">WebRTC</a> without the signalling servers ..and with pigeons!
          </Typography>
          <Typography variant="subtitle1">
            (See also <a href="https://en.wikipedia.org/wiki/IP_over_Avian_Carriers">IPoAC</a>)
          </Typography>
        </Grid>
        <Grid item className={classes.aboutTabSection}>
          <Button variant="contained" color="primary" onClick={() => this.handleTabChange(TAB_OPTIONS.ABOUT2)}>
              ...Ummm What?
          </Button>
        </Grid>
      </Grid>
    );
  }

  renderAbout2Tab() {
    return (null);
  }

  render() {
    const { currentTab } = this.state;

    return (
      <CssBaseline>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <AppBar position="static">
              <Tabs value={currentTab} onChange={(event, value) => this.handleTabChange(value)}>
                <Tab label="What is it?" value={TAB_OPTIONS.ABOUT1}/>
                <Tab label="...Ummm What?" value={TAB_OPTIONS.ABOUT2}/>
                <Tab label="Connect!" value={TAB_OPTIONS.PIGEON}/>
                {/* <Tab label="Connect by Server" value={TAB_OPTIONS.SERVER}/> */}
              </Tabs>
            </AppBar>
            {currentTab === TAB_OPTIONS.ABOUT1 && this.renderAbout1Tab()}
            {currentTab === TAB_OPTIONS.ABOUT1 && this.renderAbout2Tab()}
            {currentTab === TAB_OPTIONS.PIGEON && <WebRTCWithCarrierPigeonTab></WebRTCWithCarrierPigeonTab>}
            {/* {currentTab === TAB_OPTIONS.SERVER && <WebRTCWithServerTab></WebRTCWithServerTab>} */}
          </div>
        </MuiThemeProvider>
      </CssBaseline>
    );
  }
}

export default withStyles(styles)(App);
