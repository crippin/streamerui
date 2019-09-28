import React, { useState, useEffect } from 'react'
import TitleText from './TitleText'
//import TClient from '../api/twitch'

const StreamCard = (props) => {
  return (
    <a href="#home">
      <img width={props.width} src={props.src} alt="" />
    </a>
  )
}

const CardList = (props) => {
  const [list, setList] = useState([])

  useEffect(() => {
    setList(props.list)
  }, [props.list])

  let cards = list.map((each, i) => {
    let src, width, height
    if (each.boxArtUrl) {
      src = each.boxArtUrl
      width = 180
      height = 320
    } else {
      src = each.thumbnailUrl
      width = 320
      height = 180
    }
    return (
      <StreamCard
        src={ src.replace('{width}', width).replace('{height}', height) }
        key={ `${props.src}Card${i}` }
        width={width}
      />
    )
  })

  return (
    <div className="scrollmenu">
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
      <TitleText text={'Top Streams'} size={24} />
      <CardList list={streams} />
      <TitleText text={'Top Categories'} size={24} />
      <CardList list={categories} />
    </div>
  )
}

export default ContentLists
