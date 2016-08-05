import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { render } from 'react-dom';
import App from './App';
import WhosHereScreen from './WhosHereScreen';
import WelcomeScreen from './WelcomeScreen';
import GuessTheSongScreen from './GuessTheSongScreen';
import GameInProgressScreen from './GameInProgressScreen';
import './reset.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#549eff',
  },
  appBar: {
    height: 50,
  },
});

render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={WelcomeScreen} />
        <Route path='/whoshere' component={WhosHereScreen} />
        <Route path='/guess' component={GuessTheSongScreen} />
        <Route path='/gameinprogress' component={GameInProgressScreen} />
      </Route>
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
);
