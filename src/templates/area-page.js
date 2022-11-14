import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import TextHero from '../components/TextHero'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import ClockIcon from '../img/icons/icon-clock.inline.svg'
import ExternalLinkIcon from '../img/icons/icon-external-link.inline.svg'
import SEO from '../components/SEO'

export const AreaPageTemplate = ({
  heading,
  blurbs,
  showImages,
  activities
}) => {

  return (
    <article>
      <TextHero heading={heading} />

      <div className="container">
        <section className="section pb-0">
          <div className="section__content">
            {blurbs.map((blurb, i) => {
              return (
                <p key={i} className={i === 0 ? 'is-leader' : ''}>{blurb.text}</p>
              )
            })}
          </div>
        </section>

        <section className="section px-0">
          <div className="section__content">
            <div className="row activities">
            {activities.map((item) => (
              <div className="activity" key={item.name}>
                {showImages && <div className="activity__image">
                  <PreviewCompatibleImage
                  imageInfo={{
                    image: item.image,
                    alt: item.name
                  }}
                  />
                </div>}
                <div className="activity__detail has-bg-dark-turquoise-005 is-grey">
                  <h2 className="activity__name is-bright-blue">{item.name}</h2>
                  <p className="activity__time"><ClockIcon className="icon icon-clock activity__icon" /> {item.time} </p>
                  <p className="activity__link"><ExternalLinkIcon className="is-grey icon icon-opener activity__icon" /> <a href={item.link} target="_blank" className="is-grey" rel="noopener noreferrer">{item.website}</a> </p>
                </div>
              </div>
            ))}
            </div>
          </div>
        </section>
      </div>
    </article>
  )
}

AreaPageTemplate.propTypes = {
  heading: PropTypes.string.isRequired,
}

const AreaPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <SEO 
        title={frontmatter.title} 
        description={frontmatter.description} 
      />
      <AreaPageTemplate
        heading={frontmatter.heading}
        blurbs={frontmatter.blurbs}
        showImages={frontmatter.showImages}
        activities={frontmatter.activities}
      />
    </Layout>
  )
}

AreaPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AreaPage

export const areaPageQuery = graphql`
  query AreaPage {
    markdownRemark(frontmatter: { templateKey: { eq: "area-page" } }) {
      frontmatter {
        title
        description
        heading
        blurbs {
          text
        }
        showImages
        activities {
          name
          image {
            childImageSharp {
              fluid(maxWidth: 320, quality: 65) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          time
          link
          website
        }
      }
    }
  }
`