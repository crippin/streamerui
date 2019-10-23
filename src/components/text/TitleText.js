import React from 'react'

const TitleText = props => 
<div className="text" >
  <p style={{'fontSize': `${props.size}px`}}>{props.text}<br /></p>
</div>

export {TitleText}
