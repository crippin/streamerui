import React, {useState, useEffect, useRef} from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import {
  Navigation, StreamInfo, StreamVideo, RandomStreamerInfo, ContentLists, BigBuckBunny
} from './components'
import './App.css'
import TClient from './api/twitch'

function App() {
  let [categories, setCategories] = useState(0)
  let [streams, setStreams] = useState(0)
  let [atciveStreamInfo, setAtciveStreamInfo] = useState(RandomStreamerInfo)
  let topGamesPaginated = useRef(null);
  let topStreamsPaginated = useRef(null);

  const initTopStreams = (streams, api) => {
    topStreamsPaginated.current = api.streams.getStreamsPaginated()
    topStreamsPaginated.current.getNext().then(res => {
      if (topStreamsPaginated.current !== streams.cursor) {
        setStreams({data: res, cursor: topStreamsPaginated.current.currentCursor})
        api.games.getGameById(res[0].gameId).then((game) => {
            setAtciveStreamInfo({
              name: res[0].userDisplayName,
              game: game.name,
              viewers: res[0].viewers,
              title: res[0].title,
              url: BigBuckBunny
          })
        })
      }
    })
  }

  const initTopGames = (categories, api) => {
    topGamesPaginated.current = api.games.getTopGamesPaginated()
    topGamesPaginated.current.getNext().then(res => {
      if (topGamesPaginated.current.currentCursor !== categories.cursor) {
        setCategories({data: res, cursor: topGamesPaginated.current.currentCursor})
      }
    })
  }

  useEffect(()=> {
    TClient.then((tw) => {
      if (categories === 0 ) {initTopGames(categories, tw.helix)}
      if (streams === 0 ) {initTopStreams(streams, tw.helix)}
    })
  },[categories, streams])

  return (
    <div className="container" >
      <Router >
        <Navigation />
        <Switch>
          <Route to="/home" >
            <StreamInfo info={atciveStreamInfo} />
            <ContentLists categories={categories===0?[]:categories.data} streams={streams===0?[]:streams.data} />
            <StreamVideo src={atciveStreamInfo.url} />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
