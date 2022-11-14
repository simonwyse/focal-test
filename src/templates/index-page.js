import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Facilities from '../components/Facilities'
import LinkButton from '../components/LinkButton'
import Banner from '../components/Banner'
import AvailabilityCalendar from '../components/AvailabilityCalendar'
import Map from '../components/Map'
import ImageHero from '../components/ImageHero'

export const IndexPageTemplate = ({
  banner,
  image,
  heading,
  blurbs,
  facilities,
  booking,
  location,
}) => (
  <article>

    <Banner data={banner} />
    
    <ImageHero image={image} heading={heading} />

    <section>
      <div className="container" style={{}}>
        <section className="section">
          <div className="section__content">
              {blurbs.map((blurb, j) => (
                <p key={j} className={j === 0 ? 'has-separator-anchor separator-x is-leader' : ''}>{blurb.text}</p>
              ))}
          </div>
        </section>

        <Facilities data={facilities} view="extended" promote={true} />
      </div>
    </section>

    <div className="container-fluid px-0 has-bg-bright-blue-004">
      <div className="container">
        <AvailabilityCalendar booking={booking} />
      </div>
    </div>

    <section>
      <div className="container">
        <section className="section">
          <h2 className="section__title is-separator">
            <span>{location.heading}</span>
          </h2>
          <div className="section__content">
            <p>{location.description}</p>
          </div>
          <div className="section__button">
            <LinkButton to="/location" text="Read more" />
          </div>
        </section>
      </div>

      <div className="container-fluid">
          <div className="row section pt-0 px-0">
              <Map />
        </div>
      </div>

    </section>

  </article>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  heading: PropTypes.string,
  blurbs: PropTypes.array,
  facilities: PropTypes.shape({
    heading: PropTypes.string,
    items: PropTypes.array,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }),
  booking: PropTypes.object,
  location: PropTypes.object,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        banner={frontmatter.banner}
        image={frontmatter.image}
        heading={frontmatter.heading}
        blurbs={frontmatter.blurbs}
        facilities={frontmatter.facilities}
        booking={frontmatter.booking}
        location={frontmatter.location}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        blurbs {
          text
        }
        facilities {
          heading
          items {
            name
            description
          }
        }
        booking {
          heading
          description
        }
        location {
          heading
          description
        }
        banner {
          display
          title
          text
        }
      }
    }
  }
`
