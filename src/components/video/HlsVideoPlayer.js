import React from 'react'
import Hls from 'hls.js'


const HlsVideoPlayer = props => {
  const hls = new Hls()
  const defaultProps = {
    stream: props.stream,
    id: props.id,
    height: props.size,
    src: props.src?props.src[0].url:'',
    autoPlay: true,
    preload: '',
  }

  let video = React.createElement(
    'video',
    defaultProps,
    [
      props.src?
      props.src.map( (each, index) => React.createElement('source', { key: index, src: each.url })):
      []
    ]
  )
  hls.attachMedia(video)

  return video
}

export {HlsVideoPlayer}
