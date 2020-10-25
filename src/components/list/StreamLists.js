import React, { useState, useEffect, createRef, useRef } from 'react'
import PropTypes from "prop-types";
import { withFocusable } from '@noriginmedia/react-spatial-navigation'
import scrollIntoView from 'scroll-into-view-if-needed'
import { TitleText } from '../text/TitleText'


const streamCard = ({ focused, setInfo, id, type, name, src, width, pRef }) => {

  useEffect(() => {
    if (focused) {
      setInfo(id, type)
    }
  }, [focused])

  return (
    <a href="#home" className={`${focused ? 'focused' : ''}`} ref={pRef} id={id} >
      <div className={`streamCard`} >
        <img width={width} src={src}
          onClick={(e) => {
            console.log('## StreamCard Interract: ##')
            console.log(e.target)
          }
          }
        />
        <h1>{name}</h1>
      </div>
    </a>
  )
}

streamCard.propTypes = {
  focused: PropTypes.bool,
  setInfo: PropTypes.func,
  id: PropTypes.string,
  pRef: PropTypes.any,
  src: PropTypes.string,
  width: PropTypes.number,
  name: PropTypes.string,
  type: PropTypes.string,
}

const StreamCard = withFocusable()(streamCard);

const cardList = (props) => {
  console.log('Rendering List: ' + props.type)
  console.log(props.list)

  useEffect(() => {
    if (props.list && props.list.data[0] && props.list.data[0].userId && props.type === 'stream') {
      props.setFocus('stream' + props.list.data[0].userId)
    }
  }, [props.list])

  let cards = props.list ? props.list.data.map((each, i) => {
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
        src={src.replace('{width}', width).replace('{height}', height)}
        key={`${each.userDisplayName}Card${i}`}
        width={width}
        id={each.userId ? props.type + '-' + each.userId : props.type + '' + each.id}
        type={props.type}
        setInfo={props.setInfo}
        name={each.userDisplayName}
        onArrowPress={() => {/** block setInfo */ }}
        onEnterPress={props.onPress}
        onBecameFocused={() => {
          scrollIntoView(ref.current, { behavior: 'smooth', inline: "start" })
        }
        }
        pRef={ref}
        focusKey={each.userId ? props.type + '' + each.userId : props.type + '' + each.id}
      />
    )
  }) : <div />

  return (
    <div
      className="scrollmenu"
      style={props.style ? props.style : {}}
    >
      {cards}
    </div>
  )
}

const CardList = React.memo(withFocusable({ trackChildren: true })(cardList))

const ContentLists = (props) => {
  const api = props.api
  const [categories, setCategories] = useState(0)
  const [streams, setStreams] = useState(0)
  const [followedStreams, setFollowedStreams] = useState(0)
  const topGamesPaginated = useRef(null)
  const topStreamsPaginated = useRef(null)
  const followedStreamsPaginated = useRef(null)

  const initTopStreams = cursor => {
    topStreamsPaginated.current = api.streams.getStreamsPaginated()
    topStreamsPaginated.current.getNext().then(res => {
      if (topStreamsPaginated.current.currentCursor !== cursor) {
        setStreams({ data: res, cursor: topStreamsPaginated.current.currentCursor })
        if (res[0]) {
          props.fetchActiveStreamInfo(res[0])
        }
      }
    })
  }

  const initFollowedStreams = (user, cursor) => {
    followedStreamsPaginated.current = api.streams.getStreamsPaginated({ userId: user.following })
    followedStreamsPaginated.current.getNext().then(res => {
      if (followedStreamsPaginated.current.currentCursor !== cursor) {
        setFollowedStreams({ data: res, cursor: followedStreamsPaginated.current.currentCursor })
      }
    })
  }

  const initTopGames = cursor => {
    topGamesPaginated.current = api.games.getTopGamesPaginated()
    topGamesPaginated.current.getNext().then(res => {
      if (topGamesPaginated.current.currentCursor !== cursor) {
        setCategories({ data: res, cursor: topGamesPaginated.current.currentCursor })
      }
    })
  }

  const init = () => {
    initTopGames(categories.cursor)
    initTopStreams(streams.cursor)
    initFollowedStreams(props.user, followedStreams.cursor)
  }
  useEffect(() => {
    init()
  }, [props.user])

  console.log('#Rendering ALL LIST #')
  return (
    <div className="main3 scrollmenu" >
      <TitleText text={'Top Streams'} size={24} style={{ fontWeight: '800' }} />
      <CardList type={'stream'} list={streams} setInfo={props.setInfo} onPress={props.onPress} />
      <TitleText text={'Followed Streams'} size={24} style={{ fontWeight: '800' }} />
      <CardList type={'follow'} list={followedStreams} setInfo={props.setInfo} onPress={props.onPress} />
      <TitleText text={'Top Categories'} size={24} style={{ fontWeight: '800' }} />
      <CardList type={'cat'} list={categories} setInfo={props.setInfo} style={{ marginBottom: '5%' }} onPress={props.onPress} />
    </div>
  )
}

export default React.memo(withFocusable({ trackChildren: true })(ContentLists))
