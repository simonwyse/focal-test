import React from 'react'
import { Link } from 'gatsby'
import Logo from './Logo'

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  componentDidMount() {
    if(!matchMedia('(hover: none)').matches) {
      document.documentElement.classList.add('can-hover')
    } 
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: 'is-active',
            })
          : this.setState({
              navBarActiveClass: '',
            })
      }
    )
  }

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main-navigation">
        <div className="container-fluid px-0">
          <div className="navbar__brand py-2">
            <Logo location="navbar" />
            {/* Hamburger menu */}
            <div
              className={`navbar__burger burger is-grey ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              onClick={() => this.toggleHamburger()}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div
            id="navMenu"
            className={`has-bg-lightest-grey navbar__menu ${this.state.navBarActiveClass}`}
          >
            <div className="navbar__menu-content">
              <Link
                to="/lodge"
                className="navbar__menu-item"
                activeClassName="is-active"
              >
                The Lodge
              </Link>
              <Link
                to="/park"
                className="navbar__menu-item"
                activeClassName="is-active"
              >
                The Park
              </Link>
              <Link
                to="/area"
                className="navbar__menu-item"
                activeClassName="is-active"
              >
                The Area
              </Link>
              <Link
                to="/location"
                className="navbar__menu-item"
                activeClassName="is-active"
              >
                The Location
              </Link>
              <Link
                to="/booking"
                className="navbar__menu-item"
                activeClassName="is-active"
                partiallyActive={true}
              >
                Booking
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
