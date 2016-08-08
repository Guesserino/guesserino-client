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
        <p>Foobar is the modern version of a pub quiz, powered by <a href='http://pusher.com'>Pusher</a>.</p>
        <p>When the game starts, a song will be played in the background. You'll have 15 seconds to guess the song. After you've voted, you'll see what other people are voting for in realtime.</p>
        <p>Please make sure you enter your OFFICIAL Pusher email below or the game might blow up 😉</p>

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
