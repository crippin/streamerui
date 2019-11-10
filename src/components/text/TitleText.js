import React from 'react'

const TitleText = props => 
<div className="text" style={props.style} >
  <p ref={props.pref} style={{'fontSize': `${props.size}px`}}>{props.text}<br /></p>
</div>

export {TitleText}
