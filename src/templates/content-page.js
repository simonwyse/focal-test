import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import TextHero from '../components/TextHero'
import SEO from '../components/SEO'

export const ContentPageTemplate = ({ heading, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <article>
      <TextHero heading={heading} />

      <div className="container">
        <section className="section ">
          <div className="section__content">
            <PageContent className="mdcontent" content={content} />
          </div>
        </section>
      </div>
    </article>
  )
}

ContentPageTemplate.propTypes = {
  heading: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const ContentPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
      />
      <ContentPageTemplate
        contentComponent={HTMLContent}
        heading={post.frontmatter.heading}
        content={post.html}
      />
    </Layout>
  )
}

ContentPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ContentPage

export const contentPageQuery = graphql`
  query ContentPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        description
        heading
      }
    }
  }
`
