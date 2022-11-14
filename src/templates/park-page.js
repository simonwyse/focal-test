import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Content, { HTMLContent } from '../components/Content'
import ExternalLinkIcon from '../img/icons/icon-external-link.inline.svg'
import ImageHero from '../components/ImageHero'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'


export const ParkPageTemplate = ({
  heading,
  image,
  markup,
  contentComponent,
  facilities,
  golfmap
}) => {

  const PageContent = contentComponent || Content

  return (
    <article>
      <ImageHero image={image} heading={heading} highlight={true} />

      <div className="container">
        <section className="section">
          <div className="section__content">

            <PageContent className="mdcontent" content={markup} />

          </div>
        </section>
        <section className="section">
          <h2 className="section__title is-separator"><span>{facilities.heading}</span></h2>

  
          <div className="section__content">

        <div className="row no-gutters">
            <div className="col-md-6">

                <ul className="facilities">
                  {facilities.items.map((item, i) => {
                    return (
                      <li key={i}>{item.name}</li>
                    )
                  })}
                </ul>

            </div>
            <aside className="col-md-6 text-center">

              <h3>The Golf Course</h3>
                <PreviewCompatibleImage imageInfo={{
                  image: golfmap,
                  alt: "A map of the golf course at Tydd St Giles"
                }}
                />
                <a href="https://www.pure-leisure.co.uk/parks/norfolk/tydd-st-giles/golf/" target="_blank" rel="noopener noreferrer">More about the golf course<ExternalLinkIcon className="icon icon--inline icon-opener" /></a>
            </aside>
          </div>

            <div className="row no-gutters">
              <div className="col">
              </div>

              <div className="col">
                
              </div>

            </div>

          </div>
          <div className="section__button">
            <a href="https://www.pure-leisure.co.uk/parks/norfolk/tydd-st-giles/overview/" className="btn" rel="noopener noreferrer" target="_blank">Visit Tydd St Giles Golf & Country Club<ExternalLinkIcon className="icon icon-opener" /></a>
          </div>
        </section>

      </div>
    </article>
  )
}

ParkPageTemplate.propTypes = {
  heading: PropTypes.string.isRequired,
}

const ParkPage = ({ data }) => {

  const { markdownRemark: page } = data

  return (
    <Layout>
      <SEO
        title={page.frontmatter.title}
        description={page.frontmatter.description}
      />
      <ParkPageTemplate
        contentComponent={HTMLContent}
        heading={page.frontmatter.heading}
        image={page.frontmatter.image}
        markup={page.html}
        facilities={page.frontmatter.facilities}
        golfmap={page.frontmatter.golfmap}
      />
    </Layout>
  )
}

ParkPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ParkPage

export const parkPageQuery = graphql`
  query ParkPage {
    markdownRemark(frontmatter: { templateKey: { eq: "park-page" } }) {
      html
      frontmatter {
        title
        description
        heading
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 75) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        facilities {
          heading
          items {
            name
          }
        }
        golfmap {
          childImageSharp {
            fluid(maxWidth: 680, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`