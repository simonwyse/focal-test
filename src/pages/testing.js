import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Img from 'gatsby-image'

export default ({ data }) => {
  const sources = [
    data.mobileImage.childImageSharp.fluid,
    {
      ...data.desktopImage.childImageSharp.fluid,
      media: `(min-width: 768px)`,
    },
  ]

  return (
    <Layout>
      <div>
        <h1>Hello world, working?</h1>
        <Img fluid={sources} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    mobileImage: file(relativePath: { eq: "sunset.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    desktopImage: file(relativePath: { eq: "flavor_wheel.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 2000, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
