import React from 'react';
import {hashHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const WelcomeScreen = React.createClass({
  getInitialState () {
    return {
      username: '',
      members: {}
    }
  },
  render () {
    return (
      <div className='welcome-screen'>
        <h1>Welcome to Foobar</h1>
        <p>Foobar is an Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum., powered by <a href='http://pusher.com'>Pusher</a>.Sign in below to play.</p>
        <p>Foobar is an Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum., powered by <a href='http://pusher.com'>Pusher</a>.Sign in below to play.</p>
        <form onSubmit={e => {
          e.preventDefault();
          hashHistory.push(`/whoshere?me=${this.state.username}`)
        }}>
          <div>
            <TextField
            style={{width: '100%'}}
              hintText="Hint Text"
              floatingLabelText="Your Pusher email"
              onChange={event => {
                this.setState({
                  username: event.target.value
                })
              }}
            />
          </div>
          <div>
            <RaisedButton label="Play" primary={true} type="submit" />
          </div>
        </form>
      </div>
    );
  }
})

export default WelcomeScreen;
