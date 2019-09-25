import React, {useState, useEffect} from 'react'
import {
  Navigation, StreamInfo, StreamVideo, RandomStreamerInfo, ContentLists
} from './components'
import './App.css'
import TClient from './api/twitch'

function App() {
  let [categories, setCategories] = useState(0)
  let [streams, setStreams] = useState(0)

  useEffect(()=> {
    TClient.then((tw) => {
      tw.helix.games.getTopGamesPaginated().getNext()
        .then(res => {if (categories === 0) {console.log(res);setCategories(res)}})
      tw.helix.streams.getStreamsPaginated().getNext()
        .then(res => {if (streams === 0) {console.log(res);setStreams(res)}})
    })
  },[categories, streams])

  return (
    <div className="container" >
      <Navigation />
      <StreamInfo info={RandomStreamerInfo} />
      <ContentLists categories={categories===0?[]:categories} streams={streams===0?[]:streams} />
      <StreamVideo src={RandomStreamerInfo.url} />
    </div>
  )
}

export default App
