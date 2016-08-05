import React from 'react'
import HiddenYouTubePlayer from './HiddenYouTubePlayer'
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import SongOptionsList from './SongOptionsList'

const GuessTheSongScreen = React.createClass({
  getInitialState () {
    return {
      secondsRemaining: 15,
      selectedOption: '',
      correctOption: ''
    }
  },

  componentDidMount () {
    this.timer = setInterval(this.tick, 1000);
    console.log(this.props.location.query.options.split(','));
    window.global.channel.bind('end', data => {
      console.log('correct answer:', data.title)
      this.setState({
        correctOption: data.title
      })
    })
  },

  tick () {
    this.setState({
      secondsRemaining: this.state.secondsRemaining - 1
    });
    if (this.state.secondsRemaining === 0) {
      clearTimeout(this.timer);
      this.player.pauseVideo();
      alert('the correct option was ' + this.state.correctOption)
    }
  },

   render () {
     const opts = this
      .props
      .location
      .query
      .options
      .split(',')
      .map(option => {
        return {
          title: option,
          voters: [{
            name: 'Alex'
          }]
        }
      })
     return (
        <div>
          <h1 className='header'>What is this song called?</h1>
          <SongOptionsList options={opts} selectedOption={this.state.selectedOption} secondsRemaining={this.state.secondsRemaining} onclick={title => {
            if (this.state.secondsRemaining < 1) {
              alert('you ran out of time');
            } else if (this.state.selectedOption !== '') {
              alert('you already voted bruv');
            } else {
              this.setState({
                selectedOption: title
              })
            }
          }}/>
          <HiddenYouTubePlayer
            videoId="BfOdWSiyWoc"
            start={34}
            onPlayerCreated={player => {
              this.player=player
            }} />
          <Footer secondsRemaining={this.state.secondsRemaining} />
        </div>
     )
   }
})

const Footer = ({secondsRemaining}) => {
  if (secondsRemaining === 0) {
    return (
      <div className='footer'>
        <RaisedButton
          label="Play again"
          primary={true}
          fullWidth={true}
          onClick={() => {
            alert('clicked');
          }} />
      </div>
    )
  } else {
    return (
      <div className='footer'>
        <LinearProgress
          mode="determinate"
          value={secondsRemaining}
          max={15} />
      </div>
    )
  }
}

export default GuessTheSongScreen
