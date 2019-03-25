import React, { Component } from 'react';
import './App.css';

// material-ui
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import purple from '@material-ui/core/colors/purple';
import CssBaseline from '@material-ui/core/CssBaseline';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// web rtc stuff
// import WebRTCWithServerTab from './tabs/WebRTCWithServerTab';
import WebRTCWithCarrierPigeonTab from './components/WebRTCWithCarrierPigeonTab';
import AboutPigeonRTC1 from './components/AboutPigeonRTC1';
import AboutPigeonRTC2 from './components/AboutPigeonRTC2';

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
                <Tab label="Coo-Coo-nnect!" value={TAB_OPTIONS.PIGEON}/>
                {/* <Tab label="Connect by Server" value={TAB_OPTIONS.SERVER}/> */}
              </Tabs>
            </AppBar>
            {currentTab === TAB_OPTIONS.ABOUT1 && <AboutPigeonRTC1 onMoreInfoBtnClick={() => this.handleTabChange(TAB_OPTIONS.ABOUT2)}></AboutPigeonRTC1>}
            {currentTab === TAB_OPTIONS.ABOUT2 && <AboutPigeonRTC2 onConnectBtnClick={() => this.handleTabChange(TAB_OPTIONS.PIGEON)}></AboutPigeonRTC2>}
            {currentTab === TAB_OPTIONS.PIGEON && <WebRTCWithCarrierPigeonTab></WebRTCWithCarrierPigeonTab>}
            {/* {currentTab === TAB_OPTIONS.SERVER && <WebRTCWithServerTab></WebRTCWithServerTab>} */}
          </div>
        </MuiThemeProvider>
      </CssBaseline>
    );
  }
}

export default (App);
