import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { withFocusable } from '@noriginmedia/react-spatial-navigation'
import './Navigation.css'

const navIcon = (props) => {
  return (
    <li className={props.focused?'focused':''} style={{paddingBottom: '20px', paddingTop: '20px'}}>
      <Link to="/watch" onClick={props.onClick}>
        <img width={'56px'} src={`resource/icon/${props.name}-24px.svg`} />
        {props.show?<span style={{
            fontSize: '36px',
            position: 'relative',
            bottom: '14px',
            padding: '10px'
        }}>{props.text}</span>:null
        }
      </Link>
    </li>
  )
}

const NavIcon = withFocusable()(navIcon)

const navigation = (props) => {
  console.log('##NAV RENDER')
  const [style, setStyle] = useState({width: '80px'})
  useEffect(()=> {
    if (props.hasFocusedChild) {
      setStyle({width: '400px', zIndex: 2})
    } else {
      setStyle({width: '80px'})
    }
  },[props.hasFocusedChild])
  return (
    <nav id="main-navigation" style={style} >
      <ul>
        <NavIcon
          forgetLastFocusedChild
          trackChildren
          name={'search'}
          text={'Search'}
          show={props.hasFocusedChild}
        />
        <NavIcon
          trackChildren
          forgetLastFocusedChild
          name={'home'}
          text={'Home'}
          show={props.hasFocusedChild}
        />
        <NavIcon 
          trackChildren
          forgetLastFocusedChild
          name={'videogame_asset'}
          text={'Categories'}
          show={props.hasFocusedChild}
        />
        <NavIcon 
          trackChildren
          forgetLastFocusedChild
          name={'featured_video'}
          text={'Top Games'}
          show={props.hasFocusedChild}
        />
      </ul>
    </nav>
  )
}
const Navigation = withFocusable({ trackChildren: true, forgetLastFocusedChild: true})(navigation)
export {Navigation}
