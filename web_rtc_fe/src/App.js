import React, { Component } from 'react';
import './App.css';

// material-ui
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import purple from '@material-ui/core/colors/purple';

// web rtc stuff
import WebRTCWithServerTab from './WebRTCWithServerTab/WebRTCWithServerTab';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: purple
  },
});


class App extends Component {
  render() {
    return (
      <CssBaseline>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <WebRTCWithServerTab></WebRTCWithServerTab>
          </div>
        </MuiThemeProvider>
      </CssBaseline>
    );
  }
}

export default App;
