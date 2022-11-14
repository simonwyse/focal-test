import React from 'react'
import { Link } from 'gatsby'
import Logo from './Logo'
import FooterTiles from './FooterTiles'
import PhoneIcon from '../img/icons/icon-phone.inline.svg'
import MobileIcon from '../img/icons/icon-mobile.inline.svg'
import AtIcon from '../img/icons/icon-at.inline.svg'
import ExternalLinkIcon from '../img/icons/icon-external-link.inline.svg'
import FacebookIcon from '../img/icons/icon-facebook.inline.svg'

const Footer = class extends React.Component {
  render() {
    return (
      <>
        <FooterTiles />
        <footer className="footer has-bg-dark-turquoise">
          <div className="container px-0">
            <div className="row no-gutters footer__row">

              <div className="footer__logo">
                <Logo location="footer" />
                <small>&copy; 2020</small>
                <a 
                  href="https://www.facebook.com/thedockofthebay" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="mt-3"
                >
                  <FacebookIcon className="icon icon-facebook" />
                </a>
              </div>

              <div className="footer__lists has-separator-shell separator-x separator-y-lg">
                <ul className="list-unstyled footer__list">
                  <li>
                    <Link className="" to="/faq">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/booking/terms">
                      Booking Terms &amp; Conditions
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/privacy">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/about">
                      About Us
                    </Link>
                  </li>
                </ul>

                <ul className="list-unstyled footer__list">
                  <li>
                    <a href="tel:01480475533" className="has-icon-centered">
                      <PhoneIcon className="icon icon-phone" />01480 475533
                    </a>
                  </li>
                  <li>
                    <a href="tel:07712112370" className="has-icon-centered">
                      <MobileIcon className="icon icon-phone" />07712 112370
                    </a>
                  </li>
                  <li>
                    <a href="mailto:hello@thedockofthebay.co.uk" className="has-icon-centered">
                      <AtIcon className="icon icon-at" />Email us
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.pure-leisure.co.uk/parks/norfolk/tydd-st-giles/overview/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="has-icon-centered"
                    >
                      <ExternalLinkIcon className="icon icon-opener" />Tydd St Giles Golf & Country Club
                    </a>
                  </li>
                </ul>
                
              </div>
            </div>
          </div>
        </footer>
      </>
    )
  }
}

export default Footer
