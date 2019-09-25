import React, { useState, useEffect } from 'react'
import { TitleText, RandomStreamerInfo } from './'
import './MainStream.css'

const StreamerAvatar = (props) => {
  return (
    <div style={{'fontSize': '24px'}}>
      <img width="120px" src="https://cdn.dribbble.com/users/130163/screenshots/6209150/twitch-avatar.png" alt="" />
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
        <StreamerAvatar name={info.name} />
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
    return (
      <div className="mainVideo">
        <video id="myVideo" autoPlay muted height="720px">
          <source src={props.src} type="video/mp4" />
        </video>
      </div>
    )
  }

export {StreamInfo, StreamVideo}
