import React, { Component } from 'react';
import YouTube from 'react-youtube';

class Result extends Component {
  videoOnReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
    console.log(event.target);
  }
  render() {
    const opts = {
      height: '240',
      width: '400',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };
    const { videoId } = this.props;
    return (
      <YouTube videoId={videoId} opts={opts} onReady={this.videoOnReady} />
    );
  }
}

export default Result;
