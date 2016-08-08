import React from 'react'
import HiddenYouTubePlayer from './HiddenYouTubePlayer'
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import SongOptionsList from './SongOptionsList'
import {hashHistory} from 'react-router'

const GuessTheSongScreen = React.createClass({
  getInitialState () {
    return {
      secondsRemaining: 15,
      selectedOption: '',
      correctOption: '',
      opts: []
    }
  },

  componentDidMount () {
     const opts = this
      .props
      .location
      .query
      .options
      .split(',')
      .map(option => {
        return {
          title: option,
          voters: []
        }
      })
    this.setState({
      opts: opts
    })
    this.timer = setInterval(this.tick, 1000);
    window.global.channel.bind('end', data => {
      console.log('correct answer:', data.title)
      this.correctOption = data.title
    })
    window.global.channel.bind('client-vote', data => {
      // console.log(data.selectedOption)
      // console.log(data.voter)
      // data.selectedOption
      // data.voter
      var x = this.state.opts;
      x.forEach(option => {
        if (option.title === data.selectedOption) {
          option.voters.push(data.voter)
        }
      })
      console.log('foo', x[data.selectedOption]);
      console.log('x', x);
      this.setState({ opts: x })
      console.log('this.state', this.state)
    });
  },

  tick () {
    this.setState({
      secondsRemaining: this.state.secondsRemaining - 1
    });
    if (this.state.secondsRemaining === 0) {
      this.setState({
        correctOption: this.correctOption
      })
      clearTimeout(this.timer);
      this.player.pauseVideo();
    }
  },

   render () {
     return (
        <div>
          <h1 className='header'>What is this song called?</h1>
          <SongOptionsList
            correctOption={this.state.correctOption}
            options={this.state.opts}
            selectedOption={this.state.selectedOption}
            secondsRemaining={this.state.secondsRemaining}
            onclick={title => {
              if (this.state.secondsRemaining < 1) {
                alert('you ran out of time');
              } else if (this.state.selectedOption !== '') {
                alert('you already voted bruv');
              } else {
                this.setState({
                  selectedOption: title
                })
                console.log('triggeereerereered')

                var x = this.state.opts;
                x.forEach(option => {
                  if (option.title === title) {
                    option.voters.push(this.props.location.query.me)
                  }
                })
                this.setState({ opts: x })
                console.log('this.state', this.state)
                window.global.channel.trigger('client-vote', {
                  selectedOption: title,
                  voter: this.props.location.query.me

                })
              }
            }}/>
          <HiddenYouTubePlayer
            videoId={this.props.location.query.id}
            start={this.props.location.query.start_time}
            onPlayerCreated={player => {
              this.player=player
            }} />
          <Footer secondsRemaining={this.state.secondsRemaining}  me={this.props.location.query.me}/>
        </div>
     )
   }
})

const Footer = ({secondsRemaining, me}) => {
  if (secondsRemaining === 0) {
    return (
      <div className='footer'>
        <RaisedButton
          label="Play again"
          primary={true}
          fullWidth={true}
          onClick={() => {
            hashHistory.push(`/whoshere?me=${me}`)
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
