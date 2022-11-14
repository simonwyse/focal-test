import React from 'react'
import { Link } from 'gatsby'
import LogoSVG from '../img/dotb-logo.inline.svg'
import useSiteMetadata from './SiteMetadata'

const Logo = props => {
  
  const { defaultTitle: title } = useSiteMetadata();

  return (
    <div className={`logo logo-${props.location}`}>
      <Link to="/" className={`logo__link logo-${props.location}__link`}>
        <LogoSVG className={`logo__svg logo-${props.location}__svg`} />
        <span className={`logo__ident logo-${props.location}__ident`}>
          {title}
        </span>
      </Link>
    </div>
  )
}

export default Logo
