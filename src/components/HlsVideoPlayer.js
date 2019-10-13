import React from 'react'
import Hls from 'hls.js'

const HlsVideoPlayer = props => {
  let defaultProps = {
    id: props.id,
    src: props.src?props.src:null, // Array of urls?
    height: props.height,
    autoPlay: true,
    preload: '',
    muted: false,
    volume: '50%'
  }

  let video = React.createElement('video', defaultProps)

  let hls = new Hls()
  if (Hls.isSupported()) {
    hls.attachMedia(video);
  }
  return video
}

export {HlsVideoPlayer}
