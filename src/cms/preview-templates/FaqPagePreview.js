import React from 'react'
import PropTypes from 'prop-types'
import { FaqPageTemplate } from '../../templates/faq-page'

const FaqPagePreview = ({ entry }) => {

    const heading = entry.getIn(["data", "heading"])

    const entryBlurbs = entry.getIn(["data", "blurbs"])
    const blurbs = entryBlurbs ? entryBlurbs.toJS() : []

    const entryFaqs = entry.getIn(["data", "faqs"])
    const faqs = entryFaqs ? entryFaqs.toJS() : []

    return (
      <FaqPageTemplate
        heading={heading}
        blurbs={blurbs}
        faqs={faqs}
      />
    );
}

FaqPagePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    })
}

export default FaqPagePreview