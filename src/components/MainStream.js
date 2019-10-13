import React, { useState, useEffect, createRef, forwardRef } from 'react'
import { TitleText, RandomStreamerInfo, HlsVideoPlayer } from './'
import './MainStream.css'

const StreamerAvatar = (props) => {
  return (
    <div style={{'fontSize': '24px'}}>
      <img width="120px" src={props.src} alt="" style={{marginRight: '5px'}}/>
      {props.name}
    </div>
  )
}
const StreamInfo = (props) => {
  const [info, setInfo] = useState(RandomStreamerInfo)
  
  useEffect(() => {
    setInfo(props.info)
  }, [props.info])

  return (
    <div className="main2">
      <StreamerAvatar name={info.name} src={info.profilePicture} />
      <TitleText text={'Playing with:'} size={12} />
      <TitleText text={info.game} size={24} />
      <TitleText text={'Viewers:'} size={12} />
      <TitleText text={info.viewers} size={24} />
      <TitleText text={'Title:'} size={12} />
      <TitleText text={info.title} size={24} />
    </div>
  )
}

const StreamVideo = (props) => {
/*   const [height, setHeight] = useState('')
  useEffect(()=>{
    if (props.maximize) {
      console.log('heeeee')
      setHeight('1500px');
    }
  }, [height]) */

  return (
    <div className="mainVideo" >
      <HlsVideoPlayer id="myVideo" src={props.src} />
    </div>
  )
}

export {StreamInfo, StreamVideo}
