import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import {
  Navigation, StreamInfo, StreamVideo,
  RandomStreamerInfo, ContentLists, BigBuckBunny
} from './components'
import { TClient, getHlsUrls } from './api/twitch'
import { initNavigation } from '@noriginmedia/react-spatial-navigation'
import Content from './Content'
import './App.css'

initNavigation(/* {
  debug: true,
  visualDebug: true
} */)

const App = () => {
  const [api, setApi] = useState(null)
  const [style, setStyle] = useState(null)

  useEffect(() => {
    TClient.then((tw) => {
      setApi(tw.helix)
    })
  }, [])

  console.log('####RENDERING####')
  return (
    <div className="container" style={style} >
      <Router>
        <Navigation focusKey={'nav'} />
        <Switch>
          <Route to="/home" >
            {api ? <Content api={api} setStyle={setStyle} /> : <div className="content" />}
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
