import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import TextHero from '../components/TextHero'
import Map from '../components/Map'
import ArrowUpIcon from '../img/icons/icon-arrow-up.inline.svg'
import ArrowDownIcon from '../img/icons/icon-arrow-down.inline.svg'
import PrintIcon from '../img/icons/icon-print.inline.svg'
import ParkMap from '../img/park-map.inline.svg'


export const LocationPageTemplate = ({
  heading,
  blurbs,
  directions,
  postal
}) => {

  return (
    <article>
      <TextHero heading={heading} />

      <div className="container">
        <section className="section">
          <div className="section__content">
            {blurbs.map((blurb, j) => (
              <p key={j} className="has-separator-anchor separator-x is-leader">{blurb.text}</p>
            ))}
            <p className="mb-0">{postal.heading}:</p>
            <address>
              {postal.address.map((entry, i) => (
                <React.Fragment key={i}>
                  {entry.line} <br/>
                </React.Fragment>
              ))}
            </address>
          </div>
        </section>
      </div>

      <div className="container-fluid px-0">
          <Map />
      </div>

      <div className="container">
        <section className="section">
          <h2 className="section__title is-separator"><span>{directions.heading}</span></h2>
          <div className="section__content">
            <div className="row no-gutters justify-content-between">
              <div className="col-md-5">
                <h3 className="d-flex align-items-center"><ArrowDownIcon className="icon icon-arrow-down mr-2" /> {directions.north.heading}</h3>
                <ol className="">
                  {directions.north.items.map((item, i) => (
                      <li key={i}>{item.item}</li>
                  ))}
                </ol>
              </div>
              <div className="col-md-5">
                <h3 className="d-flex align-items-center"><ArrowUpIcon className="icon icon-arrow-up mr-2" /> {directions.south.heading}</h3>
                <ol className="">
                  {directions.south.items.map((item, i) => (
                    <li key={i}>{item.item}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
          <div className="section__button">
            <button className="btn" onClick={() => window.print()}>Print <PrintIcon className="icon icon-print" /></button>
          </div>
        </section>

        <section className="section">
          <h2 className="section__title is-separator"><span>{directions.arrive.heading}</span></h2>
          <div className="section__content">
            <p>{directions.arrive.item}</p>
            <div className="restricted-container">
              <ParkMap className="is-restricted-640-md" />
            </div>
          </div>
        </section>

      </div>
    </article>
  )
}

LocationPageTemplate.propTypes = {
  heading: PropTypes.string.isRequired,
}

const LocationPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
      />
      <LocationPageTemplate
        heading={frontmatter.heading}
        blurbs={frontmatter.blurbs}
        directions={frontmatter.directions}
        postal={frontmatter.postal}
      />
    </Layout>
  )
}

LocationPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default LocationPage

export const locationPageQuery = graphql`
  query LocationPage {
    markdownRemark(frontmatter: { templateKey: { eq: "location-page" } }) {
      frontmatter {
        title
        description
        heading
        blurbs {
          text
        }
        directions {
          heading
          north {
            heading
            items {
              item
            }
          }
          south {
            heading
            items {
              item
            }
          }
          arrive {
            heading
            item
          }
        }
        postal {
          heading
          address {
            line
          }
        }
      }
    }
  }
`