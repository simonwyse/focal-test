import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import TextHero from '../components/TextHero'
import Content, { HTMLContent } from '../components/Content'
import BookingForm from '../pages/booking/booking-form'
import SEO from '../components/SEO'

export const BookingPageTemplate = ({
  heading,
  locationState,
  markup,
  contentComponent
}) => {

  const PageContent = contentComponent || Content

  return (
    <article>

      <TextHero heading={heading} />

      <div className="container">
        <section className="section ">
          <div className="section__content">

            <PageContent className="mdcontent" content={markup} />

          </div>
        </section>

        <BookingForm locationState={locationState} />
      </div>

    </article>
  )
}

BookingPageTemplate.propTypes = {
  heading: PropTypes.string,
  subheading: PropTypes.string,
}

class BookingPage extends React.Component {

  render() {
    const { frontmatter, html } = this.props.data.markdownRemark

    return (
      <Layout>
        <SEO 
          title={frontmatter.title}
          description={frontmatter.description}
        />
        <BookingPageTemplate
          contentComponent={HTMLContent}
          heading={frontmatter.heading}
          markup={html}
          locationState={this.props.location.state}
          handleToggleClick={this.handleToggleClick}
        />
      </Layout>
    )
  }
}

BookingPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default BookingPage

export const pageQuery = graphql`
  query BookingPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "booking-page" } }) {
      html
      frontmatter {
        title
        description
        heading
      }
    }
  }
`
