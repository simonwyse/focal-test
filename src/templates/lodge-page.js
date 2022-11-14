import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Facilities from '../components/Facilities'
import EmblaCarousel from '../components/EmblaCarousel'
import Content, { HTMLContent } from '../components/Content'
import SEO from '../components/SEO'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const LodgePageTemplate = ({
  contentComponent,
  heading,
  blurbs,
  carousel,
  facilities,
  floorplan,
  accessibility,
  markup
}) => {

  const PageContent = contentComponent || Content

  return (
    <article>
      <EmblaCarousel carousel={carousel} />

      <div className="container">
        <section className="section">
          <h2 className="section__title is-separator"><span>{heading}</span></h2>
          <div className="section__content">
            {blurbs.map((blurb, i) => {
              return (
                <p key={i} className={i === 0 ? 'has-separator-anchor separator-x is-leader' : ''}>{blurb.text}</p>
              )
            })}
          </div>
        </section>

        <Facilities data={facilities} view="compact" promote={false} />

        <section className="section">
          <h2 className="section__title is-separator"><span>{floorplan.heading}</span></h2>
          <div className="section__content">
            <p className="mb-4">{floorplan.description}</p>
            <PreviewCompatibleImage 
              imageInfo={{ 
                image: floorplan.image,
                alt: floorplan.description
              }}
            />
          </div>
        </section>

        <section className="section">
            <h2 className="section__title is-separator"><span>{accessibility.heading}</span></h2>
            <div className="section__content">
              <PageContent className="mdcontent" content={markup} />
          </div>
        </section>
      </div>
    </article>
  )
}

LodgePageTemplate.propTypes = {
  heading: PropTypes.string.isRequired,
}

const LodgePage = ({ data }) => {

  const { markdownRemark: page } = data

  return (
    <Layout>
      <SEO 
        title={page.frontmatter.title} 
        description={page.frontmatter.description} 
      />
      <LodgePageTemplate
        contentComponent={HTMLContent}
        heading={page.frontmatter.heading}
        blurbs={page.frontmatter.blurbs}
        carousel={page.frontmatter.carousel}
        facilities={page.frontmatter.facilities}
        floorplan={page.frontmatter.floorplan}
        accessibility={page.frontmatter.accessibility}
        markup={page.html}
      />
    </Layout>
  )
}

LodgePage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default LodgePage

export const lodgePageQuery = graphql`
  query LodgePage {
    markdownRemark(frontmatter: { templateKey: { eq: "lodge-page" } }) {
      html
      frontmatter {
        title
        description
        heading
        blurbs {
          text
        }
        carousel {
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 85) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          caption
        }
        facilities {
          heading
        }
        floorplan {
          heading
          description
          image {
            childImageSharp {
              fluid(maxWidth: 1140, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        accessibility {
          heading
        }
      }
    }
  }
`