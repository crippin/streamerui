import React, { useState, useEffect } from 'react'
import TitleText from './TitleText'
//import TClient from '../api/twitch'

const StreamCard = (props) => {
  // Do st clever here
  return (
    <a href="#home">
      <img width="280" src={props.src} alt="" />
    </a>
  )
}

const CardList = (props) => {
  const [list, setList] = useState([])
  let src = "https://cdn.dribbble.com/users/130163/screenshots/6209150/twitch-avatar.png"
  useEffect(() => {
    setList(props.list)
  }, [props.list])
  console.log(props.list);
  let cards = list.map((each, i) => {
    let src = each.boxArtUrl?each.boxArtUrl:each.thumbnailUrl
    return (
      <StreamCard
        src={src.replace('{width}', 280).replace('{height}', 210)}
        key={`${props.text}Card${i}`}
      />
    )
  })
  return (
    <div className="scrollmenu">
      <TitleText text={props.text} size={24} />
      {cards}
    </div>
  )
}

const ContentLists = (props) => {
  const [categories, setCategories] = useState([])
  const [streams, setStreams] = useState([])

  useEffect(() => {
    setCategories(props.categories)
    setStreams(props.streams)
  }, [props.categories, props.streams])

  return (
    <div className="main3 scrollmenu">
      <CardList list={streams} text={'Top Streams'} />
      <CardList list={categories} text={'Top Categories'} />
    </div>
  )
}

export default ContentLists
