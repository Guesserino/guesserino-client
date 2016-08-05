import React from 'react'
import Pusher from 'pusher-js'
import {hashHistory} from 'react-router'

const WhosHereScreen= React.createClass({
  getInitialState () {
    return {
      members: {}
    }
  },
  componentDidMount () {
    window.global = {}
    window.global.pusher = new Pusher('aba24522a837be3fe663', {
      authEndpoint: "http://foobar.ngrok.io/pusher/auth",
      auth: {
        params: {
          email: 'alex.booker@pusher.com'
        }
      }
    })
    window.global.channel = window.global.pusher.subscribe('presence-foobar-game')
    window.global.channel.bind('pusher:subscription_succeeded', members => {
      this.setState({
        members: members
      })
    })
    window.global.channel.bind('pusher:member_added', member => {
      console.log('member_added');
      console.log('member', member);
      console.log('this.channel.members', window.global.channel.members);
      this.setState({
        members: window.global.channel.members
      })
    })
    window.global.channel.bind('pusher:member_removed', member => {
      console.log('member_removed');
      console.log('member', member);
      console.log('this.channel.members', window.global.channel.members);
      this.setState({
        members: window.global.channel.members
      })
    })
    window.global.channel.bind('start', data => {
      console.log('start...')
      console.log('data', data)
      var x = data.options.join(',')
      console.log(x)
      hashHistory.push(`/guess?options=${x}`)
    })
    window.global.channel.bind('end', () => {
      console.log('end...');
    })
    window.global.channel.bind('ongoing', () => {
      console.log('ongoing...');
    })
  },
  render () {
    if (Object.keys(this.state.members).length > 0) {
      return (
        <div>
          <h1>Who's here</h1>
          <ul>
            {Object.keys(this.state.members.members).map(key => <li>{key}</li>)}
          </ul>
          <div>
            <p>Waiting for the game to start...</p>
          </div>
        </div>
      )
    }
    return null
  }
})

export default WhosHereScreen
