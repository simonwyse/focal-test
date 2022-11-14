import React from 'react'

const TextHero = props => (
  <div className="hero text-hero">
    <div className="container">
      <div className="hero__content text-hero__content">
        <h1 className="hero__title text-hero__title">{props.heading}</h1>
      </div>
    </div>
  </div>
)

export default TextHero
