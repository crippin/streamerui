import React, { useState, useEffect, useRef, createRef } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Navigation, StreamInfo, StreamVideo,
  RandomStreamerInfo, ContentLists, BigBuckBunny } from './components'
import { TClient, getHlsUrls } from './api/twitch'
import {initNavigation, withFocusable} from '@noriginmedia/react-spatial-navigation'
import './App.css'
let api = null;

initNavigation(/* {
  debug: true,
  visualDebug: true
} */)

function App(props) {
  let [categories, setCategories] = useState(0)
  let [streams, setStreams] = useState(0)
  let [followedStreams, setFollowedStreams] = useState(0)
  let [user, setUser] = useState(0)
  let [atciveStreamInfo, setAtciveStreamInfo] = useState(RandomStreamerInfo)
  let topGamesPaginated = useRef(null)
  let topStreamsPaginated = useRef(null)
  let followedStreamsPaginated = useRef(null)
  let videoRef = createRef();
  let maximize = false;

  const setInfo = id => {
    if (atciveStreamInfo.id !== id) {
      api.streams.getStreamByUserId(id).then((stream) => {
        if (stream) {
          Promise.all([
            api.users.getUserById(stream.userId),
            api.games.getGameById(stream.gameId)
          ]).then(([user,game]) => {
            getHlsUrls(user.name).then((urls) => {
              console.log(urls)
              setAtciveStreamInfo({
                name: stream.userDisplayName,
                game: game.name,
                viewers: stream.viewers,
                title: stream.title,
                url: urls[2].url,
                gameId: stream.gameId,
                id: stream.userId,
                profilePicture: user.profilePictureUrl
              })
            })
          })
        }
      })
    }
  }

  const initTopStreams = streams => {
    topStreamsPaginated.current = api.streams.getStreamsPaginated()
    topStreamsPaginated.current.getNext().then(res => {
      if (topStreamsPaginated.current !== streams.cursor) {
        setStreams({ data: res, cursor: topStreamsPaginated.current.currentCursor })
        if (res[0]) {
          Promise.all([
            api.users.getUserById(res[0].userId),
            api.games.getGameById(res[0].gameId),
          ]).then(([user, game]) => {
            getHlsUrls(user.name).then((urls) => {
              console.log(user, game, urls)
              setAtciveStreamInfo({
                name: res[0].userDisplayName,
                game: game.name,
                viewers: res[0].viewers,
                title: res[0].title,
                url: urls[0].url, // BigBuckBunny,
                gameId: res[0].gameId,
                id: res[0].userId,
                profilePicture: user.profilePictureUrl
              })
            })
          })
        }
      }
    })
  }

  const initFollowedStreams = streams => {
    if (user !== 0) {
      console.log(user.following)
      followedStreamsPaginated.current = api.streams.getStreamsPaginated({userId: user.following})
      followedStreamsPaginated.current.getNext().then(res => {
        if (followedStreamsPaginated.current !== streams.cursor) {
          setFollowedStreams({ data: res, cursor: followedStreamsPaginated.current.currentCursor })
        }
      })
    }
  }

  const initTopGames = categories => {
    topGamesPaginated.current = api.games.getTopGamesPaginated()
    topGamesPaginated.current.getNext().then(res => {
      if (topGamesPaginated.current.currentCursor !== categories.cursor) {
        setCategories({ data: res, cursor: topGamesPaginated.current.currentCursor })
      }
    })
  }

  const initUser = () => {
    api.users.getMe().then((u) => {
      api.users.getFollowsPaginated({user: u}).getNext().then((f) => {
        console.log(f);
        u.following = f.map((each) => each.followedUserId)
        setUser(u);
        console.log(user);
        console.log(u);
      })
    })
  }

  function init () {
    if (user === 0) {initUser()}
    if (categories === 0) {initTopGames(categories)}
    if (streams === 0) {initTopStreams(streams)}
    if (followedStreams === 0) {initFollowedStreams(streams)}
  }

  function setMaximize () {
    maximize = true;
  }

  useEffect(()=> {
    if (api === null) {
      TClient.then((tw) => {
        api = tw.helix
        init()
      })
    } else {
      init()
    }
  },[categories, streams, user, followedStreams])

  return (
    <div className="container" id="toor" >
      {<Router>
        <Navigation />
        <Switch>
          <Route to="/home" >
            <div className="content">
              <div className="up">
                <StreamInfo info={atciveStreamInfo} />
                <StreamVideo src={atciveStreamInfo.url} maximize={false} />
              </div>
              <ContentLists
                categories={categories===0?[]:categories.data}
                streams={streams===0?[]:streams.data}
                followedStreams={followedStreams===0?[]:followedStreams.data}
                setInfo={setInfo}
                onPress={()=>{console.log(videoRef)}}
              />
            </div>
          </Route>
        </Switch>
      </Router>}
    </div>
  )
}

export default /* withFocusable({ trackChildren: true })( */App//)
