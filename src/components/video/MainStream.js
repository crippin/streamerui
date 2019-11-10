import React, { useState, useEffect, createRef, useCallback } from 'react'
import { TitleText, RandomStreamerInfo, HlsVideoPlayer } from '..'
import { CSSTransition } from 'react-transition-group'
import { withFocusable } from '@noriginmedia/react-spatial-navigation'
import './MainStream.css'

const StreamerAvatar = (props) => {
  return (
    <div className="avatar">
      <img id="avatarImg" src={props.src} alt="" />
      <TitleText text={props.name} size={36} style={{ marginLeft: '10px' }} />
    </div>
  )
}
const StreamInfo = ({ info }) => {
  const [show, setShow] = useState(false);
  console.log('<-infoRendering->')
  return (
    <div className="main2">
      <StreamerAvatar name={info.name} src={info.profilePicture} />
      <div style={{ overflow: 'hidden', width: '700px', marginTop: '20px' }} >
        <TitleText text={info.title} size={30} style={{
          whiteSpace: 'nowrap',
          animation: 'floatLeft 20s 5s infinite linear',
        }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', color: 'gold', marginLeft: '20px' }}>
        <TitleText text={'Playing with:'} size={18} />
        <TitleText text={info.game} size={22} style={{ marginTop: '-20px', marginBottom: '-20px', marginLeft: '10px' }} />
        <TitleText text={'Viewers:'} size={18} />
        <TitleText text={info.viewers} size={22} style={{ marginTop: '-20px', marginBottom: '-20px', marginLeft: '10px' }} />
      </div>
    </div>
  )
}

const myButton = ({ name, focused }) => {
  return (
    <div>
      <img className={`${focused ? 'focused' : ''}`} width="128px" style={{ position: 'relative', bottom: '-100px' }} src={`resource/icon/${name}-24px.svg`} />
    </div>
  )
}

const PlayButton = withFocusable()(myButton)
const ToogleFullScreenButton = withFocusable()(myButton)
const MediaPlayer = (props) => {
  const video = document.getElementById('myVideo')
  const [opacity, setOpacity] = useState(0)
  const [timer, setTimer] = useState(0)
  const togglePlayPause = () => {
    onFocused()
    if (video.paused || video.ended) {
      video.play();
    }
    else {
      video.pause();
    }
  }
  const exitFullscreen = () => {
    setOpacity(1)
    props.setFocus(video.attributes.stream.nodeValue)
    props.setFullScreen(false)
  }

  const onFocused = () => {
    setOpacity(1)
    clearTimeout(timer)
    setTimer(setTimeout(() => {
      console.log(timer)
      setOpacity(0)
    }, 12000))
  }

  useEffect(() => {
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div id="media-controls" style={{ opacity: opacity, transition: 'ease-in 2s' }} >
      <PlayButton name="play_arrow" onBecameFocused={onFocused} focusKey="playButton" onEnterPress={() => togglePlayPause()} />
      <ToogleFullScreenButton onBecameFocused={onFocused} name="fullscreen_exit" focusKey="fullscreen_exit" onEnterPress={() => exitFullscreen()} />
    </div>
  )
}

const streamVideo = (props) => {
  const [style, setStyle] = useState({ height: '582px' })
  const [size, setSize] = useState('720px')
  const [overlay, setOverlay] = useState('inherit')

  useEffect(() => {
    if (props.maximize === true) {
      setOverlay('none')
      setStyle({ height: '1500px', width: '1920px', zIndex: 2, position: 'fixed', left: 0 });
      setSize('1080px')
      props.setFocus('playButton')
    } else {
      setOverlay('inherit')
      setStyle({ height: '582px', width: '1280px', zIndex: 0 })
      setSize('720px')
    }
  }, [props.maximize])


  return (
    <div className="mainVideo" style={style} >
      <HlsVideoPlayer id="myVideo" src={props.src} size={size} stream={props.info.type + '' + props.info.id} />
      <div style={{
        width: '360px',
        background: 'linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,1))',
        position: 'absolute',
        height: '720px',
        top: 0,
        display: overlay
      }} />
      <div style={{
        width: '1280px',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))',
        position: 'absolute',
        height: '42px',
        bottom: '360px',
        display: overlay
      }} />
      <MediaPlayer setFullScreen={props.setFullScreen} setFocus={props.setFocus} max={props.maximize} />
    </div>
  )
}
const StreamVideo = withFocusable({ trackChildren: true })(streamVideo)

export { StreamInfo, StreamVideo }
