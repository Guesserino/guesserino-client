import React from 'react'
import YouTube from 'react-youtube'

const HiddenYouTubePlayer = ({
  videoId,
  start,
  onPlayerCreated
}) => (
  <div style={{
    display: 'none'
  }}>
    <YouTube
      videoId={videoId}
      opts={{
        playerVars: {
          autoplay: true,
          start
        }
      }}
      onReady={event => onPlayerCreated(event.target)}/>
  </div>
)

HiddenYouTubePlayer.propTypes = {
  videoId: React.PropTypes.string.isRequired,
  start: React.PropTypes.number.isRequired,
  onPlayerCreated: React.PropTypes.func.isRequired
}

export default HiddenYouTubePlayer
