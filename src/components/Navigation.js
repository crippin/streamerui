import React, { useState, useEffect } from 'react'
import './Navigation.css'

const NavIcon = (props) => {
  const [focus, setFocus] = useState('')

  useEffect(() => {
    setFocus(props.focus)
  }, [props.focus])

  return (
    <li className={focus}>
      <a href="#main-navigation" onClick={props.onClick}>
        <i style={{'fontSize': '48px'}} className="material-icons">
          {props.name}
        </i>
      </a>
    </li>
  )
}

const Navigation = (props) => {
  const [focus, setFocus] = useState('')

  return (
    <nav id="main-navigation">
      <ul>
        <NavIcon 
          focus={focus === 'search' ? 'focus' : ''}
          name={'search'}
          onClick={(e) => setFocus(e.target.lastChild.data)}
        />
        <NavIcon 
          focus={focus === 'home' ? 'focus' : ''}
          name={'home'}
          onClick={(e) => setFocus(e.target.lastChild.data)}
        />
        <NavIcon 
          focus={focus === 'videogame_asset' ? 'focus' : ''}
          name={'videogame_asset'}
          onClick={(e) => setFocus(e.target.lastChild.data)}
        />
        <NavIcon 
          focus={focus === 'featured_video' ? 'focus' : ''}
          name={'featured_video'}
          onClick={(e) => setFocus(e.target.lastChild.data)}
        />
      </ul>
    </nav>
  )
}

export default Navigation
