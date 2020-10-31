import React, { useState, useEffect, useRef } from 'react'
import { useTwitchApi } from './api/api'
import { TClient, getHlsUrls } from './api/twitch'
import {
  Navigation, StreamInfo, StreamVideo,
  RandomStreamerInfo, ContentLists, BigBuckBunny
} from './components'

const Content = ({ api, setStyle }) => {
  const [user, setUser] = useState(0)
  const [atciveStreamInfo, setAtciveStreamInfo] = useState(RandomStreamerInfo)
  const [maximize, setMaximize] = useState('false')

  const setInfo = (id, type) => {
    const pid = id.split('-')[1]
    console.log('setinfo')
    console.log(atciveStreamInfo.id)
    console.log(pid)
    if (atciveStreamInfo.id !== pid) {
      api.streams.getStreamByUserId(pid).then((stream) => {
        console.log('fetch')
        console.log(stream)
        fetchActiveStreamInfo(stream, type)
      })
    }
  }

  const fetchActiveStreamInfo = (stream, type) => {
    Promise.all([
      api.users.getUserById(stream.userId),
      api.games.getGameById(stream.gameId),
    ]).then(([user, game]) => {
      getHlsUrls(user.name).then((urls) => {
        console.log('-----------------------------------STREAM')
        console.log(stream)
        setAtciveStreamInfo({
          name: stream.userDisplayName,
          game: game.name,
          viewers: stream.viewers,
          title: stream.title,
          urls: urls, // BigBuckBunny,
          gameId: stream.gameId,
          id: stream.userId,
          profilePicture: user.profilePictureUrl,
          type: type
        })
      })
        .catch(() => {
          console.log(stream)
          setAtciveStreamInfo({
            name: stream.userDisplayName,
            game: game.name,
            viewers: stream.viewers,
            title: stream.title,
            urls: [{ url: BigBuckBunny }],
            gameId: stream.gameId,
            id: stream.userId,
            profilePicture: user.profilePictureUrl,
            type: type
          })
        })
    })
  }

  const initUser = () => {
    api.users.getMe().then((u) => {
      console.log(u);
      api.users.getFollowsPaginated({ user: u }).getNext().then((f) => {
        u.following = f.map((each) => each.followedUserId)
        setUser(u);
      })
    })
  }

  useEffect(() => { initUser() }, [])

  return (
    <div className="content">
      <div className="up">
        <StreamInfo info={atciveStreamInfo} />
        <StreamVideo info={atciveStreamInfo} src={atciveStreamInfo.urls} maximize={maximize} setFullScreen={setMaximize} />
      </div>
      {(api || user) ? <ContentLists
        setInfo={setInfo}
        fetchActiveStreamInfo={fetchActiveStreamInfo}
        api={api}
        user={user}
        onPress={() => { setMaximize(!maximize) }}
        setStyle={setStyle}
      /> : 'Loading.........'}
    </div>
  )
}

export default Content
