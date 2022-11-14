import React from 'react'
import Layout from '../../components/Layout'
import TextHero from '../../components/TextHero'

export default () => (
  <Layout>
    <article>
      <TextHero heading="Thank you!" />
      <div className="container">
        <section className="section" style={{ minHeight: '50vh' }}>
          <div className="section__content">
            <p className="is-leader">
              Thanks for your enquiry, we will contact you shortly from the
              details provided.
            </p>
          </div>
        </section>
      </div>
    </article>
  </Layout>
)
