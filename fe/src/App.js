import React, { Component } from 'react';
import './App.css';

// material-ui
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import purple from '@material-ui/core/colors/purple';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// web rtc stuff
import WebRTCWithServerTab from './tabs/WebRTCWithServerTab';
import WebRTCWithCarrierPigeonTab from './tabs/WebRTCWithCarrierPigeonTab';
import { Toolbar } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: purple
  },
});

const TAB_OPTIONS = Object.freeze({
  // SERVER: 'server',
  PIGEON: 'pigeon',
  ABOUT: 'about',
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: TAB_OPTIONS.ABOUT
    };

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(event, value) {
    this.setState({currentTab: value});
  }

  render() {
    const { currentTab } = this.state;

    return (
      <CssBaseline>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <AppBar position="static">
              <Toolbar>

                <Tabs value={currentTab} onChange={this.handleTabChange}>
                  <Tab label="How it works" value={TAB_OPTIONS.ABOUT}/>
                  <Tab label="Connect!" value={TAB_OPTIONS.PIGEON}/>
                  {/* <Tab label="Connect by Server" value={TAB_OPTIONS.SERVER}/> */}
                </Tabs>
              </Toolbar>
            </AppBar>
            {/* {currentTab === TAB_OPTIONS.SERVER && <WebRTCWithServerTab></WebRTCWithServerTab>} */}
            {currentTab === TAB_OPTIONS.PIGEON && <WebRTCWithCarrierPigeonTab></WebRTCWithCarrierPigeonTab>}
          </div>
        </MuiThemeProvider>
      </CssBaseline>
    );
  }
}

export default App;
