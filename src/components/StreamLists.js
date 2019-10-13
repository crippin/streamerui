import React, { useState, useEffect, createRef } from 'react'
import { TitleText } from './TitleText'
import { withFocusable } from '@noriginmedia/react-spatial-navigation'
import scrollIntoView from 'scroll-into-view-if-needed'


const streamCard = (props) => {
  setTimeout(()=>{
    if (props.focused) {
      console.log('sett')
      props.setInfo(props.id)
    }
  },800)
  return (
    <a href="#home" className={`${props.focused?'focused':'' }`} ref={props.pRef} id={props.id} >
      <div className={`streamCard`} >
        <img width={props.width} src={props.src}
          onClick={(e)=> {
            console.log('## StreamCard Interract: ##')
            console.log(e.target)
            props.setInfo(e.target.id)
            }
          }
        />
        <h1>{props.name}</h1>
      </div>
    </a>
  )
}

const StreamCard = withFocusable()(streamCard);

const cardList = (props) => {
  const [list, setList] = useState([])

  useEffect(() => {
    setList(props.list)
    if (list[0]) {
      props.setFocus(list[0].userId)
    }
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
    const ref = createRef()
    return (
      <StreamCard
        src={ src.replace('{width}', width).replace('{height}', height) }
        key={ `${each.userDisplayName}Card${i}` }
        width={width}
        id={ each.userId?each.userId:each.id }
        setInfo={props.setInfo}
        name={each.userDisplayName}
        onArrowPress={()=>{/** block setInfo */}}
        onEnterPress={props.onPress}
        onBecameFocused={()=>{scrollIntoView(ref.current,{ behavior: 'smooth', block: 'center', inline: "start"})}}
        pRef={ref}
        focusKey={each.userId?each.userId:each.id}
      />
    )
  })
  return (
    <div
      className="scrollmenu"
      style={props.style?props.style:{}}
    >
      {cards}
    </div>
  )
}

const CardList = withFocusable({ trackChildren: true })(cardList)

const ContentLists = (props) => {
  const [categories, setCategories] = useState([])
  const [streams, setStreams] = useState([])
  const [followedStreams, setFollowedStreams] = useState([])

  useEffect(() => {
    setCategories(props.categories)
    setStreams(props.streams)
    setFollowedStreams(props.followedStreams)
  }, [props.categories, props.streams, props.followedStreams])

  return (
    <div className="main3 scrollmenu" >
      <TitleText text={'Top Streams'} size={24} />
      <CardList type={'stream'} list={streams} setInfo={props.setInfo} onPress={props.onPress} />
      <TitleText text={'Followed Streams'} size={24} />
      <CardList list={followedStreams} setInfo={props.setInfo} onPress={props.onPress} />
      <TitleText text={'Top Categories'} size={24} />
      <CardList list={categories} setInfo={props.setInfo} style={{marginBottom: '5%'}} onPress={props.onPress} />
    </div>
  )
}

export default withFocusable({ trackChildren: true })(ContentLists)
