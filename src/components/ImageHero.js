import React from 'react'
import BackgroundImage from 'gatsby-background-image'

const imageStyle = {
    width: '100vw',
    backgroundColour: 'transparent',
    backgroundPosition: 'center center',
    display: 'flex',
    alignItems: 'center',
}

const HeroContent = props => {
    return (
      <div className="container">
        <div className="hero__content img-hero__content">
          <h1
            className={`hero__title img-hero__title ${props.highlight ? "img-hero__title--has-bg" : ""}`}
          >
            {props.heading}
          </h1>
        </div>
      </div>
    )
}

const ImageHero = ({ image, heading, highlight }) => {

    if(!!image && !!image.childImageSharp) {
        return (
            <BackgroundImage 
                fluid={image.childImageSharp.fluid} 
                className="hero img-hero"
                style={{
                    ...imageStyle
                }}>
                <HeroContent heading={heading} highlight={highlight} />
            </BackgroundImage>
        )
    }

    if(!!image && typeof image === 'string') {
        return (
          <div
            className="hero img-hero"
            style={{
              ...imageStyle,
              backgroundImage: `url(${image})`,
            }}
          >
            <HeroContent heading={heading} highlight={highlight} />
          </div>
        );
    }

    return null
}

export default ImageHero
