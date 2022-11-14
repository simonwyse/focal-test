import React from 'react'
import { Link } from 'gatsby'
import ArrowRightIcon from '../img/icons/icon-angle-right.inline.svg'

class LinkButton extends React.Component {


  render() {
    return (
      <Link to={this.props.to} className="btn" state={this.props.state}>
        {this.props.text}
        <ArrowRightIcon className="icon icon-arrow-right" />
      </Link>
    )
  }
}

export default LinkButton
