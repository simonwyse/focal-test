import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import TextHero from '../components/TextHero'
import QuestionIcon from '../img/icons/icon-question-circle.inline.svg'
import SEO from '../components/SEO'

const renderList = (list) => {
  return (
    <ol className="smaller">
      {list.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  )
}

export const FaqPageTemplate = ({
  heading,
  blurbs,
  faqs
}) => {

  return (
    <article>
      <TextHero heading={heading} />

      <div className="container">
        <section className="section ">
          <div className="section__content">
            {blurbs.map((blurb, j) => (
              <p key={j} className="is-leader">
                {blurb.text}
              </p>
            ))}
            <dl className="faq-list">
              {faqs.map((faq, i) => (
                <React.Fragment key={i}>
                  <dt>
                    <QuestionIcon className="icon icon-faq mr-2" />
                    {faq.question}
                  </dt>
                  <dd>
                    {faq.answer && faq.answer.map((answer) => (
                      <React.Fragment key={answer.text}>
                        <p className="smaller">{answer.text}</p>
                        {answer.bulletlist && renderList(answer.bulletlist)}
                      </React.Fragment>
                    ))}
                  </dd>
                </React.Fragment>
              ))}
            </dl>
          </div>
        </section>
      </div>
    </article>
  )
}

const FaqPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
      />
      <FaqPageTemplate
        heading={frontmatter.heading}
        blurbs={frontmatter.blurbs}
        faqs={frontmatter.faqs}
      />
    </Layout>
  )
}

FaqPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default FaqPage

export const faqPageQuery = graphql`
  query FaqPage {
    markdownRemark(frontmatter: { templateKey: { eq: "faq-page" } }) {
      frontmatter {
        title
        description
        heading
        blurbs {
          text
        }
        faqs {
          question
          answer {
            type
            text
            bulletlist
          }
        }
      }
    }
  }
`